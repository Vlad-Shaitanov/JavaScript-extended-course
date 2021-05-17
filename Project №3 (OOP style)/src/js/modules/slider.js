"use strict";

export default class Slider {
	constructor(page, btns) {
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

	//Инициализация слайдера
	showSlides(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}

		if (n < 1) {
			this.slideIndex = this.slides.length;
		}

		//Сначала скроем все слайды
		this.slides.forEach(slide => {
			slide.style.display = "none";
		});

		//Показываем нужный слайд
		this.slides[this.slideIndex - 1].style.display = "block";
	}

	//Переключение слайдов
	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	render() {
		this.btns.forEach(item => {
			item.addEventListener("click", () => {
				this.plusSlides(1);
			});

			//Переключение на первый слайд по клику на лого
			item.parentNode.previousElementSibling.addEventListener("click", (event) => {
				event.preventDefault();
				this.slideIndex = 1;

				//Повторная инициализация слайдера
				this.showSlides(this.slideIndex);
			});
		});

		this.showSlides(this.slideIndex);
	}

}