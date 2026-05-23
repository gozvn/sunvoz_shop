<?php
/**
 * The front page template file
 *
 * @package Sunvoz
 */

get_header();

$settings = get_option( 'sunvoz_theme_settings', array() );
?>

<!-- ========== HERO SECTION ========== -->
<?php if ( ! isset( $settings['show_hero'] ) || $settings['show_hero'] ) : ?>
<section class="hero" id="hero">
	<div class="container hero-inner">
		<div class="hero-content">
			<span class="hero-eyebrow animate-on-scroll"><?php echo esc_html( get_theme_mod( 'sunvoz_hero_subtitle', __( 'Nature-Inspired Home Essentials', 'sunvoz' ) ) ); ?></span>
			<h1 class="hero-title animate-on-scroll"><?php echo wp_kses_post( get_theme_mod( 'sunvoz_hero_title', __( 'Live Simply,<br>Live Naturally', 'sunvoz' ) ) ); ?></h1>
			<p class="hero-desc animate-on-scroll"><?php echo esc_html( get_theme_mod( 'sunvoz_hero_desc', __( 'Discover thoughtfully crafted home essentials that bring the beauty of nature indoors. Sustainable, beautiful, and designed for mindful living.', 'sunvoz' ) ) ); ?></p>
			<div class="hero-actions animate-on-scroll">
				<a href="<?php echo esc_url( get_theme_mod( 'sunvoz_hero_btn_url', wc_get_page_permalink( 'shop' ) ) ); ?>" class="btn btn-primary btn-lg"><?php esc_html_e( 'Shop Collection', 'sunvoz' ); ?></a>
			</div>
		</div>
	</div>
</section>
<?php endif; ?>

<!-- ========== CATEGORIES SECTION ========== -->
<?php if ( ! isset( $settings['show_categories'] ) || $settings['show_categories'] ) : ?>
<section class="section categories-section bg-secondary">
	<div class="container">
		<div class="section-header">
			<h2 class="section-title"><?php esc_html_e( 'Shop by Category', 'sunvoz' ); ?></h2>
		</div>
		<div class="grid grid-4" id="categoriesGrid">
			<?php
			$cat_ids = $settings['home_categories'] ?? array();
			if ( ! empty( $cat_ids ) && class_exists( 'WooCommerce' ) ) {
				$terms = get_terms( array(
					'taxonomy'   => 'product_cat',
					'include'    => $cat_ids,
					'orderby'    => 'include',
					'hide_empty' => false,
				) );
				foreach ( $terms as $term ) {
					// Output category card
					$thumbnail_id = get_term_meta( $term->term_id, 'thumbnail_id', true );
					$image        = wp_get_attachment_url( $thumbnail_id );
					?>
					<a href="<?php echo esc_url( get_term_link( $term ) ); ?>" class="category-card animate-on-scroll">
						<div class="category-card-bg" style="background-image: url('<?php echo esc_url( $image ); ?>');"></div>
						<div class="category-card-content">
							<h3 class="category-card-title"><?php echo esc_html( $term->name ); ?></h3>
							<span class="category-card-count"><?php echo esc_html( $term->count ); ?> <?php esc_html_e( 'Products', 'sunvoz' ); ?></span>
						</div>
					</a>
					<?php
				}
			}
			?>
		</div>
	</div>
</section>
<?php endif; ?>

<!-- ========== FEATURED PRODUCTS ========== -->
<?php if ( ! isset( $settings['show_featured'] ) || $settings['show_featured'] ) : ?>
<section class="section">
	<div class="container">
		<div class="section-header">
			<h2 class="section-title"><?php esc_html_e( 'Featured Collection', 'sunvoz' ); ?></h2>
		</div>
		<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" id="featuredGrid">
			<?php
			$featured_ids = $settings['featured_products'] ?? array();
			if ( ! empty( $featured_ids ) && class_exists( 'WooCommerce' ) ) {
				$query = new WP_Query( array(
					'post_type'      => 'product',
					'post__in'       => $featured_ids,
					'orderby'        => 'post__in',
					'posts_per_page' => 8,
				) );
				if ( $query->have_posts() ) {
					while ( $query->have_posts() ) {
						$query->the_post();
						wc_get_template_part( 'content', 'product' );
					}
				}
				wp_reset_postdata();
			}
			?>
		</div>
	</div>
</section>
<?php endif; ?>

<?php
get_footer();
