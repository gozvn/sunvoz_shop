<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * @package WooCommerce\Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );
?>

<div class="shop-header bg-secondary">
	<div class="container text-center">
		<h1 class="page-title animate-on-scroll"><?php woocommerce_page_title(); ?></h1>
		<?php
		/**
		 * Hook: woocommerce_archive_description.
		 *
		 * @hooked woocommerce_taxonomy_archive_description - 10
		 * @hooked woocommerce_product_archive_description - 10
		 */
		do_action( 'woocommerce_archive_description' );
		?>
	</div>
</div>

<div class="section products-section">
	<div class="container">
		<div class="row g-4">
			<!-- Filters Sidebar -->
			<div class="col-lg-3">
				<div class="filters-sidebar p-4 bg-white rounded-3 shadow-sm position-sticky" style="top: 100px;">
					<h3 class="font-size-md mb-4"><?php esc_html_e( 'Filter By', 'sunvoz' ); ?></h3>
					<?php
					if ( is_active_sidebar( 'shop-sidebar' ) ) {
						dynamic_sidebar( 'shop-sidebar' );
					} else {
						// Fallback if no widgets
						the_widget( 'WC_Widget_Product_Categories', 'title=' . esc_html__( 'Categories', 'sunvoz' ) );
						echo '<div class="mt-4"></div>';
						the_widget( 'WC_Widget_Price_Filter', 'title=' . esc_html__( 'Price', 'sunvoz' ) );
					}
					?>
				</div>
			</div>

			<!-- Product Grid -->
			<div class="col-lg-9">
				<div class="flex-between align-items-center mb-4 pb-3 border-bottom">
					<div class="woocommerce-result-count">
						<?php woocommerce_result_count(); ?>
					</div>
					<div class="woocommerce-ordering">
						<?php woocommerce_catalog_ordering(); ?>
					</div>
				</div>

				<?php
				if ( woocommerce_product_loop() ) {
					woocommerce_product_loop_start();

					if ( wc_get_loop_prop( 'total' ) ) {
						while ( have_posts() ) {
							the_post();
							/**
							 * Hook: woocommerce_shop_loop.
							 */
							do_action( 'woocommerce_shop_loop' );

							wc_get_template_part( 'content', 'product' );
						}
					}

					woocommerce_product_loop_end();

					/**
					 * Hook: woocommerce_after_shop_loop.
					 *
					 * @hooked woocommerce_pagination - 10
					 */
					do_action( 'woocommerce_after_shop_loop' );
				} else {
					/**
					 * Hook: woocommerce_no_products_found.
					 *
					 * @hooked wc_no_products_found - 10
					 */
					do_action( 'woocommerce_no_products_found' );
				}
				?>
			</div>
		</div>
	</div>
</div>

<?php
get_footer( 'shop' );
