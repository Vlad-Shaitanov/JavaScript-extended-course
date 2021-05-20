"use strict";

export default class Form {

	constructor(forms) {
		this.forms = document.querySelectorAll(forms);
		this.inputs = document.querySelectorAll("input");
		this.message = {
			loading: "Загрузка...",
			success: "Спасибо! Скоро мы с Вами свяжемся",
			failure: "Что-то пошло не так...",
		};
		this.path = "assets/question.php";
	}

	clearInputs() {
		this.inputs.forEach(input => {
			input.value = "";
		});
	}

	//Запрет ввода кириллицы в поле почты
	checkMailInputs() {
		const mailInputs = document.querySelectorAll("[type='email']");

		mailInputs.forEach(input => {

			input.addEventListener("keypress", function (event) {
				if (event.key.match(/[^a-z 0-9 @ \.]/ig)) {
					event.preventDefault();
				}

			});
		});
	}

	//Маска телефона к кодом США
	initMask() {
		let setCursorPosition = (pos, elem) => {
			elem.focus();

			if (elem.setSelectionRange) {
				elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
				let range = elem.createTextRange();

				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		};

		function createMask(event) {
			let matrix = '+1 (___) ___-____',
				i = 0,
				def = matrix.replace(/\D/g, ''),
				val = this.value.replace(/\D/g, '');

			if (def.length >= val.length) {
				val = def;
			}

			this.value = matrix.replace(/./g, function (a) {
				return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
			});

			if (event.type === 'blur') {
				if (this.value.length == 2) {
					this.value = '';
				}
			} else {
				setCursorPosition(this.value.length, this);
			}
		}

		let inputs = document.querySelectorAll("[name='phone']");

		inputs.forEach(input => {
			input.addEventListener('input', createMask);
			input.addEventListener('focus', createMask);
			input.addEventListener('blur', createMask);
		});
	}

	async postData(url, data) {
		let result = await fetch(url, {
			method: "POST",
			body: data,
		});

		return await result.text();
	}

	init() {
		this.checkMailInputs();

		this.initMask();

		this.forms.forEach(item => {
			item.addEventListener("submit", (event) => {
				event.preventDefault();

				//Сообщение о статусе отправки
				let statusMessage = document.createElement("div");
				statusMessage.style.cssText = `
					margin-top: 15px;
					font-size: 18px;
					color: grey;
				`;
				statusMessage.textContent = this.message.loading;

				//Добавляем это сообщение к родительскому блоку формы
				item.parentNode.appendChild(statusMessage);

				//Отправляем форму
				const formData = new FormData(item);

				this.postData(this.path, formData)
					.then(result => {
						console.log(result);
						statusMessage.textContent = this.message.success;
					})
					.catch(() => {
						statusMessage.textContent = this.message.failure;
					})
					.finally(() => {
						//Очищаем инпуты
						this.clearInputs();

						//Убираем сообщение
						setTimeout(() => {
							statusMessage.remove();
						}, 6000);
					});
			});
		});
	}
}