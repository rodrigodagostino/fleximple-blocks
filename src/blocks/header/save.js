/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'

const { name } = metadata

function HeaderSave({
  attributes,
  attributes: {
    blockId,
    heading,
    headingLevel,
    subhead,
    order,
    displayHeading,
    displaySubhead,
    displayAdditional,
  },
}) {
  const defaultClassName = getBlockDefaultClassName(name)

  const blockProps = useBlockProps.save({
    className: defaultClassName,
  })

  const tagName = 'h' + headingLevel

  return (
    <header {...blockProps} data-block-id={blockId}>
      {
        // eslint-disable-next-line array-callback-return
        order.map((fragment, index) => {
          if ('heading' === fragment) {
            if (!RichText.isEmpty(heading) && displayHeading) {
              return (
                <RichText.Content
                  key={index}
                  tagName={tagName}
                  className={`${defaultClassName}__heading`}
                  value={heading}
                />
              )
            }
          }

          if ('subhead' === fragment) {
            if (!RichText.isEmpty(subhead) && displaySubhead) {
              return (
                <RichText.Content
                  key={index}
                  tagName="p"
                  className={`${defaultClassName}__subhead`}
                  value={subhead}
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
                  <InnerBlocks.Content />
                </div>
              )
            }
          }
        })
      }

      <InlineStyles {...{ defaultClassName, attributes }} />
    </header>
  )
}

export default HeaderSave
