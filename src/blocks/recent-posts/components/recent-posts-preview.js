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
import { dateI18n, format, getSettings } from '@wordpress/date'
import { RawHTML } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './../block.json'
import InlineStyles from '../inline-styles'

const { name } = metadata

const RecentPostsPreview = ({
  attributes,
  attributes: {
    blockId,
    layout,
    headingLevel,
    excerptLength,
    noFollow,
    noReferrer,
    imageSize,
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
  })

  const blockProps = useBlockProps({
    className: classes,
  })

  const dateFormat = getSettings().formats.date // eslint-disable-line no-restricted-syntax

  const relAttribute = `${noFollow ? 'nofollow' : ''} ${
    noReferrer ? 'noreferrer' : ''
  }`.trim()

  return (
    <div {...blockProps} data-block-id={blockId}>
      {postsData.map((post, i) => {
        return (
          <article
            key={i}
            id={`post-${post.id}`}
            className={`${defaultClassName}__entry`}
          >
            {orderArticle.map((fragment, i) => {
              if (
                'media' === fragment &&
                displayMedia &&
                displayFeaturedImage
              ) {
                return (
                  <div key={i} className={`${defaultClassName}__entry-media`}>
                    {orderMedia.map((mediaFragment, j) => {
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
                          <picture
                            key={j}
                            className={`${defaultClassName}__entry-picture`}
                          >
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
                  <div key={i} className={`${defaultClassName}__entry-content`}>
                    {orderContent.map((contentFragment, j) => {
                      if (
                        contentFragment === 'categories' &&
                        displayCategories &&
                        !!post.categories_data
                      ) {
                        return (
                          <div
                            key={j}
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
                            key={j}
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
                          <div
                            key={i}
                            className={`${defaultClassName}__entry-meta`}
                          >
                            {
                              // eslint-disable-next-line array-callback-return
                              orderMeta.map((metaFragment, j) => {
                                if (
                                  metaFragment === 'author' &&
                                  displayAuthor &&
                                  !!post.author_data
                                ) {
                                  return (
                                    <a
                                      key={j}
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
                                      key={j}
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
                                        key={j}
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
                          // eslint-disable-next-line react/jsx-no-target-blank
                          <a
                            key={i}
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

            {/* eslint-disable-next-line react/jsx-no-target-blank */}
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

      <InlineStyles {...{ defaultClassName, attributes }} />
    </div>
  )
}

export default RecentPostsPreview
