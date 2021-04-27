"use strict";

import "./slider";
import modals from "./modules/modals";
import tabs from "./modules/tabs";
import forms from "./modules/forms";
import changeModalState from "./modules/changeModalState";
import timer from "./modules/timer";

window.addEventListener("DOMContentLoaded", () => {
	modals();

	//Состояние калькулятора
	let modalState = {};

	//Дедлайн для таймера
	let deadline = "2021-05-09";

	changeModalState(modalState);

	//Табы блока остекления
	tabs(".glazing_slider", ".glazing_block", ".glazing_content", "active");
	//Табы блока со внутренней отделкой
	tabs(".decoration_slider", ".no_click", ".decoration_content > div > div", "after_click");
	//Табы калькулятора
	tabs(".balcon_icons", ".balcon_icons_img", ".big_img > img", "do_image_more", "inline-block");

	forms(modalState);

	timer(".container1", deadline);
});