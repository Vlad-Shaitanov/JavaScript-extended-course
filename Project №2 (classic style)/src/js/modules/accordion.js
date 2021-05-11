"use strict";

const accordion = (triggersSelector) => {
	const btns = document.querySelectorAll(triggersSelector);
	//const blocks = document.querySelectorAll(itemsSelector);

	/*===== Реализация аккордеона при помощи классов =====*/
	//Анимируем блоки
	// blocks.forEach(block => {
	// 	block.classList.add("animated", "fadeInDown");
	// });

	// btns.forEach(btn => {
	// 	btn.addEventListener("click", function () {
	// 		//Если у элемента, по которому кликнули, нет активного класса:
	// 		if (!this.classList.contains("active")) {
	// 			//то уберем активный класс у всех элементов
	// 			btns.forEach(btn => {
	// 				btn.classList.remove("active", "active-style");
	// 			});

	// 			//Тепери навешиваем классы активности на элемент, где был клик
	// 			this.classList.add("active", "active-style");
	// 		}
	// 	});
	// });
	/*=====  =====*/

	/*===== Реализация аккордеона при помощи JS =====*/
	btns.forEach(btn => {
		btn.addEventListener("click", function () {
			//Стилизация кликабельного элемента
			this.classList.toggle("active-style");
			//Стилизация соседнего элемента
			this.nextElementSibling.classList.toggle("active-content");
			//Проверяем, есть ли активный класс на элементе, по которому кликнули
			if (this.classList.contains("active-style")) {
				/*Устанавливаем максимальную высоту, равную высоте элемента,
				который содержит контент плюс паддинги*/
				this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
			} else {
				this.nextElementSibling.style.maxHeight = "0px";
			}
		});
	});
};

export default accordion;