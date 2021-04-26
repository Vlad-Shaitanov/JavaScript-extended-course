"use strict";

import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
	const windowForm = document.querySelectorAll(".balcon_icons_img"),//Форма области для остекления
		windowWidth = document.querySelectorAll("#width"),//Ширина области для остекления
		windowHeight = document.querySelectorAll("#height"),//Высота области для остекления
		windowType = document.querySelectorAll("#view_type"),//Выбор типа остекления
		windowProfile = document.querySelectorAll(".checkbox");//Теплое или холодное остекление

	checkNumInputs("#width");//Валидация инпута с шириной
	checkNumInputs("#height");//Валидация инпута с высотой

	const bindActionToElems = (event, elem, prop) => {
		//Аргументы - событие, элемент на котором вызывается событие, свойство

		elem.forEach((item, i) => {
			item.addEventListener(event, () => {

				switch (item.nodeName) {
					/*Будем делать проверку на соответствие имени Ноды, чтобы
					определить с каким точно элементом сейчас работаем.
					Кейсы должны быть в верхнем регистре, т.к. имя Ноды со
					страницы мы тоже получаем в верхнем регистре*/
					case "SPAN":
						//При клике в спан будем записывать в проп номер изображения
						state[prop] = i;
						//console.log("span");
						break;

					case "INPUT":
						//Проверим тип инпута
						if (item.getAttribute("type") === "checkbox") {
							/*Условие выполнится только тогда, когда юзер
							кликнет именно в чекбокс*/

							/*Если индекс строго равен 0, то будет выбрано
							холодное остекление, в и ном случае - теплое*/
							i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";

							//Функционал для выбора только одного чекбокса
							elem.forEach((box, index) => {
								//Перебираем все чекбоксы и снимаем с них галки.
								box.checked = false;

								//Если индекс элементы и чекбокса будут равны, то ставим галку
								if (i === index) {
									box.checked = true;
								}
							});
						} else {
							state[prop] = item.value;
						}
						break;

					case "SELECT":
						state[prop] = item.value;
						break;

					default:
						break;
				}

				console.log(state);

			});
		});
	};

	bindActionToElems("click", windowForm, "form");
	bindActionToElems("input", windowHeight, "height");
	bindActionToElems("input", windowWidth, "width");
	bindActionToElems("change", windowType, "type");
	bindActionToElems("change", windowProfile, "profile");

};

export default changeModalState;