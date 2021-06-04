"use strict";

import $ from "../core";

$.prototype.accordion = function (
	headActive = "accordion-head--active", contentActive = "accordion-content--active", paddings = 40
) {

	for (let i = 0; i < this.length; i++) {
		$(this[i]).click(() => {
			//По клику в заголовок переключаем активный класс
			$(this[i]).toggleClass(headActive);
			//Так же переключаем активный клас на его соседнем элементе
			$(this[i].nextElementSibling).toggleClass(contentActive);

			//Проверяем, есть ли активный класс на текущем элементе
			if (this[i].classList.contains(headActive)) {
				/*Устанавливаем следующему элементу высоту, равную высоте контента
				в элементе(величина скролла) + паддинги*/
				this[i].nextElementSibling.style.maxHeight = this[i].nextElementSibling.scrollHeight + paddings + "px";
			} else {
				//Если активного класса нет, устанавливаем высоту элемента в 0
				this[i].nextElementSibling.style.maxHeight = "0px";
			}
		});
	}
};

//Инициализация
$(".accordion-head").accordion();

// $.prototype.accordion = function (headActive = 'accordion-head--active', contentActive = 'accordion-content--active', paddings = 40) {
// 	for (let i = 0; i < this.length; i++) {
// 		$(this[i]).click(() => {
// 			$(this[i]).toggleClass(headActive);
// 			$(this[i].nextElementSibling).toggleClass(contentActive);

// 			if (this[i].classList.contains(headActive)) {
// 				this[i].nextElementSibling.style.maxHeight = this[i].nextElementSibling.scrollHeight + paddings + "px";
// 			} else {
// 				this[i].nextElementSibling.style.maxHeight = "0px";
// 			}
// 		});
// 	}
// };

// $('.accordion-head').accordion();