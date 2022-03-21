document.addEventListener('DOMContentLoaded', function () {
	const quiz_data = {
		registerType: '',
		personal: '',
		businessCard: '',
		contact: {
			type: '',
			name: '',
			address: '',
		},
		price: '',
	};

	const priceList = [
		[
			{ name: 'none', price: 0, remote_price: 0 },
			{ name: 'ao', price: 690, remote_price: 1050 },
			{ name: 'nko', price: 690, remote_price: 1050 },
			{ name: 'ooo_virtual', price: 690, remote_price: 1050 },
			{ name: 'ooo', price: 450, remote_price: 690 },
			{ name: 'individual_entrepreneur', price: 250, remote_price: 400 },
		],
		[{ name: true }, { name: false }],
		[
			{ name: 'yes', price: 80 },
			{ name: 'no', price: 0 },
			{ name: 'dont_know', price: 0 },
		],
	];

	const slides = document.querySelectorAll('.quiz_slide');
	const prev_slide = document.querySelector('.prev_step_quiz');
	const next_slide = document.querySelector('.next_step_quiz');

	const business_types = document.querySelector('#business_type_container');
	const personal_container = document.querySelector('#quiz_personal');

	const mobile_price_container = document.querySelector('#mobile_quiz_input');
	const desktop_price_container = document.querySelector('#desktop_quiz_input');

	const quiz_checkbox_container = document.querySelector('.quiz_radio_container');

	const final_price = document.querySelector('#final_price_inline');

	const step = document.querySelector('.step_num');

	const quiz_form = document.querySelector('#quiz_form');

	const forms = document.querySelectorAll('.quiz-form');

	const pagination = document.querySelector('.quiz_pagination');

	let current_slide = 0;
	let locked_price = [0];
	let price_counter = 0;
	let forwardBlocked = true;
	let furthest_slide = 0;
	let printing = 0;
	let slide_tracker = [];

	forms.forEach((form) => {
		form.addEventListener('submit', (e) => e.preventDefault());
	});

	business_types.addEventListener('click', (e) => {
		handleQUizGrids(e);
	});
	personal_container.addEventListener('click', (e) => {
		handleQUizGrids(e);
	});

	next_slide.addEventListener('click', () => {
		handleSlide('forward');
	});
	prev_slide.addEventListener('click', () => {
		handleSlide('backwards');
	});
	quiz_checkbox_container.addEventListener('click', (e) => {
		if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
			const context = e.target;
			if (context.tagName === 'INPUT') {
				for (const price of priceList[current_slide]) {
					if (price.name === context.id) {
						implementPrice(price.price, '+');
					}
				}
				quiz_data.businessCard = context.id;
			} else if (context.tagName === 'LABEL') {
				for (const price of priceList[current_slide]) {
					if (price.name === context.children[0].id) {
						implementPrice(price.price, '+');
					}
				}
				quiz_data.businessCard = context.children[0].id;
			}
			slide_tracker[2] = 'action done';
			forwardBlocked = false;
			forwardBlocked ? next_slide.classList.add('inactive_quiz_button') : next_slide.classList.remove('inactive_quiz_button');
		}
	});

	function handleQUizGrids(e) {
		if (e.target.dataset.value) {
			for (let i = 0; i < e.target.parentElement.children.length; i++) {
				e.target.parentElement.children[i].classList.remove('quiz_grid_element-active');
			}

			e.target.classList.add('quiz_grid_element-active');
			forwardBlocked = false;
			next_slide.classList.remove('inactive_quiz_button');

			if (current_slide < 1) {
				priceList[0].forEach((el) => {
					if (el.name === e.target.dataset.value) {
						quiz_data.registerType = el;
					}
					if (quiz_data.personal !== '') {
						if (quiz_data.personal == 'false') {
							implementPrice(quiz_data.registerType.remote_price, 'refresh');
						} else if (quiz_data.personal == 'true') {
							implementPrice(quiz_data.registerType.price, 'refresh');
						}
					}
				});
				slide_tracker[0] = 'action done';
			}

			if (current_slide > 0) {
				if (e.target.dataset.value == 'false') {
					implementPrice(quiz_data.registerType.remote_price, 'refresh');
				} else if (e.target.dataset.value == 'true') {
					implementPrice(quiz_data.registerType.price, 'refresh');
				}
				quiz_data.personal = e.target.dataset.value;
				slide_tracker[1] = 'action done';
			}
		}
	}

	function handleSlide(direction) {
		if (direction === 'forward' && !forwardBlocked) {
			if (current_slide < 4) {
				current_slide++;
				if (current_slide > furthest_slide) {
					furthest_slide++;
				}

				locked_price[current_slide] = price_counter;

				slides[current_slide - 1].classList.remove('current_slide');

				setTimeout(() => {
					slides[current_slide - 1].classList.remove('slide_aligned');
				}, 100);
				slides[current_slide].classList.add('slide_aligned');
				setTimeout(() => {
					slides[current_slide].classList.add('current_slide');
				}, 100);

				if (current_slide === slides.length - 2) {
					final_price.innerText = `Итоговая стоимость - $${price_counter + printing}`;
					slide_tracker[3] = 'action done';
				} else if (current_slide === slides.length - 1) {
					document.querySelector('.quiz_buttons_container').style.display = 'none';
					document.querySelectorAll('.prize_container').forEach((el) => el.classList.add('available'));
				}

				current_slide < furthest_slide ? (forwardBlocked = false) : (forwardBlocked = true);

				if (slide_tracker[current_slide] === 'action done') {
					forwardBlocked = false;
				}
			}
		} else if (direction === 'backwards') {
			if (current_slide > 0) {
				current_slide--;

				slides[current_slide + 1].classList.remove('current_slide');
				setTimeout(() => {
					slides[current_slide + 1].classList.remove('slide_aligned');
				}, 100);

				setTimeout(() => {
					slides[current_slide].classList.add('slide_aligned');
					setTimeout(() => {
						slides[current_slide].classList.add('current_slide');
					}, 40);
				}, 110);

				locked_price.pop();
				if (locked_price.length < 1) {
					locked_price[0] = 0;
				}
				forwardBlocked = false;
			}
		}
		console.log(slide_tracker);
		forwardBlocked ? next_slide.classList.add('inactive_quiz_button') : next_slide.classList.remove('inactive_quiz_button');
		handleNumbers();
		if (step < 5) {
			step.innerHTML = `${current_slide + 1} шаг`;
		}
	}

	function implementPrice(price, type) {
		let value;
		console.log(quiz_data);
		if (type === '+') {
			printing = price;
			value = locked_price[current_slide] + price;
		} else if (type === 'refresh') {
			value = price + printing;
		}

		mobile_price_container.innerText = `$${value}`;
		desktop_price_container.innerText = `$${value}`;
		price_counter = value - printing;
		quiz_data.price = value;
	}
	quiz_form.addEventListener('click', (e) => {
		handleQuizForm(e);
	});

	function handleQuizForm(e) {
		if (e.target.tagName === 'BUTTON') {
			e.preventDefault();
			target = e.target;
			const inputs = target.parentElement.parentElement.getElementsByTagName('input');

			quiz_data.contact.type = target.id;
			quiz_data.contact.name = inputs[1].value;
			quiz_data.contact.address = inputs[0].value;
			console.log(quiz_data);
		}
	}

	function handleNumbers() {
		const numbers = [0, 3, 6, 9];
		let number_I = 0;
		for (let i = 0; i < pagination.children.length; i++) {
			pagination.children[i].classList.remove('current');
		}
		while (number_I < current_slide + 1 && current_slide < 4) {
			pagination.children[numbers[number_I]].classList.add('number_bubble-active');
			if (pagination.children[numbers[number_I] - 1]) {
				pagination.children[numbers[number_I] - 1].classList.add('bubble_join-done');
			}
			if (pagination.children[numbers[number_I] + 1]) {
				pagination.children[numbers[number_I] + 1].classList.add('bubble_join-done');
			}
			number_I++;
		}
		if (pagination.children[numbers[current_slide]]) {
			pagination.children[numbers[current_slide]].classList.add('current');
		}
	}

	const quiz_info = document.querySelector('.quiz_info');
	const popup = document.querySelector('.overlay');
	const popup_close = document.querySelector('.popup_close');
	const popup_tabs_container = document.querySelector('.popup_tabs_container');

	quiz_info.addEventListener('click', function () {
		popup.style.display = 'block';
		document.body.style.overflowY = 'hidden';
	});
	popup_close.addEventListener('click', function () {
		popup.style.display = 'none';
		document.body.style.overflowY = 'scroll';
	});
	popup_tabs_container.addEventListener('click', function (e) {
		if (e.target.classList.contains('popup_tab')) {
			[...popup_tabs_container.children].forEach((el) => el.classList.remove('popup_tab-active'));
			e.target.classList.add('popup_tab-active');
		}
	});
});
