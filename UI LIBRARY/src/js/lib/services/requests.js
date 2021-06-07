"use strict";

import $ from "../core";

$.prototype.get = async function (url, dataTypeAnswer = "json") {
	//Функция принимает url и тип данных, в котором нужно вернуть ответ
	let result = await fetch(url);

	if (!result.ok) {
		throw new Error(`Could not fetch ${url}, status ${result.status}`);
	}

	switch (dataTypeAnswer) {

		case "json":
			return await result.json();
		case "text":
			return await result.text();
		case "blob":
			return await result.blob();
	}
};

$.prototype.post = async function (url, data, dataTypeAnswer = "text") {

	//Функция принимает url, данные для передачи и тип данных, в котором нужно вернуть ответ
	let result = await fetch(url, {
		method: "POST",
		body: data,
	});

	switch (dataTypeAnswer) {

		case "json":
			return await result.json();
		case "text":
			return await result.text();
		case "blob":
			return await result.blob();
	}
};