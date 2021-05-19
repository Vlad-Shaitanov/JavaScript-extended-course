"use strict";

export default class Difference {

	constructor(oldOfficer, newOfficer, items) {
		this.oldOfficer = document.querySelector(oldOfficer);//Левый блок
		this.newOfficer = document.querySelector(newOfficer);//Правый блок
		this.oldItems = this.oldOfficer.querySelectorAll(items);//Элементы в левом блоке
		this.newItems = this.newOfficer.querySelectorAll(items);//Элементы в правом блоке

		this.oldCounter = 0;//Счетчик открытых элементов в левом блоке
		this.newCounter = 0;//Счетчик открытых элементов в правом блоке
	}

	//Привязка кнопок
	bindTriggers(container, items, counter) {
		container.querySelector(".plus").addEventListener("click", () => {
			//Если счетчик не равен кол-ву элементов в коллекции минус 2
			if (counter !== items.length - 2) {
				//Показываем элемент
				items[counter].style.display = "flex";
				counter++;
			} else {
				//Если мы дошли до последнего элемента, который нужно показать
				items[counter].style.display = "flex";//Показываем его
				items[items.length - 1].remove();// Удаляе элемент с кнопкой
			}
		});

	}

	//Первоначальное скрытие элементов
	hideItems(items) {

		items.forEach((item, i, arr) => {
			//Если перебираемый элемент не является последним в коллекции
			if (i !== arr.length - 1) {
				//Скрываем элемент
				item.style.display = "none";
			}
		});

	}

	init() {

		this.hideItems(this.oldItems);
		this.hideItems(this.newItems);
		this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
		this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
	}
}