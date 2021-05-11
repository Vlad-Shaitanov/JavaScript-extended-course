"use strict";

const pictureSize =(imgSelector)=>{
	const blocks = document.querySelectorAll(imgSelector);

	//Вместо заглушки показываем нужные картинки
	const showImg = (block)=>{
		const img = block.querySelector("img");

		//Изменяем путь к картинке
		img.src = img.src.slice(0, -4) + '-1.png';
		block.querySelectorAll("p:not(.sizes-hit)").forEach(p =>{
			//Скрываем элементы "Р", в которых подписи к заглушкам
			p.style.display = "none";
		});
	};

	//Скрываем картинки и опять показываем заглушки
	const hideImg = (block)=>{
		const img = block.querySelector("img");

		//Изменяем путь к картинке
		img.src = img.src.slice(0, -6) + '.png';
		block.querySelectorAll("p:not(.sizes-hit)").forEach(p =>{
			//Скрываем элементы "Р", в которых подписи к заглушкам
			p.style.display = "block";
		});
	};

	blocks.forEach(block =>{
		block.addEventListener("mouseover", ()=>{
			showImg(block);
		});

		block.addEventListener("mouseout", ()=>{
			hideImg(block);
		});
	});
};

export default pictureSize;