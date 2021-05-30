"use strict";

import $ from "../core";

//? Методы работы с элементами

//Изменение или получение элемента
$.prototype.html = function (content) {

	for (let i = 0; i < this.length; i++) {
		if (content) {
			//Если аргумент передан, то мы будем замещать контент внутри элемента
			this[i].innerHTML = content;

		} else {
			//Если аргумента нет, это означает, что мы хотим получить содержимое элемента
			return this[i].innerHTML;
		}
	}

	//ВОзвращаем объект
	return this;
};

//Выбор элемента по селектору(его номеру)
$.prototype.eq = function (i) {
	//Искомый элемент
	const swap = this[i];
	//Определаем кол-во свойств в объекте
	const objLength = Object.keys(this).length;

	//Очищаем полностью объект
	for (let i = 0; i < objLength; i++) {
		delete this[i];
	}
	//Формируем объект заново
	this[0] = swap;
	this.length = 1;

	//ВОзвращаем объект
	return this;
};

//Получение номера элемента по порядку среди элементов с общим родителем
$.prototype.index = function () {
	//Родительский элемент
	const parent = this[0].parentNode;
	//Получаем всех потомков этого родителя
	const childs = [...parent.children];

	const findMyIndex = (item) => {
		return item == this[0];
	};

	return childs.findIndex(findMyIndex);
};

//Поиск элементов по селектору
$.prototype.find = function (selector) {
	//Количество найденных элементов
	let numberOfItems = 0;
	//Количество новых элементов, которые мы записали в this
	let counter = 0;

	//Создаем поверхностную копию объекта
	const copyObj = Object.assign({}, this);

	for (let i = 0; i < copyObj.length; i++) {
		const arr = copyObj[i].querySelectorAll(selector);

		if (arr.length == 0) {
			continue;
		}

		//Записываем элементы в массив
		for (let j = 0; j < arr.length; j++) {
			this[counter] = arr[j];
			counter++;
		}

		numberOfItems += arr.length;
	}

	this.length = numberOfItems;

	/*Удаляем лишние элементы(те, которые остались неперезаписанными после
	прохода через цикл)*/
	const objLength = Object.keys(this).length;
	for (; numberOfItems < objLength; numberOfItems++) {
		delete this[numberOfItems];
	}

	//Возвращаем модифицированный объект
	return this;
};

//Определение ближайшего блока по заданному селектору
$.prototype.closest = function (selector) {
	//Количество найденных элементов
	let counter = 0;

	for (let i = 0; i < this.length; i++) {
		//Записываем значение
		this[i] = this[i].closest(selector);
		counter++;
	}

	/*Удаляем лишние элементы(те, которые остались неперезаписанными после
	прохода через цикл)*/
	const objLength = Object.keys(this).length;
	for (; counter < objLength; counter++) {
		delete this[counter];
	}

	//Возвращаем модифицированный объект
	return this;
};

/*ПОлучение всех соседних элементов, не включая сам элемент, на котором было
произведено действие*/
$.prototype.siblings = function () {
	//Количество найденных элементов
	let numberOfItems = 0;
	//Количество новых элементов, которые мы записали в this
	let counter = 0;

	//Создаем поверхностную копию объекта
	const copyObj = Object.assign({}, this);

	for (let i = 0; i < copyObj.length; i++) {
		const arr = copyObj[i].parentNode.children;


		//Записываем элементы в массив
		for (let j = 0; j < arr.length; j++) {
			/*Если текущий элемент равен перебираемому элементу j, то
			не будем записывать его в главный объект*/
			if (copyObj[i] === arr[j]) {
				continue;
			}

			this[counter] = arr[j];
			counter++;
		}

		numberOfItems += arr.length - 1;
	}

	this.length = numberOfItems;

	/*Удаляем лишние элементы(те, которые остались неперезаписанными после
	прохода через цикл)*/
	const objLength = Object.keys(this).length;
	for (; numberOfItems < objLength; numberOfItems++) {
		delete this[numberOfItems];
	}

	//Возвращаем модифицированный объект
	return this;
};
