"use strict";

import $ from "../core";
//? Работа с классами

//Добавление классов
$.prototype.addClass = function (...classNames) {
	for (let i = 0; i < this.length; i++) {
		//Если нет свойства classList
		if (!this[i].classList) {
			continue;
		}

		this[i].classList.add(...classNames);
	}

	//Возвращаем объект
	return this;
};

//Удаление классов
$.prototype.removeClass = function (...classNames) {
	for (let i = 0; i < this.length; i++) {
		//Если нет свойства classList
		if (!this[i].classList) {
			continue;
		}

		this[i].classList.remove(...classNames);
	}

	//Возвращаем объект
	return this;
};

//Переключение классов
$.prototype.toggleClass = function (classNames) {
	for (let i = 0; i < this.length; i++) {
		//Если нет свойства classList
		if (!this[i].classList) {
			continue;
		}

		this[i].classList.toggle(classNames);
	}

	//Возвращаем объект
	return this;
};