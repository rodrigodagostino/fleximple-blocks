<?php

/**
 * Server-side rendering of the `fleximple-block/post` block.
 *
 * @package Fleximpe Blocks
 */

/**
 * Renders the `fleximple-block/post` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function fleximpleblocks_render_post_block($attributes, $content)
{

  if (isset($attributes['categories'])) {
    $args['category'] = $attributes['categories'];
  }

  $default_class_name = 'fleximple-block-post';
  $class_name = '';
  if (isset($attributes['className'])) {
    $class_name = $attributes['className'];
  }
  $classes = 'fleximple-block-post';

  $post_id = $attributes['postId'];
  $categories = get_the_category($post_id);
  $rel_attribute = trim(($attributes['noFollow'] ? 'nofollow' : '') . ' ' . ($attributes['noReferrer'] ? 'noreferrer' : ''));

  $post = get_post($post_id);

  /* Post Featured Image */
  $post_featured_image = '';
  if (isset($attributes['displayFeaturedImage']) && $attributes['displayFeaturedImage']) {
    $image_size = $attributes['imageSize'];
    $featured_image = wp_get_attachment_image_src(get_post_thumbnail_id($post), 'full', false);

    $picture_classes = array();
    $picture_classes[] = $default_class_name . '__picture';
    if ($attributes['aspectRatio']['small'] !== 'none') {
      $picture_classes[] = 'aspect-ratio-' . $attributes['aspectRatio']['small'] . '--sm';
    }
    if (
      $attributes['aspectRatio']['medium'] !== 'none' &&
      $attributes['aspectRatio']['medium'] !== $attributes['aspectRatio']['small']
    ) {
      $picture_classes[] = 'aspect-ratio-' . $attributes['aspectRatio']['medium'] . '--md';
    }
    if (
      $attributes['aspectRatio']['large'] !== 'none' &&
      $attributes['aspectRatio']['large'] !== $attributes['aspectRatio']['medium']
    ) {
      $picture_classes[] = 'aspect-ratio-' . $attributes['aspectRatio']['large'] . '--lg';
    }
    if (
      $attributes['imageSize']['small'] !== 'none' &&
      (!empty($attributes['focalPoint']['small']['x']) || !empty($attributes['focalPoint']['small']['y'])) &&
      $attributes['focalPoint']['small']['x'] !== 0.5 && $attributes['focalPoint']['small']['y'] !== 0.5
    ) {
      $picture_classes[] = 'object-position-' . $attributes['focalPoint']['small']['x'] * 100 . '-' . $attributes['focalPoint']['small']['y'] * 100 . '--sm';
    }
    if (
      $attributes['imageSize']['medium'] !== 'none' &&
      (!empty($attributes['focalPoint']['medium']['x']) || !empty($attributes['focalPoint']['medium']['y'])) &&
      $attributes['focalPoint']['medium']['x'] !== 0.5 && $attributes['focalPoint']['medium']['y'] !== 0.5 &&
      ($attributes['focalPoint']['medium']['x'] !== $attributes['focalPoint']['small']['x'] || $attributes['focalPoint']['medium']['y'] !== $attributes['focalPoint']['small']['y'])
    ) {
      $picture_classes[] = 'object-position-' . $attributes['focalPoint']['medium']['x'] * 100 . '-' . $attributes['focalPoint']['medium']['y'] * 100 . '--md';
    }
    if (
      $attributes['imageSize']['large'] !== 'none' &&
      (!empty($attributes['focalPoint']['large']['x']) || !empty($attributes['focalPoint']['large']['y'])) &&
      $attributes['focalPoint']['large']['x'] !== 0.5 && $attributes['focalPoint']['large']['y'] !== 0.5 &&
      ($attributes['focalPoint']['large']['x'] !== $attributes['focalPoint']['medium']['x'] || $attributes['focalPoint']['large']['y'] !== $attributes['focalPoint']['medium']['y'])
    ) {
      $picture_classes[] = 'object-position-' . $attributes['focalPoint']['large']['x'] * 100 . '-' . $attributes['focalPoint']['large']['y'] * 100 . '--lg';
    }

    $picture_sources = array();
    if ($post_id) {
      $image_sizes = array_reverse(array_keys($image_size));
      $i = 0;
      foreach ($image_sizes as $size) {
        if ($image_size[$size] !== 'none') {
          $picture_data = wp_get_attachment_image_src(get_post_thumbnail_id($post), $image_size[$size], false);
          if ($picture_data && $size !== 'small') {
            $picture_sources[] =
              '<source class="' . $default_class_name . '__image" media="(min-width: ' . get_option('fleximpleblocks_' . $image_sizes[$i + 1] . '_breakpoint_value') . 'px)" srcset="' . $picture_data[0] . '">';
          } else if ($picture_data) {
            $picture_sources[] =
              '<source class="' . $default_class_name . '__image" srcset="' . $picture_data[0] . '">';
          }
        }
        $i++;
      }
    }

    $image_source = !empty($featured_image) ? $featured_image[0] : FLEXIMPLEBLOCKS_PLUGIN_URL . 'assets/images/placeholder-image.svg';

    $post_featured_image = sprintf(
      '<picture class="%s">
        %s
        <img class="%s__image" src="%s" alt="%s"/>
      </picture>',
      esc_attr(implode(' ', $picture_classes)),
      implode('', $picture_sources),
      $default_class_name,
      $image_source,
      esc_attr(get_the_title($post))
    );
  }

  /* Post Audio */
  $post_audio = '';
  if (isset($attributes['displayAudio']) && $attributes['displayAudio']) {
    $audios = get_attached_media('audio', $post_id);

    if (!empty($audios)) {
      $i = 0;
      foreach ($audios as $audio) {
        if ($i > 0) {
          break;
        } // Display only the first audio item
        $post_audio = sprintf(
          '<audio controls src="%s" class="%s__audio"></audio>',
          $audio->guid,
          $default_class_name
        );
        $i++;
      }
    }
  }

  /* Post Categories */
  $post_categories = '';
  if (isset($attributes['displayCategories']) && $attributes['displayCategories']) {
    $categories = get_the_category($post_id);
    $categories_links = '';

    foreach ($categories as $category) {
      $categories_links .= '<a class="' . $default_class_name . '__category" href="' . esc_url(get_category_link($category->term_id)) . '" rel="category" data-category-slug="' . esc_html($category->slug) . '"><span class="screen-reader-only">' . __('Category:', 'fleximpleblocks') . '</span>' . esc_html($category->name) . '</a></span>';
    }

    $post_categories = sprintf(
      '<div class="%s__categories">%s</div>',
      $default_class_name,
      $categories_links
    );
  }

  /* Post Title */
  $post_title = '';
  if (isset($attributes['displayTitle']) && $attributes['displayTitle']) {
    $post_kicker = get_post_meta($post_id, 'kicker', true);
    $post_title = get_the_title($post_id);
    $tag_name = 'h' . $attributes['headingLevel'];
    if (!$post_title) {
      $post_title = __('(no title)', 'fleximpleblocks');
    }

    $post_title = sprintf(
      '<%s class="%s__title">
        <a href="%s"' . (!empty($rel_attribute) ? ' rel="' . $rel_attribute . '"' : '') . ' data-link-name="article">
          %s<span class="%s__headline">%s</span>
        </a>
      </%s>',
      $tag_name,
      $default_class_name,
      esc_url(get_permalink($post_id)),
      $post_kicker ? '<span class="' . $default_class_name . '__kicker">' . esc_html($post_kicker) . '</span>' : '',
      $default_class_name,
      esc_html($post_title),
      $tag_name
    );
  }

  /* Post Author */
  $post_author = '';
  if (isset($attributes['displayAuthor']) && $attributes['displayAuthor']) {
    $post_author = sprintf(
      '<a href="%s" class="%s__byline" rel="author"><span class="screen-reader-only">%s</span>%s</a>',
      esc_url(get_author_posts_url($post_id)),
      $default_class_name,
      __('Published by:', 'fleximpleblocks'),
      esc_html(get_the_author_meta('display_name', $post->post_author))
    );
  }

  /* Post Date */
  $post_date = '';
  if (isset($attributes['displayDate']) && $attributes['displayDate']) {
    $post_date = sprintf(
      '<time datetime="%s" class="%s__date"><span class="screen-reader-only">%s</span>%s</time>',
      esc_attr(get_the_date('c', $post)),
      $default_class_name,
      __('Published on:', 'fleximpleblocks'),
      esc_html(get_the_date('', $post))
    );
  }

  /* Post Comments */
  $post_comments = '';
  if (!empty($attributes['displayComments'])) {
    $comments_number = get_comments_number($post);
    $comments_number = sprintf(_n('%d comment', '%d comments', $comments_number, 'fleximpleblocks'), $comments_number);

    $post_comments = sprintf(
      '<span class="%1$s__comments">%2$s</span>',
      $default_class_name,
      $comments_number
    );
  }

  /* Post Excerpt */
  $post_excerpt = '';
  if (isset($attributes['displayExcerpt']) && $attributes['displayExcerpt']) {
    $excerpt = apply_filters('the_excerpt', get_post_field('post_excerpt', $post_id, 'raw'));
    if (!($excerpt)) {
      $excerpt = $post->post_content;
    }
    $trimmed_excerpt = esc_html(wp_trim_words($excerpt, $attributes['excerptLength'], '&hellip; '));

    $post_excerpt = sprintf(
      '<div class="%1$s__excerpt">%2$s</div>',
      $default_class_name,
      $trimmed_excerpt
    );
  }

  /* Post Read More */
  $post_read_more = '';
  if (isset($attributes['displayReadMore']) && $attributes['displayReadMore']) {
    $post_read_more = $attributes['readMore'];
    $post_read_more = sprintf(
      '<a href="%1$s" class="%2$s__read-more"' . (!empty($rel_attribute) ? ' rel="' . $rel_attribute . '"' : '') . ' data-link-name="article">%3$s</a>',
      esc_url(get_permalink($post)),
      $default_class_name,
      $post_read_more
    );
  }

  /* Post Extra Articles */
  $post_extra_articles = '';
  if (isset($attributes['displayExtraArticles']) && $attributes['displayExtraArticles']) {
    $post_extra_articles = $content;
  }


  /**
   * Post Markup
   */
  $post_markup = ''; // It is important to initiate it here so nothing will be overridden inside the following loop.

  foreach ($attributes['orderArticle'] as $article_fragment) {
    if ('media' === $article_fragment && isset($attributes['displayMedia']) && $attributes['displayMedia']) {
      $post_markup .= '<div class="' . $default_class_name . '__media">';
      foreach ($attributes['orderMedia'] as $media_fragment) {
        if ('featuredImage' === $media_fragment && $post_featured_image) {
          $post_markup .= $post_featured_image;
        }
        if ('audio' === $media_fragment && $post_audio) {
          $post_markup .= $post_audio;
        }
      }
      $post_markup .= '</div>';
    }

    if ('content' === $article_fragment && isset($attributes['displayContent']) && $attributes['displayContent']) {
      $post_markup .= '<div class="' . $default_class_name . '__content">';
      foreach ($attributes['orderContent'] as $content_fragment) {
        if ('categories' === $content_fragment && $post_categories) {
          $post_markup .= $post_categories;
        }
        if ('title' === $content_fragment && $post_title) {
          $post_markup .= $post_title;
        }
        if ('meta' === $content_fragment && isset($attributes['displayMeta']) && $attributes['displayMeta']) {
          $post_markup .= '<div class="' . $default_class_name . '__meta">';
          foreach ($attributes['orderMeta'] as $meta_fragment) {
            if ('author' === $meta_fragment && $post_author) {
              $post_markup .= $post_author;
            }
            if ('date' === $meta_fragment && $post_date) {
              $post_markup .= $post_date;
            }
            if ('comments' === $meta_fragment && $post_comments) {
              $post_markup .= $post_comments;
            }
          }
          $post_markup .= '</div>';
        }
        if ('excerpt' === $content_fragment && $post_excerpt) {
          $post_markup .= $post_excerpt;
        }
        if ('readMore' === $content_fragment && $post_read_more) {
          $post_markup .= $post_read_more;
        }
      }
      $post_markup .= '</div>';
    }

    if ('extraArticles' === $article_fragment && isset($attributes['displayExtraArticles']) && $attributes['displayExtraArticles']) {
      $post_markup .= '<div class="' . $default_class_name . '__footer">';
      $post_markup .= $post_extra_articles;
      $post_markup .= '</div>';
    }
  }

  $post_markup .= '<a class="' . $default_class_name . '__link-overlay" href="' . esc_url(get_permalink($post_id)) . '"' . (!empty($rel_attribute) ? ' rel="' . $rel_attribute . '"' : '') . ' data-link-name="article" tabindex="-1" aria-hidden="true">' . get_the_title($post_id) . '</a>';

  if (isset($attributes['align']) && $attributes['align']) {
    $classes .= ' align-' . $attributes['align'];
  }

  $internal_styles = '';
  $internal_styles .= '<style>';
  if (isset($attributes['aspectRatio']) && $attributes['aspectRatio']['small'] !== 'none') {
    $aspect_ratio_small_array = preg_split("/-/", $attributes['aspectRatio']['small']);
    $internal_styles .= '.' . $default_class_name . '__picture.aspect-ratio-' . $attributes['aspectRatio']['small'] . '--sm {
      padding-bottom: ' . $aspect_ratio_small_array[1] * 100 / $aspect_ratio_small_array[0] . '%;
    }';
  }
  if ($attributes['focalPoint']['small']['x'] !== 0.5 && $attributes['focalPoint']['small']['y'] !== 0.5) {
    $internal_styles .= '.' . $default_class_name . '__picture.object-position-' . $attributes['focalPoint']['small']['x'] * 100 . '-' . $attributes['focalPoint']['small']['y'] * 100 . '--sm .' . $default_class_name . '__image {
      object-position: ' . $attributes['focalPoint']['small']['x'] * 100 . '% ' . ['focalPoint']['small']['y'] * 100 . '%;
    }';
  }
  if ((isset($attributes['aspectRatio']) && $attributes['aspectRatio']['medium'] !== 'none') || (isset($attributes['focalPoint']) && $attributes['focalPoint']['medium'] !== 'none')) {
    $internal_styles .= '@media only screen and (min-width: ' . get_option('fleximpleblocks_small_breakpoint_value') . 'px) {';
    if ($attributes['aspectRatio']['medium'] !== 'none' && $attributes['aspectRatio']['medium'] !== $attributes['aspectRatio']['small']) {
      $aspect_ratio_medium_array = preg_split("/-/", $attributes['aspectRatio']['medium']);
      $internal_styles .= '.' . $default_class_name . '__picture.aspect-ratio-' . $attributes['aspectRatio']['medium'] . '--md {
        padding-bottom: ' . $aspect_ratio_medium_array[1] * 100 / $aspect_ratio_medium_array[0] . '%;
      }';
    }
    if ($attributes['focalPoint']['medium']['x'] !== 0.5 && $attributes['focalPoint']['medium']['y'] !== 0.5 && $attributes['focalPoint']['medium']['x'] !== $attributes['focalPoint']['small']['x'] && $attributes['focalPoint']['medium']['y'] !== $attributes['focalPoint']['small']['y']) {
      $internal_styles .= '.' . $default_class_name . '__picture.object-position-' . $attributes['focalPoint']['medium']['x'] * 100 . '-' . $attributes['focalPoint']['medium']['y'] * 100 . '--md .' . $default_class_name . '__image {
        object-position: ' . $attributes['focalPoint']['medium']['x'] * 100 . '% ' . ['focalPoint']['medium']['y'] * 100 . '%;
      }';
    }
    $internal_styles .= '}';
  }
  if ((isset($attributes['aspectRatio']) && $attributes['aspectRatio']['large'] !== 'none') || (isset($attributes['focalPoint']) && $attributes['focalPoint']['large'] !== 'none')) {
    $internal_styles .= '@media only screen and (min-width: ' . get_option('fleximpleblocks_medium_breakpoint_value') . 'px) {';
    if ($attributes['aspectRatio']['large'] !== 'none' && $attributes['aspectRatio']['large'] !== $attributes['aspectRatio']['medium']) {
      $aspect_ratio_large_array = preg_split("/-/", $attributes['aspectRatio']['large']);
      $internal_styles .= '.' . $default_class_name . '__picture.aspect-ratio-' . $attributes['aspectRatio']['large'] . '--lg {
        padding-bottom: ' . $aspect_ratio_large_array[1] * 100 / $aspect_ratio_large_array[0] . '%;
      }';
    }
    if ($attributes['focalPoint']['large']['x'] !== 0.5 && $attributes['focalPoint']['large']['y'] !== 0.5 && $attributes['focalPoint']['large']['x'] !== $attributes['focalPoint']['medium']['x'] && $attributes['focalPoint']['large']['y'] !== $attributes['focalPoint']['medium']['y']) {
      $internal_styles .= '.' . $default_class_name . '__picture.object-position-' . $attributes['focusPoint']['large']['x'] * 100 . '-' . $attributes['focusPoint']['large']['y'] * 100 . '--lg .' . $default_class_name . '__image {
        object-position: ' . $attributes['focalPoint']['large']['x'] * 100 . '% ' . ['focalPoint']['large']['y'] * 100 . '%;
      }';
    }
    $internal_styles .= '}';
  }
  $internal_styles .= '</style>';

  $block_content = sprintf(
    '<article class="%s%s" data-post-id="%s">
      %s
      %s
    </article>',
    esc_attr($default_class_name),
    !empty($class_name) ? ' ' . esc_attr($class_name) : '',
    esc_attr($post_id),
    !empty($internal_styles) ? $internal_styles : '',
    $post_markup
  );

  return $block_content;
}

/**
 * Registers the `fleximple-block/post` block.
 */
if (!function_exists('fleximpleblocks_register_post_block')) {
  function fleximpleblocks_register_post_block()
  {
    // Return early if this function does not exist.
    if (!function_exists('register_block_type_from_metadata')) {
      return;
    }

    register_block_type_from_metadata(
      __DIR__,
      array(
        'render_callback'  => 'fleximpleblocks_render_post_block',
      )
    );
  }
  add_action('init', 'fleximpleblocks_register_post_block');
}
