/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor'

function IframeSave({
  attributes: { url, width, height, hasAutoHeight, title },
}) {
  const blockProps = useBlockProps.save({
    src: url,
    width: width.value + width.unit,
    height: !hasAutoHeight ? height.value + height.unit : null,
    frameBorder: 0,
    'data-auto-height': hasAutoHeight ? 'true' : null,
    scrolling: hasAutoHeight ? 'no' : null,
  })

  return <iframe {...blockProps} title={title} />
}

export default IframeSave
