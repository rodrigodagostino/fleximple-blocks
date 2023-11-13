/**
 * COMPONENT: Post Carousel Preview Article
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
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { dateI18n, format, getSettings } from '@wordpress/date'
import { RawHTML } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from '../block.json'

const { name } = metadata

const PostCarouselPreviewArticle = ({
  post,
  attributes: {
    headingLevel,
    contentAlignment,
    excerptLength,
    noFollow,
    noReferrer,
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
}) => {
  const defaultClassName = getBlockDefaultClassName(name)

  const contentClasses = classNames(`${defaultClassName}__content`, {
    [`block-align-${contentAlignment}`]: contentAlignment,
  })

  const TagName = 'h' + headingLevel

  const pictureClasses = classNames(`${defaultClassName}__picture`, {
    [`aspect-ratio-${aspectRatio.small}--sm`]: aspectRatio.small !== 'none',
    [`aspect-ratio-${aspectRatio.medium}--md`]:
      aspectRatio.medium !== 'none' && aspectRatio.medium !== aspectRatio.small,
    [`aspect-ratio-${aspectRatio.large}--lg`]:
      aspectRatio.large !== 'none' && aspectRatio.large !== aspectRatio.medium,
  })

  const dateFormat = getSettings().formats.date

  const relAttribute = `${noFollow ? 'nofollow' : ''} ${
    noReferrer ? 'noreferrer' : ''
  }`.trim()

  return (
    <>
      <style>
        {!!aspectRatio.small &&
          `${
            aspectRatio.small
              ? `
          .${defaultClassName}__picture.aspect-ratio-${aspectRatio.small}--sm {
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
            .${defaultClassName}__picture.aspect-ratio-${
              aspectRatio.medium
            }--md {
              padding-bottom: ${
                (aspectRatio.medium.split('-')[1] * 100) /
                aspectRatio.medium.split('-')[0]
              }%;
            }`
              : ''
          }
        }`}

        {!!aspectRatio.large &&
          `@media only screen and (min-width: ${
            fleximpleblocksPluginData.settings.mediumBreakpointValue
          }px) {
          ${
            aspectRatio.large
              ? `
            .${defaultClassName}__picture.aspect-ratio-${
              aspectRatio.large
            }--lg {
              padding-bottom: ${
                (aspectRatio.large.split('-')[1] * 100) /
                aspectRatio.large.split('-')[0]
              }%;
            }`
              : ''
          }
        }`}
      </style>

      <article id={`post-${post.id}`} className={`${defaultClassName}__entry`}>
        {orderArticle.map((fragment, i) => {
          if (fragment === 'media' && displayMedia && displayFeaturedImage) {
            return (
              <div className={`${defaultClassName}__media`} key={i}>
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
                                className={`${defaultClassName}__image`}
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
                                  post.featured_media_data[imageSize[key]].url
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
                      <picture className={pictureClasses} key={j}>
                        {!!post.featured_media && pictureSources}
                        <img
                          className={`${defaultClassName}__image`}
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
              <div className={contentClasses} key={i}>
                {orderContent.map((contentFragment, j) => {
                  if (
                    'categories' === contentFragment &&
                    displayCategories &&
                    !!post.categories_data
                  ) {
                    return (
                      <div
                        className={`${defaultClassName}__categories`}
                        key={j}
                      >
                        {post.categories_data.map((category, index) => {
                          return (
                            <a
                              key={index}
                              className={`${defaultClassName}__category`}
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
                      <TagName className={`${defaultClassName}__title`} key={j}>
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
                      <div className={`${defaultClassName}__meta`} key={j}>
                        {
                          // eslint-disable-next-line array-callback-return
                          orderMeta.map((metaFragment, k) => {
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
                                  key={k}
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
                                  key={k}
                                />
                              )
                            }

                            if (metaFragment === 'comments') {
                              if (displayComments && !!post.comments_number) {
                                return (
                                  <span
                                    className={`${defaultClassName}__entry-comments`}
                                    key={k}
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
                        target="_blank"
                        rel={relAttribute}
                        data-link-name="article"
                        dangerouslySetInnerHTML={{ __html: readMore }}
                        key={j}
                      />
                    )
                  }
                })}
              </div>
            )
          }
        })}

        <a
          href={post.link}
          className={`${defaultClassName}__entry-link-overlay`}
          target="_blank"
          rel={relAttribute}
          data-link-name="article"
          tabIndex="-1"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </article>
    </>
  )
}

export default PostCarouselPreviewArticle
