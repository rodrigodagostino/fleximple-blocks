/* global fleximpleblocksPluginData */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { dateI18n, getDate } from '@wordpress/date'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import { ExternalLink, PanelBody, RadioControl, TextControl, ToggleControl } from '@wordpress/components'
import { useEffect } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './block.json'

const { name } = metadata

function DateAndTimeEdit( {
	className,
	attributes: {
		dateFormat,
		timeFormat,
		customDateFormat,
		customTimeFormat,
		separator,
		displayDate,
		displayTime,
	},
	setAttributes,
} ) {
	useEffect( () => {
		if ( ! dateFormat ) {
			if ( fleximpleblocksPluginData.locale.startsWith( 'es_' ) ) {
				setAttributes( { dateFormat: 'j \\d\\e F \\d\\e Y' } )
			} else {
				setAttributes( { dateFormat: 'F j, Y' } )
			}
		}
	}, [] )

	function splitDate() {
		const date = dateI18n( dateFormat !== 'custom' ? dateFormat : customDateFormat, getDate() )
		return `<span>${ date.split( ' ' ).join( '</span><span>' ) }</span>`
	}

	function splitTime() {
		const time = dateI18n( timeFormat !== 'custom' ? timeFormat : customTimeFormat, getDate() )
		return `<span>${ time.split( ' ' ).join( '</span><span>' ) }</span>`
	}

	const defaultClassName = getBlockDefaultClassName( name )

	const blockProps = useBlockProps( {
		className,
		dateTime: dateI18n( getDate() ),
	} )

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
					<ToggleControl
						label={ __( 'Display date', 'fleximpleblocks' ) }
						checked={ displayDate }
						onChange={ () => setAttributes( { displayDate: ! displayDate } ) }
					/>

					{ displayDate && (
						<>
							<RadioControl
								label={ __( 'Date format', 'fleximpleblocks' ) }
								selected={ dateFormat }
								options={ [
									{
										label: fleximpleblocksPluginData.locale.startsWith( 'es_' )
											? dateI18n( 'j \\d\\e F \\d\\e Y', getDate() )
											: dateI18n( 'F j, Y', getDate() ),
										value: fleximpleblocksPluginData.locale.startsWith( 'es_' )
											? 'j \\d\\e F \\d\\e Y'
											: 'F j, Y',
									},
									{
										label: dateI18n( 'Y-m-d', getDate() ),
										value: 'Y-m-d',
									},
									{
										label: dateI18n( 'm/d/Y', getDate() ),
										value: 'm/d/Y',
									},
									{
										label: dateI18n( 'd/m/Y', getDate() ),
										value: 'd/m/Y',
									},
									{
										label: __( 'Custom', 'fleximpleblocks' ),
										value: 'custom',
									},
								] }
								onChange={ ( option ) => {
									if ( option === 'custom' ) {
										setAttributes( { customDateFormat: dateFormat } )
									}
									setAttributes( { dateFormat: option } )
								} }
							/>

							{ dateFormat === 'custom' && (
								<TextControl
									label={ __( 'Custom date format', 'fleximpleblocks' ) }
									hideLabelFromVision="true"
									help={
										<ExternalLink
											href={ 'https://es.wordpress.org/support/article/formatting-date-and-time/' }
										>
											{ __( 'Documentation on date and time formatting.', 'fleximpleblocks' ) }
										</ExternalLink>
									}
									value={ customDateFormat }
									onChange={ ( value ) => setAttributes( { customDateFormat: value } ) }
								/>
							) }
						</>
					) }

					<ToggleControl
						label={ __( 'Display time', 'fleximpleblocks' ) }
						checked={ displayTime }
						onChange={ () => setAttributes( { displayTime: ! displayTime } ) }
					/>

					{ displayTime && (
						<>
							<RadioControl
								label={ __( 'Time format', 'fleximpleblocks' ) }
								selected={ timeFormat }
								options={ [
									{
										label: dateI18n( 'g:i a', getDate() ),
										value: 'g:i a',
									},
									{
										label: dateI18n( 'g:i A', getDate() ),
										value: 'g:i A',
									},
									{
										label: dateI18n( 'H:i', getDate() ),
										value: 'H:i',
									},
									{
										label: __( 'Custom', 'fleximpleblocks' ),
										value: 'custom',
									},
								] }
								onChange={ ( option ) => {
									if ( option === 'custom' ) {
										setAttributes( { customTimeFormat: timeFormat } )
									}
									setAttributes( { timeFormat: option } )
								} }
							/>

							{ timeFormat === 'custom' && (
								<TextControl
									label={ __( 'Custom time format', 'fleximpleblocks' ) }
									hideLabelFromVision="true"
									help={
										<ExternalLink
											href={ 'https://es.wordpress.org/support/article/formatting-date-and-time/' }
										>
											{ __( 'Documentation on date and time formatting.' ) }
										</ExternalLink>
									}
									value={ customTimeFormat }
									onChange={ ( value ) => setAttributes( { customTimeFormat: value } ) }
								/>
							) }
						</>
					) }

					{ displayDate && displayTime && (
						<TextControl
							label={ __( 'Separator', 'fleximpleblocks' ) }
							value={ separator }
							placeholder={ __( 'Type in the date/time separator…', 'fleximpleblocks' ) }
							onChange={ ( value ) => setAttributes( { separator: value } ) }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<time { ...blockProps }>
				{ displayDate && (
					<span
						className={ `${ defaultClassName }__date` }
						dangerouslySetInnerHTML={ { __html: splitDate() } }
					/>
				) }

				{ separator && displayDate && displayTime && (
					<span className={ `${ defaultClassName }__separator` }>{ separator }</span>
				) }

				{ displayTime && (
					<span
						className={ `${ defaultClassName }__time` }
						dangerouslySetInnerHTML={ { __html: splitTime() } }
					/>
				) }
			</time>
		</>
	)
}

export default DateAndTimeEdit
