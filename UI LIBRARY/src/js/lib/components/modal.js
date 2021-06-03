"use strict";

import $ from "../core";

$.prototype.modal = function (created) {
	//Аргумент определяет, было ли модальное окно создано програмно

	for (let i = 0; i < this.length; i++) {
		const target = this[i].getAttribute("data-target");

		$(this[i]).click((e) => {
			e.preventDefault();

			$(target).fadeIn(500);
			//Запрещаем скролл
			document.body.style.overflow = "hidden";
		});

		//Закрытие модальных окон при клике на кнопки
		const closeElements = document.querySelectorAll(`${target} [data-close]`);
		//console.log(closeElements);
		closeElements.forEach(elem => {
			$(elem).click(() => {

				//Закрываем то модальное окно, которое на данный момент открыто
				$(target).fadeOut(500);
				document.body.style.overflow = "";

				//Если модальное окно было создано при помощи скрипта
				if (created) {
					//Удаляем его после закрытия
					document.querySelector(target).remove();
				}
			});
		});

		//Закрытие модальных окон при клике на оверлей
		$(target).click(e => {
			if (e.target.classList.contains("modal")) {
				$(target).fadeOut(500);
				document.body.style.overflow = "";

				//Если модальное окно было создано при помощи скрипта
				if (created) {
					//Удаляем его после закрытия
					document.querySelector(target).remove();
				}
			}
		});
	}


};

//Инициализация
$('[data-toggle="modal"]').modal();

//Динамическое создание модальных окон
$.prototype.createModal = function ({ text, btns } = {}) {

	for (let i = 0; i < this.length; i++) {
		//Создаем оболочку модального окна
		let modal = document.createElement("div");
		//Стилизуем
		modal.classList.add("modal");

		//Кнопки в модальном окне
		const buttons = [];
		for (let j = 0; j < btns.count; j++) {
			//Создаем кнопки
			let btn = document.createElement("button");
			//Стили
			btn.classList.add("btn", ...btns.settings[j][1]);
			//Текст кнопки
			btn.textContent = btns.settings[j][0];
			//Закрывает ли кнопка модальное окно
			if (btns.settings[j][2]) {
				btn.setAttribute("data-close", "true");
			}
			//Колбэк при его наличии
			if (btns.settings[j][3] && typeof (btns.settings[j][3]) === "function") {
				btn.addEventListener("click", btns.settings[j][3]);
			}

			buttons.push(btn);
		}

		//Устанавливаем атрибут
		modal.setAttribute("id", this[i].getAttribute("data-target").slice(1));

		//Создаем внутреннее наполнение модального окна
		modal.innerHTML = `
		<div class="modal-dialog">
			<div class="modal-content">
				<button class="close" data-close>
					<span>&times;</span>
				</button>
				<div class="modal-header">
					<div class="modal-title">${text.title}</div>
				</div>
				<div class="modal-body">${text.body}</div>
				<div class="modal-footer">
					
				</div>
			</div>
		</div>
		`;

		//Добавляем кнопки в модальное окно
		modal.querySelector(".modal-footer").append(...buttons);
		//Добавляем модальное окно на страницу
		document.body.appendChild(modal);

		//ПРивязка триггера к новосозданному модальному окну
		$(this[i]).modal(true);
		//Выбираем то модальное окно, которое нам сейчас нужно и сразу вызываем его
		$(this[i].getAttribute("data-target")).fadeIn(500);
	}
};