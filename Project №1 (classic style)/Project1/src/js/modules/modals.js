"use strict";



const modals = () => {
	//функция привязки модального окна к определенному селектору
	function bindModal(triggerSelector, modalSelector, closeSelector) {
		/*
		1арг - элемент, нак отором срабатывает функция
		2фрг - нужное можальное окно
		3арг - элемент для закрытия модального окна*/

		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector);
		//Открытие модалки
		trigger.forEach(item => {
			item.addEventListener("click", (event) => {
				if (event.target) {
					event.preventDefault();
				}
				//Показываем модальное окно
				modal.style.display = "block";
				//Запрещаем скролл страницы при открытом модальном окне
				document.body.style.overflow = "hidden";
				//document.body.classList.add("modal-open");//Класс бутстрапа
			});

		});
		//Закрытие модалки
		close.addEventListener("click", () => {
			//Скрываем модальное окно
			modal.style.display = "none";
			//Возвращаем скролл в дефолтное значение
			document.body.style.overflow = "";
			//document.body.classList.remove("modal-open");//Класс бутстрапа
		});

		modal.addEventListener("click", (event) => {
			//При нажании на оверлей модальное окно закроется
			if (event.target === modal) {
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
	//showModalByTime(".popup", 60000);
};

export default modals;