<?php

/**
 * Server-side rendering of the `fleximple-block/post-carousel` block.
 *
 * @package Fleximpe Blocks
 */

/**
 * Renders the `fleximple-block/post-carousel` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function fleximpleblocks_render_post_carousel_block($attributes)
{
  $args = array(
    'posts_per_page'  => $attributes['postsToShow'],
    'offset'      => $attributes['offset'],
    'post_status'    => 'publish',
    'order'        => $attributes['order'],
    'orderby'      => $attributes['orderBy'],
    'suppress_filters'  => false,
  );

  if (isset($attributes['categories'])) {
    $args['category__in'] = array_column($attributes['categories'], 'value');
  }

  if (isset($attributes['excludedCategories'])) {
    $args['category__not_in'] = array_column($attributes['excludedCategories'], 'value');
  }

  $default_class_name = 'fleximple-block-post-carousel';
  $class_name = '';
  if (isset($attributes['className'])) {
    $class_name = $attributes['className'];
  }
  $classes = 'fleximple-block-post-carousel';

  $post_carousel = get_posts($args);
  $rel_attribute = trim(($attributes['noFollow'] ? 'nofollow' : 'false') . ' ' . ($attributes['noReferrer'] ? 'noreferrer' : 'false'));

  if (isset($attributes['selectedPosts'])) {
    $post_carousel = array();
    foreach ($attributes['selectedPosts'] as $post) {
      $post_carousel[] = get_post($post['value']);
    }
  }

  $swiper_params = '{';
  $swiper_params .= $attributes['slidesPerView'] ? '\'slidesPerView\': ' . $attributes['slidesPerView'] . ',' : '';
  $swiper_params .= $attributes['loop'] ? '\'loop\': true,' : '\'loop\': false,';
  $swiper_params .= $attributes['autoplay'] ? '\'autoplay\': true,' : '\'autoplay\': false,';
  $swiper_params .= $attributes['delay'] ? '\'delay\': ' . $attributes['delay'] . ',' : '';
  $swiper_params .= $attributes['speed'] ? '\'speed\': ' . $attributes['speed'] . ',' : '';
  $swiper_params .= $attributes['hasNavigation'] ? '\'navigation\': true,' : '\'navigation\': false,';
  $swiper_params .= $attributes['hasPagination'] ? '\'pagination\': true,' : '\'pagination\': false,';
  $swiper_params .= $attributes['paginationType'] ? '\'paginationType\': \'' . $attributes['paginationType'] . '\',' : '';
  $swiper_params .= $attributes['spaceBetween'] ? '\'spaceBetween\': ' . $attributes['spaceBetween'] . ',' : '';
  $swiper_params .= $attributes['effect'] ? '\'effect\': \'' . $attributes['effect'] . '\'' : '';
  $swiper_params .= '}';


  /**
   * Post Carousel Markup
   */
  $post_carousel_markup = '<div class="swiper" data-swiper="' . $swiper_params . '">';
  $post_carousel_markup .= '<div class="swiper-wrapper">';

  foreach ($post_carousel as $post) {
    $post_featured_image = '';
    if (isset($attributes['displayFeaturedImage']) && $attributes['displayFeaturedImage']) {
      // Reset $post_featured_image to prevent inheriting previous loop post's featured image when the current post doesn't have one.
      if (!empty($post_featured_image)) {
        unset($post_featured_image);
      }
      $image_size = $attributes['imageSize'];
      $featured_image = wp_get_attachment_image_src(get_post_thumbnail_id($post), 'full', false);

      $picture_classes = array();
      $picture_classes[] = $default_class_name . '__entry-picture';

      if ($attributes['aspectRatio']['small'] !== 'none') {
        $picture_classes[] = 'aspect-ratio-' . $attributes['aspectRatio']['small'] . '--sm';
      }
      if ($attributes['aspectRatio']['medium'] !== 'none' && $attributes['aspectRatio']['medium'] !== $attributes['aspectRatio']['small']) {
        $picture_classes[] = 'aspect-ratio-' . $attributes['aspectRatio']['medium'] . '--md';
      }
      if ($attributes['aspectRatio']['large'] !== 'none' && $attributes['aspectRatio']['large'] !== $attributes['aspectRatio']['medium']) {
        $picture_classes[] = 'aspect-ratio-' . $attributes['aspectRatio']['large'] . '--lg';
      }

      $picture_sources = array();
      if ($post->ID) {
        $image_sizes = array_reverse(array_keys($image_size));
        $i = 0;
        foreach ($image_sizes as $size) {
          if ($image_size[$size] !== 'none') {
            $picture_data = wp_get_attachment_image_src(get_post_thumbnail_id($post), $image_size[$size], false);
            if ($picture_sources && $size !== 'small') {
              $picture_sources[] =
                '<source class="' . $default_class_name . '__entry-image" media="(min-width: ' . get_option('fleximpleblocks_' . $image_sizes[$i + 1] . '_breakpoint_value') . 'px)" srcset="' . $picture_data[0] . '">';
            } else if ($picture_sources) {
              $picture_sources[] =
                '<source class="' . $default_class_name . '__entry-image" srcset="' . $picture_data[0] . '">';
            }
          }
          $i++;
        }
      }

      $image_source = !empty($featured_image) ? $featured_image[0] : FLEXIMPLEBLOCKS_PLUGIN_URL . 'assets/images/placeholder-image.svg';

      $post_featured_image = sprintf(
        '<picture class="%s">
          %s
          <img class="%s__entry-image" src="%s" alt="%s"/>
        </picture>',
        esc_attr(implode(' ', $picture_classes)),
        implode('', $picture_sources),
        $default_class_name,
        $image_source,
        esc_attr(get_the_title($post))
      );
    }

    /* Post Categories */
    $post_categories = '';
    if (isset($attributes['displayCategories']) && $attributes['displayCategories']) {
      $categories = get_the_category($post->id);
      $categories_links = '';

      foreach ($categories as $category) {
        $categories_links .= '<a class="' . $default_class_name . '__entry-category" href="' . esc_url(get_category_link($category->term_id)) . '" rel="category" data-category-slug="' . esc_html($category->slug) . '"><span class="screen-reader-only">' . __('Category:', 'fleximpleblocks') . '</span>' . esc_html($category->name) . '</a>';
      }

      $post_categories = sprintf(
        '<div class="%s__entry-categories">%s</div>',
        $default_class_name,
        $categories_links
      );
    }

    /* Post Title */
    $post_title = '';
    if (isset($attributes['displayTitle']) && $attributes['displayTitle']) {
      $post_kicker = get_post_meta($post->ID, 'kicker', true);
      $post_title = get_the_title($post);
      $tag_name = 'h' . $attributes['headingLevel'];
      if (!$post_title) {
        $post_title = __('(no title)', 'fleximpleblocks');
      }
      $post_title = sprintf(
        '<%s class="%s__entry-title">
          <a href="%s"' . (!empty($rel_attribute) ? ' rel="' . $rel_attribute . '"' : '') . ' data-link-name="article">
            %s<span class="%s__entry-headline">%s</span>
          </a>
        </%s>',
        $tag_name,
        $default_class_name,
        esc_url(get_permalink($post)),
        $post_kicker ? '<span class="' . $default_class_name . '__entry-kicker">' . esc_html($post_kicker) . '</span>' : '',
        $default_class_name,
        esc_html($post_title),
        $tag_name
      );
    }

    /* Post Author */
    $post_author = '';
    if (isset($attributes['displayAuthor']) && $attributes['displayAuthor']) {
      $post_author = sprintf(
        '<a href="%s" class="%s__entry-byline" rel="author"><span class="screen-reader-only">%s</span>%s</a>',
        esc_url(get_author_posts_url($post->post_author)),
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
        '<span class="%s__entry-comments">%s</span>',
        $default_class_name,
        $comments_number
      );
    }

    /* Post Excerpt */
    $post_excerpt = '';
    if (isset($attributes['displayExcerpt']) && $attributes['displayExcerpt']) {
      $excerpt = apply_filters('the_excerpt', get_post_field('post_excerpt', $post->id, 'raw'));
      if (!($excerpt)) {
        $excerpt = $post->post_content;
      }
      $trimmed_excerpt = esc_html(wp_trim_words($excerpt, $attributes['excerptLength'], '&hellip; '));

      $post_excerpt = sprintf(
        '<div class="%1$s__entry-excerpt">%2$s</div>',
        $default_class_name,
        $trimmed_excerpt
      );
    }

    /* Post Read more */
    $post_read_more = '';
    if (isset($attributes['displayReadMore']) && $attributes['displayReadMore']) {
      $post_read_more = $attributes['readMore'];
      $post_read_more = sprintf(
        '<a href="%s" class="%s__entry-read-more"' . (!empty($rel_attribute) ? ' rel="' . $rel_attribute . '"' : '') . ' data-link-name="article">%s</a>',
        esc_url(get_permalink($post)),
        $default_class_name,
        $post_read_more
      );
    }


    /**
     * Post Carousel Markup
     */
    $post_carousel_markup .= '<article id="post-' . $post->id . '"class="' . $default_class_name . '__entry swiper-slide">';
    foreach ($attributes['orderArticle'] as $article_fragment) {
      /* Post Media */
      if ('media' === $article_fragment && isset($attributes['displayMedia']) && $attributes['displayMedia']) {
        $post_carousel_markup .= '<div class="' . $default_class_name . '__entry-media">';
        foreach ($attributes['orderMedia'] as $media_fragment) {
          if ('featuredImage' === $media_fragment && $post_featured_image) {
            $post_carousel_markup .= $post_featured_image;
          }
        }
        $post_carousel_markup .= '</div>';
      }

      /* Post Content*/
      $content_classes = $default_class_name . '__entry-content';
      $content_classes .= $attributes['contentAlignment'] ? ' block-align-' . $attributes['contentAlignment'] : '';
      if ('content' === $article_fragment && isset($attributes['displayContent']) && $attributes['displayContent']) {
        $post_carousel_markup .= '<div class="' . $content_classes . '">';
        foreach ($attributes['orderContent'] as $content_fragment) {
          if ('categories' === $content_fragment && $post_categories) {
            $post_carousel_markup .= $post_categories;
          }
          if ('title' === $content_fragment && $post_title) {
            $post_carousel_markup .= $post_title;
          }
          if ('meta' === $content_fragment && isset($attributes['displayMeta']) && $attributes['displayMeta']) {
            $post_carousel_markup .= '<div class="' . $default_class_name . '__entry-meta">';
            foreach ($attributes['orderMeta'] as $meta_fragment) {
              if ('author' === $meta_fragment && $post_author) {
                $post_carousel_markup .= $post_author;
              }
              if ('date' === $meta_fragment && $post_date) {
                $post_carousel_markup .= $post_date;
              }
              if ('comments' === $meta_fragment && $post_comments) {
                $post_carousel_markup .= $post_comments;
              }
            }
            $post_carousel_markup .= '</div>';
          }
          if ('excerpt' === $content_fragment && $post_excerpt) {
            $post_carousel_markup .= $post_excerpt;
          }
          if ('readMore' === $content_fragment && $post_read_more) {
            $post_carousel_markup .= $post_read_more;
          }
        }
        $post_carousel_markup .= '</div>'; // .fleximple-block-post-carousel__entry-content
      }
    }
    $post_carousel_markup .= '<a class="' . $default_class_name . '__entry-link-overlay" href="' . esc_url(get_permalink($post)) . '"' . (!empty($rel_attribute) ? ' rel="' . $rel_attribute . '"' : '') . ' data-link-name="article" tabindex="-1" aria-hidden="true">' . get_the_title($post) . '</a>';
    $post_carousel_markup .= '</article>';
  }

  $post_carousel_markup .= '</div>'; // .swiper-wrapper

  $post_carousel_markup .= '<div class="swiper-pagination"></div>';

  $button_prev_styles = isset($attributes['buttonIconSize']) ? 'font-size:' . $attributes['buttonIconSize'] . 'px;' : '';
  $button_prev_styles .= isset($attributes['customButtonIconColor']) ? 'color:' . $attributes['customButtonIconColor'] . ';' : '';
  $button_next_classes = isset($attributes['buttonIconColor']) || isset($attributes['customButtonIconColor']) ? ' has-text-color' : '';
  $button_prev_classes = isset($attributes['buttonIconColor']) ? ' has-' . $attributes['buttonIconColor'] . '-color' : '';
  $post_carousel_markup .= '<button class="swiper-button-prev' . $button_prev_classes . '" style="' . $button_prev_styles . '" tabindex="0" role="button" aria-label="' . __('Previous slide', 'fleximpleblocks') . '">
  <span class="screen-reader-only">' . __('Previous slide', 'fleximpleblocks') . '</span>
  <i class="' . $attributes['buttonPrevIcon'] . '" aria-hidden="true"></i>
  </button>';
  $button_next_styles = isset($attributes['buttonIconSize']) ? 'font-size:' . $attributes['buttonIconSize'] . 'px;' : '';
  $button_next_styles .= isset($attributes['customButtonIconColor']) ? 'color:' . $attributes['customButtonIconColor'] . ';' : '';
  $button_next_classes = isset($attributes['buttonIconColor']) || isset($attributes['customButtonIconColor']) ? ' has-text-color' : '';
  $button_next_classes .= isset($attributes['buttonIconColor']) ? ' has-' . $attributes['buttonIconColor'] . '-color' : '';
  $post_carousel_markup .= '<button class="swiper-button-next' . $button_next_classes . '" style="' . $button_next_styles . '" tabindex="0" role="button" aria-label="' . __('Next slide', 'fleximpleblocks') . '">
    <span class="screen-reader-only">' . __('Next slide', 'fleximpleblocks') . '</span>
    <i class="' . $attributes['buttonNextIcon'] . '" aria-hidden="true"></i>
  </button>';

  $post_carousel_markup .= '</div>'; // .swiper-container

  if (isset($attributes['align']) && $attributes['align']) {
    $classes .= ' align' . $attributes['align'];
  }

  $internal_styles = '<style>';
  if (isset($attributes['aspectRatio'])) {
    if ($attributes['aspectRatio']['small'] !== 'none') {
      $aspect_ratio_small_array = preg_split("/-/", $attributes['aspectRatio']['small']);
      $internal_styles .= '.' . $default_class_name . '__entry-picture.aspect-ratio-' . $attributes['aspectRatio']['small'] . '--sm {
        padding-bottom: ' . $aspect_ratio_small_array[1] * 100 / $aspect_ratio_small_array[0] . '%;
      }';
    }
  }
  if (isset($attributes['aspectRatio'])) {
    $internal_styles .= '@media only screen and (min-width: ' . get_option('fleximpleblocks_medium_breakpoint_value') . 'px) { ';
    if ($attributes['aspectRatio']['medium'] !== 'none') {
      $aspect_ratio_medium_array = preg_split("/-/", $attributes['aspectRatio']['medium']);
      $internal_styles .= '@media only screen and (min-width: ' . get_option('fleximpleblocks_small_breakpoint_value') . 'px) {
        .' . $default_class_name . '__entry-picture.aspect-ratio-' . $attributes['aspectRatio']['medium'] . '--md {
          padding-bottom: ' . $aspect_ratio_medium_array[1] * 100 / $aspect_ratio_medium_array[0] . '%;
        }
      }';
    }
    $internal_styles .= ' }';
  }
  if (isset($attributes['aspectRatio'])) {
    $internal_styles .= '@media only screen and (min-width: ' . get_option('fleximpleblocks_large_breakpoint_value') . 'px) { ';
    if ($attributes['aspectRatio']['large'] !== 'none') {
      $aspect_ratio_large_array = preg_split("/-/", $attributes['aspectRatio']['large']);
      $internal_styles .= '@media only screen and (min-width: ' . get_option('fleximpleblocks_medium_breakpoint_value') . 'px) {
        .' . $default_class_name . '__entry-picture.aspect-ratio-' . $attributes['aspectRatio']['large'] . '--lg {
          padding-bottom: ' . $aspect_ratio_large_array[1] * 100 / $aspect_ratio_large_array[0] . '%;
        }
      }';
    }
    $internal_styles .= ' }';
  }
  $internal_styles .= '</style>';

  $block_content = sprintf(
    '<div class="%s%s">
      %s
      %s
    </div>',
    !empty($class_name) ? esc_attr($class_name) : '',
    !empty($classes) ? ' ' . esc_attr($classes) : '',
    $internal_styles,
    $post_carousel_markup
  );

  return $block_content;
}

/**
 * Registers the `fleximple-block/post-carousel` block.
 */
if (!function_exists('fleximpleblocks_register_post_carousel_block')) {
  function fleximpleblocks_register_post_carousel_block()
  {
    // Return early if this function does not exist.
    if (!function_exists('register_block_type_from_metadata')) {
      return;
    }

    register_block_type_from_metadata(
      __DIR__,
      array(
        'render_callback'  => 'fleximpleblocks_render_post_carousel_block',
      )
    );
  }
  add_action('init', 'fleximpleblocks_register_post_carousel_block');
}
