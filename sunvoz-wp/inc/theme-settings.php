<?php
/**
 * Sunvoz Theme Settings Page
 *
 * @package Sunvoz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Ensure option exists
add_action('after_setup_theme', function() {
    if (false === get_option('sunvoz_theme_settings')) {
        add_option('sunvoz_theme_settings', array(
            'show_categories' => 1,
            'show_featured' => 1,
            'show_new_arrivals' => 1,
            'show_testimonials' => 1,
            'show_blog' => 1,
            'footer_copyright' => 'All rights reserved.',
        ));
    }
});

// AJAX endpoint cho Product Search
add_action('wp_ajax_sunvoz_search_products', 'sunvoz_ajax_search_products');
function sunvoz_ajax_search_products() {
    check_ajax_referer('sunvoz_admin_nonce', 'nonce');
    if (!class_exists('WooCommerce')) wp_send_json_error('WooCommerce not active');
    
    $q = sanitize_text_field($_GET['q']);
    $products = wc_get_products(['s' => $q, 'limit' => 10, 'status' => 'publish']);
    
    $results = array();
    foreach ($products as $p) {
        $results[] = array(
            'id'        => $p->get_id(),
            'name'      => $p->get_name(),
            'price'     => wc_price($p->get_price()),
            'thumbnail' => get_the_post_thumbnail_url($p->get_id(), 'thumbnail') ?: wc_placeholder_img_src(),
        );
    }
    wp_send_json_success($results);
}

// Đăng ký menu Admin
function sunvoz_add_admin_menu() {
	add_theme_page(
		esc_html__( 'Sunvoz Settings', 'sunvoz' ),
		esc_html__( 'Sunvoz Settings', 'sunvoz' ),
		'manage_options',
		'sunvoz-settings',
		'sunvoz_settings_page_render'
	);
}
add_action( 'admin_menu', 'sunvoz_add_admin_menu' );

function sunvoz_settings_page_render() {
	// Xử lý POST request lưu settings
	if ( isset( $_POST['sunvoz_settings_submit'] ) ) {
		check_admin_referer( 'sunvoz_settings_save', 'sunvoz_nonce' );
        
        $settings = get_option('sunvoz_theme_settings', array());
        
        // Homepage Toggles
        $settings['show_hero'] = isset($_POST['show_hero']) ? 1 : 0;
        $settings['show_categories'] = isset($_POST['show_categories']) ? 1 : 0;
        $settings['show_featured'] = isset($_POST['show_featured']) ? 1 : 0;
        $settings['show_new_arrivals'] = isset($_POST['show_new_arrivals']) ? 1 : 0;
        $settings['show_testimonials'] = isset($_POST['show_testimonials']) ? 1 : 0;
        $settings['show_blog'] = isset($_POST['show_blog']) ? 1 : 0;

        // Shop by Category (mảng IDs)
        $settings['home_categories'] = isset($_POST['home_categories']) ? array_map('intval', $_POST['home_categories']) : array();

        // Featured Products (mảng IDs)
        $settings['featured_products'] = isset($_POST['featured_products_ids']) && !empty($_POST['featured_products_ids']) ? array_map('intval', explode(',', $_POST['featured_products_ids'])) : array();

        // New Arrivals Mode
        $settings['new_arrivals_mode'] = sanitize_text_field($_POST['new_arrivals_mode'] ?? 'auto');
        $settings['new_arrivals_count'] = intval($_POST['new_arrivals_count'] ?? 8);
        $settings['new_arrivals_products'] = isset($_POST['new_arrivals_products_ids']) && !empty($_POST['new_arrivals_products_ids']) ? array_map('intval', explode(',', $_POST['new_arrivals_products_ids'])) : array();

        // Testimonials (JSON string)
        if (isset($_POST['testimonials_json'])) {
            $settings['testimonials_json'] = wp_unslash($_POST['testimonials_json']);
        }

        // Blog preview categories
        $settings['blog_categories'] = isset($_POST['blog_categories']) ? array_map('intval', $_POST['blog_categories']) : array();
        $settings['blog_count'] = intval($_POST['blog_count'] ?? 3);

        // Footer
        $settings['footer_newsletter_title'] = sanitize_text_field($_POST['footer_newsletter_title'] ?? '');
        $settings['footer_newsletter_desc'] = sanitize_textarea_field($_POST['footer_newsletter_desc'] ?? '');
        $settings['footer_newsletter_shortcode'] = sanitize_text_field($_POST['footer_newsletter_shortcode'] ?? '');
        $settings['footer_copyright'] = sanitize_text_field($_POST['footer_copyright'] ?? '');
        $settings['social_facebook'] = esc_url_raw($_POST['social_facebook'] ?? '');
        $settings['social_instagram'] = esc_url_raw($_POST['social_instagram'] ?? '');
        $settings['social_pinterest'] = esc_url_raw($_POST['social_pinterest'] ?? '');

        // Custom CSS
        $settings['custom_css'] = wp_strip_all_tags($_POST['custom_css'] ?? '');
        
		update_option( 'sunvoz_theme_settings', $settings );
		echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__( 'Settings saved successfully.', 'sunvoz' ) . '</p></div>';
	}

	$settings = get_option( 'sunvoz_theme_settings', array() );
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Sunvoz Theme Settings', 'sunvoz' ); ?></h1>
		<h2 class="nav-tab-wrapper" id="sunvoz-tabs">
			<a href="#tab-homepage" class="nav-tab nav-tab-active"><?php esc_html_e( 'Homepage Sections', 'sunvoz' ); ?></a>
			<a href="#tab-footer" class="nav-tab"><?php esc_html_e( 'Footer & Social', 'sunvoz' ); ?></a>
			<a href="#tab-custom-css" class="nav-tab"><?php esc_html_e( 'Custom CSS', 'sunvoz' ); ?></a>
		</h2>

		<form method="post" action="">
			<?php wp_nonce_field( 'sunvoz_settings_save', 'sunvoz_nonce' ); ?>
			
			<div class="tab-content" id="tab-homepage" style="display: block; margin-top: 20px;">
				<table class="form-table">
                    <!-- Shop by Category -->
                    <tr>
                        <th scope="row">
                            <label><input type="checkbox" name="show_categories" value="1" <?php checked( $settings['show_categories'] ?? 1 ); ?>> <?php esc_html_e( 'Shop by Category Section', 'sunvoz' ); ?></label>
                        </th>
                        <td>
                            <?php
                            if (class_exists('WooCommerce')) {
                                $terms = get_terms(['taxonomy' => 'product_cat', 'hide_empty' => false]);
                                $selected_cats = $settings['home_categories'] ?? array();
                                echo '<div style="max-height: 200px; overflow-y: auto; border: 1px solid #ccc; padding: 10px;">';
                                foreach ($terms as $term) {
                                    $checked = in_array($term->term_id, $selected_cats) ? 'checked' : '';
                                    echo '<label style="display:block; margin-bottom:5px;"><input type="checkbox" name="home_categories[]" value="' . esc_attr($term->term_id) . '" ' . $checked . '> ' . esc_html($term->name) . '</label>';
                                }
                                echo '</div>';
                            } else {
                                echo '<p>WooCommerce is required.</p>';
                            }
                            ?>
                        </td>
                    </tr>

                    <!-- Featured Products -->
                    <tr>
                        <th scope="row">
                            <label><input type="checkbox" name="show_featured" value="1" <?php checked( $settings['show_featured'] ?? 1 ); ?>> <?php esc_html_e( 'Featured Collection', 'sunvoz' ); ?></label>
                        </th>
                        <td>
                            <p class="description"><?php esc_html_e( 'Enter product IDs separated by commas (e.g., 12, 34, 56)', 'sunvoz' ); ?></p>
                            <input type="text" name="featured_products_ids" class="regular-text" value="<?php echo esc_attr( implode(',', $settings['featured_products'] ?? array()) ); ?>">
                            <p><i>(A more advanced AJAX Product Picker will be implemented in the JS layer)</i></p>
                        </td>
                    </tr>

                    <!-- New Arrivals -->
                    <tr>
                        <th scope="row">
                            <label><input type="checkbox" name="show_new_arrivals" value="1" <?php checked( $settings['show_new_arrivals'] ?? 1 ); ?>> <?php esc_html_e( 'Just Arrived Section', 'sunvoz' ); ?></label>
                        </th>
                        <td>
                            <select name="new_arrivals_mode">
                                <option value="auto" <?php selected($settings['new_arrivals_mode'] ?? 'auto', 'auto'); ?>>Auto (Latest Products)</option>
                                <option value="manual" <?php selected($settings['new_arrivals_mode'] ?? 'auto', 'manual'); ?>>Manual Selection</option>
                            </select>
                            <br><br>
                            <label>Product Count (Auto mode):</label><br>
                            <input type="number" name="new_arrivals_count" value="<?php echo esc_attr($settings['new_arrivals_count'] ?? 8); ?>" min="4" max="20" class="small-text">
                        </td>
                    </tr>

                    <!-- Blog -->
                    <tr>
                        <th scope="row">
                            <label><input type="checkbox" name="show_blog" value="1" <?php checked( $settings['show_blog'] ?? 1 ); ?>> <?php esc_html_e( 'From Our Blog', 'sunvoz' ); ?></label>
                        </th>
                        <td>
                            <label>Number of posts:</label>
                            <input type="number" name="blog_count" value="<?php echo esc_attr($settings['blog_count'] ?? 3); ?>" class="small-text">
                        </td>
                    </tr>
				</table>
			</div>

			<div class="tab-content" id="tab-footer" style="display: none; margin-top: 20px;">
				<table class="form-table">
                    <tr>
						<th scope="row"><label><?php esc_html_e( 'Newsletter Title', 'sunvoz' ); ?></label></th>
						<td><input type="text" name="footer_newsletter_title" class="regular-text" value="<?php echo esc_attr( $settings['footer_newsletter_title'] ?? '' ); ?>"></td>
					</tr>
                    <tr>
						<th scope="row"><label><?php esc_html_e( 'Newsletter Description', 'sunvoz' ); ?></label></th>
						<td><textarea name="footer_newsletter_desc" class="large-text" rows="3"><?php echo esc_textarea( $settings['footer_newsletter_desc'] ?? '' ); ?></textarea></td>
					</tr>
                    <tr>
						<th scope="row"><label><?php esc_html_e( 'Newsletter Shortcode (CF7, Mailchimp)', 'sunvoz' ); ?></label></th>
						<td><input type="text" name="footer_newsletter_shortcode" class="regular-text" value="<?php echo esc_attr( $settings['footer_newsletter_shortcode'] ?? '' ); ?>"></td>
					</tr>
					<tr>
						<th scope="row"><label><?php esc_html_e( 'Copyright Text', 'sunvoz' ); ?></label></th>
						<td><input type="text" name="footer_copyright" class="regular-text" value="<?php echo esc_attr( $settings['footer_copyright'] ?? '' ); ?>"></td>
					</tr>
					<tr>
						<th scope="row"><label><?php esc_html_e( 'Facebook URL', 'sunvoz' ); ?></label></th>
						<td><input type="url" name="social_facebook" class="regular-text" value="<?php echo esc_attr( $settings['social_facebook'] ?? '' ); ?>"></td>
					</tr>
					<tr>
						<th scope="row"><label><?php esc_html_e( 'Instagram URL', 'sunvoz' ); ?></label></th>
						<td><input type="url" name="social_instagram" class="regular-text" value="<?php echo esc_attr( $settings['social_instagram'] ?? '' ); ?>"></td>
					</tr>
                    <tr>
						<th scope="row"><label><?php esc_html_e( 'Pinterest URL', 'sunvoz' ); ?></label></th>
						<td><input type="url" name="social_pinterest" class="regular-text" value="<?php echo esc_attr( $settings['social_pinterest'] ?? '' ); ?>"></td>
					</tr>
				</table>
			</div>

			<div class="tab-content" id="tab-custom-css" style="display: none; margin-top: 20px;">
				<p class="description"><?php esc_html_e( 'Add your custom CSS here. It will be loaded in the <head> of every page.', 'sunvoz' ); ?></p>
				<textarea name="custom_css" class="large-text code" rows="15" style="font-family: monospace;"><?php echo esc_textarea( $settings['custom_css'] ?? '' ); ?></textarea>
			</div>

			<p class="submit">
				<input type="submit" name="sunvoz_settings_submit" id="submit" class="button button-primary" value="<?php esc_attr_e( 'Save Changes', 'sunvoz' ); ?>">
			</p>
		</form>
	</div>

	<script>
		// Tab Switching Logic
		document.addEventListener('DOMContentLoaded', function() {
			var tabs = document.querySelectorAll('#sunvoz-tabs .nav-tab');
			var contents = document.querySelectorAll('.tab-content');

			tabs.forEach(function(tab) {
				tab.addEventListener('click', function(e) {
					e.preventDefault();
					var targetId = this.getAttribute('href').substring(1);
					
					tabs.forEach(function(t) { t.classList.remove('nav-tab-active'); });
					this.classList.add('nav-tab-active');
					
					contents.forEach(function(c) { c.style.display = 'none'; });
					document.getElementById(targetId).style.display = 'block';
				});
			});
		});
	</script>
	<?php
}

// Inline Custom CSS output
function sunvoz_custom_css_output() {
    $settings = get_option('sunvoz_theme_settings', array());
    if (!empty($settings['custom_css'])) {
        echo '<style id="sunvoz-custom-css">' . wp_strip_all_tags($settings['custom_css']) . '</style>';
    }
}
add_action('wp_head', 'sunvoz_custom_css_output', 100);
