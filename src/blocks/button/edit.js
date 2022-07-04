/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import {
  BlockControls,
  InspectorControls,
  __experimentalLinkControl as LinkControl,
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
  TextareaControl,
  TextControl,
  ToggleControl,
  ToolbarButton,
} from '@wordpress/components'
import { compose, withInstanceId } from '@wordpress/compose'
import { RawHTML, useCallback, useEffect, useState } from '@wordpress/element'
import { rawShortcut, displayShortcut } from '@wordpress/keycodes'
import { link, linkOff } from '@wordpress/icons'

/**
 * Internal dependencies
 */
import metadata from './block.json'
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'
import IconPicker from 'fleximple-components/components/icon-picker'
import SpacingControls from 'fleximple-components/components/spacing-controls'
import SpacingPanel from 'fleximple-components/components/spacing-panel'

const { name } = metadata

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
    text,
    url,
    linkTarget,
    borderRadius,
    width,
    title,
    noFollow,
    noReferrer,
    iconId,
    iconSize,
    iconPosition,
    isIconOnly,
    hasCustomIcon,
    customIcon,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
    alignmentHorizontal,
  },
  backgroundColor,
  textColor,
  setBackgroundColor,
  setTextColor,
  setAttributes,
  isSelected,
}) {
  // componentWillMount equivalent
  useEffect(() => {
    if (!className || !className.includes('is-style-')) {
      setAttributes({ className: 'is-style-fill' })
    }
  }, [])

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

  const classes = classnames({
    [`block-align-h-${alignmentHorizontal}`]: alignmentHorizontal,
  })

  const blockProps = useBlockProps({
    className: classes,
    title: title,
  })

  const buttonClasses = classnames(`${defaultClassName}__link`, {
    [`width-${width}`]: width,
    'has-background': backgroundColor.color,
    [backgroundColor.class]: backgroundColor.class,
    'has-text-color': textColor.color,
    [textColor.class]: textColor.class,
    [`padding-top-${
      paddingTop.small.value +
      (paddingTop.small.unit === '%' ? 'pct' : paddingTop.small.unit)
    }--sm`]: paddingTop.small.value,
    [`padding-top-${
      paddingTop.medium.value +
      (paddingTop.medium.unit === '%' ? 'pct' : paddingTop.medium.unit)
    }--md`]: paddingTop.medium.value,
    [`padding-top-${
      paddingTop.large.value +
      (paddingTop.large.unit === '%' ? 'pct' : paddingTop.large.unit)
    }--lg`]: paddingTop.large.value,
    [`padding-left-${
      paddingLeft.small.value +
      (paddingLeft.small.unit === '%' ? 'pct' : paddingLeft.small.unit)
    }--sm`]: paddingLeft.small.value,
    [`padding-left-${
      paddingLeft.medium.value +
      (paddingLeft.medium.unit === '%' ? 'pct' : paddingLeft.medium.unit)
    }--md`]: paddingLeft.medium.value,
    [`padding-left-${
      paddingLeft.large.value +
      (paddingLeft.large.unit === '%' ? 'pct' : paddingLeft.large.unit)
    }--lg`]: paddingLeft.large.value,
    [`padding-right-${
      paddingRight.small.value +
      (paddingRight.small.unit === '%' ? 'pct' : paddingRight.small.unit)
    }--sm`]: paddingRight.small.value,
    [`padding-right-${
      paddingRight.medium.value +
      (paddingRight.medium.unit === '%' ? 'pct' : paddingRight.medium.unit)
    }--md`]: paddingRight.medium.value,
    [`padding-right-${
      paddingRight.large.value +
      (paddingRight.large.unit === '%' ? 'pct' : paddingRight.large.unit)
    }--lg`]: paddingRight.large.value,
    [`padding-bottom-${
      paddingBottom.small.value +
      (paddingBottom.small.unit === '%' ? 'pct' : paddingBottom.small.unit)
    }--sm`]: paddingBottom.small.value,
    [`padding-bottom-${
      paddingBottom.medium.value +
      (paddingBottom.medium.unit === '%' ? 'pct' : paddingBottom.medium.unit)
    }--md`]: paddingBottom.medium.value,
    [`padding-bottom-${
      paddingBottom.large.value +
      (paddingBottom.large.unit === '%' ? 'pct' : paddingBottom.large.unit)
    }--lg`]: paddingBottom.large.value,
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

  const iconClasses = classnames(`${defaultClassName}__icon`, {
    [iconId]: iconId,
    [`position-${iconPosition}`]: iconPosition && !isIconOnly,
  })

  const customIconClasses = classnames(`${defaultClassName}__custom-icon`, {
    [`position-${iconPosition}`]: iconPosition && !isIconOnly,
  })

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

          <SpacingControls
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
          <IconPicker
            icons={[
              {
                label: __('Icon', 'fleximpleblocks'),
                value: iconId,
                onChange: (value) => setAttributes({ iconId: value }),
              },
            ]}
            sizes={[
              {
                label: __('Icon size', 'fleximpleblocks'),
                value: iconSize,
                initialPosition: 18,
                min: 10,
                max: 120,
                onChange: (value) => setAttributes({ iconSize: value }),
              },
            ]}
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
              if (isIconOnly) {
                setAttributes({ iconSize: 18 })
              } else {
                setAttributes({ iconSize: 40 })
              }
            }}
          />

          <ToggleControl
            label={__('Use custom icon', 'fleximpleblocks')}
            checked={hasCustomIcon}
            onChange={() => setAttributes({ hasCustomIcon: !hasCustomIcon })}
          />

          {!!hasCustomIcon && (
            <TextareaControl
              label={__('Custom icon', 'fleximpleblocks')}
              style={{ fontFamily: 'monospace' }}
              help={__(
                'Insert the HTML code for your custom icon.',
                'fleximpleblocks'
              )}
              value={customIcon}
              onChange={(value) => setAttributes({ customIcon: value })}
            />
          )}
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

      <div {...blockProps}>
        <div
          className={buttonClasses}
          style={buttonStyles}
          rel={relAttribute ? relAttribute : null}
        >
          {!!iconId && iconPosition === 'left' && !hasCustomIcon && (
            <i className={iconClasses} style={{ fontSize: iconSize }} />
          )}

          {!!hasCustomIcon && !!customIcon && iconPosition === 'left' && (
            <RawHTML className={customIconClasses} style={{ height: iconSize }}>
              {customIcon}
            </RawHTML>
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

          {!!hasCustomIcon &&
            (iconPosition === 'right' || iconPosition === undefined) && (
              <RawHTML
                className={customIconClasses}
                style={{ height: iconSize }}
              >
                {customIcon}
              </RawHTML>
            )}

          {!!iconId &&
            (iconPosition === 'right' || iconPosition === undefined) &&
            !hasCustomIcon && (
              <span>
                <i className={iconClasses} style={{ fontSize: iconSize }} />
              </span>
            )}
        </div>
      </div>
    </>
  )
}

export default compose([
  withColors('backgroundColor', { textColor: 'color' }),
  withInstanceId,
])(ButtonEdit)
