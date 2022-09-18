/**
 * WordPress dependencies
 */
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import InlineStyles from './inline-styles'

const { name } = metadata

function ButtonGroupSave({ attributes, attributes: { blockId } }) {
  const defaultClassName = getBlockDefaultClassName(name)

  const blockProps = useBlockProps.save({
    className: defaultClassName,
  })

  return (
    <div {...blockProps} data-block-id={blockId}>
      <InnerBlocks.Content />

      <InlineStyles {...{ defaultClassName, attributes }} />
    </div>
  )
}

export default ButtonGroupSave
