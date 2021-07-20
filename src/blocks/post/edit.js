/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import apiFetch from '@wordpress/api-fetch'
import { BlockControls, InspectorControls, useBlockProps } from '@wordpress/block-editor'
import {
	BaseControl,
	FocalPointPicker,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components'
import { withInstanceId } from '@wordpress/compose'
import { useEffect, useRef, useState } from '@wordpress/element'

/**
 * Internal dependencies
 */
import PostPreview from './components/post-preview'
import PostSelectControl from './components/post-select-control'
import PostSortableControl from './components/post-sortable-control'
import HeadingLevelDropdown from 'fleximple-components/components/heading-level-dropdown'
import HeadingLevelToolbar from 'fleximple-components/components/heading-level-toolbar'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import Spinner from 'fleximple-components/components/spinner'
import { setResponsiveAttribute } from '../../js/utils'

function PostEdit( {
	attributes,
	attributes: {
		postId,
		postType,
		headingLevel,
		excerptLength,
		extraArticles,
		noFollow,
		noReferrer,
		imageSize,
		aspectRatio,
		focalPoint,
		displayMedia,
		displayFeaturedImage,
		displayExcerpt,
		displayReadMore,
		displayExtraArticles,
		readMore,
	},
	setAttributes,
	instanceId,
} ) {
	/**
	 * TO-DO: Fix repeated loop (unsuccessful fetch) on initial render
	 * when component is inserted for the first time.
	 */
	const [ postData, setPostData ] = useState( null )
	const [ isFetching, setIsFetching ] = useState( true )
	const [ imageSizeOptions, setImageSizeOptions ] = useState( [] )

	const prevPostId = useRef( null )

	// componentWillMount equivalent
	useEffect( () => {
		if ( !attributes.className ) {
			setAttributes( { className: 'is-style-standard' } )
		}

		if ( !postId ) {
			fetchRandomPostData()
			return
		}
		fetchPostData()
	}, [] )

	useEffect( () => {
		if ( prevPostId.current !== postId ) {
			fetchPostData()
		}
		prevPostId.current = postId
	}, [ postId ] )

	const fetchPostData = () => {
		setIsFetching( true )
		apiFetch( {
			path: `/wp/v2/${ postType }/${ postId }`,
		} )
			.then( result => {
				setPostData( result )
				if ( !result.audio_data ) {
					setAttributes( { displayAudio: false } )
				}
				filterImageSizeOptions( result )
				setIsFetching( false )
			} )
			.catch( error => console.error( error ) )
	}

	const fetchRandomPostData = () => {
		setIsFetching( true )
		apiFetch( { path: '/wp/v2/posts/' } )
			.then( results => {
				const randomIndex = Math.floor( Math.random() * results.length )
				const lastPostData = results[ randomIndex ]
				setPostData( lastPostData )
				setAttributes( {
					postId: lastPostData.id,
				} )
				filterImageSizeOptions( lastPostData )
				setIsFetching( false )
			} )
			.catch( error => console.error( error ) )
	}

	const filterImageSizeOptions = data => {
		if ( data && data.featured_media_data ) {
			const options = Object.keys( data.featured_media_data ).map(
				mediaSize => {
					const label = mediaSize
						.replace( /_/g, ' ' )
						.replace( /(?:^|\s)\S/g, function ( a ) {
							return a.toUpperCase()
						} )
					return {
						label,
						value: mediaSize,
					}
				},
			)
			setImageSizeOptions( options )
		}
	}

	const blockProps = useBlockProps( {
		'data-post-id': postId ? postId : null,
	} )

	return (
		<>
			{ !!postData &&
				<BlockControls>
					<HeadingLevelDropdown
						minLevel={ 2 }
						maxLevel={ 5 }
						selectedLevel={ headingLevel }
						onChange={ value => setAttributes( { headingLevel: value } ) }
						isCollapsed={ false }
					/>
				</BlockControls>
			}

			{ !!postData &&
				<InspectorControls>
					<PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
						<PostSelectControl { ...{ attributes, setAttributes } } />

						<BaseControl
							label={ __( 'Heading level', 'fleximpleblocks' ) }
							id={ `fleximple-blocks-post-heading-control-${ instanceId }` }
						>
							<HeadingLevelToolbar
								id={ `fleximple-blocks-post-heading-control-${ instanceId }` }
								minLevel={ 1 }
								maxLevel={ 7 }
								selectedLevel={ headingLevel }
								onChange={ value => setAttributes( { headingLevel: value } ) }
								isCollapsed={ false }
							/>
						</BaseControl>

						{ displayExcerpt &&
							<RangeControl
								label={ __( 'Max number of words in excerpt', 'fleximpleblocks' ) }
								min={ 10 }
								max={ 100 }
								value={ excerptLength }
								onChange={ value => setAttributes( { excerptLength: value } ) }
							/>
						}

						<ToggleControl
							label={ __( 'Display extra articles', 'fleximpleblocks' ) }
							checked={ !!displayExtraArticles }
							onChange={ () => setAttributes( { displayExtraArticles: !displayExtraArticles } ) }
						/>
						{ displayExtraArticles &&
							<RangeControl
								label={ __( 'Extra articles', 'fleximpleblocks' ) }
								min={ 1 }
								max={ 6 }
								value={ extraArticles }
								onChange={ value => setAttributes( { extraArticles: value } ) }
								required
							/>
						}

						<ToggleControl
							label={ __( '“nofollow” attribute', 'fleximpleblocks' ) }
							checked={ !!noFollow }
							onChange={ () => setAttributes( { noFollow: !noFollow } ) }
							help={
								!noFollow
									? __(
										'Google search spider should follow the links to this post.',
										'fleximpleblocks',
									)
									: __(
										'Google search spider should not follow the links to this post.',
										'fleximpleblocks',
									)
							}
						/>

						<ToggleControl
							label={ __( '“noreferrer” attribute', 'fleximpleblocks' ) }
							checked={ !!noReferrer }
							onChange={ () => setAttributes( { noReferrer: !noReferrer } ) }
							help={
								!noReferrer
									? __(
										'The browser should send an HTTP referer header if the user follows the hyperlink.',
										'fleximpleblocks',
									)
									: __(
										'The browser should not send an HTTP referer header if the user follows the hyperlink.',
										'fleximpleblocks',
									)
							}
						/>
					</PanelBody>

					{ displayMedia && displayFeaturedImage && !!postData.featured_media_data &&
						<PanelBody title={ __( 'Media', 'fleximpleblocks' ) } initialOpen={ false }>
							<ResponsiveSettingsTabPanel initialTabName="medium">
								{ tab =>
									<>
										<SelectControl
											label={ __( 'Image size', 'fleximpleblocks' ) }
											value={ imageSize[ tab.name ] }
											options={ [
												{ label: __( 'None', 'fleximpleblocks' ), value: 'none' },
												...imageSizeOptions,
											] }
											onChange={ value => {
												setResponsiveAttribute(
													attributes,
													setAttributes,
													'imageSize',
													tab.name,
													value,
												)
											} }
										/>

										<SelectControl
											label={ __( 'Aspect ratio', 'fleximpleblocks' ) }
											value={ aspectRatio[ tab.name ] }
											options={ [
												{ label: 'None', value: 'none' },
												{ label: '1:1', value: '1-1' },
												{ label: '5:4', value: '5-4' },
												{ label: '4:3', value: '4-3' },
												{ label: '3:2', value: '3-2' },
												{ label: '16:10', value: '16-10' },
												{ label: '16:9', value: '16-9' },
												{ label: '2:1', value: '2-1' },
												{ label: '3:1', value: '3-1' },
											] }
											onChange={ value => {
												setResponsiveAttribute(
													attributes,
													setAttributes,
													'aspectRatio',
													tab.name,
													value,
												)
											} }
										/>

										<FocalPointPicker
											url={ postData.featured_media_data[ imageSize[ tab.name ] ] ? postData.featured_media_data[ imageSize[ tab.name ] ].url : null }
											value={ focalPoint[ tab.name ] }
											onChange={ value => {
												setResponsiveAttribute(
													attributes,
													setAttributes,
													'focalPoint',
													tab.name,
													value,
												)
											} }
										/>
									</>
								}
							</ResponsiveSettingsTabPanel>
						</PanelBody>
					}

					<PanelBody title={ __( 'Display', 'fleximpleblocks' ) } initialOpen={ false }>
						<PostSortableControl { ...{ attributes, setAttributes } } />

						{ !!displayReadMore &&
							<TextControl
								label={ __( 'Read more text', 'fleximpleblocks' ) }
								value={ readMore }
								onChange={ value => setAttributes( { readMore: value } ) }
							/>
						}
					</PanelBody>
				</InspectorControls>
			}

			{ !!isFetching &&
				<div { ...blockProps }>
					<Placeholder className="fleximple-components-placeholder">
						<Spinner />
						<p>{ __( 'Loading…', 'fleximpleblocks' ) }</p>
					</Placeholder>
				</div>
			}

			{ !isFetching && !!postData &&
				<PostPreview postData={ postData } blockProps={ blockProps } { ...{ attributes } } />
			}
		</>
	)
}

export default withInstanceId( PostEdit )
