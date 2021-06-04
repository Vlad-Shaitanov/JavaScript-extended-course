"use strict";

import $ from "../core";

$.prototype.tab = function () {

	for (let i = 0; i < this.length; i++) {
		$(this[i]).on("click", () => {

			/*Последовательность: 
			1.добавляем активный клас текущему элементу, по
			которому кликнули.
			2. Ищем его соседние элементы и удаляем у них
			активный класс.
			3. Ищем родителя в классом tab.
			4. Внутри него ищем элементы
				с классом tab-content и удаляем у них активный класс.
			5. Среди элементов tab-content ищем элемент с индексом, соответствующим
				индексу активного таба и добавляем ему класс активности*/
			$(this[i])
				.addClass("tab-item--active")
				.siblings()
				.removeClass("tab-item--active")
				.closest(".tab")
				.find(".tab-content")
				.removeClass("tab-content--active")
				.eq($(this[i]).index())
				.addClass("tab-content--active");
		});
	}
};

//Инициализация
$("[data-tabpanel] .tab-item").tab();