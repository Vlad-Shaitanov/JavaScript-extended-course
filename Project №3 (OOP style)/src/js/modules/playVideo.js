"use strict";

export default class VideoPlayer {

	constructor(triggers, overlay) {
		this.btns = document.querySelectorAll(triggers);
		this.overlay = document.querySelector(overlay);
		this.close = this.overlay.querySelector('.close');
	}

	bindTriggers() {
		//
		this.btns.forEach(btn => {
			btn.addEventListener("click", () => {

				//Если плеер уже был создан
				if (document.querySelector('iframe#frame')) {
					//Показываем модалку
					this.overlay.style.display = "flex";
				} else {
					//В противном случае, создаем новый экземпляр плеера
					const path = btn.getAttribute("data-url");

					this.createPlayer(path);
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
		});
		console.log(this.player);
		this.overlay.style.display = "flex";
	}

	init() {
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