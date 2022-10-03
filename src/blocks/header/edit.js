/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
  AlignmentToolbar,
  BlockControls,
  InnerBlocks,
  InspectorControls,
  RichText,
  useBlockProps,
} from '@wordpress/block-editor'
import { BaseControl, PanelBody } from '@wordpress/components'
import { withInstanceId } from '@wordpress/compose'
import { useEffect } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'
import HeaderSortableControl from './components/header-sortable-control'
import HeadingLevelDropdown from 'fleximple-components/components/heading-level-dropdown'
import HeadingLevelToolbar from 'fleximple-components/components/heading-level-toolbar'
import SpacingPanel from 'fleximple-components/components/spacing-panel'

const { name } = metadata

function HeaderEdit({
  attributes,
  attributes: {
    blockId,
    heading,
    headingLevel,
    subhead,
    textAlignment,
    order,
    displayHeading,
    displaySubhead,
    displayAdditional,
  },
  setAttributes,
  clientId,
  instanceId,
}) {
  useEffect(() => {
    setAttributes({ blockId: clientId })
  }, [clientId])

  const defaultClassName = getBlockDefaultClassName(name)

  const blockProps = useBlockProps({
    className: defaultClassName,
  })

  const tagName = 'h' + headingLevel

  return (
    <>
      <BlockControls>
        <HeadingLevelDropdown
          selectedLevel={headingLevel}
          onChange={(value) => setAttributes({ headingLevel: value })}
        />
        <AlignmentToolbar
          value={textAlignment}
          onChange={(value) => setAttributes({ textAlignment: value })}
        />
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Main', 'fleximpleblocks')}>
          <BaseControl
            label={__('Heading Level')}
            id={`fleximple-blocks-header-heading-control-${instanceId}`}
          >
            <HeadingLevelToolbar
              id={`fleximple-blocks-header-heading-control-${instanceId}`}
              minLevel={1}
              maxLevel={7}
              selectedLevel={headingLevel}
              onChange={(value) => setAttributes({ headingLevel: value })}
              isCollapsed={false}
            />
          </BaseControl>

          <BaseControl
            label={__('Text alignment', 'fleximpleblocks')}
            id={`fleximple-blocks-header-text-alignment-toolbar-${instanceId}`}
          >
            <AlignmentToolbar
              id={`fleximple-blocks-header-text-alignment-toolbar-${instanceId}`}
              value={textAlignment}
              onChange={(value) => setAttributes({ textAlignment: value })}
              isCollapsed={false}
            />
          </BaseControl>
        </PanelBody>

        <SpacingPanel
          title={__('Spacing', 'fleximpleblocks')}
          controls={[
            'gap',
            'margin-top',
            'margin-bottom',
            'padding-top',
            'padding-left',
            'padding-right',
            'padding-bottom',
          ]}
          initialOpen={false}
          {...{ attributes, setAttributes }}
        />

        <PanelBody title={__('Display', 'fleximpleblocks')} initialOpen={false}>
          <HeaderSortableControl {...{ attributes, setAttributes }} />
        </PanelBody>
      </InspectorControls>

      <header {...blockProps} data-block-id={blockId}>
        {
          // eslint-disable-next-line array-callback-return
          order.map((fragment, index) => {
            if ('heading' === fragment) {
              if (displayHeading) {
                return (
                  <RichText
                    key={index}
                    tagName={tagName}
                    className={`${defaultClassName}__heading`}
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder={__('Write heading…', 'fleximpleblocks')}
                    keepPlaceholderOnFocus
                  />
                )
              }
            }

            if ('subhead' === fragment) {
              if (displaySubhead) {
                return (
                  <RichText
                    key={index}
                    className={`${defaultClassName}__subhead`}
                    value={subhead}
                    onChange={(value) => setAttributes({ subhead: value })}
                    placeholder={__('Write subhead…', 'fleximpleblocks')}
                    keepPlaceholderOnFocus
                  />
                )
              }
            }

            if ('additional' === fragment) {
              if (displayAdditional) {
                return (
                  <div
                    key={index}
                    className={`${defaultClassName}__additional-content`}
                  >
                    <InnerBlocks />
                  </div>
                )
              }
            }
          })
        }

        <InlineStyles {...{ defaultClassName, attributes, isEditor: true }} />
      </header>
    </>
  )
}

export default withInstanceId(HeaderEdit)
