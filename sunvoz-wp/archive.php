<?php
/**
 * The template for displaying archive pages
 *
 * @package Sunvoz
 */

get_header();
?>

<div class="blog-header bg-secondary">
	<div class="container text-center">
		<h1 class="page-title animate-on-scroll">
			<?php
			if ( is_category() ) {
				single_cat_title();
			} elseif ( is_tag() ) {
				single_tag_title();
			} elseif ( is_author() ) {
				the_author();
			} elseif ( is_search() ) {
				printf( esc_html__( 'Search Results for: %s', 'sunvoz' ), '<span>' . get_search_query() . '</span>' );
			} else {
				esc_html_e( 'Our Blog', 'sunvoz' );
			}
			?>
		</h1>
		<?php if ( is_category() || is_tag() ) : ?>
			<div class="page-desc animate-on-scroll mt-3"><?php the_archive_description(); ?></div>
		<?php else : ?>
			<p class="page-desc animate-on-scroll mt-3"><?php esc_html_e( 'Stories, tips, and inspiration for a sustainable lifestyle.', 'sunvoz' ); ?></p>
		<?php endif; ?>
	</div>
</div>

<div class="section">
	<div class="container">
		<div class="row g-5">
			<div class="col-lg-8">
				<?php if ( have_posts() ) : ?>
					<div class="row row-cols-1 row-cols-md-2 g-4" id="blogGrid">
						<?php
						while ( have_posts() ) :
							the_post();
							?>
							<div class="col animate-on-scroll">
								<article class="blog-card h-100">
									<a href="<?php the_permalink(); ?>" class="blog-card-img-link">
										<?php if ( has_post_thumbnail() ) : ?>
											<?php the_post_thumbnail( 'medium_large', array( 'class' => 'blog-card-img w-100 object-fit-cover' ) ); ?>
										<?php else : ?>
											<div class="blog-card-img bg-secondary flex-center w-100 h-100">
												<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
											</div>
										<?php endif; ?>
									</a>
									<div class="blog-card-content p-4 bg-white">
										<div class="blog-card-meta mb-2 text-uppercase font-size-sm letter-spacing-1 text-light">
											<?php
											$categories = get_the_category();
											if ( ! empty( $categories ) ) {
												echo esc_html( $categories[0]->name );
											}
											?>
											<span class="mx-2">&bull;</span>
											<?php echo get_the_date(); ?>
										</div>
										<h3 class="blog-card-title mb-3"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
										<div class="blog-card-excerpt mb-4"><?php the_excerpt(); ?></div>
										<a href="<?php the_permalink(); ?>" class="btn btn-outline btn-sm"><?php esc_html_e( 'Read More', 'sunvoz' ); ?></a>
									</div>
								</article>
							</div>
							<?php
						endwhile;
						?>
					</div>

					<div class="pagination-wrapper mt-5 text-center">
						<?php
						the_posts_pagination( array(
							'prev_text' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>',
							'next_text' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>',
						) );
						?>
					</div>

				<?php else : ?>
					<div class="no-results text-center py-5">
						<h3><?php esc_html_e( 'No posts found.', 'sunvoz' ); ?></h3>
						<p><?php esc_html_e( 'It seems we cannot find what you are looking for. Perhaps searching can help.', 'sunvoz' ); ?></p>
						<?php get_search_form(); ?>
					</div>
				<?php endif; ?>
			</div>

			<div class="col-lg-4">
				<?php get_sidebar(); ?>
			</div>
		</div>
	</div>
</div>

<?php
get_footer();
