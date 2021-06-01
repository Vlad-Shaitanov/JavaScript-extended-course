import $ from "../core";

$.prototype.dropdown = function () {

	for (let i = 0; i < this.length; i++) {
		//Ищем и записываем в переменную значение отрибута id
		const id = this[i].getAttribute("id");

		$(this[i]).click(() => {
			//Если значение атрибута id совпадает со значением data-атрибута
			$(`[data-toggle-id=${id}]`).fadeToggle(300);
		});
	}
};

//Сразу инициализируем функцию
$(".dropdown-toggle").dropdown();