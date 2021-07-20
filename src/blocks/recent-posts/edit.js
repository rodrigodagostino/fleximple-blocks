/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import { isUndefined, pickBy } from 'lodash'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import apiFetch from '@wordpress/api-fetch'
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
import { useEffect, useState } from '@wordpress/element'
import { addQueryArgs } from '@wordpress/url'

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

function RecentPostsEdit( {
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
} ) {
	const [ categoriesList, setCategoriesList ] = useState( [] )
	const [ selectedPostsData, setSelectedPostsData ] = useState( [] )
	const [ isStillMounted, setIsStillMounted ] = useState( false )

	// componentWillMount equivalent
	useEffect( () => {
		setIsStillMounted( true )

		apiFetch( {
			path: addQueryArgs( '/wp/v2/categories', {
				per_page: -1,
			} ),
		} ).then( ( results ) => {
			if ( isStillMounted ) setCategoriesList( results )
		} ).catch( () => {
			if ( isStillMounted ) setCategoriesList( [] )
		} )

		if ( !! selectedPosts ) {
			fetchSelectedPostsData()
		}
		
		// componentWillUnmount equivalent
		return () => {
			setIsStillMounted( false )
		}
	}, [] )

	useEffect( () => {
		if ( selectedPosts && selectedPosts.length > 0 ) {
			fetchSelectedPostsData()
		}
	}, [ selectedPosts ] )

	const fetchSelectedPostsData = async () => {
		const map = new Map()
		await Promise.all( selectedPosts.map( async ( selectedPost ) => {
			await apiFetch( {
				path: `/wp/v2/posts/${ selectedPost.value }`,
			} ).then( ( results ) => {
				map.set( selectedPost, results )
			} )
		} ) )

		// Display responses in 'selectedPosts' array order.
		const arrangedSelectedPosts = new Array()
		await selectedPosts.forEach( ( selectedPost ) => {
			arrangedSelectedPosts.push( map.get( selectedPost ) )
		} )

		setSelectedPostsData( arrangedSelectedPosts )
	}

	const imageSizeOptions = fleximpleblocksPluginData.imageSizes.map( size => {
		const label = size.replace( /^\w/, ( c ) => c.toUpperCase() ).replace( /_/g, ' ' )
		return (
			{ label: label, value: size }
		)
	} )

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

				<ResponsiveSettingsTabPanel initialTabName="medium">
					{ ( tab ) => (
						<>
							<SelectControl
								label={ __( 'Image size', 'fleximpleblocks' ) }
								value={ imageSize[ tab.name ] }
								options={ [
									{ label: __( 'None', 'fleximpleblocks' ), value: 'none' },
									...imageSizeOptions,
									{ label: __( 'Full', 'fleximpleblocks' ), value: 'full' },
								] }
								onChange={ ( value ) => {
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
								onChange={ ( value ) => {
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
					) }
				</ResponsiveSettingsTabPanel>
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

			<RecentPostsPreview postsData={ postsData } { ...{ className, attributes } } />
		</>
	)
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
