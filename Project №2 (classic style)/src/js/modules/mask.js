"use strict";

const mask = (selector) => {

	const setCursorPosition = (pos, elem) => {
		//Функция принимает позицию и текущий элемент

		//Ручная установка фокуса на элементе
		elem.focus();

		/*Если у элемента есть метод setSelectionRange (в старых версиях
		 браузеров может не поддерживаться)*/
		if (elem.setSelectionRange) {
			//Устанавливаем курсор в позицию
			elem.setSelectionRange(pos, pos);
		} else if (elem.createTextRange) {
			//Диапазон
			let range = elem.createTextRange();
			range.collapse(true);//Объединение граничных точек диапазона
			range.moveEnd("character", pos);//Установка конечной точки выделения
			range.moveStart("character", pos);//Установка начальной точки выделения
			range.select();//Установка курсора
		}
	};

	//Создаем маску
	function createMask(event) {

		let matrix = "+7 (___) ___ __ __",//Матрица номера телефона
			i = 0,//Переменная-итератор
			//Получим все элементы, не соотв. цифровым значениям (Статичное)
			def = matrix.replace(/\D/g, ""),
			/*Получим все элементы, не соотв. цифровым значениям (Динамическое,
			на основе пользовательского ввода)*/
			val = this.value.replace(/\D/g, "");

		if (def.length >= val.length) {
			/*Если юзер захочет, к примеру, удалить +7, то мы не дадим этого сделать.
			val.length станет меньше, чем def.length и в результате мы
			подставим обратно дефолтное значение*/
			val = def;
		}

		//Переберем все элементы в матрице
		this.value = matrix.replace(/./g, function (a) {
			/*Такой синтаксис позволяет нам применить функцию (2 аргумент) к 
			каждому элементу матрицы (/./g).
			Аргумент (а) в функции это каждый этемент, который будет перебираться*/

			//Перебираем каждый элемент в матрице и возвращаем в зависимости от условий
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
		});

		//Если юзер перестал что-то вводить
		if (event.type === "blur") {

			if (this.value.length == 2) {
				this.value = "";
			}
		} else {
			setCursorPosition(this.value.length, this);
		}
	}

	//Инпуты, где нужно применить маску
	let inputs = document.querySelectorAll(selector);

	//Перебираем инпуты и применяем к ним  маску
	inputs.forEach(input => {
		input.addEventListener("input", createMask);
		input.addEventListener("focus", createMask);
		input.addEventListener("blur", createMask);
	});
};

export default mask;