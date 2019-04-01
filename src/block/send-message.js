function shouldButtonBeDisabled(input, btn) {
	return (btn.hasClass('whatsapp') && !input.data('whatsapp'))
		  || (btn.hasClass('email') && !input.data('email'));
}

function toggleMessageActionButtons() {
	const input = jQuery(this).find('input');
	jQuery(this).closest('section').find('.message-btn').each(function() {
		jQuery(this).prop({disabled: shouldButtonBeDisabled(input, jQuery(this))});
	});
}

function copyTextToClipboard(text) {
	if (!!navigator.clipboard) {
		navigator.clipboard.writeText(text).then(function () {
		}, function (err) {
			console.error('Async: Could not copy text: ', err);
		});
	}
}

function messageActionSend(el, action) {
	const section = jQuery(el).closest('section');
	const generalData = section.find('input[type=hidden]').data();
	const introMessage = section.find('.introText').prop('innerText');
	const outroMessage = section.find('.outroText').prop('innerText');
	const emailSubject = generalData.currentemailsubject;

	let message = jQuery(el)
		.parent()
		.find('.message input:checked')
		.map((x, y) => jQuery(y).data('message'))
		.get()
		.join('\n\n');

	message = [introMessage, message, outroMessage].join('\n\n');

	const encodedMessage = encodeURI(message);

	const receiver = jQuery(el)
		.parent()
		.find('.receiver input:checked')
		.data(action);

	switch (action) {
		case 'whatsapp':
			window.open('https://wa.me/' + receiver + '?text=' + encodedMessage, '_blank');
			break;
		case 'email':
			window.location.href = 'mailto:' + receiver + '?Subject=' + emailSubject + '&body=' + encodedMessage;
			break;
		case 'copy':
			copyTextToClipboard(message);
	}
	if (typeof ga === "function") {
		ga('send', 'event', 'send-message-action', action);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	const section = jQuery('section.wp-block-klarity-message-action');
	const receivers = section.find('.receivers .receiver');

	section.find('.message-btn').each(function() {
		let btn = jQuery(this);
		let shouldBeHidden = true;
		jQuery(receivers).each(function() {
			if (!shouldButtonBeDisabled(jQuery(this).find('input'), btn)) {
				shouldBeHidden = false;
			}
		});
		if (shouldBeHidden) {
			btn.remove();
		}
	});

	jQuery(receivers)
		.on('click', toggleMessageActionButtons)
		.eq(Math.floor(Math.random() * (receivers.length)))
			.find('input')
				.trigger('click');
});
