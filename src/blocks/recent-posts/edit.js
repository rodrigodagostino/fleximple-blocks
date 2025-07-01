/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import {
  BlockControls,
  InspectorControls,
  store as blockEditorStore,
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
import { useInstanceId } from '@wordpress/compose'
import { store as coreStore } from '@wordpress/core-data'
import { useSelect } from '@wordpress/data'
import { useEffect } from '@wordpress/element'

/**
 * Internal dependencies
 */
import PostSortableControl from './../post/components/post-sortable-control'
import RecentPostsPreview from './components/recent-posts-preview'
// import RecentPostsSelectControl from './components/recent-posts-select-control'
import QueryControls from 'fleximple-components/components/query-controls'
import HeadingLevelDropdown from 'fleximple-components/components/heading-level-dropdown'
import HeadingLevelToolbar from 'fleximple-components/components/heading-level-toolbar'
import SpacingControl from 'fleximple-components/components/spacing-control'
import Spinner from 'fleximple-components/components/spinner'
import ResponsiveSettingsTabPanel from 'fleximple-components/components/responsive-settings-tab-panel'
import { setResponsiveAttribute } from './../../js/utils'

/**
 * Block constants
 */
const CATEGORIES_LIST_QUERY = {
  per_page: -1,
  _fields: 'id,name',
  context: 'view',
}
const MAX_POSTS_COLUMNS = 6

function RecentPostsEdit({
  className,
  attributes,
  attributes: {
    layout,
    columns,
    gapColumn,
    gapRow,
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
    // selectManually,
    // selectedPostsIds,
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
  clientId,
}) {
  const instanceId = useInstanceId(RecentPostsEdit)

  const { imageSizes, categoriesList } = useSelect(
    (select) => {
      const { getEntityRecords } = select(coreStore)
      const settings = select(blockEditorStore).getSettings()

      return {
        imageSizes: settings.imageSizes,
        categoriesList: getEntityRecords(
          'taxonomy',
          'category',
          CATEGORIES_LIST_QUERY
        ),
      }
    },
    [imageSize]
  )

  const { recentPosts, hasResolved } = useSelect(
    (select) => {
      const { getEntityRecords, hasFinishedResolution } = select(coreStore)
      const catIds =
        categories && categories.length > 0
          ? categories.map((cat) => cat.value)
          : []
      const excludedCatIds =
        excludedCategories && excludedCategories.length > 0
          ? excludedCategories.map((cat) => cat.value)
          : []
      const recentPostsQuery = Object.fromEntries(
        Object.entries({
          categories: catIds,
          categories_exclude: excludedCatIds,
          order,
          orderby: orderBy,
          per_page: postsToShow,
          offset,
          _embed: 'author,wp:featuredmedia',
          ignore_sticky: true,
        }).filter(([, value]) => typeof value !== 'undefined')
      )

      return {
        recentPosts: getEntityRecords('postType', 'post', recentPostsQuery),
        hasResolved: hasFinishedResolution('getEntityRecords', [
          'postType',
          'post',
          recentPostsQuery,
        ]),
      }
    },
    [postsToShow, order, orderBy, categories]
  )

  const { mediaItems } = useSelect(
    (select) => {
      const { getMediaItems } = select(coreStore)
      const mediaItemsIds = recentPosts?.map((post) => post.featured_media)

      return {
        mediaItems:
          mediaItemsIds &&
          getMediaItems({
            include: mediaItemsIds,
            per_page: postsToShow,
            context: 'view',
          }),
      }
    },
    [recentPosts]
  )

  useEffect(() => {
    if (!attributes.className) {
      setAttributes({ className: 'is-style-standard' })
    }
  }, [])

  useEffect(() => {
    setAttributes({ blockId: clientId })
  }, [clientId])

  const hasPosts = Array.isArray(recentPosts) && recentPosts.length
  const inspectorControls = (
    <InspectorControls>
      <PanelBody title={__('Main', 'fleximpleblocks')}>
        <RangeControl
          label={__('Number of items', 'fleximpleblocks')}
          min={1}
          max={100}
          value={postsToShow}
          onChange={(value) => setAttributes({ postsToShow: value })}
          required
        />
        <ResponsiveSettingsTabPanel initialTabName="large">
          {(tab) => (
            <>
              {layout === 'grid' && (
                <RangeControl
                  label={__('Columns', 'fleximpleblocks')}
                  className="gap-v-small"
                  min={1}
                  max={
                    !hasPosts
                      ? MAX_POSTS_COLUMNS
                      : Math.min(MAX_POSTS_COLUMNS, recentPosts.length)
                  }
                  value={columns[tab.name]}
                  onChange={(value) => {
                    setResponsiveAttribute(
                      attributes,
                      setAttributes,
                      'columns',
                      tab.name,
                      value
                    )
                  }}
                  required
                />
              )}
              {layout === 'grid' && (
                <SpacingControl
                  valueLabel={__('Column gap', 'fleximpleblocks')}
                  unitLabel={__('Column gap unit', 'fleximpleblocks')}
                  className="gap-v-small"
                  initialPosition={0}
                  min={0}
                  max={200}
                  attribute={gapColumn}
                  target={tab.name}
                  onChange={(value) => setAttributes({ gapColumn: value })}
                />
              )}
              <SpacingControl
                valueLabel={__('Row gap', 'fleximpleblocks')}
                unitLabel={__('Row gap unit', 'fleximpleblocks')}
                initialPosition={0}
                min={0}
                max={200}
                attribute={gapRow}
                target={tab.name}
                onChange={(value) => setAttributes({ gapRow: value })}
              />
            </>
          )}
        </ResponsiveSettingsTabPanel>
        <BaseControl
          label={__('Heading level', 'fleximpleblocks')}
          id={`fleximple-blocks-recent-posts-heading-control-${instanceId}`}
        >
          <HeadingLevelToolbar
            id={`fleximple-blocks-recent-posts-heading-control-${instanceId}`}
            minLevel={1}
            maxLevel={7}
            selectedLevel={headingLevel}
            onChange={(value) => setAttributes({ headingLevel: value })}
            isCollapsed={false}
          />
        </BaseControl>
        {displayExcerpt && (
          <RangeControl
            label={__('Max number of words in excerpt', 'fleximpleblocks')}
            value={excerptLength}
            onChange={(value) => setAttributes({ excerptLength: value })}
            min={10}
            max={100}
          />
        )}
        <ToggleControl
          label={__('“nofollow” attribute', 'fleximpleblocks')}
          checked={!!noFollow}
          onChange={() => setAttributes({ noFollow: !noFollow })}
          help={
            !noFollow
              ? __(
                  'Google search spider should follow the links to these posts.',
                  'fleximpleblocks'
                )
              : __(
                  'Google search spider should not follow the links to these posts.',
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
      <PanelBody
        title={__('Sorting and filtering', 'fleximpleblocks')}
        initialOpen={false}
      >
        <QueryControls
          {...{ offset, order, orderBy }}
          numberOfItems={postsToShow}
          categoriesList={categoriesList}
          selectedCategories={categories}
          selectedExcludedCategories={excludedCategories}
          onNumberOfItemsChange={(value) =>
            setAttributes({ postsToShow: value })
          }
          onOffsetChange={(value) => setAttributes({ offset: value })}
          onCategoriesChange={(selectedOptions) =>
            setAttributes({ categories: selectedOptions })
          }
          onExcludedCategoriesChange={(selectedOptions) =>
            setAttributes({ excludedCategories: selectedOptions })
          }
          onOrderChange={(value) => setAttributes({ order: value })}
          onOrderByChange={(value) => setAttributes({ orderBy: value })}
        />
        {/* <ToggleControl
          label={__('Manually select posts', 'fleximpleblocks')}
          checked={selectManually}
          onChange={() => setAttributes({ selectManually: !selectManually })}
        />
        {!!selectManually && (
          <RecentPostsSelectControl {...{ attributes, setAttributes }} />
        )} */}
      </PanelBody>
      {!!displayMedia && !!displayFeaturedImage && (
        <PanelBody title={__('Media', 'fleximpleblocks')} initialOpen={false}>
          {'list' === layout && (
            <RangeControl
              label={__('Image width', 'fleximpleblocks')}
              className="gap-v-small"
              value={imageWidth}
              onChange={(value) => setAttributes({ imageWidth: value })}
              min={10}
              max={90}
            />
          )}
          <ResponsiveSettingsTabPanel initialTabName="medium">
            {(tab) => (
              <>
                <SelectControl
                  label={__('Image size', 'fleximpleblocks')}
                  value={imageSize[tab.name]}
                  options={[
                    {
                      label: __('None', 'fleximpleblocks'),
                      value: 'none',
                    },
                    ...imageSizes.map((size) => ({
                      label: size.name,
                      value: size.slug,
                    })),
                  ]}
                  onChange={(value) => {
                    setResponsiveAttribute(
                      attributes,
                      setAttributes,
                      'imageSize',
                      tab.name,
                      value
                    )
                  }}
                />
                <SelectControl
                  label={__('Aspect ratio', 'fleximpleblocks')}
                  value={aspectRatio[tab.name]}
                  options={[
                    { label: 'None', value: 'none' },
                    { label: '1:1', value: '1-1' },
                    { label: '5:4', value: '5-4' },
                    { label: '4:3', value: '4-3' },
                    { label: '3:2', value: '3-2' },
                    { label: '16:10', value: '16-10' },
                    { label: '16:9', value: '16-9' },
                    { label: '2:1', value: '2-1' },
                    { label: '3:1', value: '3-1' },
                  ]}
                  onChange={(value) => {
                    setResponsiveAttribute(
                      attributes,
                      setAttributes,
                      'aspectRatio',
                      tab.name,
                      value
                    )
                  }}
                />
              </>
            )}
          </ResponsiveSettingsTabPanel>
        </PanelBody>
      )}
      <PanelBody title={__('Display', 'fleximpleblocks')} initialOpen={false}>
        <PostSortableControl {...{ attributes, setAttributes }} />
        {!!displayReadMore && (
          <TextControl
            label={__('Read more text', 'fleximpleblocks')}
            value={readMore}
            onChange={(value) => setAttributes({ readMore: value })}
          />
        )}
      </PanelBody>
    </InspectorControls>
  )

  if (!hasResolved || !mediaItems) {
    return (
      <>
        <Placeholder
          className={`fleximple-components-placeholder ${!Array.isArray(recentPosts) ? 'is-loading' : ''}`}
        >
          <Spinner />
          <p>{__('Loading…', 'fleximpleblocks')}</p>
        </Placeholder>
      </>
    )
  }

  if (!hasPosts) {
    return (
      <>
        {inspectorControls}
        <Placeholder
          className={`fleximple-components-placeholder ${!Array.isArray(recentPosts) ? 'is-loading' : ''}`}
        >
          {__('No posts found.', 'fleximpleblocks')}
        </Placeholder>
      </>
    )
  }

  // Removing posts from display should be instant.
  let posts =
    recentPosts.length > postsToShow
      ? recentPosts.slice(0, postsToShow)
      : recentPosts
  // if (selectManually && selectedPostsIds.length > 0) {
  //   postsData =
  //     recentPosts.length > postsToShow
  //       ? recentPosts.slice(0, postsToShow)
  //       : recentPosts
  // }

  const layoutControls = [
    {
      icon: 'list-view',
      title: __('List view', 'fleximpleblocks'),
      onClick: () => setAttributes({ layout: 'list' }),
      isActive: 'list' === layout,
    },
    {
      icon: 'grid-view',
      title: __('Grid view', 'fleximpleblocks'),
      onClick: () => setAttributes({ layout: 'grid' }),
      isActive: 'grid' === layout,
    },
  ]

  return (
    <>
      {inspectorControls}
      <BlockControls>
        <HeadingLevelDropdown
          selectedLevel={headingLevel}
          onChange={(value) => setAttributes({ headingLevel: value })}
        />

        <Toolbar controls={layoutControls} />
      </BlockControls>
      <RecentPostsPreview
        posts={posts}
        mediaItems={mediaItems}
        {...{ className, attributes }}
      />
    </>
  )
}

export default RecentPostsEdit
