document.addEventListener('DOMContentLoaded', function () {
	// Блоки хедера
	const header = document.querySelector('#header');
	const header_top = document.querySelector('.contacts_container');
	const menuBtn = document.querySelector('.menu_button');
	const menuList = document.querySelector('.navlist_grid');
	const menuClose = document.querySelector('.menu_button_close');

	// Блоки футера
	const footer = document.querySelector('.footer');

	//Блок главного контейнера
	const main_wrapper = document.querySelector('.main_wrapper');

	const partners = document.querySelector('.partners__wrapper');

	// Прятание хедера
	let startY = window.scrollY;

	document.addEventListener('scroll', function (e) {
		if (window.screen.width > 981) {
			const currentY = window.scrollY;
			if (startY < currentY) {
				header.style.top = `-${header_top.offsetHeight}px`;
				main_wrapper.style.paddingTop = 191 - header_top.offsetHeight + 'px';
				partners.scroll(window.scrollY, 0);
			} else if (startY > currentY) {
				header.style.top = '0';
				main_wrapper.style.paddingTop = 191 + 'px';
				partners.scroll(window.scrollY, 0);
			}
			startY = currentY;
		}
	});

	// Открытия мобильного меню

	menuBtn.onclick = function () {
		menuList.style.left = 0;
	};
	menuClose.onclick = function () {
		menuList.style.left = '-120vw';
	};

	// Пункты мобильного меню

	menuList.addEventListener('click', function (e) {
		const target = e.target.closest('div');
		if (target.classList.contains('list_item') && !target.classList.contains('list_item___open')) {
			target.parentElement.children[1].style.maxHeight =
				target.parentElement.children[1].children.length * target.parentElement.children[1].children[0].offsetHeight + 'px';
			target.classList.add('list_item___open');
		} else if (target.classList.contains('list_item') && target.classList.contains('list_item___open')) {
			target.parentElement.children[1].style.maxHeight = 0;
			target.classList.remove('list_item___open');
		}
	});

	// Пункты футера

	footer.addEventListener('click', function (e) {
		const target = e.target.closest('div');
		if (target.classList.contains('footer__category-item__title') && !target.classList.contains('list_item___open')) {
			target.parentElement.children[1].style.maxHeight =
				target.parentElement.children[1].children.length * target.parentElement.children[1].children[0].offsetHeight + 'px';
			target.classList.add('list_item___open');
		} else if (target.classList.contains('footer__category-item__title') && target.classList.contains('list_item___open')) {
			target.parentElement.children[1].style.maxHeight = 0;
			target.classList.remove('list_item___open');
		}
	});

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	partners.querySelectorAll('img').forEach((el) => el.setAttribute('draggable', false));
	partners.style.cursor = 'grab';

	let pos = { top: 0, left: 0, x: 0, y: 0 };

	const mouseDownHandler = function (e) {
		partners.style.cursor = 'grabbing';
		partners.style.userSelect = 'none';

		pos = {
			left: partners.scrollLeft,
			top: partners.scrollTop,
			// Get the current mouse position
			x: e.clientX,
			y: e.clientY,
		};

		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	};

	const mouseMoveHandler = function (e) {
		// How far the mouse has been moved
		const dx = e.clientX - pos.x;
		const dy = e.clientY - pos.y;

		// Scroll the element
		partners.scrollTop = pos.top - dy;
		partners.scrollLeft = pos.left - dx;
	};

	const mouseUpHandler = function () {
		partners.style.cursor = 'grab';
		partners.style.removeProperty('user-select');

		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
	};

	// Attach the handler
	partners.addEventListener('mousedown', mouseDownHandler);
});
