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
};

export default scrolling;