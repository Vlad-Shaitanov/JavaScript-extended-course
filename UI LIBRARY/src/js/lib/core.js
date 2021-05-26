"use strict";


const $ = function (selector) {
	//Возвращаем новый объект
	return new $.prototype.init(selector);
};

$.prototype.init = function (selector) {
	//Если селектор не передан
	if (!selector) {
		return this;// ПРосто пустой объект {}
	}

	//Создаем объект с нужными свойствами
	Object.assign(this, document.querySelectorAll(selector));

	//Св-во хранит длинну коллекции
	this.length = document.querySelectorAll(selector).length;

	return this;
};

/*В прототип объекта, который мы создаем на строке (Object.assign),
мы записываем прототип главной функции.
Это позволяет нам на объекте, который будет создаваться при помощи $,
использовать любые методы прототипа этой функции */
$.prototype.init.prototype = $.prototype;

//Присваиваем св-во глобальному объекту
window.$ = $;

export default $;