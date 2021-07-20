/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
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
import { BlockControls, InspectorControls } from '@wordpress/block-editor'
import { withInstanceId } from '@wordpress/compose'
import { Component } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch'

/**
 * Internal dependencies
 */
import PostPreview from './components/post-preview'
import PostSelectControl from './components/post-select-control'
import PostSortableControl from './components/post-sortable-control'
import HeadingLevelDropdown from 'fleximple-components/components/heading-level-dropdown'
import HeadingLevelToolbar from 'fleximple-components/components/heading-level-toolbar'
import Spinner from 'fleximple-components/components/spinner'

class PostEdit extends Component {
	constructor() {
		super( ...arguments )

		this.generatingPreview = this.generatingPreview.bind( this )

		this.state = {
			postData: undefined,
			isFetching: true,
		}
	}

	componentDidMount() {
		const { className, setAttributes } = this.props
		if ( ! className.includes( 'is-style-' ) ) {
			setAttributes( { className: 'is-style-standard' } )
		}

		if ( this.props.attributes.postId ) {
			this.generatingPreview()
			this.fetchPostData()
		} else {
			this.fetchRandomPostData()
		}
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.attributes.postId !== prevProps.attributes.postId ) {
			this.fetchPostData()
		}
	}

	fetchPostData = async () => {
		this.generatingPreview()
		const {
			attributes: { postId, postType },
			setAttributes,
		} = this.props
		await apiFetch( {
			path: `/wp/v2/${ postType }/${ postId }`,
		} )
			.then( ( postData ) => {
				this.setState( {
					postData,
					isFetching: false,
				} )
				if ( ! postData.audio_data.length > 0 ) {
					setAttributes( { displayAudio: false } )
				}
			} )
			.catch( ( error ) => console.error( error ) )
	}

	fetchRandomPostData = () => {
		apiFetch( { path: '/wp/v2/posts/' } )
			.then( ( lastPostsData ) => {
				const lastPostData = lastPostsData[0]
				this.setState( {
					postData: lastPostData,
					isFetching: false,
				} )
				this.props.setAttributes( {
					postId: lastPostData.id,
				} )
			} )
			.catch( ( error ) => console.error( error ) )
	}

	generatingPreview() {
		this.setState( {
			isFetching: true,
		} )
	}

	render() {
		const {
			className,
			attributes,
			attributes: {
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
		} = this.props

		const { postData, isFetching } = this.state

		return (
			<>
				{ !! postData && (
					<BlockControls>
						<HeadingLevelDropdown
							minLevel={ 2 }
							maxLevel={ 5 }
							selectedLevel={ headingLevel }
							onChange={ ( value ) => setAttributes( { headingLevel: value } ) }
							isCollapsed={ false }
						/>
					</BlockControls>
				) }

				{ !! postData && (
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
									onChange={ ( value ) => setAttributes( { headingLevel: value } ) }
									isCollapsed={ false }
								/>
							</BaseControl>

							{ displayExcerpt && (
								<RangeControl
									label={ __( 'Max number of words in excerpt', 'fleximpleblocks' ) }
									min={ 10 }
									max={ 100 }
									value={ excerptLength }
									onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
								/>
							) }

							{ displayExtraArticles && (
								<RangeControl
									label={ __( 'Extra articles', 'fleximpleblocks' ) }
									min={ 1 }
									max={ 6 }
									value={ extraArticles }
									onChange={ ( value ) => setAttributes( { extraArticles: value } ) }
									required
								/>
							) }

							<ToggleControl
								label={ __( '“nofollow” attribute', 'fleximpleblocks' ) }
								checked={ !! noFollow }
								onChange={ () => setAttributes( { noFollow: ! noFollow } ) }
								help={
									! noFollow
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
								checked={ !! noReferrer }
								onChange={ () => setAttributes( { noReferrer: ! noReferrer } ) }
								help={
									! noReferrer
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

						{ displayMedia && displayFeaturedImage && !! postData.featured_media_data && (
							<PanelBody title={ __( 'Media', 'fleximpleblocks' ) } initialOpen={ false }>
								<FocalPointPicker
									url={ postData.featured_media_data[imageSize].url }
									value={ focalPoint }
									onChange={ ( value ) => setAttributes( { focalPoint: value } ) }
								/>

								<SelectControl
									label={ __( 'Size', 'fleximpleblocks' ) }
									value={ imageSize }
									options={ Object.keys( postData.featured_media_data ).map( ( featuredMediaSize ) => {
										const label = featuredMediaSize
											.replace( /_/g, ' ' )
											.replace( /(?:^|\s)\S/g, function ( a ) {
												return a.toUpperCase()
											} )
										return {
											label,
											value: featuredMediaSize,
										}
									} ) }
									onChange={ ( value ) => setAttributes( { imageSize: value } ) }
								/>

								<SelectControl
									label={ __( 'Aspect ratio', 'fleximpleblocks' ) }
									value={ aspectRatio }
									options={ [
										{ label: '1:1', value: '1-1' },
										{ label: '5:4', value: '5-4' },
										{ label: '4:3', value: '4-3' },
										{ label: '3:2', value: '3-2' },
										{ label: '16:10', value: '16-10' },
										{ label: '16:9', value: '16-9' },
										{ label: '2:1', value: '2-1' },
										{ label: '3:1', value: '3-1' },
									] }
									onChange={ ( value ) =>
										setAttributes( {
											aspectRatio: value,
										} )
									}
								/>
							</PanelBody>
						) }

						<PanelBody title={ __( 'Display', 'fleximpleblocks' ) } initialOpen={ false }>
							<PostSortableControl { ...{ attributes, setAttributes } } />

							{ !! displayReadMore && (
								<TextControl
									label={ __( 'Read more text', 'fleximpleblocks' ) }
									value={ readMore }
									onChange={ ( value ) => setAttributes( { readMore: value } ) }
								/>
							) }
						</PanelBody>
					</InspectorControls>
				) }

				{ !! isFetching && (
					<Placeholder className="fleximple-components-placeholder">
						<>
							<Spinner />
							<p>{ __( 'Loading…', 'fleximpleblocks' ) }</p>
						</>
					</Placeholder>
				) }

				{ ! isFetching && !! postData && <PostPreview postData={ postData } { ...{ className, attributes } } /> }
			</>
		)
	}
}

export default withInstanceId( PostEdit )
