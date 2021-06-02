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
- Для использования компонента необходимо добавить в HTML блок код следующего вида

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