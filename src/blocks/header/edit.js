/**
 * External dependencies
 */
import classNames from 'classnames'

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
    heading,
    headingLevel,
    subhead,
    textAlignment,
    gap,
    marginTop,
    marginBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
    order,
    displayHeading,
    displaySubhead,
    displayAdditional,
  },
  setAttributes,
  instanceId,
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  // prettier-ignore
  const classes = classNames({
    [`text-align-${textAlignment}`]: textAlignment,
    [`gap-${gap.small.value + (gap.small.unit === '%' ? 'pct' : gap.small.unit)}--sm`]: gap.small.value,
    [`gap-${gap.medium.value + (gap.medium.unit === '%' ? 'pct' : gap.medium.unit)}--md`]: gap.medium.value,
    [`gap-${gap.large.value + (gap.large.unit === '%' ? 'pct' : gap.large.unit)}--lg`]: gap.large.value,
    [`margin-top-${marginTop.small.value + (marginTop.small.unit === '%' ? 'pct' : marginTop.small.unit)}--sm`]: marginTop.small.value,
    [`margin-top-${marginTop.medium.value + (marginTop.medium.unit === '%' ? 'pct' : marginTop.medium.unit)}--md`]: marginTop.medium.value,
    [`margin-top-${marginTop.large.value + (marginTop.large.unit === '%' ? 'pct' : marginTop.large.unit)}--lg`]: marginTop.large.value,
    [`margin-bottom-${marginBottom.small.value + (marginBottom.small.unit === '%' ? 'pct' : marginBottom.small.unit)}--sm`]: marginBottom.small.value,
    [`margin-bottom-${marginBottom.medium.value + (marginBottom.medium.unit === '%' ? 'pct' : marginBottom.medium.unit)}--md`]: marginBottom.medium.value,
    [`margin-bottom-${marginBottom.large.value + (marginBottom.large.unit === '%' ? 'pct' : marginBottom.large.unit)}--lg`]: marginBottom.large.value,
    [`padding-top-${paddingTop.small.value + (paddingTop.small.unit === '%' ? 'pct' : paddingTop.small.unit)}--sm`]: paddingTop.small.value,
    [`padding-top-${paddingTop.medium.value + (paddingTop.medium.unit === '%' ? 'pct' : paddingTop.medium.unit)}--md`]: paddingTop.medium.value,
    [`padding-top-${paddingTop.large.value + (paddingTop.large.unit === '%' ? 'pct' : paddingTop.large.unit)}--lg`]: paddingTop.large.value,
    [`padding-left-${paddingLeft.small.value + (paddingLeft.small.unit === '%' ? 'pct' : paddingLeft.small.unit)}--sm`]: paddingLeft.small.value,
    [`padding-left-${paddingLeft.medium.value + (paddingLeft.medium.unit === '%' ? 'pct' : paddingLeft.medium.unit)}--md`]: paddingLeft.medium.value,
    [`padding-left-${paddingLeft.large.value + (paddingLeft.large.unit === '%' ? 'pct' : paddingLeft.large.unit)}--lg`]: paddingLeft.large.value,
    [`padding-right-${paddingRight.small.value + (paddingRight.small.unit === '%' ? 'pct' : paddingRight.small.unit)}--sm`]: paddingRight.small.value,
    [`padding-right-${paddingRight.medium.value + (paddingRight.medium.unit === '%' ? 'pct' : paddingRight.medium.unit)}--md`]: paddingRight.medium.value,
    [`padding-right-${paddingRight.large.value + (paddingRight.large.unit === '%' ? 'pct' : paddingRight.large.unit)}--lg`]: paddingRight.large.value,
    [`padding-bottom-${paddingBottom.small.value + (paddingBottom.small.unit === '%' ? 'pct' : paddingBottom.small.unit)}--sm`]: paddingBottom.small.value,
    [`padding-bottom-${paddingBottom.medium.value + (paddingBottom.medium.unit === '%' ? 'pct' : paddingBottom.medium.unit)}--md`]: paddingBottom.medium.value,
    [`padding-bottom-${paddingBottom.large.value + (paddingBottom.large.unit === '%' ? 'pct' : paddingBottom.large.unit)}--lg`]: paddingBottom.large.value,
  })

  const blockProps = useBlockProps({
    className: classes,
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

      <header {...blockProps}>
        {
          // eslint-disable-next-line array-callback-return
          order.map((fragment) => {
            if ('heading' === fragment) {
              if (displayHeading) {
                return (
                  <RichText
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
                  <div className={`${defaultClassName}__additional-content`}>
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
