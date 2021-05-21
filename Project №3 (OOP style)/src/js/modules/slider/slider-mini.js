"use strict";

import Slider from "./slider";

export default class MiniSlider extends Slider {
	constructor(container, next, prev, activeClass, animate, autoplay) {
		super(container, next, prev, activeClass, animate, autoplay);
	}

	//Стилизация активного слайда
	decorizeSlides() {

		this.slides.forEach(slide => {
			//Сначала убираем активный класс со всех слайдов
			slide.classList.remove(this.activeClass);

			//Если передан параментр анимации в true
			if (this.animate) {
				slide.querySelector('.card__title').style.opacity = '0.4';
				slide.querySelector('.card__controls-arrow').style.opacity = '0';
			}
		});

		//Если активный первый слайд это не кнопка
		if (!this.slides[0].closest('button')) {

			//Добавляем активный класс первому элементу
			this.slides[0].classList.add(this.activeClass);
		}

		if (this.animate) {

			this.slides[0].querySelector('.card__title').style.opacity = '1';
			this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
		}
	}

	nextSlide() {

		/*Условия нужны, т.к. В данном проекте кнопки находятся прямо
		  внутри слайдера(дочерние элементы). Такой функционал позволяет
		  избежать добавления активного класса кнопкам при переключении*/
		if (this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON") {

			this.container.appendChild(this.slides[0]); // Slide
			this.container.appendChild(this.slides[1]); // Btn
			this.container.appendChild(this.slides[2]); // Btn
			this.decorizeSlides();
		} else if (this.slides[1].tagName == "BUTTON") {

			this.container.appendChild(this.slides[0]); // Slide
			this.container.appendChild(this.slides[1]); // Btn
			this.decorizeSlides();
		} else {
			//Помещаем первый элемент в конец слайдера
			this.container.appendChild(this.slides[0]);
			this.decorizeSlides();
		}
	}

	//Привязка кнопок
	bindTriggers() {
		this.next.addEventListener('click', () => this.nextSlide());

		this.prev.addEventListener('click', () => {

			for (let i = this.slides.length - 1; i > 0; i--) {

				if (this.slides[i].tagName !== "BUTTON") {
					//Последний элемент в списке
					let active = this.slides[i];
					//Вставляем его перед первым слайдом
					this.container.insertBefore(active, this.slides[0]);
					this.decorizeSlides();
					break;
				}
			}


		});
	}

	init() {

		try {
			this.container.style.cssText = `
        		display: flex;
            	flex-wrap: wrap;
            	overflow: hidden;
           		align-items: flex-start;
        		`;

			this.bindTriggers();
			this.decorizeSlides();

			if (this.autoplay) {
				setInterval(() => this.nextSlide(), 5000);
			}
		} catch (e) { }
	}
}