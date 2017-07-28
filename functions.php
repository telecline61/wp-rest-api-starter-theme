<?php
/**
 * WP-Rest API Starter functions
 **/

//enqueue styles/scripts
function load_my_starter_styles() {

	wp_enqueue_style( 'style', get_stylesheet_uri() );

	//load bootstrap css from cdn
	wp_enqueue_style( 'bootstrap3_css', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', 3.7, false );
}

function load_my_starter_scripts() {

	//bootstrap js from cdn
	wp_enqueue_script( 'bootstrap3_js', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', array( 'jquery' ),  false );

	//register WP REST API
	wp_register_script( 'my_rest_api_script', get_template_directory_uri() . '/js/main.js', NULL, 1.0, true );

	//enqueue WP REST API - uncomment for theme
	wp_enqueue_script( 'my_rest_api_script');

}

add_action( 'wp_enqueue_scripts', 'load_my_starter_styles' );
add_action( 'wp_enqueue_scripts', 'load_my_starter_scripts' );

//add thumbnails to post
add_theme_support( 'post-thumbnails');

//add featured image to JSON via field
add_action( 'rest_api_init', 'add_thumbnail_to_JSON' );

function add_thumbnail_to_JSON() {

//Add featured image
register_rest_field( 'post',
    'my_featured_image_src', //call this anything
    array(
        'get_callback'    => 'get_image_src',
        'update_callback' => null,
        'schema'          => null,
         )
    );
}

function get_image_src( $object, $field_name, $request ) {
	$feat_img_array = wp_get_attachment_image_src($object['featured_media'], 'thumbnail', true);
	return $feat_img_array[0];
}