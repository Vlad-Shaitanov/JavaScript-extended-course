"use strict";

const scrolling = (upSelector) => {
	const upElem = document.querySelector(upSelector);

	window.addEventListener("scroll", () => {
		if (document.documentElement.scrollTop > 1650) {
			upElem.classList.add("animated", "fadeIn");
			upElem.classList.remove("fadeOut");

		} else {
			//Если скроллим обратно к верху страницы
			upElem.classList.add("fadeOut");
			upElem.classList.remove("fadeIn");

		}
	});

	/*===== Реализация плавного скролла при помощи
	Request Animation Frame =====*/

	//Получаем все ссылки по селекторам(Которые начинаются с #)
	let links = document.querySelectorAll("[href^='#']"),
		speed = 0.3;//Скорость прокрутки(Чем меньше, тем быстрее)

	links.forEach(link => {
		link.addEventListener("click", function (event) {
			event.preventDefault();

			let widthTop = document.documentElement.scrollTop,
				hash = this.hash,
				toBlock = document.querySelector(hash).getBoundingClientRect().top,//Верхняя граница эл-та, к которому скроллим
				start = null;//Стартовая позиция

			requestAnimationFrame(step);

			function step(time) {
				//Проверяем, первый ли раз запускается анимация
				if (start === null) {
					start = time;
				}

				let progress = time - start;
				//Кол-во пикселей, которое нужно пролистать в течение этой анимации
				let r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

				document.documentElement.scrollTo(0, r);

				if (r != widthTop + toBlock) {
					requestAnimationFrame(step);
				} else {
					location.hash = hash;
				}
			}
		});
	});


	/*===== Реализация плавного скролла на чистом JS =====*/
	// const element = document.documentElement,
	// 	body = document.body;

	// //Рассчитаем сколько нужно проскроллить
	// const calcScroll = () => {
	// 	upElem.addEventListener("click", function (event) {
	// 		//Сколько пролистано сверху
	// 		let scrollTop = Math.round(body.scrollTop || element.scrollTop);

	// 		if (this.hash !== "") {
	// 			//Если хеш не пустой (в адресной строке сайта есть /#)
	// 			event.preventDefault();

	// 			let hashElement = document.querySelector(this.hash),
	// 				hashElementTop = 0;

	// 			while (hashElement.offsetParent) {
	// 				/*Перебираем всех родителей элемента для определения того,
	// 				сколько еще нужно отлистать*/

	// 				/* .offsetTop позволяет определить сколько осталось до
	// 				верхней границы родителского элемента от hashElement*/
	// 				hashElementTop += hashElement.offsetTop;
	// 				hashElement = hashElement.offsetParent;
	// 			}
	// 			//На сколько пикселей элемент отстоит от родительского элемента
	// 			hashElementTop = Math.round(hashElementTop);
	// 			smoothScroll(scrollTop, hashElementTop, this.hash);
	// 		}
	// 	});
	// };

	// const smoothScroll = (from, to, hash) => {
	// 	let timeInterval = 1,//Значение, через которое будет производиться анимация
	// 		prevScrollTop,
	// 		speed;

	// 	if (to > from) {
	// 		speed = 30;
	// 	} else {
	// 		speed = -30;
	// 	}

	// 	let move = setInterval(function () {
	// 		let scrollTop = Math.round(body.scrollTop || element.scrollTop);

	// 		//Если мы точно долистали до нужного момента
	// 		if (
	// 			prevScrollTop === scrollTop ||
	// 			(to > from && scrollTop >= to) ||
	// 			(to < from && scrollTop <= to)
	// 		) {
	// 			//Очищаем интервал
	// 			clearInterval(move);
	// 			//Обновление строки в браузере
	// 			history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, "") + hash);
	// 		} else {
	// 			body.scrollTop += speed;
	// 			element.scrollTop += speed;

	// 			prevScrollTop = scrollTop;
	// 		}
	// 	}, timeInterval);
	// };
	// calcScroll();
};

export default scrolling;