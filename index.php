<?php get_header(); ?>

<div id="primary" class="content-area col-md-12">
	<div id="main" class="site-main" role="main">
		<header class="page-header">
			<h1 class="page-title">Basic WP Rest API Starter</h1>
		</header>

		<!-- Load posts via WP REST API -->
		<button id="show-btn">Show Posts</button>
		<div id="posts-wrap" class="row vis"></div>

		<?php //echo do_shortcode( '[wp_rest_api_posts]'); ?>

	</div><!-- .site-main -->
</div><!-- .content-area -->

<?php get_footer(); ?>
