<?php
/**
 * Server-side rendering of the `fleximple-block/recent-posts` block.
 *
 * @package Fleximpe Blocks
 */

/**
 * Renders the `fleximple-block/recent-posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function fleximpleblocks_render_recent_posts_block( $attributes ) {
	$args = array(
		'posts_per_page'	=> $attributes['postsToShow'],
		'offset'			=> $attributes['offset'],
		'post_status'		=> 'publish',
		'order'				=> $attributes['order'],
		'orderby'			=> $attributes['orderBy'],
		'suppress_filters'	=> false,
	);

	if ( isset( $attributes['categories'] ) ) {
		$args['category__in'] = array_column( $attributes['categories'], 'value' );
	}

	if ( isset( $attributes['excludedCategories'] ) ) {
		$args['category__not_in'] = array_column( $attributes['excludedCategories'], 'value' );
	}

	$default_class_name = 'fleximple-block-recent-posts';
	$class_name = $attributes['className'];
	$classes = 'fleximple-block-recent-posts';

	$recent_posts = get_posts( $args );
	$rel_attribute = trim( ( $attributes['noFollow'] ? 'nofollow' : null ) .' '. ( $attributes['noReferrer'] ? 'noreferrer' : null ) );

	if ( isset( $attributes['selectedPosts'] ) ) {
		$recent_posts = array();
		foreach ( $attributes['selectedPosts'] as $post ) {
			$recent_posts[] = get_post( $post['value'] );
		}
	}


	/**
	 * Recent Posts Markup
	 */
	$recent_posts_markup = ''; // It is important to initiate it here so nothing will be overridden inside the following loop.

	foreach ( $recent_posts as $post ) {
		/* Post Featured Image */
		$post_featured_image = '';
		if ( isset( $attributes['displayFeaturedImage'] ) && $attributes['displayFeaturedImage'] ) {
			// Reset $post_featured_image to prevent inheriting previous loop post's featured image when the current post doesn't have one.
			if ( ! empty( $post_featured_image ) ) { unset( $post_featured_image ); }
			$image_size = $attributes['imageSize'];
			$featured_image = wp_get_attachment_image_src( get_post_thumbnail_id( $post ), 'full', false );

			$picture_classes = array();
			$picture_classes[] = $default_class_name .'__entry-picture';

			if ( $attributes['aspectRatio']['small'] !== 'none' ) {
				$picture_classes[] = 'aspect-ratio-'. $attributes['aspectRatio']['small'] .'--sm';
			}
			if ( $attributes['aspectRatio']['medium'] !== 'none' && $attributes['aspectRatio']['medium'] !== $attributes['aspectRatio']['small'] ) {
				$picture_classes[] = 'aspect-ratio-'. $attributes['aspectRatio']['medium'] .'--md';
			}
			if ( $attributes['aspectRatio']['large'] !== 'none' && $attributes['aspectRatio']['large'] !== $attributes['aspectRatio']['medium'] ) {
				$picture_classes[] = 'aspect-ratio-'. $attributes['aspectRatio']['large'] .'--lg';
			}

			$picture_sources = array();
			if ( $post->ID ) {
				$image_sizes = array_reverse( array_keys( $image_size ) );
				$i = 0;
				foreach ( $image_sizes as $size ) {
					if ( $image_size[ $size ] !== 'none' ) {
						$picture_data = wp_get_attachment_image_src( get_post_thumbnail_id( $post ), $image_size[ $size ], false );
						if ( $picture_sources && $size !== 'small' ) {
							$picture_sources[] =
							'<source class="'. $default_class_name .'__entry-image" media="(min-width: '. get_option( 'fleximpleblocks_'. $image_sizes[ $i + 1 ] .'_breakpoint_value' ) .'px)" srcset="'. $picture_data[0] .'">';
						} else if ( $picture_sources ) {
							$picture_sources[] =
								'<source class="'. $default_class_name .'__entry-image" srcset="'. $picture_data[0] .'">';
						}
					}
					$i++;
				}
			}

			$image_source = ! empty( $featured_image ) ? $featured_image[0] : FLEXIMPLEBLOCKS_PLUGIN_URL .'assets/images/placeholder-image.svg';

			$post_featured_image = sprintf(
				'<a href="%s"%s data-link-name="article" tabindex="-1" aria-hidden="true">
					<picture class="%s">
						%s
						<img class="%s__entry-image" src="%s" alt="%s"/>
					</picture>
				</a>',
				esc_url( get_permalink( $post ) ),
				( ! empty( $rel_attribute ) ? ' rel="'. $rel_attribute .'"' : '' ),
				esc_attr( implode( ' ', $picture_classes ) ),
				implode( '', $picture_sources ),
				$default_class_name,
				$image_source,
				esc_attr( get_the_title( $post ) )
			);
		}

		/* Post Categories */
		$post_categories = '';
		if ( isset( $attributes['displayCategories'] ) && $attributes['displayCategories'] ) {
			$categories = get_the_category( $post );
			$categories_links = '';

			foreach ( $categories as $category ) {
				$categories_links .= '<a class="'. $default_class_name .'__entry-category" href="'. esc_url( get_category_link( $category->term_id ) ) .'" rel="category" data-category-slug="'. esc_html( $category->slug ) .'"><span class="screen-reader-only">'. __( 'Category:', 'fleximpleblocks' ) .'</span>'. esc_html( $category->name ) .'</a>';
			}

			$post_categories = sprintf(
				'<div class="%s__entry-categories">%s</div>',
				$default_class_name,
				$categories_links
			);
		}

		/* Post Title */
		$post_title = '';
		if ( isset( $attributes['displayTitle'] ) && $attributes['displayTitle'] ) {
			$post_kicker = get_post_meta( $post->ID, 'kicker', true );
			$post_title = get_the_title( $post );
			$tag_name = 'h'. $attributes['headingLevel'];
			if ( ! $post_title ) {
				$post_title = __( '(no title)', 'fleximpleblocks' );
			}

			$post_title = sprintf(
				'<%s class="%s__entry-title">
					<a href="%s"'. ( ! empty( $rel_attribute ) ? ' rel="'. $rel_attribute .'"' : '' ) .' data-link-name="article">
						%s<span class="%s__entry-headline">%s</span>
					</a>
				</%s>',
				$tag_name,
				$default_class_name,
				esc_url( get_permalink( $post ) ),
				$post_kicker ? '<span class="'. $default_class_name .'__entry-kicker">'. esc_html( $post_kicker ) .'</span>' : '',
				$default_class_name,
				esc_html( $post_title ),
				$tag_name
			);
		}

		/* Post Author */
		$post_author = '';
		if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
			$post_author = sprintf(
				'<a href="%s" class="%s__entry-byline" rel="author"><span class="screen-reader-only">%s</span>%s</a>',
				esc_url( get_author_posts_url( $post->post_author ) ),
				$default_class_name,
				__( 'Published by:', 'fleximpleblocks' ),
				esc_html( get_the_author_meta( 'display_name', $post->post_author ) )
			);
		}

		/* Post Date */
		$post_date = '';
		if ( isset( $attributes['displayDate'] ) && $attributes['displayDate'] ) {
			$post_date = sprintf(
				'<time datetime="%s" class="%s__date"><span class="screen-reader-only">%s</span>%s</time>',
				esc_attr( get_the_date( 'c', $post ) ),
				$default_class_name,
				__( 'Published on:', 'fleximpleblocks' ),
				esc_html( get_the_date( '', $post ) )
			);
		}

		/* Post Comments */
		$post_excerpt = '';
		if ( ! empty( $attributes['displayComments'] ) ) {
			$comments_number = get_comments_number( $post );
			$comments_number = sprintf( _n( '%d comment', '%d comments', $comments_number, 'fleximpleblocks' ), $comments_number );

			$post_comments = sprintf(
				'<span class="%s__entry-comments">%s</span>',
				$default_class_name,
				$comments_number
			);
		}

		/* Post Excerpt */
		$post_excerpt = '';
		if ( isset( $attributes['displayExcerpt'] ) && $attributes['displayExcerpt'] ) {
			$excerpt = apply_filters( 'the_excerpt', get_post_field( 'post_excerpt', $post->ID, 'raw' ) );
			if ( ! ( $excerpt ) ) { $excerpt = $post->post_content; }
			$trimmed_excerpt = esc_html( wp_trim_words( $excerpt, $attributes['excerptLength'], '&hellip; ' ) );

			$post_excerpt = sprintf(
				'<div class="%1$s__entry-excerpt">%2$s</div>',
				$default_class_name,
				$trimmed_excerpt
			);
		}

		/* Post Read more */
		$post_read_more = '';
		if ( isset( $attributes['displayReadMore'] ) && $attributes['displayReadMore'] ) {
			$post_read_more = $attributes['readMore'];
			$post_read_more = sprintf(
				'<a href="%s" class="%s__entry-read-more"'. ( ! empty( $rel_attribute ) ? ' rel="'. $rel_attribute .'"' : '' ) .' data-link-name="article">%s</a>',
				esc_url( get_permalink( $post ) ),
				$default_class_name,
				$post_read_more
			);
		}


		$recent_posts_markup .= '<article id="post-'. $post->ID .'"class="'. $default_class_name .'__entry">';
		foreach ( $attributes['orderArticle'] as $article_fragment ) {
			if ( 'media' === $article_fragment && isset( $attributes['displayMedia'] ) && $attributes['displayMedia'] ) {
				$recent_posts_markup .= '<div class="'. $default_class_name .'__entry-media"'. ( $attributes['layout'] === 'list' && $attributes['imageWidth'] ? ' style="width:'. $attributes['imageWidth'] . '%"' : '' ) .'>';
				foreach ( $attributes['orderMedia'] as $media_fragment ) {
					if ( 'featuredImage' === $media_fragment && $post_featured_image) {
						$recent_posts_markup .= $post_featured_image;
					}
				}
				$recent_posts_markup .= '</div>';
			}

			if ( 'content' === $article_fragment && isset( $attributes['displayContent'] ) && $attributes['displayContent'] ) {
				$recent_posts_markup .= '<div class="'. $default_class_name .'__entry-content">';
				foreach ( $attributes['orderContent'] as $content_fragment ) {
					if ( 'categories' === $content_fragment && $post_categories ) { $recent_posts_markup .= $post_categories; }
					if ( 'title' === $content_fragment && $post_title ) { $recent_posts_markup .= $post_title; }
					if ( 'meta' === $content_fragment && isset( $attributes['displayMeta'] ) && $attributes['displayMeta'] ) {
						$recent_posts_markup .= '<div class="'. $default_class_name .'__entry-meta">';
						foreach ( $attributes['orderMeta'] as $meta_fragment ) {
							if ( 'author' === $meta_fragment && $post_author ) { $recent_posts_markup .= $post_author; }
							if ( 'date' === $meta_fragment && $post_date ) { $recent_posts_markup .= $post_date; }
							if ( 'comments' === $meta_fragment && $post_comments ) { $recent_posts_markup .= $post_comments; }
						}
						$recent_posts_markup .= '</div>';
					}
					if ( 'excerpt' === $content_fragment && $post_excerpt ) { $recent_posts_markup .= $post_excerpt; }
					if ( 'readMore' === $content_fragment && $post_read_more ) { $recent_posts_markup .= $post_read_more; }
				}
				$recent_posts_markup .= '</div>';
			}
		}
		$recent_posts_markup .= '<a class="'. $default_class_name .'__entry-link-overlay" href="'. esc_url( get_permalink( $post ) ) .'"'. ( ! empty( $rel_attribute ) ? ' rel="'. $rel_attribute .'"' : '' ) .' data-link-name="article" tabindex="-1" aria-hidden="true">'. get_the_title( $post ) .'</a>';
		$recent_posts_markup .= '</article>';
	}

	if ( isset( $attributes['layout'] ) ) { $classes .= ' '. $default_class_name .'--'. $attributes['layout']; }
	if ( isset( $attributes['columns']['small'] ) ) { $classes .= ' col-'. $attributes['columns']['small'] .'--sm'; }
	if ( isset( $attributes['columns']['medium'] ) ) { $classes .= ' col-'. $attributes['columns']['medium'] .'--md'; }
	if ( isset( $attributes['columns']['large'] ) ) { $classes .= ' col-'. $attributes['columns']['large'] .'--lg'; }
	if ( isset( $attributes['gapRow']['small']['value'] ) ) { $classes .= ' gap-row-'. $attributes['gapRow']['small']['value'] . ( $attributes['gapRow']['small']['unit'] === '%' ? 'pct' : $attributes['gapRow']['small']['unit'] ) .'--sm'; }
	if ( isset( $attributes['gapRow']['medium']['value'] ) ) { $classes .= ' gap-row-'. $attributes['gapRow']['medium']['value'] . ( $attributes['gapRow']['medium']['unit'] === '%' ? 'pct' : $attributes['gapRow']['medium']['unit'] ) .'--md'; }
	if ( isset( $attributes['gapRow']['large']['value'] ) ) { $classes .= ' gap-row-'. $attributes['gapRow']['large']['value'] . ( $attributes['gapRow']['large']['unit'] === '%' ? 'pct' : $attributes['gapRow']['large']['unit'] ) .'--lg'; }
	if ( isset( $attributes['gapColumn']['small']['value'] ) ) { $classes .= ' gap-column-'. $attributes['gapColumn']['small']['value'] . ( $attributes['gapColumn']['small']['unit'] === '%' ? 'pct' : $attributes['gapColumn']['small']['unit'] ) .'--sm'; }
	if ( isset( $attributes['gapColumn']['medium']['value'] ) ) { $classes .= ' gap-column-'. $attributes['gapColumn']['medium']['value'] . ( $attributes['gapColumn']['medium']['unit'] === '%' ? 'pct' : $attributes['gapColumn']['medium']['unit'] ) .'--md'; }
	if ( isset( $attributes['gapColumn']['large']['value'] ) ) { $classes .= ' gap-column-'. $attributes['gapColumn']['large']['value'] . ( $attributes['gapColumn']['large']['unit'] === '%' ? 'pct' : $attributes['gapColumn']['large']['unit'] ) .'--lg'; }

	if ( isset( $attributes['align'] ) && $attributes['align'] ) {
		$classes .= ' align'. $attributes['align'];
	}

	$internal_styles = '<style>';
	if ( isset( $attributes['columns']['small'] ) || isset( $attributes['aspectRatio'] ) ) {
		if ( isset( $attributes['layout'] ) && 'list' === $attributes['layout'] ) {
			$internal_styles .= '.'. $default_class_name .'.gap-row-'. $attributes['gapRow']['small']['value'] . ( $attributes['gapRow']['small']['unit'] === '%' ? 'pct' : $attributes['gapRow']['small']['unit'] ) .'--sm .'. $default_class_name .'__entry { margin-bottom:'. $attributes['gapRow']['small']['value'] . $attributes['gapRow']['small']['unit'] .'; }';
		}
		if ( isset( $attributes['layout'] ) && 'grid' === $attributes['layout'] ) {
			$internal_styles .= '.'. $default_class_name .'.gap-row-'. $attributes['gapRow']['small']['value'] . ( $attributes['gapRow']['small']['unit'] === '%' ? 'pct' : $attributes['gapRow']['small']['unit'] ) .'--sm { grid-row-gap:'. $attributes['gapRow']['small']['value'] . $attributes['gapRow']['small']['unit'] .'; }';
			$internal_styles .= '.'. $default_class_name .'.gap-column-'. $attributes['gapColumn']['small']['value'] . ( $attributes['gapColumn']['small']['unit'] === '%' ? 'pct' : $attributes['gapColumn']['small']['unit'] ) .'--sm { grid-column-gap:'. $attributes['gapColumn']['small']['value'] . $attributes['gapRow']['small']['unit'] .'; }';
		}
		if ( $attributes['aspectRatio']['small'] !== 'none' ) {
			$aspect_ratio_small_array = preg_split( "/-/", $attributes['aspectRatio']['small'] );
			$internal_styles .= '.'. $default_class_name .'__entry-picture.aspect-ratio-'. $attributes['aspectRatio']['small'] .'--sm {
				padding-bottom: '. $aspect_ratio_small_array[1] * 100 / $aspect_ratio_small_array[0] .'%;
			}';
		}
	}
	if ( isset( $attributes['columns']['medium'] ) || isset( $attributes['aspectRatio'] ) ) {
		$internal_styles .= '@media only screen and (min-width: '. get_option( 'fleximpleblocks_medium_breakpoint_value' ) .'px) { ';
		if ( isset( $attributes['layout'] ) && 'list' === $attributes['layout'] ) {
			$internal_styles .= '.'. $default_class_name .'.gap-row-'. $attributes['gapRow']['medium']['value'] . ( $attributes['gapRow']['medium']['unit'] === '%' ? 'pct' : $attributes['gapRow']['medium']['unit'] ) .'--md .'. $default_class_name .'__entry { margin-bottom:'. $attributes['gapRow']['medium']['value'] . $attributes['gapRow']['medium']['unit'] .'; }';
		}
		if ( isset( $attributes['layout'] ) && 'grid' === $attributes['layout'] ) {
			$internal_styles .= '.'. $default_class_name .'.gap-row-'. $attributes['gapRow']['medium']['value'] . ( $attributes['gapRow']['medium']['unit'] === '%' ? 'pct' : $attributes['gapRow']['medium']['unit'] ) .'--md { grid-row-gap:'. $attributes['gapRow']['medium']['value'] . $attributes['gapRow']['medium']['unit'] .'; }';
			$internal_styles .= '.'. $default_class_name .'.gap-column-'. $attributes['gapColumn']['medium']['value'] . ( $attributes['gapColumn']['medium']['unit'] === '%' ? 'pct' : $attributes['gapColumn']['medium']['unit'] ) .'--md { grid-column-gap:'. $attributes['gapColumn']['medium']['value'] . $attributes['gapColumn']['medium']['unit'] .'; }';
		}
		if ( $attributes['aspectRatio']['medium'] !== 'none' ) {
			$aspect_ratio_medium_array = preg_split( "/-/", $attributes['aspectRatio']['medium'] );
			$internal_styles .= '@media only screen and (min-width: '. get_option('fleximpleblocks_small_breakpoint_value') .'px) {
				.'. $default_class_name .'__entry-picture.aspect-ratio-'. $attributes['aspectRatio']['medium'] .'--md {
					padding-bottom: '. $aspect_ratio_medium_array[1] * 100 / $aspect_ratio_medium_array[0] .'%;
				}
			}';
		} 
		$internal_styles .= ' }';
	}
	if ( isset( $attributes['columns']['large'] ) && isset( $attributes['aspectRatio'] ) ) {
		$internal_styles .= '@media only screen and (min-width: '. get_option( 'fleximpleblocks_large_breakpoint_value' ) .'px) { ';
		if ( isset( $attributes['layout'] ) && 'list' === $attributes['layout'] ) {
			$internal_styles .= '.'. $default_class_name .'.gap-row-'. $attributes['gapRow']['large']['value'] . ( $attributes['gapRow']['large']['unit'] === '%' ? 'pct' : $attributes['gapRow']['large']['unit'] ) .'--lg .'. $default_class_name .'__entry { margin-bottom:'. $attributes['gapRow']['large']['value'] . $attributes['gapRow']['large']['unit'] .'; }';
		}
		if ( isset( $attributes['layout'] ) && 'grid' === $attributes['layout'] ) {
			$internal_styles .= '.'. $default_class_name .'.gap-row-'. $attributes['gapRow']['large']['value'] . ( $attributes['gapRow']['large']['unit'] === '%' ? 'pct' : $attributes['gapRow']['large']['unit'] ) .'--lg { grid-row-gap:'. $attributes['gapRow']['large']['value'] . $attributes['gapRow']['large']['unit'] .'; }';
			$internal_styles .= '.'. $default_class_name .'.gap-column-'. $attributes['gapColumn']['large']['value'] . ( $attributes['gapColumn']['large']['unit'] === '%' ? 'pct' : $attributes['gapColumn']['large']['unit'] ) .'--lg { grid-column-gap:'. $attributes['gapColumn']['large']['value'] . $attributes['gapColumn']['large']['unit'] .'; }';
		}
		if ( $attributes['aspectRatio']['large'] !== 'none' ) {
			$aspect_ratio_large_array = preg_split( "/-/", $attributes['aspectRatio']['large'] );
			$internal_styles .= '@media only screen and (min-width: '. get_option('fleximpleblocks_medium_breakpoint_value') .'px) {
				.'. $default_class_name .'__entry-picture.aspect-ratio-'. $attributes['aspectRatio']['large'] .'--lg {
					padding-bottom: '. $aspect_ratio_large_array[1] * 100 / $aspect_ratio_large_array[0] .'%;
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
		! empty ( $class_name ) ? esc_attr( $class_name ) : '',
		! empty ( $classes ) ? ' '. esc_attr( $classes ) : '',
		! empty ( $internal_styles ) ? $internal_styles : '',
		$recent_posts_markup
	);

	return $block_content;
}

/**
 * Registers the `fleximple-block/recent-posts` block.
 */
if ( ! function_exists( 'fleximpleblocks_register_recent_posts_block' ) ) {
	function fleximpleblocks_register_recent_posts_block() {
		// Return early if this function does not exist.
		if ( ! function_exists( 'register_block_type_from_metadata' ) ) {
			return;
		}

		register_block_type_from_metadata(
			__DIR__,
			array(
				'render_callback'	=> 'fleximpleblocks_render_recent_posts_block',
			)
		);
	}
	add_action( 'init', 'fleximpleblocks_register_recent_posts_block' );
}