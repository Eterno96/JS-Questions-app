function mySolution(){

	let elements = {
		textArea: document.querySelector("textarea"),
		username: document.querySelector("input"),
		sendBtn: document.querySelector('button'),
		pendingQuestionDiv: document.getElementById('pendingQuestions'),
		openQuestionDiv: document.getElementById('openQuestions'),
	};

	let sendBtn = elements.sendBtn;
	sendBtn.addEventListener('click', addToPending);

	function addToPending() {
		let question = elements.textArea.value;
		let name = elements.username.value;
		let pendingDiv = elements.pendingQuestionDiv;

		if (!question) {
			return;
		}
		let div = createHtmlElements('div', "pendingQuestion");

		let img = document.createElement("img");
		img.src = './images/user.png';
		img.width = 32;
		img.height = 32;

		let span = createHtmlElements('span', undefined, 'Anonymous');
		if (name){
			span.textContent = name;
		}

		let p = createHtmlElements('p', undefined, question);
		let pendingActionDiv = createHtmlElements('div', 'actions');
		let deleteBtn = createHtmlElements('button', 'delete', 'Delete');
		let openBtn = createHtmlElements('button', 'open', 'Open');

		appendToParent([deleteBtn, openBtn], pendingActionDiv);
		appendToParent([img, span, p, pendingActionDiv], div);
		appendToParent([div], pendingDiv);

		elements.textArea.value = '';
		elements.username.value = '';

		deleteBtn.addEventListener('click', () => {
			pendingActionDiv.remove();
			div.remove()});
		openBtn.addEventListener('click', addToOpen);

		function addToOpen() {
			div.remove();
			let openDiv = elements.openQuestionDiv;

			let openOutputDiv = createHtmlElements('div', 'openQuestion');
			let openActionDiv = createHtmlElements('div', 'actions');
			let replyButton = createHtmlElements('button', 'reply', 'Reply');
			let replySectionDiv = createHtmlElements('div', 'replySection');
			replySectionDiv.style.display = 'none';
			let replyInput = createHtmlElements('input', 'replyInput');
			replyInput.type = 'text';
			replyInput.placeholder = "Reply to this question here...";
			let sendReplyBtn = createHtmlElements('button', 'replyButton', 'Send');
			let ol = createHtmlElements('ol', 'reply');
			ol.type = 1;

			appendToParent([replyInput, sendReplyBtn, ol], replySectionDiv);

			appendToParent([replyButton], openActionDiv);
			appendToParent([img, span, p, openActionDiv, replySectionDiv], openOutputDiv);
			appendToParent([openOutputDiv], openDiv);

			replyButton.addEventListener('click', displaySection);

			function displaySection() {

				if (replyButton.textContent === 'Reply') {
					replySectionDiv.style.display = 'block';
					replyButton.textContent = 'Back'
				}else {
					replySectionDiv.style.display = 'none';
					replyButton.textContent = 'Reply'
				}
			}

			sendReplyBtn.addEventListener('click', sendReply);

			function sendReply() {
				let answer = replyInput.value;
				if (answer) {
					let li = createHtmlElements('li',undefined, answer);
					appendToParent([li], ol);
				}
				replyInput.value = '';
			}
		}
	}

	function createHtmlElements(tagName, className, textContent) {
		let currentElement = document.createElement(tagName);

		if (textContent) {
			currentElement.textContent = textContent;
		}

		if (typeof className === 'string') {
			currentElement.classList.add(className);
		} else if (typeof className === 'object') {
			currentElement.classList.add(...className);
		}

		return currentElement;
	}

	function appendToParent(children, parent) {
		children.forEach(child => parent.appendChild(child));

		return parent;
	}

}
