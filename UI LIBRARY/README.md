# JavaScript UI Library

- создана главная функция $, методы show/hide/toggle, init.
- созданы методы по работе с классами и обработчиками событий.
- созданы методы для работы с элементами на странице: html, eq, find, siblings…
- созданы анимации.
- созданы классы и модули с кнопками.
- создан эффект fadeToggle.
- создан компонент dropdown menu.

***

## Использование компонентов:
### Dropdown menu:
- Для использования компонента необходимо добавить в HTML блок код следующего вида

    ```
	<div class="dropdown">
    	<button class="btn btn-primary dropdown-toggle" id="dropdownMenuButton">Dropdown button</button>
    	<div class="dropdown-menu" data-toggle-id="dropdownMenuButton">
    		<a href="#" class="dropdown-item">Action #1</a>
    		<a href="#" class="dropdown-item">Action #2</a>
    		<a href="#" class="dropdown-item">Action #3</a>
    	</div>
    </div>
	```

- Если меню формируется динамически по запросу с сервера, необходимо после получения структуры сразу же инициализировать функцию, например:

	```
    $(".dropdown-toggle").dropdown();
	```

### Modal Windows
- Для СТАТИЧЕСКОГО ИСПОЛЬЗОВАНИЯ компонента необходимо добавить в HTML блок код следующего вида

	```
	<div class="modal" id="exampleModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<button class="close" data-close>
						<span>&times;</span>
					</button>
					<div class="modal-header">
						<div class="modal-title">Modal title</div>
					</div>
					<div class="modal-body"></div>
					<div class="modal-footer">
						<button class="btn btn-danger" data-close>Close</button>
						<button class="btn btn-success">Save changes</button>
					</div>
				</div>
			</div>
	</div>
	```

- Для корректной работы нужно указать атрибут ```data-toggle="modal"``` на всех элементах, которые должны вызывать модальное окно, а также атрибут ```data-target="#id"``` c id желаемого модального окна
- На всех кнопках, нажатие на которые инициирует закрытие модального окна, указать атрибут ```data-close```

- Для ДИНАМИЧЕСКОГО ФОРМИРОВАНИЯ компонента необходимо получить id элемента (триггер), на котором должно вызываться модальное окно. Затем на элементе вызывается метод createModal, например ```$("#trigger").createModal()```. В метод в качестве аргумента требуется передать объект со следующими настройками:
	```
	{
		text: {
			title: "Заголовок модального окна",
			body: `Основное содержание`
		},

		btns: {
			count: 2, //Необходимое кол-во кнопок в футере окна
			settings: [ //Кол-во вложенных массивов равняется числу кнопок
				[	"Close", //Имя кнопки
					["btn-danger", "mr-10"], //Классы, которые присвоить кнопке
					true, //Будет ли кнопка закрывать модальное окно
				],
				[
					"Save changes", //Имя кнопки
					["btn-success"], //Классы, которые присвоить кнопке
					false, //Будет ли кнопка закрывать модальное окно
					() => { //Колбэк определяющий поведение при нажатии на кнопку
						alert("Данные сохранены!");
					}
				],
			],
		},
	}
	```


### TABS
- Для создания табов(вкладок) использовать следующий шаблон:
	```
	<div class="tab mt-20 block-center">
		<div class="tab-panel" data-tabpanel>
			<div class="tab-item tab-item--active">Content #1</div>
			<div class="tab-item">Content #2</div>
			<div class="tab-item">Content #3</div>
		</div>
		<div class="tab-content tab-content--active"></div>
		<div class="tab-content"></div>
		<div class="tab-content"></div>
	</div>
	```

- Количество табов опционально.

### ACCORDION
- Для создания на странице аккордеона, следует использовать шаблон:
	```
	<div class="accordion">
			<div class="accordion-head">
				<span>Заголовок</span>
			</div>
			<div class="accordion-content">
				<div class="accordion-inner">
					Lorem
				</div>
			</div>
			<div class="accordion-head">
				<span>Заголовок 2</span>
			</div>
			<div class="accordion-content">
				<div class="accordion-inner">
					Lorem
				</div>
			</div>
	</div>
	```


***
## Создание отдельных элементов
### Продуктовая карточка:
- Для создания карточки использовать следующий шаблон:
	```
	<div class="card">
		<img class="card-img" src="" alt="photo">
		<div class="card-body">
			<div class="card-title"></div>
			<p class="card-text"></p>
			<a href="#" class="btn btn-primary">Link to</a>
		</div>
	</div>
	```

- В теге ```<а></a>``` можно использовать атрибуты для вызова модального окна