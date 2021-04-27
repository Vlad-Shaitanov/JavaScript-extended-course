"use strict";

const timer = (id, deadline) => {

	//Сколько всего времени осталось до дедлайна
	const getTimeRemaining = (endtime) => {
		//Разница между endtime и текущим временем
		const t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			days = Math.floor((t / (1000 * 60 * 60 * 24)));

		return {
			"total": t,
			"days": days,
			"hours": hours,
			"minutes": minutes,
			"seconds": seconds,
		};
	};

	//Добавление нуля ко времени
	const addZero = (number) => {

		if (number <= 9) {
			return `0${number}`;
		} else {
			return number;
		}
	};

	const setClock = (selector, endtime) => {
		//Получаем таймер со страницы и отдельно его элементы
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);//Обновление таймера

		updateClock();//Обновим таймер при загрузке страницы

		//Обновление таймера
		function updateClock() {
			const t = getTimeRemaining(endtime);//Узнаем сколько времени осталось до конца

			days.innerHTML = addZero(t.days);
			hours.innerHTML = addZero(t.hours);
			minutes.innerHTML = addZero(t.minutes);
			seconds.innerHTML = addZero(t.seconds);

			if (t.total <= 0) {
				days.innerHTML = "00";
				hours.innerHTML = "00";
				minutes.innerHTML = "00";
				seconds.innerHTML = "00";

				clearInterval(timeInterval);
			}
		}
	};

	setClock(id, deadline);
};

export default timer;