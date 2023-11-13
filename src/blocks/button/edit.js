/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import {
  BlockControls,
  InnerBlocks,
  InspectorControls,
  LinkControl,
  RichText,
  PanelColorSettings,
  useBlockProps,
  withColors,
} from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import {
  BaseControl,
  Button,
  ButtonGroup,
  KeyboardShortcuts,
  PanelBody,
  Popover,
  SelectControl,
  TextControl,
  ToggleControl,
  ToolbarButton,
} from '@wordpress/components'
import { compose, withInstanceId } from '@wordpress/compose'
import { useCallback, useEffect, useState } from '@wordpress/element'
import { rawShortcut, displayShortcut } from '@wordpress/keycodes'
import { link, linkOff } from '@wordpress/icons'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'
import SpacingControl from 'fleximple-components/components/spacing-control'
import SpacingPanel from 'fleximple-components/components/spacing-panel'
import InlineStyles from './inline-styles'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_BLOCKS = ['fleximple-blocks/icon']
const TEMPLATE = [['fleximple-blocks/icon', { iconSize: 20 }]]

function URLPicker({
  isSelected,
  url,
  setAttributes,
  opensInNewTab,
  onToggleOpenInNewTab,
  anchorRef,
}) {
  const [isURLPickerOpen, setIsURLPickerOpen] = useState(false)
  const urlIsSet = !!url
  const urlIsSetandSelected = urlIsSet && isSelected

  const openLinkControl = () => {
    setIsURLPickerOpen(true)
    return false // prevents default behaviour for event
  }

  const unlinkButton = () => {
    setAttributes({
      url: undefined,
      linkTarget: undefined,
      rel: undefined,
    })
    setIsURLPickerOpen(false)
  }

  const linkControl = (isURLPickerOpen || urlIsSetandSelected) && (
    <Popover
      position="bottom center"
      onClose={() => setIsURLPickerOpen(false)}
      anchorRef={anchorRef?.current}
    >
      <LinkControl
        className="wp-block-navigation-link__inline-link-input"
        value={{ url, opensInNewTab }}
        onChange={({ url: newURL = '', opensInNewTab: newOpensInNewTab }) => {
          setAttributes({ url: newURL })

          if (opensInNewTab !== newOpensInNewTab) {
            onToggleOpenInNewTab(newOpensInNewTab)
          }
        }}
      />
    </Popover>
  )

  return (
    <>
      <BlockControls group="block">
        {!urlIsSet && (
          <ToolbarButton
            name="link"
            icon={link}
            title={__('Link')}
            shortcut={displayShortcut.primary('k')}
            onClick={openLinkControl}
          />
        )}
        {urlIsSetandSelected && (
          <ToolbarButton
            name="link"
            icon={linkOff}
            title={__('Unlink')}
            shortcut={displayShortcut.primaryShift('k')}
            onClick={unlinkButton}
            isActive={true}
          />
        )}
      </BlockControls>

      {isSelected && (
        <KeyboardShortcuts
          bindGlobal
          shortcuts={{
            [rawShortcut.primary('k')]: openLinkControl,
            [rawShortcut.primaryShift('k')]: unlinkButton,
          }}
        />
      )}

      {linkControl}
    </>
  )
}

function ButtonEdit({
  className,
  attributes,
  attributes: {
    blockId,
    text,
    url,
    linkTarget,
    alignmentHorizontal,
    borderRadius,
    width,
    title,
    noFollow,
    noReferrer,
    hasIcon,
    iconPosition,
    isIconOnly,
  },
  backgroundColor,
  textColor,
  setBackgroundColor,
  setTextColor,
  setAttributes,
  isSelected,
  clientId,
}) {
  useEffect(() => {
    if (!className || !className.includes('is-style-')) {
      setAttributes({ className: 'is-style-fill' })
    }
  }, [])

  useEffect(() => {
    setAttributes({ blockId: clientId })
  }, [clientId])

  const onToggleOpenInNewTab = useCallback(
    (value) => {
      const newLinkTarget = value ? '_blank' : undefined

      setAttributes({
        linkTarget: newLinkTarget,
      })
    },
    [setAttributes]
  )

  const defaultClassName = getBlockDefaultClassName(name)

  const blockProps = useBlockProps({
    className: defaultClassName,
    title: title,
  })

  const buttonStyles = {
    backgroundColor: backgroundColor.color,
    color: textColor.color,
    borderRadius: borderRadius.value
      ? borderRadius.value + borderRadius.unit
      : undefined,
  }

  const relAttribute = `${noFollow ? 'nofollow' : ''} ${
    noReferrer ? 'noreferrer' : ''
  }`.trim()

  return (
    <>
      <BlockControls>
        <URLPicker
          url={url}
          setAttributes={setAttributes}
          isSelected={isSelected}
          opensInNewTab={linkTarget === '_blank'}
          onToggleOpenInNewTab={onToggleOpenInNewTab}
        />
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Main', 'fleximpleblocks')}>
          <BaseControl label={__('Horizontal alignment', 'fleximpleblocks')}>
            <BlockAlignmentHorizontalToolbar
              value={alignmentHorizontal}
              onChange={(value) =>
                setAttributes({ alignmentHorizontal: value })
              }
              spaceControlsEnabled
            />
          </BaseControl>

          <SpacingControl
            valueLabel={__('Border radius', 'fleximpleblocks')}
            unitLabel={__('Border radius unit', 'fleximpleblocks')}
            initialPosition={4}
            min={0}
            max={100}
            attribute={borderRadius}
            onChange={(value) => setAttributes({ borderRadius: value })}
            isResponsive={false}
          />

          <SelectControl
            label={__('Button width', 'fleximpleblocks')}
            value={width}
            options={[
              { label: __('Automatic', 'fleximpleblocks'), value: 'auto' },
              { label: __('Full', 'fleximpleblocks'), value: 'full' },
            ]}
            onChange={(value) => setAttributes({ width: value })}
          />

          <TextControl
            label={__('Button title', 'fleximpleblocks')}
            value={title}
            placeholder={__('Type the button title…', 'fleximpleblocks')}
            onChange={(value) => setAttributes({ title: value })}
            help={__(
              'It will show to the user as a tooltip.',
              'fleximpleblocks'
            )}
          />

          <ToggleControl
            label={__('“nofollow” attribute', 'fleximpleblocks')}
            checked={!!noFollow}
            onChange={() => setAttributes({ noFollow: !noFollow })}
            help={
              !noFollow
                ? __(
                    'Google search spider should follow the links to this post.',
                    'fleximpleblocks'
                  )
                : __(
                    'Google search spider should not follow the links to this post.',
                    'fleximpleblocks'
                  )
            }
          />

          <ToggleControl
            label={__('“noreferrer” attribute', 'fleximpleblocks')}
            checked={!!noReferrer}
            onChange={() => setAttributes({ noReferrer: !noReferrer })}
            help={
              !noReferrer
                ? __(
                    'The browser should send an HTTP referer header if the user follows the hyperlink.',
                    'fleximpleblocks'
                  )
                : __(
                    'The browser should not send an HTTP referer header if the user follows the hyperlink.',
                    'fleximpleblocks'
                  )
            }
          />
        </PanelBody>

        <PanelBody title={__('Icon', 'fleximpleblocks')} initialOpen={false}>
          <ToggleControl
            label={__('Display icon', 'fleximpleblocks')}
            checked={hasIcon}
            onChange={() => {
              setAttributes({ hasIcon: !hasIcon })
            }}
          />

          {!isIconOnly && (
            <BaseControl>
              <p className="fleximple-components-control__label">
                {__('Icon position', 'fleximpleblocks')}
              </p>
              <ButtonGroup aria-label={__('Icon position', 'fleximpleblocks')}>
                {['left', 'right'].map((position) => {
                  const isCurrent = position === iconPosition
                  return (
                    <Button
                      key={position}
                      isLarge
                      isPrimary={isCurrent}
                      aria-pressed={isCurrent}
                      onClick={() => setAttributes({ iconPosition: position })}
                    >
                      {position.charAt(0).toUpperCase() + position.slice(1)}
                    </Button>
                  )
                })}
              </ButtonGroup>
            </BaseControl>
          )}

          <ToggleControl
            label={__('Display icon only', 'fleximpleblocks')}
            checked={isIconOnly}
            onChange={() => {
              setAttributes({ isIconOnly: !isIconOnly })
            }}
          />
        </PanelBody>

        <PanelColorSettings
          title={__('Color', 'fleximpleblocks')}
          colorSettings={[
            {
              label: __('Text'),
              value: textColor.color,
              onChange: setTextColor,
            },
            {
              label: __('Background'),
              value: backgroundColor.color,
              onChange: setBackgroundColor,
            },
          ]}
          initialOpen={false}
        ></PanelColorSettings>

        <SpacingPanel
          title={__('Spacing', 'fleximpleblocks')}
          controls={[
            'padding-top',
            'padding-left',
            'padding-right',
            'padding-bottom',
          ]}
          initialOpen={false}
          {...{ attributes, setAttributes }}
        />
      </InspectorControls>

      <div {...blockProps} data-block-id={blockId}>
        <div
          className={`${defaultClassName}__link`}
          style={buttonStyles}
          rel={relAttribute ? relAttribute : null}
        >
          {hasIcon && iconPosition === 'left' && (
            <InnerBlocks template={TEMPLATE} allowedBlocks={ALLOWED_BLOCKS} />
          )}

          {!isIconOnly && (
            <RichText
              className={`${defaultClassName}__text`}
              placeholder={__('Write text…', 'fleximpleblocks')}
              value={text}
              onChange={(value) => setAttributes({ text: value })}
              allowedFormats={['bold', 'italic', 'strikethrough']}
              keepPlaceholderOnFocus
            />
          )}

          {hasIcon && iconPosition === 'right' && (
            <InnerBlocks template={TEMPLATE} allowedBlocks={ALLOWED_BLOCKS} />
          )}
        </div>

        <InlineStyles {...{ defaultClassName, attributes }} />
      </div>
    </>
  )
}

export default compose([
  withColors('backgroundColor', { textColor: 'color' }),
  withInstanceId,
])(ButtonEdit)
