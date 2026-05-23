<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- ========== NAVBAR ========== -->
<header class="navbar" id="navbar">
	<div class="container navbar-inner">
		<!-- Logo -->
		<?php
		if ( has_custom_logo() ) {
			the_custom_logo();
		} else {
			?>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo" aria-label="<?php esc_attr_e( 'Home', 'sunvoz' ); ?>">
				<svg class="logo-sun" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
					<circle cx="16" cy="16" r="7" fill="#C4A35A"/>
					<g stroke="#C4A35A" stroke-width="2" stroke-linecap="round">
						<line x1="16" y1="1" x2="16" y2="5"/><line x1="16" y1="27" x2="16" y2="31"/>
						<line x1="1" y1="16" x2="5" y2="16"/><line x1="27" y1="16" x2="31" y2="16"/>
						<line x1="5.4" y1="5.4" x2="8.2" y2="8.2"/><line x1="23.8" y1="23.8" x2="26.6" y2="26.6"/>
						<line x1="5.4" y1="26.6" x2="8.2" y2="23.8"/><line x1="23.8" y1="8.2" x2="26.6" y2="5.4"/>
					</g>
				</svg>
				<span class="logo-text"><?php bloginfo( 'name' ); ?></span>
			</a>
			<?php
		}
		?>

		<!-- Primary Menu -->
		<nav class="nav-links" id="navLinks">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'menu-1',
					'menu_id'        => 'primary-menu',
					'container'      => false,
					'items_wrap'     => '%3$s',
					'fallback_cb'    => false,
				)
			);
			?>
		</nav>

		<!-- Nav Actions -->
		<div class="nav-actions">
			<!-- Language Switcher (Placeholder for Polylang/WPML) -->
			<?php if ( function_exists('pll_the_languages') ) : ?>
			<div class="lang-switcher" id="langSwitcher">
				<button class="lang-btn" id="langBtn" aria-label="<?php esc_attr_e( 'Change Language', 'sunvoz' ); ?>">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
					<span><?php echo pll_current_language('slug'); ?></span>
					<svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
				</button>
				<ul class="lang-dropdown" id="langDropdown">
					<?php pll_the_languages(array('show_flags'=>0,'show_names'=>1)); ?>
				</ul>
			</div>
			<?php endif; ?>

			<!-- Search -->
			<button class="search-btn" id="searchToggle" aria-label="<?php esc_attr_e( 'Search', 'sunvoz' ); ?>">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
			</button>

			<!-- Cart -->
			<?php if ( class_exists( 'WooCommerce' ) ) : ?>
			<a href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="nav-cart-btn" id="navCartBtn" aria-label="<?php esc_attr_e( 'Shopping Cart', 'sunvoz' ); ?>">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
				<span class="cart-badge <?php echo ( WC()->cart->get_cart_contents_count() > 0 ) ? 'show' : ''; ?>" id="cartBadge">
					<?php echo esc_html( WC()->cart->get_cart_contents_count() ); ?>
				</span>
			</a>
			<?php endif; ?>

			<!-- Hamburger -->
			<button class="hamburger" id="hamburger" aria-label="<?php esc_attr_e( 'Toggle Menu', 'sunvoz' ); ?>">
				<span></span><span></span><span></span>
			</button>
		</div>
	</div>
</header>

<main id="primary" class="site-main">
