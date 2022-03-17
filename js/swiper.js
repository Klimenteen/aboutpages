const swiper_desktop = new Swiper('.desk_reviews', {
	loop: true,
	spaceBetween: 7,
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 1,
			spaceBetween: 20,
			pagination: {
				el: '.desk_rev_pag',
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>';
				},
			},
		},
	},

	// // Navigation arrows
	// navigation: {
	//   nextEl: '.swiper-button-next',
	//   prevEl: '.swiper-button-prev',
	// },

	// // And if we need scrollbar
	// scrollbar: {
	//   el: '.swiper-scrollbar',
	// },
});

const swiper_mobile = new Swiper('.mob_reviews', {
	// Optional parameters
	// direction: 'vertical',
	loop: true,
	spaceBetween: 7,

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		type: 'bullets',
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 1,
			spaceBetween: 20,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		},
	},

	// // Navigation arrows
	// navigation: {
	//   nextEl: '.swiper-button-next',
	//   prevEl: '.swiper-button-prev',
	// },

	// // And if we need scrollbar
	// scrollbar: {
	//   el: '.swiper-scrollbar',
	// },
});
