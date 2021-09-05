<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package Fleximple Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg admin assets for the backend.
 */
function fleximpleblocks_enqueue_admin_assets() {
	// Admin Scripts.
	wp_enqueue_script(
		'fleximpleblocks-admin-scripts',
		plugins_url( 'dist/admin-script.js', dirname( __FILE__ ) ),
		array( 'wp-api', 'wp-i18n', 'wp-components', 'wp-element' ),
		date( 'Ymd.His', filemtime( FLEXIMPLEBLOCKS_PLUGIN_DIR . 'dist/admin-script.js' ) ),
		true
	);

	// Admin Styles.
	wp_enqueue_style(
		'fleximpleblocks-admin-styles',
		plugins_url( 'dist/editor-style.css', dirname( __FILE__ ) ),
		array( 'wp-components' ),
		date( 'Ymd.His', filemtime( FLEXIMPLEBLOCKS_PLUGIN_DIR . 'dist/editor-style.css' ) )
	);
}

/**
 * Register Fleximple Blocks page and subpages.
 */
function fleximpleblocks_register_settings_page() {
	// Main page.
	$page_hook_suffix = add_menu_page(
		__( 'Fleximple Blocks', 'fleximpleblocks' ), // Page Title.
		__( 'Fleximple Blocks', 'fleximpleblocks' ), // Menu Title.
		'edit_posts', // Capability.
		'fleximpleblocks-settings', // Menu slug.
		'fleximpleblocks_settings_template', // Action.
		'dashicons-screenoptions', // Icon URL.
		110 // Position.
	);

	// Settings page.
	add_submenu_page(
		'fleximpleblocks', // Parent slug.
		__( 'Settings', 'fleximpleblocks' ), // Page title.
		__( 'Settings', 'fleximpleblocks' ), // Menu title.
		'manage_options', // Capability.
		'fleximpleblocks-settings', // Menu slug.
		'fleximpleblocks_settings_template', // Callback function.
		1 // Position.
	);

	add_action( 'admin_print_scripts-'. $page_hook_suffix , 'fleximpleblocks_enqueue_admin_assets' );
}
add_action( 'admin_menu', 'fleximpleblocks_register_settings_page', 10 );

function fleximpleblocks_settings_template() {
	echo '<div id="fleximple-blocks-settings-page"></div>';
}

function fleximpleblocks_register_settings() {
	register_setting(
		'fleximpleblocks_settings',
		'fleximpleblocks_small_breakpoint_value',
		array(
			'type'			=> 'number',
			'description' 	=> __( 'Small breakpoint value.', 'fleximpleblocks' ),
			'show_in_rest'	=> true,
			'default'		=> 480
		)
	);

	register_setting(
		'fleximpleblocks_settings',
		'fleximpleblocks_medium_breakpoint_value',
		array(
			'type'			=> 'number',
			'description' 	=> __( 'Medium breakpoint value.', 'fleximpleblocks' ),
			'show_in_rest'	=> true,
			'default'		=> 720
		)
	);

	register_setting(
		'fleximpleblocks_settings',
		'fleximpleblocks_large_breakpoint_value',
		array(
			'type'			=> 'number',
			'description' 	=> __( 'Large breakpoint value.', 'fleximpleblocks' ),
			'show_in_rest'	=> true,
			'default'		=> 910
		)
	);

	register_setting(
		'fleximpleblocks_settings',
		'fleximpleblocks_xlarge_breakpoint_value',
		array(
			'type'			=> 'number',
			'description' 	=> __( 'Extra large breakpoint value.', 'fleximpleblocks' ),
			'show_in_rest'	=> true,
			'default'		=> 1280
		)
	);

	register_setting(
		'fleximpleblocks_settings',
		'fleximpleblocks_is_font_awesome_active',
		array(
			'type'			=> 'boolean',
			'description' 	=> __( 'Load Font Awesome.', 'fleximpleblocks' ),
			'show_in_rest'	=> true,
			'default'		=> true
		)
	);

	register_setting(
		'fleximpleblocks_settings',
		'fleximpleblocks_is_leaflet_active',
		array(
			'type'			=> 'boolean',
			'description' 	=> __( 'Load Leaflet.', 'fleximpleblocks' ),
			'show_in_rest'	=> true,
			'default'		=> true
		)
	);

	register_setting(
		'fleximpleblocks_settings',
		'fleximpleblocks_is_swiper_active',
		array(
			'type'			=> 'boolean',
			'description' 	=> __( 'Load Swiper.', 'fleximpleblocks' ),
			'show_in_rest'	=> true,
			'default'		=> true
		)
	);

	register_setting(
		'fleximpleblocks_settings',
		'fleximpleblocks_open_weather_api_key',
		array(
			'type'			=> 'string',
			'description' 	=> __( 'Open Weather API key.', 'fleximpleblocks' ),
			'show_in_rest'	=> true,
			'default'		=> ''
		)
	);
}
add_action( 'init', 'fleximpleblocks_register_settings' );


/**
 * Register links in the WP plugins page
 */
function fleximpleblocks_plugin_links( $links ) {
	// Create the link.
	$settings_link = '<a href="admin.php?page=fleximpleblocks-settings">' . __( 'Settings', 'fleximpleblocks' ) . '</a>';

	// Adds the link to the end of the array.
	array_unshift(
		$links,
		$settings_link
	);
	return $links;
}
add_filter( 'plugin_action_links_'. FLEXIMPLEBLOCKS_PLUGIN_BASE, 'fleximpleblocks_plugin_links' );

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 */
function fleximpleblocks_enqueue_styles() {
	// Front-end Styles.
	wp_enqueue_style(
		'fleximpleblocks-styles',
		plugins_url( 'dist/style.css', dirname( __FILE__ ) ),
		array(),
		date( 'Ymd.His', filemtime( FLEXIMPLEBLOCKS_PLUGIN_DIR . 'dist/style.css' ) )
	);

	if ( get_option( 'fleximpleblocks_is_font_awesome_active' ) ) {
		// Font Awesome Styles.
		wp_enqueue_style(
			'fleximpleblocks-font-awesome-styles',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
			array(),
			'5.15.3'
		);
	}

	if ( get_option( 'fleximpleblocks_is_leaflet_active' ) ) {
		// Leaflet Styles.
		wp_enqueue_style(
			'fleximpleblocks-leaflet-styles',
			'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css',
			false,
			'1.7.1',
			'all'
		);
		// Leaflet Scripts
		wp_enqueue_script(
			'fleximpleblocks-leaflet-scripts',
			'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.js',
			array(),
			'1.7.1',
			true
		);
	}

	if ( get_option( 'fleximpleblocks_is_swiper_active' ) ) {
		// Swiper Styles.
		wp_enqueue_style(
			'fleximpleblocks-swiper-styles',
			'https://cdn.jsdelivr.net/npm/swiper@7.0.3/swiper-bundle.min.css',
			false,
			'7.0.3',
			'all'
		);
		// Swiper Scripts
		wp_enqueue_script(
			'fleximpleblocks-swiper-scripts',
			'https://cdn.jsdelivr.net/npm/swiper@7.0.3/swiper-bundle.js',
			array(),
			'7.0.3',
			true
		);
	}

	if ( get_option( 'fleximpleblocks_open_weather_api_key' ) ) {
		// Weather Icons Styles.
		wp_enqueue_style(
			'fleximpleblocks-weather-icons-styles',
			'https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.10/css/weather-icons.min.css',
			false,
			'2.0.10',
			'all'
		);
	}
}
add_action( 'enqueue_block_assets', 'fleximpleblocks_enqueue_styles', 10 );


/**
 * Defer loading of stylesheet.
 */
function fleximpleblocks_defer_css( $html, $handle ) {
    $deferred_stylesheets = apply_filters( 'fleximpleblocks_deferred_stylesheets', array() );

    if ( in_array( $handle, $deferred_stylesheets, true ) ) {
        return str_replace( 'media=\'all\'', 'media="print" onload="this.media=\'all\'"', $html );
    } else {
        return $html;
    }
}
add_filter( 'style_loader_tag', 'fleximpleblocks_defer_css', 10, 2 );

add_filter( 'fleximpleblocks_deferred_stylesheets', function( $handles ) {
    $handles[] = 'fleximpleblocks-font-awesome-styles';
    $handles[] = 'fleximpleblocks-leaflet-styles';
    $handles[] = 'fleximpleblocks-swiper-styles';
    $handles[] = 'fleximpleblocks-weather-icons-styles';
    return $handles;
}, 10, 1 );


/**
 * Enqueue Gutenberg block assets for frontend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function fleximpleblocks_enqueue_scripts() {
	// Front-end Scripts
	wp_enqueue_script(
		'fleximple-frontend-scripts',
		plugins_url( 'dist/frontend-script.js', dirname( __FILE__ ) ),
		array(),
		date( 'Ymd.His', filemtime( FLEXIMPLEBLOCKS_PLUGIN_DIR . 'dist/frontend-script.js' ) ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'fleximpleblocks_enqueue_scripts', 10 );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function fleximpleblocks_enqueue_editor_assets() {
	// Scripts
	wp_enqueue_script(
		'fleximpleblocks-editor-scripts',
		plugins_url( 'dist/index.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components' ),
		date( 'Ymd.His', filemtime( FLEXIMPLEBLOCKS_PLUGIN_DIR . 'dist/index.js' ) ),
		true
	);

	// Styles
	wp_enqueue_style(
		'fleximpleblocks-editor-styles',
		plugins_url( 'dist/editor-style.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		date( 'Ymd.His', filemtime( FLEXIMPLEBLOCKS_PLUGIN_DIR . 'dist/editor-style.css' ) )
	);

	// Translation JSON
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'fleximpleblocks-editor-scripts',
			'fleximpleblocks',
			plugin_dir_path( dirname( __FILE__ ) ) . 'languages'
		);
	}

	// Localized data
	wp_localize_script(
		'fleximpleblocks-editor-scripts',
		'fleximpleblocksPluginData',
		array(
			'homeUrl' => esc_url( home_url() ),
			'imageSizes' => array_unique( get_intermediate_image_sizes() ),
			'locale' => get_locale(),
			'pluginUrl' => FLEXIMPLEBLOCKS_PLUGIN_URL,
			'settings' => array(
				'smallBreakpointValue' => get_option( 'fleximpleblocks_small_breakpoint_value' ),
				'mediumBreakpointValue' => get_option( 'fleximpleblocks_medium_breakpoint_value' ),
				'largeBreakpointValue' => get_option( 'fleximpleblocks_large_breakpoint_value' ),
				'xlargeBreakpointValue' => get_option( 'fleximpleblocks_xlarge_breakpoint_value' ),
				'isFontAwesomeActive' => get_option( 'fleximpleblocks_is_font_awesome_active' ),
				'isLeafletActive' => get_option( 'fleximpleblocks_is_leaflet_active' ),
				'isSwiperActive' => get_option( 'fleximpleblocks_is_swiper_active' ),
				'openWeatherApiKey' => get_option( 'fleximpleblocks_open_weather_api_key' )
			)
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'fleximpleblocks_enqueue_editor_assets', 10 );


/**
 * Load all translations for our plugin from the MO file.
 */
function fleximpleblocks_load_translations() {
	load_plugin_textdomain( 'fleximpleblocks', FALSE, basename( dirname( __FILE__, 2 ) ) . '/languages/' );
}
add_action( 'plugins_loaded', 'fleximpleblocks_load_translations', 10 );


/**
 * Register custom block category.
 */
function fleximpleblocks_register_block_category( $categories, $post ) {
	return array_merge(
		array(
			array(
				'title' => __( 'Fleximple Blocks', 'fleximpleblocks' ),
				'slug' => 'fleximple-blocks',
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'fleximpleblocks_register_block_category', 10, 2 );


/**
 * Register new Rest API fields.
 */
function fleximpleblocks_register_new_rest_api_fields() {
	register_rest_field( array( 'post', 'page' ), 'author_data',
		array(
			'get_callback' => 'fleximpleblocks_author_data',
		)
	);

	register_rest_field( array( 'post', 'page' ), 'featured_media_data',
		array(
			'get_callback' => 'fleximpleblocks_featured_media_data',
		)
	);

	register_rest_field( array( 'post', 'page' ), 'audio_data',
		array(
			'get_callback' => 'fleximpleblocks_audio_data',
		)
	);

	register_rest_field( array( 'post', 'page' ), 'comments_number',
		array(
			'get_callback' => 'fleximpleblocks_commments_number',
		)
	);

	register_rest_field( 'post', 'categories_data',
		array(
			'get_callback' => 'fleximpleblocks_categories_data',
		)
	);
}
add_action( 'rest_api_init', 'fleximpleblocks_register_new_rest_api_fields', 10 );


if ( ! function_exists( 'fleximpleblocks_author_data' ) ) {
	function fleximpleblocks_author_data( $object ) {
		$author_name = get_the_author_meta( 'display_name', $object['author'] );
		$author_url = get_author_posts_url( $object['author'] );

		return array(
			'name' => $author_name,
			'url' => $author_url,
		);
	}
}

/**
 * Get size information for all currently-registered image sizes.
 *
 * @global $_wp_additional_image_sizes
 * @uses   get_intermediate_image_sizes()
 * @return array $sizes Data for all currently-registered image sizes.
 * @link https://codex.wordpress.org/Function_Reference/get_intermediate_image_sizes#Examples
 */
function get_image_sizes() {
	global $_wp_additional_image_sizes;

	$sizes = array();

	foreach ( get_intermediate_image_sizes() as $_size ) {
		if ( in_array( $_size, array('thumbnail', 'medium', 'medium_large', 'large') ) ) {
			$sizes[ $_size ]['width']  = get_option( "{$_size}_size_w" );
			$sizes[ $_size ]['height'] = get_option( "{$_size}_size_h" );
			$sizes[ $_size ]['crop']   = (bool) get_option( "{$_size}_crop" );
		} else if ( isset( $_wp_additional_image_sizes[ $_size ] ) ) {
			$sizes[ $_size ] = array(
				'width'  => $_wp_additional_image_sizes[ $_size ]['width'],
				'height' => $_wp_additional_image_sizes[ $_size ]['height'],
				'crop'   => $_wp_additional_image_sizes[ $_size ]['crop'],
			);
		}
	}

	return $sizes;
}

if ( ! function_exists( 'fleximpleblocks_featured_media_data' ) ) {
	function fleximpleblocks_featured_media_data( $object, $field_name, $request ) {
		$image_sizes = get_image_sizes();
		// Add “full” into the list of image sizes
		$image_sizes['full'] = 'Just a reference';
		$media_data = array();

		if ( ! empty( $image_sizes ) ) {
			foreach ( $image_sizes as $key => $value ) {
				$image_data = wp_get_attachment_image_src( get_post_thumbnail_id( $object['id'] ), $key );
				if ( $image_data ) {
					$media_data += array(
						$key => array(
							'url' => $image_data[0],
							'width' => $image_data[1],
							'height' => $image_data[2],
							'is_intermediate' => $image_data[3],
						)
					);
				}
			}
		}
		return $media_data;
	}
}

if ( ! function_exists( 'fleximpleblocks_audio_data' ) ) {
	function fleximpleblocks_audio_data( $object, $field_name, $request ) {
		$fetched_audios = get_attached_media( 'audio', $object['id'] );
		$audio_data = array();

		if ( ! empty( $fetched_audios ) ) {
			foreach( $fetched_audios as $fetched_audio ) {
				$audio_data[] = array(
					'id' => $fetched_audio->Id,
					'name' => $fetched_audio->post_title,
					'slug' => $fetched_audio->post_name,
					'description' => $fetched_audio->post_content,
					'url' => $fetched_audio->guid,
				);
			}
		}

		return $audio_data;
	}
}

if ( ! function_exists( 'fleximpleblocks_commments_number' ) ) {
	function fleximpleblocks_commments_number( $object ) {
		$number = get_comments_number( $object['id'] );
		/* translators: %d: comment count number */
		return sprintf( _n( '%d comment', '%d comments', $number, 'fleximpleblocks' ), $number );
	}
}

if ( ! function_exists( 'fleximpleblocks_categories_data' ) ) {
	function fleximpleblocks_categories_data( $object ) {
		$categories_ids = $object['categories'];
		$categories_data = array();

		foreach( $categories_ids as $category_id ) {
			$categories = get_terms( array( 'term_taxonomy_id' => $category_id ) );
			$category_url = get_category_link( $category_id );

			foreach( $categories as $category ) {
				$categories_data[] = array(
					'id' => $category->term_id,
					'name' => $category->name,
					'slug' => $category->slug,
					'url' => $category_url,
					'description' => $category->description,
					'parent' => $category->parent,
				);
			}
		}

		return $categories_data;
	}
}
