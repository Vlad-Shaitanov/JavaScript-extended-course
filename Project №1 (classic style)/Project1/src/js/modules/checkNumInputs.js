"use strict";

//ПРоверка на ввод пользователем цифр
const checkNumInputs = (selector) => {

	const numInputs = document.querySelectorAll(selector);
	numInputs.forEach(item => {
		item.addEventListener("input", () => {
			/*В регулярке ищем все НЕцифры и заменяем пустым местом,
			при такой проверке останутся только числа*/
			item.value = item.value.replace(/\D/, "");
		});
	});
};

export default checkNumInputs;