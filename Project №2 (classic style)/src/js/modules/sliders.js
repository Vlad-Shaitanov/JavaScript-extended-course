"use strict";

const sliders = (slides, dir, prev, next) => {
	/*Аргументы:
	1- слайды, которые надо переключать
	2- направление движения слайдера
	3- (prev,next) селекторы переключения слайдов*/

	//Текущий слайд, который показывается юзеру
	let slideIndex = 1,
		paused = false;//Поведение при курсоре в области слайдера
	const items = document.querySelectorAll(slides);//Слайды

	function showSlides(n) {
		//Если n больше, чем количество слайдов
		if (n > items.length) {
			//Возвращаем слайдер к 1 слайду
			slideIndex = 1;
		}

		if (n < 1) {
			slideIndex = items.length;
		}

		//Перебираем слайды
		items.forEach(item => {
			item.classList.add("animated");//Добавление анимации слайдов
			item.style.display = "none";//Скрываем все слайды
		});

		items[slideIndex - 1].style.display = "block";//Показываем нужный слайд
	}

	//Инициализация. При первой загрузке будет виден первый слайд
	showSlides(slideIndex);

	//Изменение (+/-) активного слайда
	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	//Если селекторы кнопок не были переданы, код не сломается
	try {
		const prevBtn = document.querySelector(prev),
			nextBtn = document.querySelector(next);

		prevBtn.addEventListener("click", () => {
			plusSlides(-1);
			items[slideIndex - 1].classList.remove("slideInLeft");
			items[slideIndex - 1].classList.add("slideInRight");
		});
		nextBtn.addEventListener("click", () => {
			plusSlides(1);
			items[slideIndex - 1].classList.remove("slideInRight");
			items[slideIndex - 1].classList.add("slideInLeft");
		});
	} catch (e) {

	}

	function activateAnimation() {
		//Обработка направления переключения слайдера
		if (dir === "vertical") {
			paused = setInterval(function () {
				plusSlides(1);

				items[slideIndex - 1].classList.add("slideInDown");
			}, 3000);
		} else {
			paused = setInterval(function () {
				plusSlides(1);

				items[slideIndex - 1].classList.remove("slideInRight");
				items[slideIndex - 1].classList.add("slideInLeft");
			}, 3000);
		}
	}

	activateAnimation();

	//Если мышь внутри слайдера
	items[0].parentNode.addEventListener("mouseenter", () => {
		clearInterval(paused);//Сброс интервала
	});

	//Если мышь вне слайдера, снова запускаем функцию
	items[0].parentNode.addEventListener("mouseleave", () => {
		activateAnimation();
	});
};

export default sliders;