"use strict";

import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
	//Получаем все формы со страницы
	const form = document.querySelectorAll("form");
	//Получаем все инпуты
	const inputs = document.querySelectorAll("input");
	const windows = document.querySelectorAll("[data-modal]");//Все модальные окна


	checkNumInputs("input[name='user_phone']");//Фильтр ввода (только цифры)


	//Объект-хранилище сообщений для пользователя
	const message = {
		loading: "Загрузка...",
		success: "Спасибо! Скоро мы с Вами свяжемся",
		failure: "Что-то пошло не так :("
	};

	//Отправка запроса
	const postData = async (url, data) => {
		//Показываем сообщение о загрузке
		document.querySelector(".status").textContent = message.loading;

		//Отправляем запрос
		let res = await fetch(url, {
			method: "POST",
			body: data
		});

		return await res.text();
	};

	//Очистка инпутов формы
	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = "";
		});
	};

	//Закрытие всех модальных окон после отправки формы
	const closeModals = () => {
		windows.forEach(item => {
			item.style.display = "none";
		});
	};

	//Перебираем все формы и вешаем обработчик на отправку
	form.forEach(item => {
		item.addEventListener("submit", event => {
			event.preventDefault();

			//Создаем блок для вывода сообщения
			let statusMessage = document.createElement("div");
			statusMessage.classList.add("status");
			item.appendChild(statusMessage);

			//Вытаскиваем данные из формы
			const formData = new FormData(item);//Опционально можно перевести в формат JSON

			//Если форма имеет атрибут data-calc (последняя форма в блоке с калькулятором):
			if (item.getAttribute("data-calc") === "end") {
				for (let key in state) {
					//Добавляем в форму данные из стейта(парамерты окна в калькуляторе)
					formData.append(key, state[key]);
				}
			}

			postData("assets/server.php", formData)
				.then(res => {
					console.log(res);

					statusMessage.textContent = message.success;
				})
				.catch(() => statusMessage.textContent = message.failure)
				.finally(() => {
					//Очищаем инпуты
					clearInputs();
					//Удаляем блок с сообщением
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);//Сообщение о статусе запроса

					setTimeout(closeModals, 7000);//Закрываем модалки
				});
		});
	});
};

export default forms;