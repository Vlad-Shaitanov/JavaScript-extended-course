"use strict";

import $ from "../core";
//? Команды для работы со свойством display

//Показать элементы
$.prototype.show = function () {

	for (let i = 0; i < this.length; i++) {
		//Если у элемента нет св-ва style
		if (!this[i].style) {
			//Перемещаемся на новую итерацию цикла
			continue;
		}

		this[i].style.display = "";
	}

	//Возвращаем объект, чтобы с ним можно было работать дальше
	return this;
};

//Скрыть элементы
$.prototype.hide = function () {

	for (let i = 0; i < this.length; i++) {
		//Если у элемента нет св-ва style
		if (!this[i].style) {
			//Перемещаемся на новую итерацию цикла
			continue;
		}

		this[i].style.display = "none";
	}

	//Возвращаем объект, чтобы с ним можно было работать дальше
	return this;
};

//Переключение видимости элементов
$.prototype.toggle = function () {

	for (let i = 0; i < this.length; i++) {
		//Если у элемента нет св-ва style
		if (!this[i].style) {
			//Перемещаемся на новую итерацию цикла
			continue;
		}

		if (this[i].style.display === "none") {

			this[i].style.display = "";
		} else {
			this[i].style.display = "none";
		}
	}

	//Возвращаем объект, чтобы с ним можно было работать дальше
	return this;
};