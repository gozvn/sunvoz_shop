<?php
/**
 * Sunvoz functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Sunvoz
 */

if ( ! defined( 'SUNVOZ_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( 'SUNVOZ_VERSION', '1.0.0' );
}

/**
 * Require theme core files
 */
require_once get_template_directory() . '/inc/theme-setup.php';
require_once get_template_directory() . '/inc/enqueue.php';

require_once get_template_directory() . '/inc/woocommerce.php';
require_once get_template_directory() . '/inc/theme-settings.php';
require_once get_template_directory() . '/inc/customizer.php';
