"use strict";

//Валидация инпутов(только русский текст)
const checkTextInputs = (selector) => {

	const txtInputs = document.querySelectorAll(selector);

	txtInputs.forEach(input => {
		input.addEventListener("keypress", function (event) {
			if (event.key.match(/[^а-яё 0-9]/ig)) {
				/*Если значение нажатой клавиши не находится в диапазоне букв
				от а до я+ё и диапазоне цифр 0-9, то отменяем стандартное
				поведение*/
				event.preventDefault();
			}
		});
	});
};

export default checkTextInputs;