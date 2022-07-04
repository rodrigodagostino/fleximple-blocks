/**
 * COMPONENT: Header Sortable Control
 */

/**
 * External dependencies
 */
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components'

/**
 * Internal dependencies
 */
import {
  DragHandle,
  getHelpText,
  getLabel,
  getState,
  onSortStart,
  onSortEnd,
  toggleAttribute,
} from '../../../js/sortable-control'

function HeaderSortableControl({
  attributes,
  attributes: { order },
  setAttributes,
}) {
  const SortableItem = SortableElement(({ value }) => {
    const label = getLabel(value)
    let icon = 'hidden'
    let text = getHelpText(value, 'hidden')

    if (getState(value, attributes)) {
      icon = 'visibility'
      text = getHelpText(value, 'visible')
    }

    return (
      <div className="fleximple-components-sortable-control__item">
        <DragHandle />
        <div className="fleximple-components-sortable-control__label">
          {label}
        </div>
        <Button
          icon={icon}
          label={text}
          className="fleximple-components-sortable-control__button"
          onClick={() => toggleAttribute(value, attributes, setAttributes)}
        />
      </div>
    )
  })

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className="fleximple-components-sortable-control__sortable-list">
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </div>
    )
  })

  return (
    <div className="fleximple-components-sortable-control">
      <SortableList
        items={order}
        onSortStart={onSortStart}
        onSortEnd={(sortEnd, e) =>
          onSortEnd(sortEnd, e, 'order', order, setAttributes)
        }
        useDragHandle
        helperClass="fleximple-components-sortable-control__helper"
      />
    </div>
  )
}

export default HeaderSortableControl
