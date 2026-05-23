<?php
/**
 * The template for displaying product content within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
 *
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

// Ensure visibility.
if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}

// Generate category text
$categories = wp_get_post_terms( $product->get_id(), 'product_cat' );
$cat_name = ! empty( $categories ) ? $categories[0]->name : '';

// Calculate gradients and icons dynamically based on category or standard fallback
$gradient = 'var(--gradient-kitchen)'; // Fallback
?>
<div <?php wc_product_class( 'col animate-on-scroll', $product ); ?>>
	<div class="product-card h-100 flex-col">
		<a href="<?php echo esc_url( $product->get_permalink() ); ?>" class="product-card-img-link flex-grow-1">
			<div class="product-card-img" style="background: <?php echo esc_attr( $gradient ); ?>">
				<?php 
				if ( has_post_thumbnail( $product->get_id() ) ) {
					echo get_the_post_thumbnail( $product->get_id(), 'medium', array( 'class' => 'w-100 object-fit-cover' ) );
				} else {
					echo '<div class="product-card-icon"><svg width="64" height="64" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="6" width="32" height="24" rx="2"/></svg></div>';
				}
				?>
				
				<?php if ( $product->is_on_sale() ) : ?>
					<span class="badge badge-sale product-card-badge"><?php esc_html_e( 'Sale', 'sunvoz' ); ?></span>
				<?php endif; ?>
			</div>
		</a>
		<div class="product-card-info flex-col flex-grow-1">
			<div class="product-card-category"><?php echo esc_html( $cat_name ); ?></div>
			<h3 class="product-card-title"><a href="<?php echo esc_url( $product->get_permalink() ); ?>"><?php echo wp_kses_post( $product->get_name() ); ?></a></h3>
			
			<div class="product-card-rating">
				<?php
				$rating_count = $product->get_rating_count();
				$review_count = $product->get_review_count();
				$average      = $product->get_average_rating();
				
				if ( $rating_count > 0 ) {
					echo '<span class="star-rating" role="img" aria-label="' . sprintf( esc_attr__( 'Rated %s out of 5', 'sunvoz' ), $average ) . '">';
					echo wc_get_star_rating_html( $average, $rating_count );
					echo '</span>';
					echo '<span class="rating-count">(' . esc_html( $review_count ) . ')</span>';
				}
				?>
			</div>
			
			<div class="product-card-price mt-2">
				<?php echo $product->get_price_html(); ?>
			</div>
			
			<div class="product-card-actions mt-auto pt-3">
				<?php
				// Output standard Add to Cart button but styled
				echo sprintf( '<a href="%s" data-quantity="%s" class="%s" %s>%s</a>',
					esc_url( $product->add_to_cart_url() ),
					esc_attr( isset( $args['quantity'] ) ? $args['quantity'] : 1 ),
					esc_attr( isset( $args['class'] ) ? $args['class'] : 'btn btn-outline w-100 flex-center product-card-cart-btn ajax_add_to_cart add_to_cart_button' ),
					isset( $args['attributes'] ) ? wc_implode_html_attributes( $args['attributes'] ) : '',
					esc_html( $product->add_to_cart_text() )
				);
				?>
			</div>
		</div>
	</div>
</div>
