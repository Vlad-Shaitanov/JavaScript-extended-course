"use strict";



const modals = () => {
	//функция привязки модального окна к определенному селектору
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
		/*
		1арг - элемент, нак отором срабатывает функция
		2арг - нужное можальное окно
		3арг - элемент для закрытия модального окна
		4арг - параметр, определяющий, может ли быть закрыта модалка при клике на оверлей*/

		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windows = document.querySelectorAll("[data-modal]"),//Все модальные окна
			scroll = calcScroll();//Вычисленная ширина скролла

		//Открытие модалки
		trigger.forEach(item => {
			item.addEventListener("click", (event) => {
				if (event.target) {
					event.preventDefault();
				}

				windows.forEach(item => {
					//Закрытие сразу всех модальных окон
					item.style.display = "none";
				});

				//Показываем модальное окно
				modal.style.display = "block";
				//Запрещаем скролл страницы при открытом модальном окне
				document.body.style.overflow = "hidden";
				/*При открытии модалки будет добавлен margin-right, чтобы
				убрать перемещение страницы в бок при отключении скролла*/
				document.body.style.marginRight = `${scroll}px`;
				//document.body.classList.add("modal-open");//Класс бутстрапа
			});

		});
		//Закрытие модалки
		close.addEventListener("click", () => {
			windows.forEach(item => {
				//Закрытие сразу всех модальных окон
				item.style.display = "none";
			});
			//Скрываем модальное окно
			modal.style.display = "none";
			//Возвращаем скролл в дефолтное значение
			document.body.style.overflow = "";
			document.body.style.marginRight = "0px";//Убираем правый марджин
			//document.body.classList.remove("modal-open");//Класс бутстрапа
		});

		modal.addEventListener("click", (event) => {
			//При нажании на оверлей модальное окно закроется
			if (event.target === modal && closeClickOverlay) {
				windows.forEach(item => {
					//Закрытие сразу всех модальных окон
					item.style.display = "none";
				});

				//Скрываем модальное окно
				modal.style.display = "none";
				//Возвращаем скролл в дефолтное значение
				document.body.style.overflow = "";
				document.body.style.marginRight = "0px";//Убираем правый марджин

				//document.body.classList.remove("modal-open");//Класс бутстрапа
			}
		});
	}

	function showModalByTime(selector, time) {//Открытие модалки поистечении заданного времени
		setTimeout(() => {
			let display;

			document.querySelectorAll("[data-modal]").forEach(item => {
				/*Перебираем все модалки и определяем, показывается ли какое-то
				окно в данный момент*/

				if (getComputedStyle(item).display !== "none") {
					/*Используются не инлайновые стили, а СКОМПИЛИРОВАННЫЕ БРАУЗЕРОМ
					(в стилях вкладка Computed) */
					display = "block";
				}
			});

			/*Если в данный момент ни одно модальное окно не открыто, то мы
			покажем то, которое нужно*/
			if (!display) {
				document.querySelector(selector).style.display = "block";
				document.body.style.overflow = "hidden";
			}


		}, time);
	}

	//Подсчет ширины скролла сбоку страницы
	function calcScroll() {
		let div = document.createElement("div");

		div.style.width = "50px";
		div.style.height = "50px";
		div.style.overflowY = "scroll";
		div.style.visibility = "hidden";

		document.body.appendChild(div);

		/*Ширина скролла равна полной ширине минус ширина клиента*/
		let scrollWidth = div.offsetWidth - div.clientWidth;

		//Удаляем созданный элемент
		div.remove();

		return scrollWidth;
	}

	bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
	bindModal(".button-consultation", ".popup-consultation", ".popup-consultation .popup-close");

	showModalByTime(".popup-consultation", 6000);
};

export default modals;