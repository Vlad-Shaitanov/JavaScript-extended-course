"use strict";

export default class VideoPlayer {

	constructor(triggers, overlay) {
		this.btns = document.querySelectorAll(triggers);
		this.overlay = document.querySelector(overlay);
		this.close = this.overlay.querySelector('.close');
		//Привязываем контекст для метода, отслеживающего состояние
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
	}

	bindTriggers() {
		//
		this.btns.forEach((btn, i) => {

			try {
				const blockedElem = btn.closest(".module__video-item").nextElementSibling;

				if (i % 2 == 0) {
					//Всем четным кнопкам устанавливаем атрибут
					blockedElem.setAttribute("data-disabled", "true");
				}
			} catch (e) { }

			btn.addEventListener("click", () => {
				if (!btn.closest(".module__video-item") || btn.closest(".module__video-item").getAttribute("data-disabled") !== "true") {
					this.activeBtn = btn;//Активная кнопка

					//Если плеер уже был создан
					if (document.querySelector('iframe#frame')) {
						//Показываем модалку
						this.overlay.style.display = "flex";

						if (this.path !== btn.getAttribute("data-url")) {
							/*Если путь не соответствует пути элемента по которому
							кликнули, то создаем новый экземпляр плеера*/
							this.path = btn.getAttribute("data-url");
							this.player.loadVideoById({ videoId: this.path });
						}
					} else {
						//В противном случае, создаем новый экземпляр плеера
						this.path = btn.getAttribute("data-url");

						this.createPlayer(this.path);
					}
				}

			});
		});
	}

	bindCloseBtn() {
		this.close.addEventListener("click", () => {
			//Закрываем модалку
			this.overlay.style.display = "none";

			this.player.stopVideo();
		});
	}

	//Создание плеера
	createPlayer(url) {
		this.player = new YT.Player("frame", {
			height: '100%',
			width: '100%',
			origin: location.hostname,
			videoId: `${url}`,
			events: {
				"onStateChange": this.onPlayerStateChange
			},
		});
		//console.log(this.player);
		this.overlay.style.display = "flex";
	}

	//Метод срабатывает каждый раз при изменении состояния плеера
	onPlayerStateChange(state) {
		try {
			//Находим блок с заблокированным видео
			const blockedElem = this.activeBtn.closest(".module__video-item").nextElementSibling;
			//Копируем свг-иконку через клонирование узла
			const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);

			//Если видео просмотрено до конца
			if (state.data === 0) {
				// Значение 0 взято из документации и соответствует событию

				//Проверка на случай, если юзер посмотрит сразу первое видео полностью еще раз
				if (blockedElem.querySelector(".play__circle").classList.contains("closed")) {

					//Удаляем класс у заблокированного элемента
					blockedElem.querySelector(".play__circle").classList.remove("closed");
					//Удаляем свг-иконку с замком
					blockedElem.querySelector("svg").remove();
					//Добавляем на ее место ранее склонированную иконку
					blockedElem.querySelector(".play__circle").appendChild(playBtn);
					//Заменяем текст возле кнопки
					blockedElem.querySelector(".play__text").textContent = "play video";
					blockedElem.querySelector(".play__text").classList.remove("attention");

					//Снимаем затемнение с заблокированного блока
					blockedElem.style.opacity = 1;
					blockedElem.style.filter = "none";

					//ВОзвращаем активность элементу
					blockedElem.setAttribute("data-disabled", "false");
				}
			}
		} catch (error) {

		}
	}

	init() {
		if (this.btns.length > 0) {
			//Асинхронное подключение скрипта youtube api
			const tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			//Кнопки
			this.bindTriggers();
			this.bindCloseBtn();
		}
	}
}