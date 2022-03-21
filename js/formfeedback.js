document.addEventListener('DOMContentLoaded', function () {
	const tabs = document.querySelector('.formfeedback__tabs');
	const content = document.querySelectorAll('.formfeedback__form');

	const changeClass = (el) => {
		for (let i = 0; i < tabs.children.length; i++) {
			tabs.children[i].classList.remove('active');
		}
		el.classList.add('active');
	};

	tabs.addEventListener('click', (e) => {
		if (e.target.closest('div').dataset.btn) {
			const currTab = e.target.closest('div').dataset.btn;
			changeClass(e.target.closest('div'));
			for (let i = 0; i < content.length; i++) {
				content[i].classList.remove('active');
				if (content[i].dataset.content === currTab) {
					content[i].classList.add('active');
				}
			}
		}
	});
});
