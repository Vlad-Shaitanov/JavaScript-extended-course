"use strict";

export default class Slider {
	constructor({ page = "", btns = "", next = "", prev = "" } = {}) {
		//Страница, на которой слайдер
		this.page = document.querySelector(page);

		/*Слайды, которые нужно перемещать(в текущем проекте все слайды являются
		дочерними элементами страницы)*/
		this.slides = this.page.children;

		//Переключатели(стрелки) слайдера
		this.btns = document.querySelectorAll(btns);

		//Стартовый слайд
		this.slideIndex = 1;
	}

}