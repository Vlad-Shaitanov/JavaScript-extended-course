"use strict";

const images = () => {

	const imgPopup = document.createElement("div"),//Попап для изображения
		workSection = document.querySelector(".works"),//Общая секция с изображениями
		bigImage = document.createElement("img");//Большое изображение

	imgPopup.classList.add("popup");//Стилизация попапа уже имеющимся классом
	workSection.appendChild(imgPopup);//Добавление попапа на страницу

	imgPopup.style.justifyContent = "center";
	imgPopup.style.alignItems = "center";
	imgPopup.style.display = "none";

	imgPopup.appendChild(bigImage);//Добавляем изображение в попап

	workSection.addEventListener("click", (event) => {
		event.preventDefault();

		let target = event.target;

		if (target && target.classList.contains("preview")) {
			//Если клик в картинку
			imgPopup.style.display = "flex";

			//Получаем путь к картинке
			const path = target.parentNode.getAttribute("href");

			//Устанавливаем атрибут src с путем, полученным выше
			bigImage.setAttribute("src", path);

			document.body.style.overflow = "hidden";

		}

		if (target && target.matches("div.popup")) {
			/*Проверяем, что юзер кликнул на оверлей нашего попапа
			и скрываем окно*/
			imgPopup.style.display = "none";

			document.body.style.overflow = "";

		}
	});
};

export default images;