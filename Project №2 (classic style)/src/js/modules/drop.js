"use strict";

import { postData } from "../services/requests";

const drop = () => {
	// drag *
	// dragend *
	// dragenter - перетаскиваемый объект находится над dropArea
	// dragexit *
	// dragleave - объект за пределами dropArea
	// dragover - объект зависает над dropArea
	// dragstart *
	// drop - объект отправлен в dropArea

	// События (*) срабытывают на элементе, который мы перетаскиваем 

	const fileInputs = document.querySelectorAll("[name='upload']");
	const singleInput = document.querySelector(".single-input");
	const designer = "assets/server.php";

	/*Создаем массив из нужных событий, перебираем его, чтобы затем назначить
	их инпутам*/
	["dragenter", "dragleave", "dragover", "drop"].forEach(eventName => {
		//Перебор инпутов и назначение событий
		fileInputs.forEach(input => {
			input.addEventListener(eventName, preventDefaults, false);
		});
	});

	function preventDefaults(event) {
		//Отмена стандартного поведения
		event.preventDefault();
		//Отмена всплытия
		event.stopPropagation();
	}

	//Подсветка dropArea
	function highlight(item) {

		item.closest('.file_upload').style.border = "5px solid yellow";
		item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, 0.7)";
	}

	//Отмена подсветки dropArea
	function unhighlight(item) {

		item.closest('.file_upload').style.border = "none";
		if (item.closest(".calc_form")) {
			item.closest('.file_upload').style.backgroundColor = "#FFFFFF";
		} else if (item.closest(".top_load")) {
			item.closest('.file_upload').style.backgroundColor = "#F7E7E6";

		} else {

			item.closest('.file_upload').style.backgroundColor = "#ededed";
		}
	}

	//Навешиваем подсветку dropArea
	["dragenter", "dragover"].forEach(eventName => {
		//Перебор инпутов и назначение событий
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => highlight(input), false);
		});
	});

	//Навешиваем отмену подсветки
	["dragleave", "drop"].forEach(eventName => {
		//Перебор инпутов и назначение событий
		fileInputs.forEach(input => {
			input.addEventListener(eventName, () => unhighlight(input), false);
		});
	});

	fileInputs.forEach(input => {
		input.addEventListener("drop", (event) => {
			//Берем файл из Drag&Drop и помещаем его в инпут на странице
			input.files = event.dataTransfer.files;
			console.log(event);
			let dots;
			const arr = input.files[0].name.split('.');

			arr[0].length > 6 ? dots = "..." : dots = '.';
			const name = arr[0].substring(0, 6) + dots + arr[1];
			input.previousElementSibling.textContent = name;

			// if (event.path[0].classList.contains("single-input")) {
			// 	console.log("ok");
			// }
		});
	});


};

export default drop;