document.addEventListener('DOMContentLoaded', function () {
	const tabs = document.querySelector('.business_cases-tabs');
	const content = document.querySelectorAll('.business_cases-acordion-container');

	const changeClass = (el) => {
		for (let i = 0; i < tabs.children.length; i++) {
			tabs.children[i].classList.remove('active');
		}
		el.classList.add('active');
		console.log(el);
	};

	tabs.addEventListener('click', (e) => {
		if (e.target.dataset.btn) {
			const currTab = e.target.dataset.btn;
			changeClass(e.target);
			for (let i = 0; i < content.length; i++) {
				content[i].classList.remove('active');
				if (content[i].dataset.content === currTab) {
					content[i].classList.add('active');
					console.log(content[i]);
				}
			}
		}
	});
});

const casesAcordion = document.querySelector('.business_cases-container');
const plusRotate = document.querySelectorAll('.business_cases-acordion');
casesAcordion.addEventListener('click', (e) => {
	const eClick = e.target;
	console.log(eClick);
	console.log(eClick.closest('div'));
	if (eClick.closest('div').classList.contains('text_plus')) {
		eClick.parentElement.children[1].classList.toggle('text_hidden');
		eClick.classList.toggle('rotate_plus');
	}
});
