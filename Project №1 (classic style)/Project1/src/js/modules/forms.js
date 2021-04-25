"use strict";

const forms = () => {
	//Получаем все формы со страницы
	const form = document.querySelectorAll("form");
	//Получаем все инпуты
	const inputs = document.querySelectorAll("input");
	//Инпуты с телефонами
	const phoneInputs = document.querySelectorAll("input[name='user_phone']");

	phoneInputs.forEach(item => {
		item.addEventListener("input", () => {
			/*В регулярке ищем все НЕцифры и заменяем пустым местом,
			при такой проверке останутся только числа*/
			item.value = item.value.replace(/\D/, "");
		});
	});

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
					}, 5000);
				});
		});
	});
};

export default forms;