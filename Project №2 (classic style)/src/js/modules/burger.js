"use strict";

const burger = (menuSelector, burgerSelector) => {
	const menuElem = document.querySelector(menuSelector),
		burgerElem = document.querySelector(burgerSelector);

	//Скрываем меню
	menuElem.style.display = "none";

	burgerElem.addEventListener("click", () => {

		if (menuElem.style.display === "none" && window.screen.availWidth < 993) {
			/*Если меню скрыто, и ширина экрана(Без панели задач, полосы
				прокрутки и т.п.) юзера < 993px, то мы его покажем*/
			menuElem.style.display = "block";
		} else {
			//В противном случае скрываем
			menuElem.style.display = "none";

		}
	});

	window.addEventListener("resize", () => {
		if (window.screen.availWidth > 992) {
			//Если ширина экрана больше 992px, то скрываем бургер
			menuElem.style.display = "none";
		}

	});
};

export default burger;