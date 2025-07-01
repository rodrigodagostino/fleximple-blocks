/**
 * Fleximple Tabs Block Front-end Scripts
 */

const tabsBlockInstances = document.querySelectorAll('.fleximple-blocks-tabs')
tabsBlockInstances.forEach((instance) => {
  instance
    .querySelector(
      '.fleximple-blocks-tabs__panel-list .fleximple-blocks-tab-panel'
    )
    .classList.add('is-active')
})

const tabs = document.querySelectorAll(
  '.fleximple-blocks-tabs .fleximple-blocks-tabs__tab'
)
tabs.forEach((tab, index) => {
  tab.setAttribute('data-tab-index', index + 1)
  tab.addEventListener('click', function () {
    const siblingTabs = tab.parentNode.childNodes
    siblingTabs.forEach((item) => item.classList.remove('is-active'))
    tab.classList.add('is-active')

    const tabPanels = tab
      .closest('.fleximple-blocks-tabs')
      .querySelectorAll('.fleximple-blocks-tab-panel')
    tabPanels.forEach((item) => item.classList.remove('is-active'))
    tabPanels[index].classList.add('is-active')
  })
})
