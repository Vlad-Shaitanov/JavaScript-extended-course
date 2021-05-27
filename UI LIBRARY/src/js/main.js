"use strict";

import $ from "./lib/lib";

$("button").on("click", function () {
	//Меняем класс тому элементу, на который нажали
	$(this).toggleClass("active");
});

const img = document.createElement("img");
document.querySelector(".wrapper").appendChild(img);
$("img").setAttr("href", "assets/img");
$("img").setAttr("width", "300");
$("img").removeAttr();


