<?php

/**
 * Server-side rendering of the `fleximple-block/weather` block.
 *
 * @package Fleximpe Blocks
 */

/**
 * Renders the `fleximple-block/weather` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the current date & time according to the settings chosen.
 */
function fleximpleblocks_render_weather_block($attributes)
{
  $default_class_name = 'fleximple-block-weather';
  // $class_name = $attributes['className'];
  // $classes = 'fleximple-block-weather';

  /**
   * Weather Markup
   */
  $weather_markup = ''; // It is important to initiate it here so nothing will be overridden by the following code.

  if (isset($attributes['cityName']) && $attributes['cityName']) {
    $city_name = $attributes['cityName'];
    $short_name =  $attributes['shortName'];
    $api_key = get_option('fleximpleblocks_open_weather_api_key');
    $display_units = $attributes['displayUnits'];
    $units = $attributes['units'];
    $language = $attributes['language'];

    $url = 'https://api.openweathermap.org/data/2.5/weather?q=' . $city_name . '&appid=' . $api_key . '&units=' . $units . '&lang=' . $language;

    $response = wp_remote_get($url);
    $weather_data = null;
    if (!is_wp_error($response) && $response['response'] && $response['response']['code'] === 200) {
      $weather_data = json_decode($response['body']);
    }

    $time_stamp = $weather_data->dt;
    $sunrise = $weather_data->sys->sunrise;
    $sunset = $weather_data->sys->sunset;
    if (($time_stamp > $sunrise) && ($time_stamp < $sunset)) {
      $time_of_day = 'day';
    } else {
      $time_of_day = 'night';
    }

    $units_initial = '';
    switch ($units) {
      case 'metric':
        $units_initial = 'C';
        break;
      case 'imperial':
        $units_initial = 'F';
        break;
      case 'kelvin':
        $units_initial = 'K';
        break;
      default:
        $units_initial = 'C';
        break;
    }

    $weather_markup = '<i class="' . $default_class_name . '__icon wi wi-owm-' . $time_of_day . '-' . $weather_data->weather[0]->id . '"></i>';
    $weather_markup .= '<div class="' . $default_class_name . '__temperature">';
    $weather_markup .= '<span class="' . $default_class_name . '__temperature_number">' . round($weather_data->main->temp) . '</span>';
    $weather_markup .= '<span class="' . $default_class_name . '__temperature_degree-symbol">&deg;</span>';
    if ($display_units) {
      $weather_markup .= '<span class="' . $default_class_name . '__temperature_units">' . $units_initial . '</span>';
    }
    $weather_markup .= '</div>';
    $weather_markup .= '<span class="' . $default_class_name . '__short-name">' . $short_name . '</span>';
    $weather_markup .= '<span class="' . $default_class_name . '__city-name">' . $weather_data->name . '</span>';
  }

  $internal_styles = '';
  if (isset($attributes['shortName']) && $attributes['shortName']) {
    $internal_styles .= '<style>';
    $internal_styles .= '.' . $default_class_name . '__city-name { display: none; }
    @media only screen and (min-width: ' . get_option('fleximpleblocks_xlarge_breakpoint_value') . 'px) {
      .' . $default_class_name . '__short-name { display: none; }
      .' . $default_class_name . '__city-name { display: inline-block; }
    }';
    $internal_styles .= '</style>';
  }

  $block_content = sprintf(
    '<div class="%s">%s%s</div>',
    esc_attr($default_class_name),
    $internal_styles,
    $weather_markup
  );

  return $block_content;
}

/**
 * Registers the `fleximple-block/weather` block.
 */
if (!function_exists('fleximpleblocks_register_weather_block')) {
  function fleximpleblocks_register_weather_block()
  {
    // Return early if this function does not exist.
    if (!function_exists('register_block_type_from_metadata')) {
      return;
    }

    register_block_type_from_metadata(
      __DIR__,
      array(
        'render_callback' => 'fleximpleblocks_render_weather_block',
      )
    );
  }
  add_action('init', 'fleximpleblocks_register_weather_block');
}
