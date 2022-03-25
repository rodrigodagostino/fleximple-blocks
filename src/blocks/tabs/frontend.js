/**
 * Fleximple Tabs Block Front-end Scripts
 */

const tabsBlockInstances = document.querySelectorAll( '.fleximple-block-tabs' )
tabsBlockInstances.forEach( ( instance ) => {
  instance
    .querySelector(
      '.fleximple-block-tabs__panel-list .fleximple-block-tab-panel',
    )
    .classList.add( 'is-active' )
})

const tabs = document.querySelectorAll(
  '.fleximple-block-tabs .fleximple-block-tabs__tab',
)
tabs.forEach( ( tab, index ) => {
  tab.setAttribute( 'data-tab-index', index + 1 )
  tab.addEventListener( 'click', function () {
    const siblingTabs = tab.parentNode.childNodes
    siblingTabs.forEach( ( item ) => item.classList.remove( 'is-active' ) )
    tab.classList.add( 'is-active' )

    const tabPanels = tab
      .closest( '.fleximple-block-tabs' )
      .querySelectorAll( '.fleximple-block-tab-panel' )
    tabPanels.forEach( ( item ) => item.classList.remove( 'is-active' ) )
    tabPanels[ index ].classList.add( 'is-active' )
  })
})
