/* global fleximpleblocksPluginData */

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
} from '@wordpress/block-editor'
import {
	BaseControl,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	Toolbar,
} from '@wordpress/components'
import { compose, withInstanceId } from '@wordpress/compose'
import { withSelect } from '@wordpress/data'
import { Component } from '@wordpress/element'
import { addQueryArgs } from '@wordpress/url'
import apiFetch from '@wordpress/api-fetch'

/**
 * Internal dependencies
 */
import PostSortableControl from './../post/components/post-sortable-control'
import RecentPostsPreview from './components/recent-posts-preview'
import RecentPostsSelectControl from './components/recent-posts-select-control'
import QueryControls from 'fleximple-components/components/query-controls'
import HeadingLevelDropdown from 'fleximple-components/components/heading-level-dropdown'
import HeadingLevelToolbar from 'fleximple-components/components/heading-level-toolbar'
import SpacingControls from 'fleximple-components/components/spacing-controls'
import Spinner from 'fleximple-components/components/spinner'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import { setResponsiveAttribute } from './../../js/utils'

/**
 * Block constants
 */
const MAX_POSTS_COLUMNS = 6

class RecentPostsEdit extends Component {
	constructor() {
		super( ...arguments )

		this.state = {
			categoriesList: [],
			selectedPostsData: [],
		}
	}

	componentDidMount() {
		this.isStillMounted = true
		this.fetchRequest = apiFetch( {
			path: addQueryArgs( '/wp/v2/categories', {
				per_page: -1,
			} ),
		} ).then(
			( categoriesList ) => {
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
		if ( !! this.props.attributes.selectedPosts ) {
			this.fetchSelectedPostsData()
		}
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.attributes.selectedPosts !== prevProps.attributes.selectedPosts && !! this.props.attributes.selectedPosts ) {
			this.fetchSelectedPostsData()
		}
	}

	fetchSelectedPostsData = async () => {
		const { attributes: { selectedPosts } } = this.props
		const map = new Map()
		await Promise.all( selectedPosts.map( async ( selectedPost ) => {
			await apiFetch( {
				path: `/wp/v2/posts/${ selectedPost.value }`,
			} ).then( ( response ) => map.set( selectedPost, response ) )
		} ) )

		// Display responses in 'selectedPosts' array order.
		const selectedPostsData = new Array()
		await selectedPosts.forEach( ( selectedPost ) => {
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
				layout,
				columns,
				gapRow,
				gapColumn,
				headingLevel,
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
				imageWidth,
				imageSize,
				aspectRatio,
				displayMedia,
				displayFeaturedImage,
				displayExcerpt,
				displayReadMore,
				readMore,
			},
			setAttributes,
			recentPosts,
			instanceId,
		} = this.props

		const {
			categoriesList,
			selectedPostsData,
		} = this.state

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Main', 'fleximpleblocks' ) }>
					<RangeControl
						label={ __( 'Number of items', 'fleximpleblocks' ) }
						min={ 1 }
						max={ 100 }
						value={ postsToShow }
						onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
						required
					/>

					<ResponsiveSettingsTabPanel initialTabName="large">
						{ ( tab ) => (
							<>
								{ layout === 'grid' &&
								<RangeControl
									label={ __( 'Columns', 'fleximpleblocks' ) }
									className="gap-v-small"
									min={ 1 }
									max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, recentPosts.length ) }
									value={ columns[ tab.name ] }
									onChange={ ( value ) => {
										setResponsiveAttribute(
											attributes,
											setAttributes,
											'columns',
											tab.name,
											value,
										)
									} }
									required
								/>
								}

								<SpacingControls
									valueLabel={ __( 'Row gap', 'fleximpleblocks' ) }
									unitLabel={ __( 'Row gap unit', 'fleximpleblocks' ) }
									className="gap-v-small"
									initialPosition={ 0 }
									min={ 0 }
									max={ 200 }
									attribute={ gapRow }
									target={ tab.name }
									onChange={ ( value ) => setAttributes( { gapRow: value } ) }
								/>

								{ layout === 'grid' &&
								<SpacingControls
									valueLabel={ __( 'Column gap', 'fleximpleblocks' ) }
									unitLabel={ __( 'Column gap unit', 'fleximpleblocks' ) }
									initialPosition={ 0 }
									min={ 0 }
									max={ 200 }
									attribute={ gapColumn }
									target={ tab.name }
									onChange={ ( value ) => setAttributes( { gapColumn: value } ) }
								/>
								}
							</>
						) }
					</ResponsiveSettingsTabPanel>

					<BaseControl
						label={ __( 'Heading level', 'fleximpleblocks' ) }
						id={ `fleximple-blocks-recent-posts-heading-control-${ instanceId }` }
					>
						<HeadingLevelToolbar
							id={ `fleximple-blocks-recent-posts-heading-control-${ instanceId }` }
							minLevel={ 1 }
							maxLevel={ 7 }
							selectedLevel={ headingLevel }
							onChange={ ( value ) => setAttributes( { headingLevel: value } ) }
							isCollapsed={ false }
						/>
					</BaseControl>

					{ displayExcerpt &&
					<RangeControl
						label={ __( 'Max number of words in excerpt', 'fleximpleblocks' ) }
						value={ excerptLength }
						onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
						min={ 10 }
						max={ 100 }
					/>
					}

					<ToggleControl
						label={ __( '“nofollow” attribute', 'fleximpleblocks' ) }
						checked={ !! noFollow }
						onChange={ () => setAttributes( { noFollow: ! noFollow } ) }
						help={
							! noFollow ?
								__( 'Google search spider should follow the links to these posts.', 'fleximpleblocks' ) :
								__( 'Google search spider should not follow the links to these posts.', 'fleximpleblocks' )
						}
					/>

					<ToggleControl
						label={ __( '“noreferrer” attribute', 'fleximpleblocks' ) }
						checked={ !! noReferrer }
						onChange={ () => setAttributes( { noReferrer: ! noReferrer } ) }
						help={
							! noReferrer ?
								__( 'The browser should send an HTTP referer header if the user follows the hyperlink.', 'fleximpleblocks' ) :
								__( 'The browser should not send an HTTP referer header if the user follows the hyperlink.', 'fleximpleblocks' )
						}
					/>
				</PanelBody>

				<PanelBody title={ __( 'Sorting and filtering', 'fleximpleblocks' ) } initialOpen={ false }>
					<QueryControls
						{ ...{ offset, order, orderBy } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategories={ categories }
						selectedExcludedCategories={ excludedCategories }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
						onOffsetChange={ ( value ) => setAttributes( { offset: value } ) }
						onCategoriesChange={ ( selectedOptions ) => setAttributes( { categories: selectedOptions } ) }
						onExcludedCategoriesChange={ ( selectedOptions ) => setAttributes( { excludedCategories: selectedOptions } ) }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
					/>

					<ToggleControl
						label={ __( 'Manually select posts', 'fleximpleblocks' ) }
						checked={ selectManually }
						onChange={ () => setAttributes( { selectManually: ! selectManually } ) }
					/>

					{ !! selectManually &&
					<RecentPostsSelectControl { ...{ attributes, setAttributes } } />
					}
				</PanelBody>

				{ !! displayMedia && !! displayFeaturedImage &&
				<PanelBody title={ __( 'Media', 'fleximpleblocks' ) } initialOpen={ false }>
					{ 'list' === layout &&
					<RangeControl
						label={ __( 'Image width', 'fleximpleblocks' ) }
						className="gap-v-small"
						value={ imageWidth }
						onChange={ ( value ) => setAttributes( { imageWidth: value } ) }
						min={ 10 }
						max={ 90 }
					/>
					}

					<SelectControl
						label={ __( 'Image size', 'fleximpleblocks' ) }
						value={ imageSize }
						options={ [
							{ label: __( 'Thumbnail', 'fleximpleblocks' ), value: 'thumbnail' },
							{ label: __( 'Medium', 'fleximpleblocks' ), value: 'medium' },
							{ label: __( 'Medium large', 'fleximpleblocks' ), value: 'medium_large' },
							{ label: __( 'Large', 'fleximpleblocks' ), value: 'large' },
							{ label: __( 'Full', 'fleximpleblocks' ), value: 'full' },
						] }
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
						onChange={ ( value ) => setAttributes( { aspectRatio: value } ) }
					/>
				</PanelBody>
				}

				<PanelBody title={ __( 'Display', 'fleximpleblocks' ) } initialOpen={ false }>
					<PostSortableControl { ...{ attributes, setAttributes } } />

					{ !! displayReadMore &&
					<TextControl
						label={ __( 'Read more text', 'fleximpleblocks' ) }
						value={ readMore }
						onChange={ ( value ) => setAttributes( { readMore: value } ) }
					/>
					}
				</PanelBody>
			</InspectorControls>
		)

		const hasPosts = Array.isArray( recentPosts ) && recentPosts.length
		if ( ! hasPosts ) {
			return (
				<>
					{ inspectorControls }
					<Placeholder className={ `fleximple-components-placeholder ${ ! Array.isArray( recentPosts ) ? 'is-loading' : '' }` }>
						{ ! Array.isArray( recentPosts ) ?
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
		if ( selectManually && selectedPosts ) {
			postsData = selectedPostsData.length > postsToShow ?
				selectedPostsData.slice( 0, postsToShow ) :
				selectedPostsData
		}

		const layoutControls = [
			{
				icon: 'list-view',
				title: __( 'List view', 'fleximpleblocks' ),
				onClick: () => setAttributes( { layout: 'list' } ),
				isActive: 'list' === layout,
			},
			{
				icon: 'grid-view',
				title: __( 'Grid view', 'fleximpleblocks' ),
				onClick: () => setAttributes( { layout: 'grid' } ),
				isActive: 'grid' === layout,
			},
		]

		return (
			<>
				{ inspectorControls }
				<BlockControls>
					<HeadingLevelDropdown
						selectedLevel={ headingLevel }
						onChange={ ( value ) => setAttributes( { headingLevel: value } ) }
					/>

					<Toolbar controls={ layoutControls } />
				</BlockControls>

				<RecentPostsPreview postsData={ postsData } { ...{ className, attributes } }>
					<style>
						{ !! columns.small && (
							`${ 'list' === layout && !! gapRow.small.value ?
								'.fleximple-block-recent-posts.gap-row-' + gapRow.small.value + ( gapRow.small.unit === '%' ? 'pct' : gapRow.small.unit ) + '--sm .fleximple-block-recent-posts__entry { margin-bottom: ' + gapRow.small.value + gapRow.small.unit + '; }' : '' }
							${ 'grid' === layout && !! gapRow.small.value ?
								'.fleximple-block-recent-posts.gap-row-' + gapRow.small.value + ( gapRow.small.unit === '%' ? 'pct' : gapRow.small.unit ) + '--sm { grid-row-gap: ' + gapRow.small.value + gapRow.small.unit + '; }' : '' }
							${ 'grid' === layout && !! gapColumn.small.value ?
								'.fleximple-block-recent-posts.gap-column-' + gapColumn.small.value + ( gapColumn.small.unit === '%' ? 'pct' : gapColumn.small.unit ) + '--sm { grid-column-gap: ' + gapColumn.small.value + gapColumn.small.unit + '; }' : '' }`
						) }

						{ !! columns.medium && (
							`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.mediumBreakpointValue }px) {
								${ 'list' === layout && !! gapRow.medium.value ?
								'.fleximple-block-recent-posts.gap-row' + gapRow.medium.value + ( gapRow.medium.unit === '%' ? 'pct' : gapRow.medium.unit ) + '--md .fleximple-block-recent-posts__entry { margin-bottom: ' + gapRow.medium.value + gapRow.medium.unit + '; }' :
								'' }
								${ 'grid' === layout && !! gapRow.medium.value ?
								'.fleximple-block-recent-posts.gap-row-' + gapRow.medium.value + ( gapRow.medium.unit === '%' ? 'pct' : gapRow.medium.unit ) + '--md { grid-row-gap: ' + gapRow.medium.value + gapRow.medium.unit + '; }' :
								'' }
								${ 'grid' === layout && !! gapColumn.medium.value ?
								'.fleximple-block-recent-posts.gap-column-' + gapColumn.medium.value + ( gapColumn.medium.unit === '%' ? 'pct' : gapColumn.medium.unit ) + '--md { grid-column-gap: ' + gapColumn.medium.value + gapColumn.medium.unit + '; }' :
								'' }
							}`
						) }

						{ !! columns.large && (
							`@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.largeBreakpointValue }px) {
								${ 'list' === layout && !! gapRow.large.value ?
								'.fleximple-block-recent-posts.gap-row-' + gapRow.large.value + ( gapRow.large.unit === '%' ? 'pct' : gapRow.large.unit ) + '--lg .fleximple-block-recent-posts__entry { margin-bottom: ' + gapRow.large.value + gapRow.large.unit + '; }' :
								'' }
								${ 'grid' === layout && !! gapRow.large.value ?
								'.fleximple-block-recent-posts.gap-row-' + gapRow.large.value + ( gapRow.large.unit === '%' ? 'pct' : gapRow.large.unit ) + '--lg { grid-row-gap: ' + gapRow.large.value + gapRow.large.unit + '; }' :
								'' }
								${ 'grid' === layout && !! gapColumn.large.value ?
								'.fleximple-block-recent-posts.gap-column-' + gapColumn.large.value + ( gapColumn.large.unit === '%' ? 'pct' : gapColumn.large.unit ) + '--lg { grid-column-gap: ' + gapColumn.large.value + gapColumn.large.unit + '; }' :
								'' }
							}`
						) }
					</style>
				</RecentPostsPreview>
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
				? categories.map( ( cat ) => cat.value )
				: []
		const excludedCategoriesIds =
			excludedCategories && excludedCategories.length > 0
				? excludedCategories.map( ( cat ) => cat.value )
				: []
		const recentPostsQuery = pickBy( {
			categories: categoriesIds,
			order,
			orderby: orderBy,
			per_page: postsToShow,
			categories_exclude: excludedCategoriesIds,
			offset,
		}, ( value ) => ! isUndefined( value ) )

		const posts = getEntityRecords( 'postType', 'post', recentPostsQuery )

		return {
			recentPosts: ! Array.isArray( posts )
				? posts
				: posts.map( ( post ) => {
					return post
				} ),
		}
	} ),
	withInstanceId,
] )( RecentPostsEdit )
