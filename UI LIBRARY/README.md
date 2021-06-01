# JavaScript UI Library

- создана главная функция $, методы show/hide/toggle, init.
- созданы методы по работе с классами и обработчиками событий.
- созданы методы для работы с элементами на странице: html, eq, find, siblings…
- созданы анимации.
- созданы классы и модули с кнопками.
- создан эффект fadeToggle.
- создан компонент dropdown menu.


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