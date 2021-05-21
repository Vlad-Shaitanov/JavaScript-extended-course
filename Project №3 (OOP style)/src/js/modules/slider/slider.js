"use strict";

export default class Slider {
	constructor({ container = null,
		btns = null,
		next = null,
		prev = null,
		prevModuleBtns = null,
		nextModuleBtns = null,
		activeClass = "",
		animate,
		autoplay } = {}) {
		//Страница, на которой слайдер
		this.container = document.querySelector(container);

		/*Слайды, которые нужно перемещать(в текущем проекте все слайды являются
		дочерними элементами страницы)*/
		try { this.slides = this.container.children; } catch (e) { }

		//Переключатели(стрелки) слайдера
		this.btns = document.querySelectorAll(btns);

		//Переключатели мини-слайдеров
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);

		//Горизонтальные переключатели на странице модулей
		this.prevModuleBtns = document.querySelectorAll(prevModuleBtns);
		this.nextModuleBtns = document.querySelectorAll(nextModuleBtns);

		//Активный класс
		this.activeClass = activeClass;
		//Анимации
		this.animate = animate;
		//Автопереключение слайдов
		this.autoplay = autoplay;

		//Стартовый слайд
		this.slideIndex = 1;
	}

}