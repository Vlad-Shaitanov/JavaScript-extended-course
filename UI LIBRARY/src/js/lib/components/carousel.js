"use strict";

import $ from "../core";

$.prototype.carousel = function () {

	for (let i = 0; i < this.length; i++) {
		//Общая ширина слайдера
		const width = window.getComputedStyle(this[i].querySelector('.carousel-inner')).width;
		//Все слайды
		const slides = this[i].querySelectorAll('.carousel-item');
		const slidesField = this[i].querySelector('.carousel-slides');

		const dots = this[i].querySelectorAll(".carousel-indicators li");

		//Устанавливаем ширину внутри, зависящую от кол-ва слайдов
		slidesField.style.width = 100 * slides.length + "%";
		//Ширина одного слайдера
		slides.forEach(slide => {
			//Ширина одного слайда равна ширине слайдера
			slide.style.width = width;
		});

		//Какой слайд сейчас активный и насколько нам нужно сместить блок slidesField
		let offset = 0;
		//Активный слайд
		let slideIndex = 0;

		//Навешиваем обработчики на стрелки в слайдере
		$(this[i].querySelector("[data-slide='next']")).click((event) => {
			event.preventDefault();
			//Когда слайдер дойдет до конца
			if (offset == (+width.replace(/\D/g, "") * (slides.length - 1))) {
				offset = 0;
			} else {
				offset += +width.replace(/\D/g, "");
			}

			//Перемещаем поле по оси Х
			slidesField.style.transform = `translateX(-${offset}px)`;

			/*Если мы дошли до последнего слайда и листаем вперед, то переходим к
			первому слайду*/
			if (slideIndex == slides.length - 1) {
				slideIndex = 0;
			} else {
				//Иначе просто увеличиваем на 1
				slideIndex++;
			}

			//Убираем класс активности со всех точек
			dots.forEach(dot => {
				dot.classList.remove("active");
			});
			//Добавляем класс активности текущему элементу
			dots[slideIndex].classList.add("active");
		});

		$(this[i].querySelector("[data-slide='prev']")).click((event) => {
			event.preventDefault();
			//Когда слайдер дойдет до начала
			if (offset == 0) {
				//Перемещаемся к последнему слайду
				offset = +width.replace(/\D/g, '') * (slides.length - 1);
			} else {
				offset -= +width.replace(/\D/g, "");
			}

			//Перемещаем поле по оси Х
			slidesField.style.transform = `translateX(-${offset}px)`;

			/*Если мы дошли до первого слайда и листаем назад, то переходим к
			последнему слайду*/
			if (slideIndex == 0) {
				slideIndex = slides.length - 1;
			} else {
				//Иначе просто уменьшаем на 1
				slideIndex--;
			}

			//Убираем класс активности со всех точек
			dots.forEach(dot => {
				dot.classList.remove("active");
			});
			//Добавляем класс активности текущему элементу
			dots[slideIndex].classList.add("active");
		});

		const sliderId = this[i].getAttribute("id");
		//Обработчик на точках
		$(`#${sliderId} .carousel-indicators li`).click(event => {

			const slideTo = event.target.getAttribute("data-slide-to");

			slideIndex = slideTo;

			//Отступ равен ширине каждого слайда, множенного на кол-во еэементов
			offset = +width.replace(/\D/g, '') * slideTo;

			//Перемещаем поле по оси Х
			slidesField.style.transform = `translateX(-${offset}px)`;

			//Убираем класс активности со всех точек
			dots.forEach(dot => {
				dot.classList.remove("active");
			});
			//Добавляем класс активности текущему элементу
			dots[slideIndex].classList.add('active');
		});
	}
};


//Инициализация
$(".carousel").carousel();