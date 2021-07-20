/**
 * Fleximple Iframe Front-end Scripts
 */

const autoResizableIframes = document.querySelectorAll( '[data-auto-height="true"]' )

autoResizableIframes.forEach( iframe => {
	iframe.addEventListener( 'load', function () {
		resizeIframe( iframe )
		setInterval( function () {
			resizeIframe( iframe )
		}, 500 )
	} )
} )

const resizeIframe = ( iframe ) => {
	iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px'
}
