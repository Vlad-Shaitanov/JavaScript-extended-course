"use strict";



const modals = () => {
	//Состояние (Была ли нажата хоть какая-то кнопка на странице)
	let btnPressed = false;

	//функция привязки модального окна к определенному селектору
	function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
		/*
		1арг - элемент, нак отором срабатывает функция
		2арг - нужное можальное окно
		3арг - элемент для закрытия модального окна
		4арг - параметр, определяющий, нужно ли убрать триггер со страницы при
			   закрытии модального окна*/

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

				btnPressed = true;//Юзер кликнул на одну из кнопок

				windows.forEach(item => {
					//Закрытие сразу всех модальных окон
					item.style.display = "none";
					item.classList.add("animated", "fadeIn");//Анимация появления модалок
				});

				if (destroy) {
					/*При наличии метки, триггер будет удален со страницы при
					закрытии модального окна*/
					item.remove();
				}

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
			if (event.target === modal) {
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

				let scroll = calcScroll();//Вычисленная ширина скролла
				document.body.style.marginRight = `${scroll}px`;
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

	//Выполнить при скролле до конца страницы
	function openByScroll(selector) {
		//Проверяем долистал ли юзер до конца страницы
		window.addEventListener("scroll", () => {
			if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
				/*Если ни одна кнопка на странице не нажата и (Сколько px
					пользователь отлистал сверху + тот контент, который
					сейчас виден юзеру >= полной высоты страницы)*/
				document.querySelector(selector).click();//Программный вызов события
			}
		});
	}

	bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
	bindModal(".button-consultation", ".popup-consultation", ".popup-consultation .popup-close");
	bindModal(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);
	openByScroll(".fixed-gift");

	//Попап при отсутствии действий на странице
	//showModalByTime(".popup-consultation", 6000);
};

export default modals;