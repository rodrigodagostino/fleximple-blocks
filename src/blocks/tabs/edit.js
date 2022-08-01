/**
 * External dependencies
 */
import classNames from 'classnames'
import memoize from 'memize'
import times from 'lodash/times'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { getBlockDefaultClassName, createBlock } from '@wordpress/blocks'
import {
  BlockControls,
  InnerBlocks,
  InspectorControls,
  RichText,
} from '@wordpress/block-editor'
import { BaseControl, Icon, PanelBody, Tooltip } from '@wordpress/components'
import { compose, withInstanceId } from '@wordpress/compose'
import { dispatch, withSelect } from '@wordpress/data'
import { useEffect, useMemo, useState } from '@wordpress/element'
import { ENTER, SPACE } from '@wordpress/keycodes'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import { interactionIcons } from 'fleximple-components/components/icons'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_BLOCKS = ['fleximple-blocks/tab-panel']

const getTabsTemplate = memoize((count) => {
  return times(count, () => ['fleximple-blocks/tab-panel'])
})

const TabsEdit = ({
  className,
  attributes: { count, tabsData, tabsAlignment },
  setAttributes,
  clientId,
  instanceId,
  block,
}) => {
  const [currentTab, setCurrentTab] = useState(1)

  useEffect(() => {
    if (!className.includes('is-style-'))
      setAttributes({ className: 'is-style-standard' })
  }, [])

  const deactivateTabPanels = () => {
    block.innerBlocks.forEach((item) => {
      const tabPanelSelector = document.querySelector(
        `#block-${item.clientId} .fleximple-block-tab-panel`
      )
      tabPanelSelector && tabPanelSelector.classList.remove('is-active')
    })
  }

  const activateCurrentTabPanel = (index) => {
    const currentInnerBlockId = block.innerBlocks[index].clientId
    const tabPanelSelector = document.querySelector(
      `#block-${currentInnerBlockId} .fleximple-block-tab-panel`
    )
    tabPanelSelector && tabPanelSelector.classList.add('is-active')
  }

  const setCurrentTabPanel = (index) => {
    const currentBlock = document.querySelector(`#block-${block.clientId}`)
    if (index < 0) index = 0
    if (currentBlock) {
      deactivateTabPanels()
      activateCurrentTabPanel(index)
    } else {
      const observer = new MutationObserver(() => {
        const currentBlock = document.querySelector(`#block-${block.clientId}`)
        if (currentBlock) {
          deactivateTabPanels()
          activateCurrentTabPanel(index)
          observer.disconnect()
        }
      })
      observer.observe(document, { subtree: true, childList: true })
    }
  }

  useMemo(() => setCurrentTabPanel(currentTab - 1), [currentTab])

  const onAddTab = async () => {
    // Create a new block
    const insertedBlock = createBlock('fleximple-blocks/tab-panel', {
      content: __('Write content…', 'fleximpleblocks'),
    })
    // Insert the block
    await dispatch('core/block-editor').insertBlock(
      insertedBlock,
      count,
      clientId,
      false
    )

    setCurrentTab(count + 1)
    setAttributes({
      count: count + 1,
      tabsData: newLabels(),
    })
  }

  const onRemoveTab = async (tabIndex) => {
    // Retrieve the block ID
    const removedBlockId = block.innerBlocks[tabIndex].clientId
    // Remove the block
    await dispatch('core/block-editor').removeBlock(removedBlockId, false)

    setCurrentTab((prevCurrentTab) => {
      let newCurrentTab = prevCurrentTab - 1
      if (tabIndex + 1 === prevCurrentTab) {
        newCurrentTab =
          tabIndex === 0 ? 1 : tabIndex + 1 < count ? tabIndex + 1 : tabIndex
      }
      return newCurrentTab
    })

    const newTabsData = tabsData.filter((item, index) => index !== tabIndex)

    setAttributes({
      count: count - 1,
      tabsData: newTabsData,
    })
  }

  const newLabels = () => {
    const newLabels = JSON.parse(JSON.stringify(tabsData))
    newLabels[count] = {
      label: `${__('Tab', 'fleximpleblocks')} ${count + 1}`,
    }
    return newLabels
  }

  const updateLabels = (value, index) => {
    const modifiedTabsData = tabsData.map((label, thisIndex) => {
      if (index === thisIndex) {
        label = { ...label, ...value }
      }
      return label
    })
    setAttributes({ tabsData: modifiedTabsData })
  }

  const defaultClassName = getBlockDefaultClassName(name)

  const tabListClasses = classNames(`${defaultClassName}__tab-list`, {
    [`block-align-${tabsAlignment}`]: tabsAlignment,
  })

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Main', 'fleximpleblocks')}>
          <BaseControl
            label={__('Horizontal alignment', 'fleximpleblocks')}
            id={`fleximple-blocks-tabs-horizontal-block-align-toolbar-${instanceId}`}
          >
            <BlockAlignmentHorizontalToolbar
              id={`fleximple-blocks-tabs-horizontal-block-align-toolbar-${instanceId}`}
              value={tabsAlignment}
              onChange={(value) => setAttributes({ tabsAlignment: value })}
              spaceControlsEnabled
            />
          </BaseControl>
        </PanelBody>
      </InspectorControls>

      <BlockControls>
        <BlockAlignmentHorizontalToolbar
          value={tabsAlignment}
          onChange={(value) => setAttributes({ tabsAlignment: value })}
          spaceControlsEnabled
        />
      </BlockControls>

      <div className={className}>
        <div className={tabListClasses} role="tablist">
          {tabsData.map((tabData, index) => (
            <button
              key={index}
              className={`${defaultClassName}__tab${
                currentTab === index + 1 ? ' is-active' : ''
              }`}
              onClick={() => {
                setCurrentTab(index + 1)
              }}
            >
              <Tooltip text={__('Sort tab', 'fleximpleblocks')}>
                <span
                  className={`${defaultClassName}__icon ${defaultClassName}__icon--drag`}
                  role="button"
                >
                  <Icon icon={interactionIcons.dragHandle} />
                </span>
              </Tooltip>

              <RichText
                key="editable"
                value={tabData.label}
                onChange={(value) => updateLabels({ label: value }, index)}
                placeholder={__('Write tab title…', 'fleximpleblocks')}
                keepPlaceholderOnFocus
              />

              <Tooltip text={__('Remove tab', 'fleximpleblocks')}>
                <span
                  className={`${defaultClassName}__icon ${defaultClassName}__icon--delete`}
                  role="button"
                  onClick={() => onRemoveTab(index)}
                  onKeyDown={(event) => {
                    if (ENTER === event.keyCode || SPACE === event.keyCode) {
                      onRemoveTab(index)
                    }
                  }}
                  tabIndex={0}
                >
                  <Icon icon={interactionIcons.times} />
                </span>
              </Tooltip>
            </button>
          ))}

          <button
            className={`${defaultClassName}__tab`}
            onClick={() => onAddTab()}
          >
            <Tooltip text={__('Add tab', 'fleximpleblocks')}>
              <span
                className={`${defaultClassName}__icon ${defaultClassName}__icon--add`}
              >
                <Icon icon={interactionIcons.plus} />
              </span>
            </Tooltip>
          </button>
        </div>

        <div className={`${defaultClassName}__panel-list`}>
          <InnerBlocks
            template={getTabsTemplate(count)}
            allowedBlocks={ALLOWED_BLOCKS}
          />
        </div>
      </div>
    </>
  )
}

export default compose([
  withSelect((select, ownProps) => {
    const { clientId } = ownProps
    const { getBlock } = select('core/block-editor')
    return {
      block: getBlock(clientId),
    }
  }),
  withInstanceId,
])(TabsEdit)
