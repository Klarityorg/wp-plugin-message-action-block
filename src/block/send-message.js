function toggleMessageActionButtons(el, number, email) {
  jQuery(el).closest('section').find('.whatsapp').prop('disabled', function() { return number == ''; });
  jQuery(el).closest('section').find('.email').prop('disabled', function() { return email == ''; });
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    return;
  }
  navigator.clipboard.writeText(text).then(function() {}, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

var messageActionSend = (el, action) => {
  const generalData =  jQuery(el).closest('section').find('input[type=hidden]').data();
  const introMessage = jQuery(el).closest('section').find('.introText')[0].innerText;
  const outroMessage = jQuery(el).closest('section').find('.outroText')[0].innerText;
  const emailSubject = generalData.currentemailsubject;

  let message = jQuery(el)
                    .parent()
                    .find('.message input:checked')
                    .map((x,y) => jQuery(y).data('message'))
                    .get()
                    .join('\n\n');

  message = introMessage + "\n\n" + message + "\n\n" + outroMessage;

  const encodedMessage = encodeURI(message);

  const receiver = jQuery(el)
      .parent()
      .find('.receiver input:checked')
      .data(action);

  switch(action) {
    case 'whatsapp':
      window.open('https://wa.me/' + receiver + '?text=' + encodedMessage, '_blank');
      break;
    case 'email':
      window.location.href = 'mailto:'+ receiver  +'?Subject='+ emailSubject +'&body='+ encodedMessage;
      break;
    case 'copy':
      copyTextToClipboard(message);
  }
  if (typeof ga === "function")
  {
    ga('send', 'event', 'send-message-action', action);
  }
};

document.addEventListener("DOMContentLoaded", randomSelect);

function randomSelect() {
  jQuery('.wp-block-klarity-message-action').find('.receivers').each(function(i, obj) {
      var receivers = jQuery(obj).find("input");
      var randomlySelectedReceiver = jQuery(jQuery(receivers)[Math.floor(Math.random()*(receivers.length))]);

      jQuery(randomlySelectedReceiver).attr('checked','checked');
      toggleMessageActionButtons(randomlySelectedReceiver, randomlySelectedReceiver.data("whatsapp"), randomlySelectedReceiver.data("email"))
    });
}
