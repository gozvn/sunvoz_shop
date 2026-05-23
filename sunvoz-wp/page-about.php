<?php
/**
 * Template Name: About Page
 *
 * @package Sunvoz
 */

get_header();
?>

<div class="about-hero bg-secondary">
	<div class="container text-center">
		<h1 class="page-title animate-on-scroll"><?php the_title(); ?></h1>
		<p class="page-desc animate-on-scroll mt-3"><?php esc_html_e( 'Our journey towards a sustainable and beautiful home.', 'sunvoz' ); ?></p>
	</div>
</div>

<div class="section">
	<div class="container">
		<?php
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile;
		?>
	</div>
</div>

<!-- Placeholder for specific About sections from about.html (Mission, Values, Team) -->
<!-- We can either hardcode them here or use Advanced Custom Fields / Block Editor -->

<?php
get_footer();
