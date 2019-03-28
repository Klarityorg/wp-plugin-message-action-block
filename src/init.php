<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
  exit;
}
function klarity_message_action_cgb_block_assets() { // phpcs:ignore
  // Styles.
  wp_enqueue_style(
    'klarity_message_action-cgb-style-css', // Handle.
    plugins_url('dist/blocks.style.build.css', __DIR__), // Block style CSS.
    ['wp-editor'], // Dependency to include the CSS after it.
    filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.style.build.css')
  );
  // click handler
  wp_enqueue_script(
    'message_action_clickhandler',
    plugins_url('/src/block/send-message.js', __DIR__),
    [],
    filemtime(plugin_dir_path(__DIR__) . 'src/block/send-message.js')
  );
}

// Hook: Frontend assets.
add_action('enqueue_block_assets', 'klarity_message_action_cgb_block_assets');
function klarity_message_action_cgb_editor_assets() { // phpcs:ignore
  // Scripts.
  wp_enqueue_script(
    'klarity_message_action-cgb-block-js', // Handle.
    plugins_url('/dist/blocks.build.js', __DIR__), // Block.build.js: We register the block here. Built with Webpack.
    ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'], // Dependencies, defined above.
    filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.build.js') // Enqueue the script in the footer.
  );
  // Styles.
  wp_enqueue_style(
    'klarity_message_action-cgb-block-editor-css', // Handle.
    plugins_url('dist/blocks.editor.build.css', __DIR__), // Block editor CSS.
    ['wp-edit-blocks'], // Dependency to include the CSS after it.
    filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.editor.build.css')
  );
}

add_action('enqueue_block_editor_assets', 'klarity_message_action_cgb_editor_assets');

function render_klarity_message_action_block($attributes) {

  return "
    <section transitionend='randomSelect' class='wp-block-klarity-message-action'>
      <input type='hidden' id='custId' name='custId' data-currentEmailSubject='{$attributes['currentEmailSubjectEdit']}' />
      <p>
        <h4 class='left-align'>Introduction of the message</h4>
      </p>
      <p class='introText'>{$attributes['currentIntroEdit']}</p>
      <p>
        <h4 class='left-align'>Select your arguments</h4>
        <p class='left-align'><i>Create your own draft by selecting the arguments you like below. You can edit the text in a later step.</i></p>
      </p>
      <div class='form-group'>
        <form>
          <ul>
            ".implode('', array_map(function($message) {
              return "<li class='message'>
                <p>
                  <label>
                    <input type='checkbox' data-message='{$message['message']}' />
                    <span>{$message['message']}</span>
                  </label>
                </p>
              </li>";
            }, $attributes['messages']))."
          </ul>
          <p>
            <h4 class='left-align'>Closing message</h4>
          </p>
          <p class='outroText'>{$attributes['currentOutroEdit']}</p>
          <h4 class='left-align'>
            Who do you want to send this to?
          </h4>
          <ul class='receivers'>
            ".implode('', array_map(function($receiver) {
               return "<li class='receiver'>
                <p>
                  <label>
                    <input name='group2' type='radio' data-whatsapp='{$receiver['number']}' data-email='{$receiver['email']}' />
                    <span>{$receiver['name']}</span>
                  </label>
                </p>
              </li>";
            }, $attributes['receivers']))."
          </ul>
        </form>
        <p>Send message through</p>
        <button class='email btn waves-effect waves-light message-btn' type='submit' name='action' onclick='messageActionSend(this, \"email\")'>
          Default email client
        </button>
        <button class='whatsapp a2a_button_whatsapp btn waves-effect waves-light message-btn' type='submit' name='action' onclick='messageActionSend(this, \"whatsapp\")'>
          Whatsapp
        </button>
        <button class='btn waves-effect waves-light message-btn' type='submit' name='action' onclick='messageActionSend(this, \"copy\")' >
          Copy message to clipboard
        </button>
      </div>
    </section>
  ";
}

function register_klarity_message_action_block_callback() {
  if (function_exists('register_block_type')) {
    register_block_type('klarity/klarity-message-action-block', [
      'render_callback' => 'render_klarity_message_action_block',
      'attributes' => [
        'messages' => [
          'type' => 'array',
          'items'   => [
            'type' => 'object',
          ],
        ],
        'receivers' => [
          'type' => 'array',
          'items'   => [
            'type' => 'object',
          ],
        ],
        'currentMessageEdit' => [
          'type' => 'string',
          'default' => ''
        ],
        'currentReceiverNumberEdit' => [
          'type' => 'string',
          'default' => ''
        ],
        'currentReceiverNameEdit' => [
          'type' => 'string',
          'default' => ''
        ],
        'currentReceiverEmailEdit' => [
          'type' => 'string',
          'default' => ''
        ],
        'currentEmailSubjectEdit' => [
          'type' => 'string',
          'default' => ''
        ],
        'currentIntroEdit' => [
          'type' => 'string',
          'default' => ''
        ],
        'currentOutroEdit' => [
          'type' => 'string',
          'default' => ''
        ]
      ]
    ]);
  }
}

add_action('plugins_loaded', 'register_klarity_message_action_block_callback');
