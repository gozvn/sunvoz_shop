</main><!-- #primary -->

<?php
$settings = get_option( 'sunvoz_theme_settings', array() );
?>

<!-- ========== FOOTER ========== -->
<footer class="footer">
	<div class="container">
		<!-- Newsletter -->
		<div class="footer-newsletter animate-on-scroll">
			<div class="newsletter-content">
				<h3><?php echo esc_html( $settings['footer_newsletter_title'] ?? __( 'Join Our Community', 'sunvoz' ) ); ?></h3>
				<p><?php echo esc_html( $settings['footer_newsletter_desc'] ?? __( 'Subscribe to get 10% off your first order and receive eco-living tips.', 'sunvoz' ) ); ?></p>
			</div>
			<div class="newsletter-form">
				<?php 
				if ( ! empty( $settings['footer_newsletter_shortcode'] ) ) {
					echo do_shortcode( $settings['footer_newsletter_shortcode'] );
				} else {
					// Fallback form layout
					?>
					<form action="#" class="flex gap-2 w-100">
						<input type="email" placeholder="<?php esc_attr_e( 'Enter your email address', 'sunvoz' ); ?>" class="form-input newsletter-input" required>
						<button type="submit" class="btn btn-primary"><?php esc_html_e( 'Subscribe', 'sunvoz' ); ?></button>
					</form>
					<?php
				}
				?>
			</div>
		</div>

		<!-- Footer Grid -->
		<div class="footer-grid">
			<div class="footer-col footer-about">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-logo">
					<svg width="24" height="24" viewBox="0 0 32 32"><circle cx="16" cy="16" r="7" fill="currentColor"/></svg>
					<?php bloginfo( 'name' ); ?>
				</a>
				<p class="footer-desc">
					<?php echo esc_html( get_bloginfo( 'description' ) ); ?>
				</p>
				<div class="footer-social">
					<?php if ( ! empty( $settings['social_instagram'] ) ) : ?>
						<a href="<?php echo esc_url( $settings['social_instagram'] ); ?>" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
					<?php endif; ?>
					<?php if ( ! empty( $settings['social_facebook'] ) ) : ?>
						<a href="<?php echo esc_url( $settings['social_facebook'] ); ?>" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
					<?php endif; ?>
					<?php if ( ! empty( $settings['social_pinterest'] ) ) : ?>
						<a href="<?php echo esc_url( $settings['social_pinterest'] ); ?>" aria-label="Pinterest"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="12" x2="12" y2="22"/><path d="M12 12c-2-2-4-3-6-3-4 0-6 4-6 7s2 5 4 5h0c2 0 4-2 4-5z"/><path d="M12 12c2-2 4-3 6-3 4 0 6 4 6 7s-2 5-4 5h0-2 0-4-2-4-5z"/></svg></a>
					<?php endif; ?>
				</div>
			</div>

			<!-- Dynamic Footer Widgets -->
			<?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
				<?php dynamic_sidebar( 'footer-1' ); ?>
			<?php else : ?>
				<div class="footer-col">
					<h4><?php esc_html_e( 'Shop', 'sunvoz' ); ?></h4>
					<ul>
						<li><a href="#"><?php esc_html_e( 'All Products', 'sunvoz' ); ?></a></li>
						<li><a href="#"><?php esc_html_e( 'New Arrivals', 'sunvoz' ); ?></a></li>
					</ul>
				</div>
			<?php endif; ?>
		</div>

		<div class="footer-bottom">
			<p>&copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?>. <?php echo esc_html( $settings['footer_copyright'] ?? __( 'All rights reserved.', 'sunvoz' ) ); ?></p>
		</div>
	</div>
</footer>

<!-- Toast Container -->
<div class="toast-container" id="toastContainer" aria-live="polite"></div>

<!-- Search Overlay -->
<div class="search-overlay" id="searchOverlay">
	<button class="search-close" id="searchClose" aria-label="<?php esc_attr_e( 'Close search', 'sunvoz' ); ?>">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
	</button>
	<form role="search" method="get" class="search-box" action="<?php echo esc_url( home_url( '/' ) ); ?>">
		<input type="search" class="search-input" placeholder="<?php esc_attr_e( 'Search products...', 'sunvoz' ); ?>" value="<?php echo get_search_query(); ?>" name="s" id="searchInput">
		<input type="hidden" name="post_type" value="product" />
		<button type="submit" class="search-submit"><?php esc_html_e( 'Search', 'sunvoz' ); ?></button>
	</form>
</div>

<!-- Scroll to Top -->
<button class="scroll-top" id="scrollTopBtn" aria-label="<?php esc_attr_e( 'Back to top', 'sunvoz' ); ?>">
	<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<?php wp_footer(); ?>
</body>
</html>
