"use strict";

import $ from "../core";

//? Работа с анимациями fadeIn и fadeOut

//Техническая функция
$.prototype.animateOverTime = function (dur, cb, fin) {
	/*Параметры: длительность, колбэк, финальная функция(запустится в конце,
	когда отработает анимация)*/


	let timeStart;//Первоначальный запуск анимации

	function _animateOverTime(time) {

		//Если переменная timeStart не инициализирована
		if (!timeStart) {
			//Записываем стартовое время
			timeStart = time;
		}

		//Сколько времени прошло с момента старта анимации
		let timeElapsed = time - timeStart;
		/*Переменная для работы с параметром opacity в анимации. Чем меньше
		будет длительность анимации, тем быстрее мы достигнем opacity = 1 и
		анимация быстрее закончится*/
		let complection = Math.min(timeElapsed / dur, 1);

		cb(complection);

		//Пока текущая продолжительность анимации меньше общей, запускаем функцию
		if (timeElapsed < dur) {
			requestAnimationFrame(_animateOverTime);
		} else {
			//Если переданный 3 аргумент это функция
			if (typeof (fin) === "function") {
				fin();
			}
		}
	}

	//Возвращаем функцию
	return _animateOverTime;
};

//Техническая функция
// $.prototype.toggleAnim = function (dur, fin, anim, display = "block") {

// 	function _toggleAnim() {
// 		if (anim) {
// 			if (anim == "in") {

// 			}

// 			if (anim == "out") {

// 			}
// 		}
// 	}

// 	return _toggleAnim;
// };

//Анимация, показывающая элементы
$.prototype.fadeIn = function (dur, display, fin) {

	for (let i = 0; i < this.length; i++) {
		this[i].style.display = display || "block";//Другой формат записи параметра по умолчанию

		const _fadeIn = (complection) => {
			this[i].style.opacity = complection;
		};

		const ani = this.animateOverTime(dur, _fadeIn, fin);
		requestAnimationFrame(ani);
	}

	//Возвращаем объект
	return this;
};

//Анимация, скрывающая элементы
$.prototype.fadeOut = function (dur, fin) {

	for (let i = 0; i < this.length; i++) {

		const _fadeOut = (complection) => {
			this[i].style.opacity = 1 - complection;

			//Если элемент стал полностью прозрачным, мы его скрываем со страницы
			if (complection === 1) {
				this[i].style.display = "none";
			}

		};

		const ani = this.animateOverTime(dur, _fadeOut, fin);
		requestAnimationFrame(ani);
	}

	//Возвращаем объект
	return this;
};

//Переключение анимации
$.prototype.fadeToggle = function (dur, display, fin) {

	for (let i = 0; i < this.length; i++) {

		//Если скомпилированное св-во имеет значение none
		if (window.getComputedStyle(this[i]).display === "none") {
			this[i].style.display = display || "block";//Другой формат записи параметра по умолчанию

			const _fadeIn = (complection) => {
				this[i].style.opacity = complection;
			};

			const ani = this.animateOverTime(dur, _fadeIn, fin);
			requestAnimationFrame(ani);
		} else {
			const _fadeOut = (complection) => {
				this[i].style.opacity = 1 - complection;

				//Если элемент стал полностью прозрачным, мы его скрываем со страницы
				if (complection === 1) {
					this[i].style.display = "none";
				}

			};

			const ani = this.animateOverTime(dur, _fadeOut, fin);
			requestAnimationFrame(ani);
		}
	}
	//Возвращаем объект
	return this;
};

//TODO отрефакторить методы fadeIn и fadeOut через техническую функцию