"use strict";

import $ from "./lib/lib";

// $("button").on("click", function () {
// 	//Меняем класс тому элементу, на который нажали
// 	$("div").eq(2).toggleClass("active");
// });

// const img = document.createElement("img");
// document.body.appendChild(img);
// $("img").setAttr("href", "assets/img");
// $("img").setAttr("width", "300");
// $("img").removeAttr();

//console.log($("button").html("hello"));

// $('div').click(function () {
// 	console.log($(this).index());
// });

//console.log($("div").eq(2).find(".more"));

// console.log($(".some").closest(".findme"));

// console.log($(".more").eq(0).siblings());
// console.log($(".findme").siblings());

$(".findme").fadeIn(5000);

$("#first").on("click", () => {
	$("div").eq(1).fadeToggle(800);
});

$("[data-count='second']").on("click", () => {
	$("div").eq(2).fadeToggle(800);
});

$("button").eq(2).on("click", () => {
	$(".w-500").fadeToggle(800);
});

$(".wrap").html(
	`
	<div class="dropdown">
			<button class="btn btn-primary dropdown-toggle" id="dropdownMenuButton">Dropdown button</button>
			<div class="dropdown-menu" data-toggle-id="dropdownMenuButton">
				<a href="#" class="dropdown-item">Action #1</a>
				<a href="#" class="dropdown-item">Action #2</a>
				<a href="#" class="dropdown-item">Action #3</a>
			</div>
	</div>
	`
);
$(".tab-panel .drop").html(
	`
	<div class="dropdown">
			<button class="btn btn-primary dropdown-toggle" id="dropdownMenuButton2">Dropdown button</button>
			<div class="dropdown-menu" data-toggle-id="dropdownMenuButton2">
				<a href="#" class="dropdown-item">Action #1</a>
				<a href="#" class="dropdown-item">Action #2</a>
				<a href="#" class="dropdown-item">Action #3</a>
			</div>
	</div>
	`
);

$(".dropdown-toggle").dropdown();

//Динамическое модальное окно, передав объект настроек
$("#trigger").click(() => {
	$("#trigger").createModal({
		text: {
			title: "Modal title",
			body: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat rerum ut
			recusandae, provident soluta tenetur esse dolorem a.Necessitatibus assumenda officia, vel
			repudiandae vitae numquam fugiat.Distinctio illo consequuntur veritatis.`
		},

		btns: {
			count: 3,
			settings: [
				["Close",
					["btn-danger", "mr-10"],
					true
				],
				[
					"Save changes",
					["btn-success"],
					false,
					() => {
						alert("Данные сохранены!");
					}
				],
				[
					"Another button",
					["btn-warning", "ml-10"],
					false,
					() => {
						alert("Осторожно, что-то пошло не так!");
					}
				],
			],

		},
	});
});