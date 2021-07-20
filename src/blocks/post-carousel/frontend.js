/**
 * Swiper dependencies
 */
// import Swiper from 'swiper'

/**
 * Swiper Front-end Scripts
 */
const swipers = document.querySelectorAll( '.swiper-container' )

if ( swipers.length ) {
	for ( let i = 0; i < swipers.length; i++ ) {
		swipers[ i ].classList.add( `swiper-container-${ i + 1 }` )
		swipers[ i ].querySelector( '.swiper-button-prev' ).classList.add( `swiper-button-prev-${ i + 1 }` )
		swipers[ i ].querySelector( '.swiper-button-next' ).classList.add( `swiper-button-next-${ i + 1 }` )
		swipers[ i ].querySelector( '.swiper-pagination' ).classList.add( `swiper-pagination-${ i + 1 }` )
	
		let swiperParams = swipers[ i ].getAttribute( 'data-swiper' )
		swiperParams = JSON.stringify( eval( '(' + swiperParams + ')' ) )
		swiperParams = JSON.parse( swiperParams )
	
		new Swiper( `.swiper-container-${ i + 1 }`, {
			slidesPerView: swiperParams.slidesPerView,
			loop: swiperParams.loop,
			... swiperParams.autoplay ? {
				autoplay: {
					delay: swiperParams.delay,
					disableOnInteraction: false,
				},
			} : null,
			speed: swiperParams.speed,
			... swiperParams.spaceBetween ? {
				spaceBetween: swiperParams.spaceBetween,
			} : null,
			effect: swiperParams.effect,
			... swiperParams.effect === 'fade' ? {
				fadeEffect: {
					crossFade: true,
				},
			} : null,
			... swiperParams.effect === 'flip' ? {
				flipEffect: {
					rotate: 30,
					slideShadows: false,
				},
			} : null,
			... swiperParams.effect === 'coverflow' ? {
				coverflowEffect: {
					rotate: 30,
					slideShadows: false,
				},
			} : null,
			... swiperParams.effect === 'cube' ? {
				cubeEffect: {
					slideShadows: false,
					shadow: false,
				},
			} : null,
			pagination: {
				el: `.swiper-pagination-${ i + 1 }`,
				type: swiperParams.pagination,
				clickable: true,
			},
			navigation: {
				nextEl: `.swiper-button-next-${ i + 1 }`,
				prevEl: `.swiper-button-prev-${ i + 1 }`,
			},
		} )
	}
}
