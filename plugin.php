<?php
/**
 * Plugin Name: Klarity message action block
 * Plugin URI: https://github.com/Klarityorg/wp-plugin-message-action
 * Description: Klarity message action block
 * Author: Klarity
 * Author URI: https://github.com/Klarityorg
 * Version: 1.1.2
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Klarity
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
