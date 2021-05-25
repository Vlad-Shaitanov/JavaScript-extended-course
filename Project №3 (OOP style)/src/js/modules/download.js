"use strict";

export default class Download {
	constructor(triggers) {
		this.btns = document.querySelectorAll(triggers);
		//Путь для скачивания файла
		this.path = "assets/img/mainbg.jpg";
	}

	//Загрузка
	downloadItem(path) {
		//Создаем ссылку
		const link = document.createElement("a");

		//Настраиваем
		link.setAttribute("href", path);
		link.setAttribute("download", "nice_picture");
		link.style.display = "none";

		document.body.appendChild(link);

		link.click();//Вызываем программно

		//Удаляем со страницы
		document.body.removeChild(link);
	}

	init() {

		this.btns.forEach(btn => {
			btn.addEventListener("click", () => {
				this.downloadItem(this.path);
			});
		});
	}
}