"use strict";

const showMoreStyles = (trigger, styles) => {
	/*Аргументы: 
	1- Кнопка, на которой срабатывает
	2- карточки, которые надо показать(раскрыть)*/
	const cards = document.querySelectorAll(styles),
		btn = document.querySelector(trigger);

	//Добавляем анимацию карточкам
	cards.forEach(card => {
		card.classList.add("animated", "fadeInUp");
	});

	btn.addEventListener("click", () => {
		cards.forEach(card => {
			card.classList.remove("hidden-lg", "hidden-md", "hidden-sm", "hidden-xs");
			card.classList.add("col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
		});
		//После клика по кнопке она убирается
		btn.style.display = "none";

	});
};

export default showMoreStyles;