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
			windows = document.querySelectorAll("[data-modal]");//Все модальные окна

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
				//document.body.classList.remove("modal-open");//Класс бутстрапа
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(() => {
			document.querySelector(selector).style.display = "block";
			document.body.style.overflow = "hidden";
		}, time);
	}

	bindModal(".popup_engineer_btn", ".popup_engineer", ".popup_engineer .popup_close");
	bindModal(".phone_link", ".popup", ".popup .popup_close");
	bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
	bindModal(".popup_calc_button", ".popup_calc_profile", ".popup_calc_profile_close", false);
	bindModal(".popup_calc_profile_button", ".popup_calc_end", ".popup_calc_end_close", false);
	//showModalByTime(".popup", 60000);
};

export default modals;