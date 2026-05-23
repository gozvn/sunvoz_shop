<?php
/**
 * WooCommerce Compatibility File
 *
 * @package Sunvoz
 */

/**
 * WooCommerce setup function.
 */
function sunvoz_woocommerce_setup() {
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'sunvoz_woocommerce_setup' );

/**
 * Remove default WooCommerce wrappers.
 */
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );
remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );

if ( ! function_exists( 'sunvoz_woocommerce_wrapper_before' ) ) {
	/**
	 * Before Content.
	 */
	function sunvoz_woocommerce_wrapper_before() {
		?>
		<div id="primary" class="content-area">
			<main id="main" class="site-main" role="main">
		<?php
	}
}
add_action( 'woocommerce_before_main_content', 'sunvoz_woocommerce_wrapper_before' );

if ( ! function_exists( 'sunvoz_woocommerce_wrapper_after' ) ) {
	/**
	 * After Content.
	 */
	function sunvoz_woocommerce_wrapper_after() {
		?>
			</main><!-- #main -->
		</div><!-- #primary -->
		<?php
	}
}
add_action( 'woocommerce_after_main_content', 'sunvoz_woocommerce_wrapper_after' );

/**
 * Ensure cart contents update when products are added to the cart via AJAX
 */
function sunvoz_woocommerce_cart_link_fragment( $fragments ) {
	ob_start();
	?>
	<span class="cart-badge <?php echo ( WC()->cart->get_cart_contents_count() > 0 ) ? 'show' : ''; ?>" id="cartBadge">
		<?php echo esc_html( WC()->cart->get_cart_contents_count() ); ?>
	</span>
	<?php
	$fragments['span.cart-badge'] = ob_get_clean();

	// We also need to refresh the cart drawer HTML.
	// We'll output a hidden element containing the updated cart items data
	// which our JS can pick up and render.
	$cart_items = WC()->cart->get_cart();
	$drawer_data = array();
	
	foreach ( $cart_items as $cart_item_key => $cart_item ) {
		$product = $cart_item['data'];
		$drawer_data[] = array(
			'key'       => $cart_item_key,
			'id'        => $product->get_id(),
			'name'      => $product->get_name(),
			'price'     => wc_price( $product->get_price() ),
			'qty'       => $cart_item['quantity'],
			'permalink' => $product->get_permalink(),
			'thumbnail' => get_the_post_thumbnail_url( $product->get_id(), 'thumbnail' )
		);
	}
	
	$subtotal = WC()->cart->get_subtotal();
	$shipping_total = WC()->cart->get_shipping_total();
	$total = WC()->cart->get_total('edit');
	
	$cart_data = array(
		'items'    => $drawer_data,
		'subtotal' => wc_price( $subtotal ),
		'shipping' => $shipping_total > 0 ? wc_price( $shipping_total ) : esc_html__('Free', 'sunvoz'),
		'total'    => wc_price( $total ),
		'count'    => WC()->cart->get_cart_contents_count()
	);
	
	ob_start();
	?>
	<div id="sunvoz_cart_fragments_data" style="display:none;" data-cart="<?php echo esc_attr( json_encode( $cart_data ) ); ?>"></div>
	<?php
	$fragments['div#sunvoz_cart_fragments_data'] = ob_get_clean();

	return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'sunvoz_woocommerce_cart_link_fragment' );

/**
 * Remove default breadcrumbs
 */
remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );

/**
 * Change number or products per row to 4
 */
add_filter( 'loop_shop_columns', 'sunvoz_loop_columns', 999 );
if ( ! function_exists( 'sunvoz_loop_columns' ) ) {
	function sunvoz_loop_columns() {
		return 4; // 4 columns
	}
}

/**
 * Adjust pagination
 */
remove_action( 'woocommerce_after_shop_loop', 'woocommerce_pagination', 10 );
add_action( 'woocommerce_after_shop_loop', 'sunvoz_woocommerce_pagination', 10 );
function sunvoz_woocommerce_pagination() {
	?>
	<div class="pagination-wrapper mt-5 text-center">
		<?php
		echo paginate_links( array(
			'prev_text' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>',
			'next_text' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>',
		) );
		?>
	</div>
	<?php
}
