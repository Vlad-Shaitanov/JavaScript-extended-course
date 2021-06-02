"use strict";

import $ from "../core";

$.prototype.modal = function () {

	for (let i = 0; i < this.length; i++) {
		const target = this[i].getAttribute("data-target");

		$(this[i]).click((e) => {
			e.preventDefault();

			$(target).fadeIn(500);
			//Запрещаем скролл
			document.body.style.overflow = "hidden";
		});
	}

	//Закрытие модальных окон при клике на кнопки
	const closeElements = document.querySelectorAll("[data-close]");
	console.log(closeElements);
	closeElements.forEach(elem => {
		$(elem).click(() => {

			$(".modal").fadeOut(500);
			document.body.style.overflow = "";
		});
	});

	//Закрытие модальных окон при клике на оверлей
	$(".modal").click((e) => {
		if (e.target.classList.contains("modal")) {
			$(".modal").fadeOut(500);
			document.body.style.overflow = "";
		}
	});
};

//Инициализация
$('[data-toggle="modal"]').modal();