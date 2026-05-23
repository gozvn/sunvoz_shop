<?php
/**
 * Enqueue scripts and styles.
 *
 * @package Sunvoz
 */

function sunvoz_scripts() {
	// Fonts
	wp_enqueue_style( 'sunvoz-fonts', 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap', array(), null );

	// Bootstrap
	wp_enqueue_style( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', array(), '5.3.3' );
	wp_enqueue_script( 'bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', array(), '5.3.3', true );

	// Theme CSS
	wp_enqueue_style( 'sunvoz-style', get_stylesheet_uri(), array(), SUNVOZ_VERSION );
	wp_enqueue_style( 'sunvoz-base', get_template_directory_uri() . '/assets/css/base.css', array('bootstrap', 'sunvoz-fonts'), SUNVOZ_VERSION );
	wp_enqueue_style( 'sunvoz-components', get_template_directory_uri() . '/assets/css/components.css', array('sunvoz-base'), SUNVOZ_VERSION );

	// Conditional CSS
	if ( is_front_page() ) {
		wp_enqueue_style( 'sunvoz-home', get_template_directory_uri() . '/assets/css/home.css', array('sunvoz-components'), SUNVOZ_VERSION );
	}
	if ( is_page_template( 'page-about.php' ) || is_page( 'about' ) ) {
		wp_enqueue_style( 'sunvoz-about', get_template_directory_uri() . '/assets/css/about.css', array('sunvoz-components'), SUNVOZ_VERSION );
	}
	if ( is_home() || is_archive() || is_search() ) {
		wp_enqueue_style( 'sunvoz-blog', get_template_directory_uri() . '/assets/css/blog.css', array('sunvoz-components'), SUNVOZ_VERSION );
	}
	if ( is_single() && 'post' === get_post_type() ) {
		wp_enqueue_style( 'sunvoz-blog-post', get_template_directory_uri() . '/assets/css/blog-post.css', array('sunvoz-components'), SUNVOZ_VERSION );
	}
	
	// WooCommerce CSS
	if ( class_exists( 'WooCommerce' ) ) {
		if ( is_woocommerce() || is_shop() || is_product_category() || is_product_tag() ) {
			wp_enqueue_style( 'sunvoz-products', get_template_directory_uri() . '/assets/css/products.css', array('sunvoz-components'), SUNVOZ_VERSION );
		}
		if ( is_product() ) {
			wp_enqueue_style( 'sunvoz-product-detail', get_template_directory_uri() . '/assets/css/product-detail.css', array('sunvoz-components'), SUNVOZ_VERSION );
		}
		if ( is_cart() || is_checkout() || is_account_page() ) {
			wp_enqueue_style( 'sunvoz-cart', get_template_directory_uri() . '/assets/css/cart.css', array('sunvoz-components'), SUNVOZ_VERSION );
		}
		wp_enqueue_style( 'sunvoz-woocommerce', get_template_directory_uri() . '/assets/css/woocommerce.css', array('sunvoz-components'), SUNVOZ_VERSION );
	}

	// Main JS
	wp_enqueue_script( 'sunvoz-main', get_template_directory_uri() . '/assets/js/main.js', array(), SUNVOZ_VERSION, true );
	
	// Pass variables to JS
	wp_localize_script( 'sunvoz-main', 'sunvozParams', array(
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'nonce'   => wp_create_nonce( 'sunvoz_nonce' ),
	) );
}
add_action( 'wp_enqueue_scripts', 'sunvoz_scripts' );
