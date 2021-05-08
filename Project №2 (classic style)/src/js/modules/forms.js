"use strict";

import { postData } from "../services/requests";

const forms = () => {
	//Получаем все формы со страницы
	const form = document.querySelectorAll("form");
	//Получаем все инпуты
	const inputs = document.querySelectorAll("input");
	const windows = document.querySelectorAll("[data-modal]");//Все модальные окна
	//Блоки форм, куда загружаются изображения
	const upload = document.querySelectorAll("[name='upload']");


	//checkNumInputs("input[name='user_phone']");//Фильтр ввода (только цифры)


	//Объект-хранилище сообщений для пользователя
	const message = {
		loading: "Загрузка...",
		success: "Спасибо! Скоро мы с Вами свяжемся",
		failure: "Что-то пошло не так :(",
		spinner: "assets/img/spinner.gif",
		ok: "assets/img/ok.png",
		fail: "assets/img/fail.png",
	};

	//Пути для отправки формы
	const path = {
		designer: "assets/server.php",
		question: "assets/question.php",
	};

	//Отправка запроса


	//Очистка инпутов формы
	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = "";
		});

		upload.forEach(item => {
			item.previousElementSibling.textContent = "Файл не выбран";
		});
	};

	//Закрытие всех модальных окон после отправки формы
	const closeModals = () => {
		windows.forEach(item => {
			item.style.display = "none";
		});
	};

	upload.forEach(item => {
		item.addEventListener("input", () => {
			console.log(item.files[0]);

			let dots;//Сколько точек поставить
			//Массив с 2 элементами (название файла до точки и расширение)
			const arr = item.files[0].name.split(".");

			//Смотрим сколько символов в имени и если > 6, то обрезаем и добавляем ...
			arr[0].length > 6 ? dots = "..." : dots = ".";

			/*Имя составляем из обрезанного имени файла(если > 6 знаков),
			добавляем переменную с точками и затем расширение*/
			const name = arr[0].substring(0, 6) + dots + arr[1];
			item.previousElementSibling.textContent = name;
		});
	});

	//Перебираем все формы и вешаем обработчик на отправку
	form.forEach(item => {
		item.addEventListener("submit", event => {
			event.preventDefault();

			//Создаем блок для вывода сообщения
			let statusMessage = document.createElement("div");
			statusMessage.classList.add("status");
			//Добавляем сообщение не к самой форме, а к ее род.элементу
			item.parentNode.appendChild(statusMessage);

			//Скрываем форму
			item.classList.add("animated", "fadeOutUp");//Сначала она стала прозрачной
			setTimeout(() => {//Теперь полностью скрываем форму
				item.style.display = "none";
			}, 400);

			let statusImg = document.createElement("img");
			statusImg.setAttribute("src", message.spinner);
			statusImg.classList.add("animated", "fadeInUp");
			//Помещаем картинку в блок со статусом запроса
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement("div");
			textMessage.innerHTML = message.loading;
			statusMessage.appendChild(textMessage);


			//Вытаскиваем данные из формы
			const formData = new FormData(item);//Опционально можно перевести в формат JSON
			let api;//Куда отправлять форму
			/*Ищем ближайший родительский элемент с классом.
			Если элемент есть, отправляем форму на один сервер, если нет - на другой*/
			item.closest(".popup-design") || item.classList.contains("calc_form") ? api = path.designer : api = path.question;
			console.log(api);

			// if (item.getAttribute('data-calc') === "calculation") {
			// 	for (let key in state) {
			// 		formData.append(key, state[key]);
			// 	}
			// }

			postData(api, formData)
				.then(res => {
					console.log(res);

					statusImg.setAttribute("src", message.ok);
					textMessage.textContent = message.success;
				})
				.catch(() => {
					textMessage.textContent = message.failure;
					statusImg.setAttribute("src", message.fail);
				})
				.finally(() => {
					//Очищаем инпуты
					clearInputs();
					//Удаляем блок с сообщением
					setTimeout(() => {
						statusMessage.remove();
						document.body.style.overflow = "";//Возврат скролла
						item.style.display = "block";
						item.classList.remove("fadeOutUp");//Убрали анимацию скрытия формы
						item.classList.add("fadeInUp");//Добавили анимацию появления формы
					}, 5000);//Сообщение о статусе запроса

					setTimeout(closeModals, 7000);//Закрываем модалки
				});
		});
	});
};

export default forms;