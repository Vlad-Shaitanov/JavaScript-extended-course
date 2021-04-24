"use strict";

const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
	/*Функция принимает 4 аргумента:
	1- селектор общего блока табов
	2- селектор выбранного таба
	3- селектор контента выбранного таба
	4- активный класс стилизации таба*/

	const header = document.querySelector(headerSelector),
		tab = document.querySelectorAll(tabSelector),
		content = document.querySelectorAll(contentSelector);

	const hideTabContent = () => {
		//Скрываем контент в табах
		content.forEach(item => {
			item.style.display = "none";
		});

		tab.forEach(item => {
			//Убираем активный класс со всех табов
			item.classList.remove(activeClass);
		});
	};

	const showTabContent = (i = 0) => {
		//Параметр по умолч. 0, чтобы сделать изначально активным первый таб
		//Показываем контент нужного таба
		content[i].style.display = "block";

		//Добавляем активный класс выбранному табу
		tab[i].classList.add(activeClass);
	};

	hideTabContent();
	showTabContent();

	header.addEventListener("click", event => {
		const target = event.target;

		if (target && (target.classList.contains(tabSelector.replace(/\./, "")) ||
			target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
			/*Регулярные выражения использованы для того, чтобы у селектора,
			который мы получали выше, убрать точку(.class => class)
			parentNode - родительский элемент*/

			tab.forEach((item, i) => {
				if (target == item || target.parentNode == item) {
					/*Если таргет или его родительский элемент равен
					перебираемому элементу*/
					hideTabContent();
					showTabContent(i);
				}
			});

		}
	});
};

export default tabs;