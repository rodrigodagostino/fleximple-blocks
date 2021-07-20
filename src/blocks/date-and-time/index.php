<?php
/**
 * Server-side rendering of the `fleximple-block/date-and-time` block.
 *
 * @package Fleximpe Blocks
 */

/**
 * Renders the `fleximple-block/date-and-time` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the current date & time according to the settings chosen.
 */
function fleximpleblocks_render_date_and_time_block( $attributes ) {

	$default_class_name = 'fleximple-block-date-and-time';
	$class_name = $attributes['className'];
	$classes = 'fleximple-block-date-and-time';


	/**
	 * Date & Time Markup
	 */
	$date_and_time_markup = ''; // It is important to initiate it here so nothing will be overridden by the following code.

	if ( isset( $attributes['dateFormat'] ) && $attributes['dateFormat'] && isset( $attributes['displayDate'] ) && $attributes['displayDate'] ) {
		if ( $attributes['dateFormat'] !== 'custom' ) {
			$exploded_date = explode( ' ', date_i18n( $attributes['dateFormat'] ) );
			$imploded_date = implode( '</span><span>', $exploded_date );
			$wrapped_date = '<span>'. $imploded_date .'</span>';
			$date_and_time_markup .= '<span class="'. $default_class_name .'__date">'. $wrapped_date .'</span>';
		} else {
			$exploded_custom_date = explode( ' ', date_i18n( $attributes['customDateFormat'] ) );
			$imploded_custom_date = implode( '</span><span>', $exploded_custom_date );
			$wrapped_custom_date = '<span>'. $imploded_custom_date .'</span>';
			$date_and_time_markup .= '<span class="'. $default_class_name .'__date">'. $wrapped_custom_date .'</span>';
		}
	}

	if ( isset( $attributes['separator'] ) && $attributes['separator'] &&  isset( $attributes['displayDate'] ) && $attributes['displayDate'] && isset( $attributes['displayTime'] ) && $attributes['displayTime'] ) {
		$date_and_time_markup .= '<span class="'. $default_class_name .'__separator">'. date_i18n( $attributes['separator'] ) .'</span>';
	}

	if ( isset( $attributes['timeFormat'] ) && $attributes['timeFormat'] && isset( $attributes['displayTime'] ) && $attributes['displayTime'] ) {
		if ( $attributes['timeFormat'] !== 'custom' ) {
			$exploded_time = explode( ' ', date_i18n( $attributes['timeFormat'] ) );
			$imploded_time = implode( '</span><span>', $exploded_time );
			$wrapped_time = '<span>'. $imploded_time .'</span>';
			$date_and_time_markup .= '<span class="'. $default_class_name .'__time">'. $wrapped_time .'</span>';
		} else {
			$exploded_custom_time = explode( ' ', date_i18n( $attributes['customTimeFormat'] ) );
			$imploded_custom_time = implode( '</span><span>', $exploded_custom_time );
			$wrapped_custom_time = '<span>'. $imploded_custom_time .'</span>';
			$date_and_time_markup .= '<span class="'. $default_class_name .'__time">'. $wrapped_custom_time .'</span>';
		}
	}

	$block_content = sprintf(
		'<time class="%s" datetime="%s">%s</time>',
		esc_attr( $default_class_name ),
		esc_attr( current_time( 'c' ) ),
		$date_and_time_markup
	);

	return $block_content;
}

/**
 * Registers the `fleximple-block/date-and-time` block.
 */
if ( ! function_exists( 'fleximpleblocks_register_date_and_time_block' ) ) {
	function fleximpleblocks_register_date_and_time_block() {
		// Return early if this function does not exist.
		if ( ! function_exists( 'register_block_type_from_metadata' ) ) {
			return;
		}

		register_block_type_from_metadata(
			__DIR__,
			array(
				'render_callback'	=> 'fleximpleblocks_render_date_and_time_block',
			)
		);
	}
	add_action( 'init', 'fleximpleblocks_register_date_and_time_block' );
}
