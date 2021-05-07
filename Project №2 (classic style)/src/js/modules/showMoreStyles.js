"use strict";

import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {
	/*Аргументы: 
	1- Кнопка, на которой срабатывает
	2- карточки, которые надо показать(раскрыть)*/

	//const cards = document.querySelectorAll(styles);
	const btn = document.querySelector(trigger);

	/*===== (1 способ) Простая подгрузка файлов через изменение классов =====*/
	// //Добавляем анимацию карточкам
	// cards.forEach(card => {
	// 	card.classList.add("animated", "fadeInUp");
	// });

	// btn.addEventListener("click", () => {
	// 	cards.forEach(card => {
	// 		card.classList.remove("hidden-lg", "hidden-md", "hidden-sm", "hidden-xs");
	// 		card.classList.add("col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
	// 	});
	// 	//После клика по кнопке она убирается
	// 	btn.style.display = "none";

	// });
	/*==========*/

	/*===== (2 способ) Подгрузка файлов через запросы к базе данных =====*/

	btn.addEventListener("click", function () {
		getResource("http://localhost:3000/styles")
			.then(res => createCards(res))
			.catch(error => {
				console.log(error);
			});
		this.remove();//Контекстом будет объекто, на котором вызвана функция
	});

	//Создание карточек
	function createCards(response) {
		response.forEach(({ src, title, link }) => {
			let card = document.createElement("div");

			//Стилизация и анимация
			card.classList.add("animated", "fadeInUp", "col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
			//Верстка самой карты
			card.innerHTML = `
				<div class="styles-block">
					<img src=${src} alt="style">
					<h4>${title}</h4>
					<a href=${link}>Подробнее</a>
	 			</div>
			`;

			//Добавляем карточки в родительский блок
			document.querySelector(wrapper).appendChild(card);
		});
	}

};

export default showMoreStyles;