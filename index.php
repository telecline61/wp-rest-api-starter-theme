<?php get_header(); ?>

<div id="primary" class="content-area col-md-12">
	<div id="main" class="site-main" role="main">
		<header class="page-header">
			<div class="row">
				<h1 class="page-title col-sm-8 col-md-8">70s and 80s</h1>
				<!-- Year sorter -->
				<div class="form-group col-md-2">
					<select id="theYear" class="form-control">
						<option value="3,4">All</option>
						<option value="4">1970s</option>
						<option value="3">1980s</option>
					</select>
				</div>
				<!-- order sorter -->
				<div class="form-group col-md-2">
					<select id="myOrder" class="form-control">
						<option value="asc">Oldest first</option>
						<option value="desc">Newest first</option>
					</select>
				</div>
			</div>
		</header>
		<!-- Load posts via WP REST API -->
		<div id="posts-wrap" class="row vis"></div>
	</div><!-- .site-main -->
</div><!-- .content-area -->

<?php get_footer(); ?>
