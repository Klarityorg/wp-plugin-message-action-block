/**
 * BLOCK: message-action-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText } = wp.editor;

const el = wp.element.createElement;
const iconEl = el('svg', { width: 128, height: 128, viewBox: "0 0 128 128" },
    el('rect', { x: 0, y: 0, width: 128, height: 128, stroke: "white" }),
    el('path', { d: "M41.7607 39.0615H52.8432V60.866L73.2637 39.0615H86.6547L66.1434 60.2237L87.5885 88.9388H74.2753L58.66 67.706L52.8432 73.6982V88.9388H41.7607V39.0615Z", fill: "white" })
);

registerBlockType( 'klarity/klarity-message-action-block', {
  title: __( 'Message action' ),
  icon: iconEl,
  category: 'common',
  keywords: [
    __( 'Message action' )
  ],

  attributes: {
    messages: {
      type: 'array'
    },
    receivers: {
      type: 'array'
    },
    currentMessageEdit: {
      type: 'string',
      default: ''
    },
    currentReceiverNumberEdit: {
      type: 'string',
      default: ''
    },
    currentReceiverNameEdit: {
      type: 'string',
      default: ''
    },
    currentReceiverEmailEdit: {
      type: 'string',
      default: ''
    },
    currentEmailSubjectEdit: {
      type: 'string',
      default: ''
    },
    currentIntroEdit: {
      type: 'string',
      default: ''
    },
    currentOutroEdit: {
      type: 'string',
      default: ''
    }
  },
  edit: props => {
    let {attributes: {messages, receivers, currentMessageEdit, currentReceiverNumberEdit, currentReceiverNameEdit, currentReceiverEmailEdit, currentIntroEdit, currentOutroEdit, currentEmailSubjectEdit}, setAttributes} = props;

    const addMessage = (event) => {
      event.preventDefault();
      messages.push({message: currentMessageEdit});
      const messages_new = messages.slice();  // Making a new object so react will pick up the changes
      setAttributes({messages: messages_new});
      setAttributes({currentMessageEdit: ''});
    };

    const removeMessage = (messageToRemove) => {
      event.preventDefault();
      const messages_new = messages.filter(x => x.message != messageToRemove.message);
      setAttributes({messages: messages_new});
    };

    const addReceiver = (event) => {
      event.preventDefault();
      receivers.push({name: currentReceiverNameEdit, number: currentReceiverNumberEdit, email: currentReceiverEmailEdit});
      const receivers_new = receivers.slice();  // Making a new object so react will pick up the changes
      setAttributes({receivers: receivers_new});
      setAttributes({currentReceiverNumberEdit: ''});
      setAttributes({currentReceiverNameEdit: ''});
      setAttributes({currentReceiverEmailEdit: ''});
    };

    const removeReceiver = (receiverToRemove) => {
      event.preventDefault();
      const receivers_new = receivers.filter(x => !(x.number == receiverToRemove.number && x.email == receiverToRemove.email));
      setAttributes({receivers: receivers_new});
    };

    const setValue = (event, prop) => {
      event.preventDefault();
      let obj = {}
      obj[prop] = event.target.value
      setAttributes(obj);
    };

    messages = messages || [];
    receivers = receivers || [];
    return (
      <section class="wp-block-klarity-message-action">
        <p>
          eMail Action: Create messages and make receivers available.
        </p>
        <div className="form-group">
          <h4>Email Subject</h4>
          Subject for Email: <input value={currentEmailSubjectEdit} onChange={(e) => setValue(e, 'currentEmailSubjectEdit')}/> <br/>
          <h4>Message Introduction</h4>
          Message introduction for email and WhatsApp:  <br/>
          <div class="text-input">
          <RichText	value={currentIntroEdit} onChange={ content => setAttributes({ currentIntroEdit: content }) } />
          </div>
          <h4>Arguments</h4>
          <ul>
            {messages.map((message) =>
              <li>{message.message}
                <button onClick={() => removeMessage(message)}>Delete</button>
                <hr></hr>
              </li>
            )}
          </ul>
          <form>
            <h5>Add Argument</h5>
            <p>
              <textarea onChange={(e) => setValue(e, 'currentMessageEdit')} value={currentMessageEdit}>
                  {currentMessageEdit}
              </textarea> <br/>
              <button class="btn waves-effect waves-light" type="submit" name="action" onClick={addMessage} >Add New Message</button>
            </p>
          </form>
          <hr></hr>
          <h4>Closing</h4>
          Closing message for email and whatsapp: <br/>
          <div class="text-input">
          <RichText	value={currentOutroEdit} onChange={ content => {
            setAttributes({ currentOutroEdit: content })
          } } />
          </div>
          <hr></hr>
          <h4>Receivers</h4>
          <ul>
            {receivers.map((receiver) =>
              <li>
                <strong>Display name:</strong> {receiver.name}<br/>
                <strong>WhatsApp number:</strong> {receiver.number}<br/>
                <strong>Email:</strong> {receiver.email}<br/>
                <button onClick={() => removeReceiver(receiver)}>Delete</button>
                <hr></hr>
              </li>
            )}
          </ul>
          <form>
            <h5>Add receiver</h5>
            <p>
              Display name: (who is this action targeting?): <input value={currentReceiverNameEdit} onChange={(e) => setValue(e, 'currentReceiverNameEdit')}/> <br/>
              WhatsApp number: (will not be visible to the user) <input value={currentReceiverNumberEdit} onChange={(e) => setValue(e, 'currentReceiverNumberEdit')} /> <br/>
              Email: (will not be visible to the user) <input type="email" value={currentReceiverEmailEdit} onChange={(e) => setValue(e, 'currentReceiverEmailEdit')} /> <br/>
              <button class="btn waves-effect waves-light"
                disabled={currentReceiverNameEdit == '' || (currentReceiverNumberEdit == ''  && currentReceiverEmailEdit == '')}
                type="submit"
                name="action"
                onClick={addReceiver} >
                  Add New Receiver
              </button>
            </p>
          </form>
        </div>
      </section>
      )
  },

  //the click handler for this function is inside send-message.js
  save: function( props ) {
    return null;
  },
} );
