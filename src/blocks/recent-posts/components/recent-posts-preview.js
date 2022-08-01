/**
 * COMPONENT: Recent Posts Preview
 */

/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classNames from 'classnames'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date'
import { RawHTML } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './../block.json'

const { name } = metadata

const RecentPostsPreview = ({
  attributes: {
    layout,
    columns,
    gapRow,
    gapColumn,
    headingLevel,
    excerptLength,
    noFollow,
    noReferrer,
    imageWidth,
    imageSize,
    aspectRatio,
    orderArticle,
    orderMedia,
    orderContent,
    orderMeta,
    displayMedia,
    displayFeaturedImage,
    displayContent,
    displayCategories,
    displayTitle,
    displayMeta,
    displayAuthor,
    displayDate,
    displayComments,
    displayExcerpt,
    displayReadMore,
    readMore,
  },
  postsData,
}) => {
  const TagName = 'h' + headingLevel

  const defaultClassName = getBlockDefaultClassName(name)

  const classes = classNames({
    [`${defaultClassName}--${layout}`]: layout,
    [`col-${columns.small}--sm`]: layout === 'grid',
    [`col-${columns.medium}--md`]:
      layout === 'grid' && columns.medium !== columns.small,
    [`col-${columns.large}--lg`]:
      layout === 'grid' && columns.large !== columns.medium,
    [`gap-row-${
      gapRow.small.value +
      (gapRow.small.unit === '%' ? 'pct' : gapRow.small.unit)
    }--sm`]: gapRow.small.value,
    [`gap-row-${
      gapRow.medium.value +
      (gapRow.medium.unit === '%' ? 'pct' : gapRow.medium.unit)
    }--md`]: gapRow.medium.value,
    [`gap-row-${
      gapRow.large.value +
      (gapRow.large.unit === '%' ? 'pct' : gapRow.large.unit)
    }--lg`]: gapRow.large.value,
    [`gap-column-${
      gapColumn.small.value +
      (gapColumn.small.unit === '%' ? 'pct' : gapColumn.small.unit)
    }--sm`]: gapColumn.small.value,
    [`gap-column-${
      gapColumn.medium.value +
      (gapColumn.medium.unit === '%' ? 'pct' : gapColumn.medium.unit)
    }--md`]: gapColumn.medium.value,
    [`gap-column-${
      gapColumn.large.value +
      (gapColumn.large.unit === '%' ? 'pct' : gapColumn.large.unit)
    }--lg`]: gapColumn.large.value,
  })

  const blockProps = useBlockProps({
    className: classes,
  })

  const pictureClasses = classNames(`${defaultClassName}__entry-picture`, {
    [`aspect-ratio-${aspectRatio.small}--sm`]: aspectRatio.small !== 'none',
    [`aspect-ratio-${aspectRatio.medium}--md`]:
      aspectRatio.medium !== 'none' && aspectRatio.medium !== aspectRatio.small,
    [`aspect-ratio-${aspectRatio.large}--lg`]:
      aspectRatio.large !== 'none' && aspectRatio.large !== aspectRatio.medium,
  })

  const dateFormat = __experimentalGetSettings().formats.date // eslint-disable-line no-restricted-syntax

  const relAttribute = `${noFollow ? 'nofollow' : ''} ${
    noReferrer ? 'noreferrer' : ''
  }`.trim()

  return (
    <div {...blockProps}>
      <style>
        {(!!columns.small || !!aspectRatio.small) &&
          `${
            'list' === layout && !!gapRow.small.value
              ? `
						.${defaultClassName}.gap-row-${
                  gapRow.small.value + gapRow.small.unit === '%'
                    ? 'pct'
                    : gapRow.small.unit
                }--sm .${defaultClassName}__entry {
							margin-bottom: ${gapRow.small.value + gapRow.small.unit};
						}`
              : ''
          }
					${
            'grid' === layout && !!gapRow.small.value
              ? `
						.fleximple-block-recent-posts.gap-row-${
              gapRow.small.value +
              (gapRow.small.unit === '%' ? 'pct' : gapRow.small.unit)
            }--sm {
							grid-row-gap: ${gapRow.small.value + gapRow.small.unit};
						}`
              : ''
          }
					${
            'grid' === layout && !!gapColumn.small.value
              ? `
						.fleximple-block-recent-posts.gap-column-${
              gapColumn.small.value + gapColumn.small.unit === '%'
                ? 'pct'
                : gapColumn.small.unit
            }--sm {
							grid-column-gap: ${gapColumn.small.value + gapColumn.small.unit};
						}`
              : ''
          }
					${
            aspectRatio.small
              ? `
						.${defaultClassName}__entry-picture.aspect-ratio-${aspectRatio.small}--sm {
							padding-bottom: ${
                (aspectRatio.small.split('-')[1] * 100) /
                aspectRatio.small.split('-')[0]
              }%;
						}`
              : ''
          }`}

        {!!aspectRatio.medium &&
          `@media only screen and (min-width: ${
            fleximpleblocksPluginData.settings.smallBreakpointValue
          }px) {
						${
              aspectRatio.medium
                ? `
							.${defaultClassName}__entry-picture.aspect-ratio-${aspectRatio.medium}--md {
								padding-bottom: ${
                  (aspectRatio.medium.split('-')[1] * 100) /
                  aspectRatio.medium.split('-')[0]
                }%;
							}`
                : ''
            }
					}`}

        {(!!columns.medium || !!aspectRatio.large) &&
          `@media only screen and (min-width: ${
            fleximpleblocksPluginData.settings.mediumBreakpointValue
          }px) {
						${
              'list' === layout && !!gapRow.medium.value
                ? `
							.fleximple-block-recent-posts.gap-row-${
                gapRow.medium.value +
                (gapRow.medium.unit === '%' ? 'pct' : gapRow.medium.unit)
              }--md .fleximple-block-recent-posts__entry {
								margin-bottom: ${gapRow.medium.value + gapRow.medium.unit};
							}`
                : ''
            }
						${
              'grid' === layout && !!gapRow.medium.value
                ? `
							.fleximple-block-recent-posts.gap-row-${
                gapRow.medium.value +
                (gapRow.medium.unit === '%' ? 'pct' : gapRow.medium.unit)
              }--md {
								grid-row-gap: ${gapRow.medium.value + gapRow.medium.unit};
						}`
                : ''
            }
						${
              'grid' === layout && !!gapColumn.medium.value
                ? `
							.fleximple-block-recent-posts.gap-column-${
                gapColumn.medium.value +
                (gapColumn.medium.unit === '%' ? 'pct' : gapColumn.medium.unit)
              }--md {
								grid-column-gap: ${gapColumn.medium.value + gapColumn.medium.unit};
						}`
                : ''
            }
						${
              aspectRatio.large
                ? `
							.${defaultClassName}__entry-picture.aspect-ratio-${aspectRatio.large}--lg {
								padding-bottom: ${
                  (aspectRatio.large.split('-')[1] * 100) /
                  aspectRatio.large.split('-')[0]
                }%;
							}`
                : ''
            }
					}`}

        {!!columns.large &&
          `@media only screen and (min-width: ${
            fleximpleblocksPluginData.settings.largeBreakpointValue
          }px) {
						${
              'list' === layout && !!gapRow.large.value
                ? `
							.fleximple-block-recent-posts.gap-row-${
                gapRow.large.value +
                (gapRow.large.unit === '%' ? 'pct' : gapRow.large.unit)
              }--lg .fleximple-block-recent-posts__entry {
								margin-bottom: ${gapRow.large.value + gapRow.large.unit};
							}`
                : ''
            }
						${
              'grid' === layout && !!gapRow.large.value
                ? `
							.fleximple-block-recent-posts.gap-row-${
                gapRow.large.value +
                (gapRow.large.unit === '%' ? 'pct' : gapRow.large.unit)
              }--lg {
								grid-row-gap: ${gapRow.large.value + gapRow.large.unit};
							}`
                : ''
            }
						${
              'grid' === layout && !!gapColumn.large.value
                ? `
							.fleximple-block-recent-posts.gap-column-${
                gapColumn.large.value +
                (gapColumn.large.unit === '%' ? 'pct' : gapColumn.large.unit)
              }--lg {
								grid-column-gap: ${gapColumn.large.value + gapColumn.large.unit};
							}`
                : ''
            }
					}`}
      </style>

      {postsData.map((post, i) => {
        return (
          <article
            key={i}
            id={`post-${post.id}`}
            className={`${defaultClassName}__entry`}
          >
            {orderArticle.map((fragment) => {
              if (
                'media' === fragment &&
                displayMedia &&
                displayFeaturedImage
              ) {
                return (
                  <div
                    className={`${defaultClassName}__entry-media`}
                    style={{
                      width: 'list' === layout ? `${imageWidth}%` : undefined,
                    }}
                  >
                    {orderMedia.map((mediaFragment) => {
                      if (
                        mediaFragment === 'featuredImage' &&
                        displayFeaturedImage
                      ) {
                        const pictureSources = []
                        if (post.featured_media) {
                          // The generated array needs to be reversed in order for <source> to work properly (from largest to smallest).
                          Object.entries(imageSize)
                            .reverse()
                            .forEach(([key, value], index, array) => {
                              if (value && value !== 'none') {
                                pictureSources.push(
                                  <source
                                    className={`${defaultClassName}__entry-image`}
                                    // Assign the closest lower breakpoint (“small” shouldn’t have a media attribute).
                                    media={
                                      key !== 'small'
                                        ? `(min-width: ${
                                            fleximpleblocksPluginData.settings[
                                              array[index + 1][0] +
                                                'BreakpointValue'
                                            ]
                                          }px)`
                                        : null
                                    }
                                    srcSet={
                                      post.featured_media_data[imageSize[key]]
                                        .url
                                    }
                                  />
                                )
                              }
                            })
                        }
                        const imageSource = post.featured_media
                          ? post.featured_media_data.full.url
                          : `${fleximpleblocksPluginData.pluginUrl}assets/images/placeholder-image.svg`
                        return (
                          <picture className={pictureClasses}>
                            {!!post.featured_media && pictureSources}
                            <img
                              className={`${defaultClassName}__entry-image`}
                              src={imageSource}
                              alt={post.title.rendered}
                            />
                          </picture>
                        )
                      }
                    })}
                  </div>
                )
              }

              if ('content' === fragment && displayContent) {
                return (
                  <div
                    className={`${defaultClassName}__entry-content`}
                    style={{
                      width:
                        'list' === layout && !!post.featured_media
                          ? `${100 - imageWidth}%`
                          : undefined,
                    }}
                  >
                    {orderContent.map((contentFragment) => {
                      if (
                        contentFragment === 'categories' &&
                        displayCategories &&
                        !!post.categories_data
                      ) {
                        return (
                          <div
                            className={`${defaultClassName}__entry-categories`}
                          >
                            {post.categories_data.map((category, index) => {
                              return (
                                <a
                                  key={index}
                                  className={`${defaultClassName}__entry-category`}
                                  href={category.url}
                                  rel="category"
                                  data-category-slug={category.slug}
                                  dangerouslySetInnerHTML={{
                                    __html: `<span class="screen-reader-only">${__(
                                      'Category:',
                                      'fleximpleblocks'
                                    )}</span> ${category.name}`,
                                  }}
                                />
                              )
                            })}
                          </div>
                        )
                      }

                      if (
                        contentFragment === 'title' &&
                        displayTitle &&
                        !!post.title.rendered
                      ) {
                        return (
                          <TagName
                            className={`${defaultClassName}__entry-title`}
                          >
                            {/* <a
															href={ post.link }
															target="_blank"
															rel={ relAttribute }
															data-link-name="article"> */}
                            {!!post.meta.kicker && (
                              <span
                                className={`${defaultClassName}__entry-kicker`}
                                dangerouslySetInnerHTML={{
                                  __html: post.meta.kicker,
                                }}
                              />
                            )}
                            <span
                              className={`${defaultClassName}__entry-headline`}
                              dangerouslySetInnerHTML={{
                                __html: post.title.rendered.trim(),
                              }}
                            />
                            {/* </a> */}
                          </TagName>
                        )
                      }

                      if (
                        contentFragment === 'meta' &&
                        displayMeta &&
                        (!!post.author_data ||
                          !!post.date_gmt ||
                          !!post.comments_number)
                      ) {
                        return (
                          <div className={`${defaultClassName}__entry-meta`}>
                            {
                              // eslint-disable-next-line array-callback-return
                              orderMeta.map((metaFragment) => {
                                if (
                                  metaFragment === 'author' &&
                                  displayAuthor &&
                                  !!post.author_data
                                ) {
                                  return (
                                    <a
                                      href={post.author_data.url}
                                      className={`${defaultClassName}__entry-byline`}
                                      rel="author"
                                      dangerouslySetInnerHTML={{
                                        __html: `<span class="screen-reader-only">${__(
                                          'Published by:',
                                          'fleximpleblocks'
                                        )}</span> ${post.author_data.name}`,
                                      }}
                                    />
                                  )
                                }

                                if (metaFragment === 'date' && displayDate) {
                                  return (
                                    <time
                                      dateTime={format('c', post.date_gmt)}
                                      className={`${defaultClassName}__entry-date`}
                                      dangerouslySetInnerHTML={{
                                        __html: `<span class="screen-reader-only">${__(
                                          'Published on:',
                                          'fleximpleblocks'
                                        )}</span> ${dateI18n(
                                          dateFormat,
                                          post.date_gmt
                                        )}`,
                                      }}
                                    />
                                  )
                                }

                                if (metaFragment === 'comments') {
                                  if (
                                    displayComments &&
                                    !!post.comments_number
                                  ) {
                                    return (
                                      <span
                                        className={`${defaultClassName}__entry-comments`}
                                      >
                                        {post.comments_number}
                                      </span>
                                    )
                                  }
                                }
                              })
                            }
                          </div>
                        )
                      }

                      if (contentFragment === 'excerpt' && displayExcerpt) {
                        return (
                          <RawHTML
                            key="html"
                            className={`${defaultClassName}__entry-excerpt`}
                          >
                            {excerptLength <
                            post.excerpt.rendered.trim().split(' ').length
                              ? post.excerpt.rendered
                                  .trim()
                                  .split(' ', excerptLength)
                                  .join(' ') + '...'
                              : post.excerpt.rendered
                                  .trim()
                                  .split(' ', excerptLength)
                                  .join(' ')}
                          </RawHTML>
                        )
                      }

                      if (contentFragment === 'readMore' && displayReadMore) {
                        return (
                          <a
                            href={post.link}
                            className={`${defaultClassName}__entry-read-more`}
                            // eslint-disable-next-line react/jsx-no-target-blank
                            target="_blank"
                            rel={relAttribute}
                            data-link-name="article"
                            dangerouslySetInnerHTML={{ __html: readMore }}
                          />
                        )
                      }
                    })}
                  </div>
                )
              }
            })}

            <a
              href={`${fleximpleblocksPluginData.homeUrl}/wp-admin/post.php?post=${post.id}&action=edit`}
              className={`${defaultClassName}__entry-link-overlay`}
              // eslint-disable-next-line react/jsx-no-target-blank
              target="_blank"
              rel={relAttribute ? relAttribute : null}
              data-link-name="article"
              tabIndex="-1"
              aria-hidden="true"
              /* translators: edit post link text */
              dangerouslySetInnerHTML={{
                __html: `${__('Edit', 'fleximpleblocks')} «${
                  post.title.rendered
                }»`,
              }}
            />
          </article>
        )
      })}
    </div>
  )
}

export default RecentPostsPreview
