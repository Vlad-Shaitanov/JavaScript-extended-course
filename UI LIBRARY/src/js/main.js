"use strict";

import $ from "./lib/lib";

$("button").on("click", function () {
	//Меняем класс тому элементу, на который нажали
	$("div").eq(2).toggleClass("active");
});

// const img = document.createElement("img");
// document.body.appendChild(img);
// $("img").setAttr("href", "assets/img");
// $("img").setAttr("width", "300");
// $("img").removeAttr();

console.log($("button").html("hello"));

$('div').click(function () {
	console.log($(this).index());
});

console.log($("div").eq(2).find(".more"));

console.log($(".some").closest(".findme"));

console.log($(".more").eq(0).siblings());
console.log($(".findme").siblings());