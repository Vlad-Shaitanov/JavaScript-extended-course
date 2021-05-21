"use strict";

import Slider from "./slider";

export default class MainSlider extends Slider {
	constructor(btns) {
		super(btns);
	}

	//Инициализация слайдера
	showSlides(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}

		if (n < 1) {
			this.slideIndex = this.slides.length;
		}

		//Переключение всплывающего блока на 3 слайде
		try {
			this.hanson.style.opacity = "0";

			if (n === 3) {//Если мы на 3 слайде
				this.hanson.classList.add("animated");
				setTimeout(() => {
					this.hanson.style.opacity = "1";
					this.hanson.classList.add("slideInUp");
				}, 3000);
			} else {//При смене слайда
				this.hanson.classList.remove("slideInUp");
			}
		} catch (error) { }

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
		try {
			//Всплывающий со временем блок на 3 слайде
			try {
				this.hanson = document.querySelector(".hanson");
			} catch (error) { }

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
		} catch (e) { }
	}
}