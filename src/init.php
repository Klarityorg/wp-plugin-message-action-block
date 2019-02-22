<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function klarity_message_action_cgb_block_assets() { // phpcs:ignore
	// Styles.
	wp_enqueue_style(
		'klarity_message_action-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', __DIR__), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
    filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);

  // click handler
  wp_enqueue_script(
    'message_action_clickhandler',
    plugins_url('/src/block/send-message.js', __DIR__),
    [],
    filemtime( plugin_dir_path( __DIR__ ) . 'src/block/send-message.js' )
  );
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'klarity_message_action_cgb_block_assets' );

function klarity_message_action_cgb_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'klarity_message_action-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', __DIR__), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
    filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ) // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'klarity_message_action-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', __DIR__), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
    filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);
}


// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'klarity_message_action_cgb_editor_assets' );
