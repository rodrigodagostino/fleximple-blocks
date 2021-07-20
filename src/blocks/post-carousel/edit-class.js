/**
 * External dependencies
 */
import { isUndefined, pickBy } from 'lodash'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import {
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	withColors,
} from '@wordpress/block-editor'
import {
	BaseControl,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components'
import { compose, withInstanceId } from '@wordpress/compose'
import { withSelect } from '@wordpress/data'
import { Component } from '@wordpress/element'
import { addQueryArgs } from '@wordpress/url'
import apiFetch from '@wordpress/api-fetch'

/**
 * Internal dependencies
 */
import BlockAlignmentHorizontalToolbar from 'fleximple-components/components/block-alignment-horizontal-toolbar'
import HeadingLevelDropdown from 'fleximple-components/components/heading-level-dropdown'
import HeadingLevelToolbar from 'fleximple-components/components/heading-level-toolbar'
import IconPicker from 'fleximple-components/components/icon-picker'
import PostCarouselSortableControl from './components/post-carousel-sortable-control'
import PostCarouselPreview from './components/post-carousel-preview'
import PostCarouselSelectControl from './components/post-carousel-select-control'
import QueryControls from 'fleximple-components/components/query-controls'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import Spinner from 'fleximple-components/components/spinner'
import { setResponsiveAttribute } from './../../js/utils'

/**
 * Block constants
 */
const MAX_POSTS_COLUMNS = 6

class PostCarouselEdit extends Component {
	constructor() {
		super( ...arguments )

		this.state = {
			categoriesList: [],
			selectedPostsData: [],
		}
	}

	componentDidMount() {
		const { className, setAttributes } = this.props
		if ( !className.includes( 'is-style-' ) ) {
			setAttributes( { className: 'is-style-standard' } )
		}
	
		this.isStillMounted = true
		this.fetchRequest = apiFetch( {
			path: addQueryArgs( '/wp/v2/categories', {
				per_page: -1,
			} ),
		} ).then(
			categoriesList => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList } )
				}
			},
		).catch(
			() => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList: [] } )
				}
			},
		)
		if ( this.props.attributes.selectedPosts ) {
			this.fetchSelectedPostsData()
		}
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.attributes.selectedPosts !== prevProps.attributes.selectedPosts && !!this.props.attributes.selectedPosts ) {
			this.fetchSelectedPostsData()
		}
	}

	fetchSelectedPostsData = async () => {
		const { attributes: { selectedPosts } } = this.props
		const map = new Map()
		await Promise.all( selectedPosts.map( async selectedPost => {
			await apiFetch( {
				path: `/wp/v2/posts/${ selectedPost.value }`,
			} ).then( response => map.set( selectedPost, response ) )
		} ) )

		// Display responses in 'selectedPosts' array order.
		const selectedPostsData = new Array()
		await selectedPosts.forEach( selectedPost => {
			selectedPostsData.push( map.get( selectedPost ) )
		} )
		await this.setState( { selectedPostsData } )
	};

	componentWillUnmount() {
		this.isStillMounted = false
	}

	render() {
		const {
			className,
			attributes,
			attributes: {
				slidesPerView,
				autoplay,
				loop,
				speed,
				delay,
				spaceBetween,
				effect,
				pagination,
				headingLevel,
				contentAlignment,
				excerptLength,
				noFollow,
				noReferrer,
				postsToShow,
				offset,
				categories,
				excludedCategories,
				order,
				orderBy,
				selectManually,
				selectedPosts,
				imageSize,
				aspectRatio,
				buttonPrevIcon,
				buttonNextIcon,
				buttonIconSize,
				displayMedia,
				displayFeaturedImage,
				displayExcerpt,
				displayReadMore,
				readMore,
			},
			setAttributes,
			recentPosts,
			instanceId,
			buttonIconColor,
			setButtonIconColor,
		} = this.props

		const {
			categoriesList,
			selectedPostsData,
		} = this.state

		const inspectorControls = 
			<InspectorControls>
				<PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
					<RangeControl
						label={ __( 'Number of posts', 'fleximpleblocks' ) }
						className="gap-v-small"
						min={ 1 }
						max={ !hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, recentPosts.length ) }
						value={ postsToShow }
						onChange={ value => setAttributes( { postsToShow: value } ) }
						required
					/>

					<RangeControl
						label={ __( 'Posts per view', 'fleximpleblocks' ) }
						min={ 1 }
						max={ 6 }
						value={ slidesPerView }
						onChange={ value => setAttributes( { slidesPerView: value } ) }
					/>

					<ToggleControl
						label={ __( 'Autoplay', 'fleximpleblocks' ) }
						checked={ autoplay }
						onChange={ () => setAttributes( { autoplay: !autoplay } ) }
					/>

					<ToggleControl
						label={ __( 'Loop', 'fleximpleblocks' ) }
						checked={ loop }
						onChange={ () => setAttributes( { loop: !loop } ) }
					/>

					<div className="fleximple-components-control__row width-50-50">
						<BaseControl
							label={ __( 'Speed', 'fleximpleblocks' ) }
							help={ __( 'In milliseconds.', 'fleximpleblocks' ) }>
							<input
								type="number"
								value={ speed }
								onChange={ event => event.target.value === '' ?
									setAttributes( { speed: undefined } ) :
									setAttributes( { speed: Number( event.target.value ) } )
								}
								min={ 0 }
								step="10"
							/>
						</BaseControl>

						<BaseControl
							label={ __( 'Delay', 'fleximpleblocks' ) }
							help={ __( 'In milliseconds.', 'fleximpleblocks' ) }>
							<input
								type="number"
								value={ delay }
								onChange={ event => event.target.value === '' ?
									setAttributes( { delay: undefined } ) :
									setAttributes( { delay: Number( event.target.value ) } )
								}
								min={ 0 }
								step="10"
							/>
						</BaseControl>
					</div>

					<RangeControl
						label={ __( 'Distance between slides', 'fleximpleblocks' ) }
						min={ 0 }
						max={ 60 }
						value={ spaceBetween }
						onChange={ value => setAttributes( { spaceBetween: value } ) }
						help={ __( 'In pixels.', 'fleximpleblocks' ) }
					/>

					<SelectControl
						label={ __( 'Effect', 'fleximpleblocks' ) }
						value={ effect }
						options={ [
							{ label: __( 'Slide', 'fleximpleblocks' ), value: 'slide' },
							{ label: __( 'Fade', 'fleximpleblocks' ), value: 'fade' },
							{ label: __( 'Flip', 'fleximpleblocks' ), value: 'flip' },
							{ label: __( 'Coverflow', 'fleximpleblocks' ), value: 'coverflow' },
							{ label: __( 'Cube', 'fleximpleblocks' ), value: 'cube' },
						] }
						onChange={ value => setAttributes( { effect: value } ) }
					/>

					<SelectControl
						label={ __( 'Pagination', 'fleximpleblocks' ) }
						value={ pagination }
						options={ [
							{ label: __( 'Bullets', 'fleximpleblocks' ), value: 'bullets' },
							{ label: __( 'Fraction', 'fleximpleblocks' ), value: 'fraction' },
							{ label: __( 'Progress bar', 'fleximpleblocks' ), value: 'progressbar' },
						] }
						onChange={ value => setAttributes( { pagination: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Sorting and filtering', 'fleximpleblocks' ) } initialOpen={ false }>
					<QueryControls
						{ ...{ offset, order, orderBy } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategories={ categories }
						selectedExcludedCategories={ excludedCategories }
						onNumberOfItemsChange={ value => setAttributes( { postsToShow: value } ) }
						onOffsetChange={ value => setAttributes( { offset: value } ) }
						onCategoriesChange={ selectedOptions => setAttributes( { categories: selectedOptions } ) }
						onExcludedCategoriesChange={ selectedOptions => setAttributes( { excludedCategories: selectedOptions } ) }
						onOrderChange={ value => setAttributes( { order: value } ) }
						onOrderByChange={ value => setAttributes( { orderBy: value } ) }
					/>

					<ToggleControl
						label={ __( 'Manually select posts', 'fleximpleblocks' ) }
						checked={ selectManually }
						onChange={ () => setAttributes( { selectManually: !selectManually } ) }
					/>

					{ !!selectManually &&
					<PostCarouselSelectControl { ...{ attributes, setAttributes } } />
					}
				</PanelBody>

				<PanelBody title={ __( 'Posts', 'fleximpleblocks' ) } initialOpen={ false }>
					<BaseControl
						label={ __( 'Heading level', 'fleximpleblocks' ) }
						id={ `fleximple-blocks-post-carousel-heading-control-${ instanceId }` }
					>
						<HeadingLevelToolbar
							id={ `fleximple-blocks-post-carousel-heading-control-${ instanceId }` }
							minLevel={ 1 }
							maxLevel={ 7 }
							selectedLevel={ headingLevel }
							onChange={ value => setAttributes( { headingLevel: value } ) }
							isCollapsed={ false }
						/>
					</BaseControl>

					<BaseControl
						label={ __( 'Horizontal alignment', 'fleximpleblocks' ) }
						id={ `fleximple-blocks-button-horizontal-block-align-toolbar-${ instanceId }` }
					>
						<BlockAlignmentHorizontalToolbar
							id={ `fleximple-blocks-button-horizontal-block-align-toolbar-${ instanceId }` }
							value={ contentAlignment }
							onChange={ value => setAttributes( { contentAlignment: value } ) }
						/>
					</BaseControl>

					{ displayExcerpt &&
					<RangeControl
						label={ __( 'Max number of words in excerpt', 'fleximpleblocks' ) }
						value={ excerptLength }
						onChange={ value => setAttributes( { excerptLength: value } ) }
						min={ 10 }
						max={ 100 }
					/>
					}

					<ToggleControl
						label={ __( '“nofollow” attribute', 'fleximpleblocks' ) }
						checked={ !!noFollow }
						onChange={ () => setAttributes( { noFollow: !noFollow } ) }
						help={
							!noFollow ?
								__( 'Google search spider should follow the links to these posts.', 'fleximpleblocks' ) :
								__( 'Google search spider should not follow the links to these posts.', 'fleximpleblocks' )
						}
					/>

					<ToggleControl
						label={ __( '“noreferrer” attribute', 'fleximpleblocks' ) }
						checked={ !!noReferrer }
						onChange={ () => setAttributes( { noReferrer: !noReferrer } ) }
						help={
							!noReferrer ?
								__( 'The browser should send an HTTP referer header if the user follows the hyperlink.', 'fleximpleblocks' ) :
								__( 'The browser should not send an HTTP referer header if the user follows the hyperlink.', 'fleximpleblocks' )
						}
					/>
				</PanelBody>

				{ !!displayMedia && !!displayFeaturedImage &&
				<PanelBody title={ __( 'Media', 'fleximpleblocks' ) } initialOpen={ false }>
					<ResponsiveSettingsTabPanel initialTabName="large">
						{ tab => 
							<>
								<SelectControl
									label={ __( 'Image size', 'fleximpleblocks' ) }
									value={ imageSize[ tab.name ] }
									options={ [
										{ label: __( 'Thumbnail', 'fleximpleblocks' ), value: 'thumbnail' },
										{ label: __( 'Medium', 'fleximpleblocks' ), value: 'medium' },
										{ label: __( 'Large', 'fleximpleblocks' ), value: 'large' },
										{ label: __( 'Full', 'fleximpleblocks' ), value: 'full' },
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
							</>
						 }
					</ResponsiveSettingsTabPanel>
				</PanelBody>
				}

				<PanelBody title={ __( 'Icons', 'fleximpleblocks' ) } initialOpen={ false }>
					<IconPicker
						icons={ [
							{
								label: __( 'Previous button', 'fleximpleblocks' ),
								value: buttonPrevIcon,
								onChange: value => setAttributes( { buttonPrevIcon: value } ),
							},
							{
								label: __( 'Next button', 'fleximpleblocks' ),
								value: buttonNextIcon,
								onChange: value => setAttributes( { buttonNextIcon: value } ),
							},
						] }
						sizes={ [
							{
								label: __( 'Button icon size', 'fleximpleblocks' ),
								value: buttonIconSize,
								initialPosition: 40,
								min: 10,
								max: 120,
								onChange: value => setAttributes( { buttonIconSize: value } ),
							},
						] }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color', 'fleximpleblocks' ) }
					colorSettings={ [
						{
							label: __( 'Button icon', 'fleximpleblocks' ),
							value: buttonIconColor.color,
							onChange: setButtonIconColor,
						},
					] }
					initialOpen={ false }>
				</PanelColorSettings>

				<PanelBody title={ __( 'Display', 'fleximpleblocks' ) } initialOpen={ false }>
					<PostCarouselSortableControl { ...{ attributes, setAttributes } } />

					{ !!displayReadMore &&
					<TextControl
						label={ __( 'Read more text', 'fleximpleblocks' ) }
						value={ readMore }
						onChange={ value => setAttributes( { readMore: value } ) }
					/>
					}
				</PanelBody>
			</InspectorControls>
		

		const hasPosts = Array.isArray( recentPosts ) && recentPosts.length
		if ( !hasPosts ) {
			return (
				<>
					{ inspectorControls }
					<Placeholder className={ `fleximple-components-placeholder ${ !Array.isArray( recentPosts ) ? 'is-loading' : '' }` }>
						{ !Array.isArray( recentPosts ) ?
							<>
								<Spinner />
								<p>{ __( 'Loading…', 'fleximpleblocks' ) }</p>
							</> : __( 'No posts found.', 'fleximpleblocks' )
						}
					</Placeholder>
				</>
			)
		}

		// Removing posts from display should be instant.
		let postsData = recentPosts.length > postsToShow ?
			recentPosts.slice( 0, postsToShow ) :
			recentPosts
		if ( selectedPosts ) {
			postsData = selectedPostsData.length > postsToShow ?
				selectedPostsData.slice( 0, postsToShow ) :
				selectedPostsData
		}

		return (
			<>
				{ inspectorControls }
				<BlockControls>
					<HeadingLevelDropdown
						selectedLevel={ headingLevel }
						onChange={ value => setAttributes( { headingLevel: value } ) }
					/>

					<BlockAlignmentHorizontalToolbar
						value={ contentAlignment }
						onChange={ value => setAttributes( { contentAlignment: value } ) }
					/>
				</BlockControls>

				<PostCarouselPreview postsData={ postsData } { ...{ className, attributes } } />
			</>
		)
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { postsToShow, order, orderBy, categories, excludedCategories, offset } = props.attributes
		const { getEntityRecords } = select( 'core' )
		const categoriesIds =
			categories && categories.length > 0
				? categories.map( cat => cat.value )
				: []
		const excludedCategoriesIds =
			excludedCategories && excludedCategories.length > 0
				? excludedCategories.map( cat => cat.value )
				: []
		const recentPostsQuery = pickBy( {
			categories: categoriesIds,
			order,
			orderby: orderBy,
			per_page: postsToShow,
			categories_exclude: excludedCategoriesIds,
			offset,
		}, value => !isUndefined( value ) )

		const posts = getEntityRecords( 'postType', 'post', recentPostsQuery )

		return {
			recentPosts: !Array.isArray( posts )
				? posts
				: posts.map( post => {
					return post
				} ),
		}
	} ),
	withInstanceId,
	withColors( { buttonIconColor: 'color' } ),
] )( PostCarouselEdit )
