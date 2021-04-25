"use strict";

import "./slider";
import modals from "./modules/modals";
import tabs from "./modules/tabs";
import forms from "./modules/forms";

window.addEventListener("DOMContentLoaded", () => {
	modals();

	//Табы блока остекления
	tabs(".glazing_slider", ".glazing_block", ".glazing_content", "active");
	//Табы блока со внутренней отделкой
	tabs(".decoration_slider", ".no_click", ".decoration_content > div > div", "after_click");
	//Табы калькулятора
	tabs(".balcon_icons", ".balcon_icons_img", ".big_img > img", "do_image_more", "inline-block");

	forms();
});