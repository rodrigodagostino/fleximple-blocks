<?php
/**
 * Plugin Name: Fleximple Blocks
 * Plugin URI: https://github.com/rodrigodagostino/fleximple-blocks/
 * Description: A collection of flexible and simple Gutenberg blocks.
 * Author: Rodrigo D’Agostino
 * Author URI: https://www.rodrigodagostino.com/
 * Text Domain: fleximpleblocks
 * Domain Path: /languages/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Fleximple Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'FLEXIMPLEBLOCKS_ID', 'fleximpleblocks' );
define( 'FLEXIMPLEBLOCKS_VERSION', '1.0.0' );
define( 'FLEXIMPLEBLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'FLEXIMPLEBLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'FLEXIMPLEBLOCKS_PLUGIN_FILE', __FILE__ );
define( 'FLEXIMPLEBLOCKS_PLUGIN_BASE', plugin_basename( __FILE__ ) );

/**
 * Block Initializer.
 */
require_once FLEXIMPLEBLOCKS_PLUGIN_DIR . 'src/init.php';

/**
 * Block Register.
 */
require_once FLEXIMPLEBLOCKS_PLUGIN_DIR . 'src/index.php';