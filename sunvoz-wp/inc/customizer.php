<?php
/**
 * Sunvoz Theme Customizer
 *
 * @package Sunvoz
 */

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
function sunvoz_customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.site-title a',
				'render_callback' => 'sunvoz_customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => 'sunvoz_customize_partial_blogdescription',
			)
		);
	}

	// Colors Panel
	$wp_customize->add_setting( 'sunvoz_primary_color', array(
		'default'           => '#2D6A4F',
		'sanitize_callback' => 'sanitize_hex_color',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'sunvoz_primary_color', array(
		'label'    => esc_html__( 'Primary Accent Color', 'sunvoz' ),
		'section'  => 'colors',
	) ) );

	$wp_customize->add_setting( 'sunvoz_gold_color', array(
		'default'           => '#C4A35A',
		'sanitize_callback' => 'sanitize_hex_color',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'sunvoz_gold_color', array(
		'label'    => esc_html__( 'Gold Accent Color', 'sunvoz' ),
		'section'  => 'colors',
	) ) );

	// Hero Section
	$wp_customize->add_section( 'sunvoz_hero_section', array(
		'title'       => esc_html__( 'Hero Section', 'sunvoz' ),
		'description' => esc_html__( 'Customize the hero section on the homepage.', 'sunvoz' ),
		'priority'    => 120,
	) );

	$wp_customize->add_setting( 'sunvoz_hero_title', array(
		'default'           => 'Live Simply,<br>Live Naturally',
		'sanitize_callback' => 'wp_kses_post',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( 'sunvoz_hero_title', array(
		'label'       => esc_html__( 'Hero Title', 'sunvoz' ),
		'type'        => 'textarea',
		'section'     => 'sunvoz_hero_section',
	) );

	$wp_customize->add_setting( 'sunvoz_hero_subtitle', array(
		'default'           => 'Nature-Inspired Home Essentials',
		'sanitize_callback' => 'sanitize_text_field',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( 'sunvoz_hero_subtitle', array(
		'label'       => esc_html__( 'Hero Subtitle (Eyebrow)', 'sunvoz' ),
		'type'        => 'text',
		'section'     => 'sunvoz_hero_section',
	) );

	$wp_customize->add_setting( 'sunvoz_hero_desc', array(
		'default'           => 'Discover thoughtfully crafted home essentials that bring the beauty of nature indoors.',
		'sanitize_callback' => 'sanitize_textarea_field',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( 'sunvoz_hero_desc', array(
		'label'       => esc_html__( 'Hero Description', 'sunvoz' ),
		'type'        => 'textarea',
		'section'     => 'sunvoz_hero_section',
	) );
	
	$wp_customize->add_setting( 'sunvoz_hero_btn_url', array(
		'default'           => '#',
		'sanitize_callback' => 'esc_url_raw',
	) );
	$wp_customize->add_control( 'sunvoz_hero_btn_url', array(
		'label'       => esc_html__( 'Hero Button URL', 'sunvoz' ),
		'type'        => 'url',
		'section'     => 'sunvoz_hero_section',
	) );
}
add_action( 'customize_register', 'sunvoz_customize_register' );

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function sunvoz_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function sunvoz_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Bind JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function sunvoz_customize_preview_js() {
	wp_enqueue_script( 'sunvoz-customizer', get_template_directory_uri() . '/assets/js/customizer.js', array( 'customize-preview' ), SUNVOZ_VERSION, true );
}
add_action( 'customize_preview_init', 'sunvoz_customize_preview_js' );

/**
 * Output dynamic CSS variables for customizer colors
 */
function sunvoz_customizer_css() {
	$primary = get_theme_mod( 'sunvoz_primary_color', '#2D6A4F' );
	$gold = get_theme_mod( 'sunvoz_gold_color', '#C4A35A' );
	
	echo '<style type="text/css">';
	echo ':root {';
	if ( $primary !== '#2D6A4F' ) echo '--accent: ' . esc_attr($primary) . ';';
	if ( $gold !== '#C4A35A' ) echo '--gold: ' . esc_attr($gold) . ';';
	echo '}';
	echo '</style>';
}
add_action( 'wp_head', 'sunvoz_customizer_css' );
