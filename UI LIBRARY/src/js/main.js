"use strict";

import $ from "./lib/lib";

$("button").on("click", function () {
	//Меняем класс тому элементу, на который нажали
	$(this).toggleClass("active");
});


