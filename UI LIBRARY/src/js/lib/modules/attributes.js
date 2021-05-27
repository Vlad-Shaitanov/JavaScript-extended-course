"use strict";

import $ from "../core";

//? Работа с атрибутами

//Установка атрибутов
$.prototype.setAttr = function (attr, value) {

	for (let i = 0; i < this.length; i++) {
		//Если есть атрибут и значение
		if (!attr || !value) {
			//Если один или оба аргумента отсутствуют, вернем пустой объект
			return this;
		} else {
			//Иначе установим значение атрибута
			this[i].setAttribute(attr, value);
		}
	}

	return this;
};

//Удаление атрибутов
$.prototype.removeAttr = function (attr) {

	for (let i = 0; i < this.length; i++) {
		//Если есть атрибут
		if (!attr) {
			//Если аргумент отсутствуют, вернем пустой объект
			return this;
		} else {
			//Удаляем атрибут
			this[i].removeAttribute(attr);
		}
	}

	return this;
};