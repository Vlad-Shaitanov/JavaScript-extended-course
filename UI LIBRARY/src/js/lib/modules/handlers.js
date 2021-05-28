
import $ from "../core";

//?Здесь будут действия, направленные на взаимодействия на странице

//Назначение событий
$.prototype.on = function (eventName, callback) {
	//Проверяем есть ли аргументы. Если нет, то просто вернем объект
	if (!eventName || !callback) {
		return this;
	}

	for (let i = 0; i < this.length; i++) {
		this[i].addEventListener(eventName, callback);
	}

	//Возвращаем объект
	return this;
};

//Удаление событий
$.prototype.off = function (eventName, callback) {
	//Проверяем есть ли аргументы. Если нет, то просто вернем объект
	if (!eventName || !callback) {
		return this;
	}

	for (let i = 0; i < this.length; i++) {
		this[i].removeEventListener(eventName, callback);
	}

	//Возвращаем объект
	return this;
};

//Отдельное событие клика
$.prototype.click = function (handler) {

	for (let i = 0; i < this.length; i++) {
		//Проверяем есть ли аргументы
		if (handler) {
			//Если аргумент есть, то навешиваем событие
			this[i].addEventListener("click", handler);

		} else {
			//Если аргумента нет, то выполним виртуальный клик по элементу
			this[i].click();
		}
	}

	//Возвращаем объект
	return this;
};