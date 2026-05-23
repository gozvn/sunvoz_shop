<?php
/**
 * The template for displaying all single posts
 *
 * @package Sunvoz
 */

get_header();
?>

<?php
while ( have_posts() ) :
	the_post();
	?>
	<div class="blog-post-header">
		<div class="container text-center">
			<div class="blog-post-meta animate-on-scroll">
				<?php
				$categories = get_the_category();
				if ( ! empty( $categories ) ) {
					echo '<a href="' . esc_url( get_category_link( $categories[0]->term_id ) ) . '" class="category-tag">' . esc_html( $categories[0]->name ) . '</a>';
				}
				?>
				<span class="date"><?php echo get_the_date(); ?></span>
				<span class="read-time"><?php esc_html_e( '5 min read', 'sunvoz' ); ?></span>
			</div>
			<h1 class="blog-post-title animate-on-scroll mt-3 mb-4"><?php the_title(); ?></h1>
		</div>
	</div>

	<?php if ( has_post_thumbnail() ) : ?>
		<div class="blog-post-hero-img container animate-on-scroll mb-5">
			<?php the_post_thumbnail( 'full', array( 'class' => 'w-100 rounded-3 shadow-sm' ) ); ?>
		</div>
	<?php endif; ?>

	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-8">
				<div class="blog-post-content animate-on-scroll">
					<?php the_content(); ?>
					
					<?php
					wp_link_pages(
						array(
							'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'sunvoz' ),
							'after'  => '</div>',
						)
					);
					?>
				</div>

				<div class="blog-post-footer animate-on-scroll mt-5 pt-4 border-top">
					<div class="row align-items-center">
						<div class="col-md-6">
							<div class="post-tags">
								<?php the_tags( '<strong>' . esc_html__( 'Tags:', 'sunvoz' ) . '</strong> ', ', ', '' ); ?>
							</div>
						</div>
						<div class="col-md-6 text-md-end mt-3 mt-md-0">
							<strong><?php esc_html_e( 'Share:', 'sunvoz' ); ?></strong>
							<div class="social-share d-inline-flex gap-2 ms-2">
								<a href="#" class="btn btn-outline btn-sm btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
								<a href="#" class="btn btn-outline btn-sm btn-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg></a>
							</div>
						</div>
					</div>
				</div>

				<?php
				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;
				?>
			</div>
		</div>
	</div>
	<?php
endwhile; // End of the loop.
?>

<?php
get_footer();
