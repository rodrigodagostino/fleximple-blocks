/**
 * COMPONENT: Post Preview
 */

/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import memoize from 'memize'
import times from 'lodash.times'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { InnerBlocks } from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { dateI18n, format, getSettings } from '@wordpress/date'
import { RawHTML } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './../block.json'
import InlineStyles from '../inline-styles'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_BLOCKS = ['fleximple-blocks/post']

const getExtraArticlesTemplate = memoize((extraArticles) => {
  return times(extraArticles, () => [
    'fleximple-blocks/post',
    {
      headingLevel: 4,
      displayMedia: false,
      displayCategories: false,
      displayMeta: false,
      displayExcerpt: false,
    },
  ])
})

export default function PostPreview({
  attributes,
  attributes: {
    headingLevel,
    excerptLength,
    extraArticles,
    noFollow,
    noReferrer,
    imageSize,
    orderArticle,
    orderMedia,
    orderContent,
    orderMeta,
    displayMedia,
    displayFeaturedImage,
    displayAudio,
    displayContent,
    displayCategories,
    displayTitle,
    displayMeta,
    displayAuthor,
    displayDate,
    displayComments,
    displayExcerpt,
    displayReadMore,
    displayExtraArticles,
    readMore,
  },
  post,
  media,
  blockProps,
}) {
  const TagName = 'h' + headingLevel

  const defaultClassName = getBlockDefaultClassName(name)

  const smallMedia = media.media_details.sizes[imageSize?.small]
  const mediumMedia = media.media_details.sizes[imageSize?.medium]
  const largeMedia = media.media_details.sizes[imageSize?.large]
  const featMedia = media
    ? {
        small: smallMedia ? { ...smallMedia } : null,
        medium: mediumMedia ? { ...mediumMedia } : null,
        large: largeMedia ? { ...largeMedia } : null,
      }
    : null

  const pictureSources = []
  if (media) {
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
                        array[index + 1][0] + 'BreakpointValue'
                      ]
                    }px)`
                  : null
              }
              srcSet={featMedia?.[key]?.source_url}
            />
          )
        }
      })
  }

  const imageSource = media?.media_details
    ? media.media_details.sizes.full.source_url
    : `${fleximpleblocksPluginData.pluginUrl}assets/images/placeholder-image.svg`

  const dateFormat = getSettings().formats.date

  const relAttribute = `${noFollow ? 'nofollow' : ''} ${
    noReferrer ? 'noreferrer' : ''
  }`.trim()

  return (
    <article {...blockProps}>
      {orderArticle.map((articleFragment, index) => {
        if (
          articleFragment === 'media' &&
          displayMedia &&
          (displayFeaturedImage || !!displayAudio)
        ) {
          return (
            <div key={index} className={`${defaultClassName}__media`}>
              {orderMedia.map((mediaFragment, i) => {
                if (mediaFragment === 'featuredImage' && displayFeaturedImage) {
                  return (
                    <picture key={i} className={`${defaultClassName}__picture`}>
                      {!!post.featured_media && pictureSources}
                      <img
                        className={`${defaultClassName}__image`}
                        src={imageSource}
                        alt={post.title.rendered}
                      />
                    </picture>
                  )
                }
                if (
                  mediaFragment === 'audio' &&
                  displayAudio &&
                  post.audio_data.length > 0
                ) {
                  return (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <audio
                      key={i}
                      controls
                      src={post.audio_data[0].url}
                      className={`${defaultClassName}__audio`}
                    />
                  )
                }
              })}
            </div>
          )
        }
        if (articleFragment === 'content' && displayContent) {
          return (
            <>
              <div className={`${defaultClassName}__content`}>
                {orderContent.map((contentFragment, index) => {
                  if (
                    contentFragment === 'categories' &&
                    displayCategories &&
                    !!post.categories_data
                  ) {
                    return (
                      <div
                        key={index}
                        className={`${defaultClassName}__categories`}
                      >
                        {post.categories_data.map((category, i) => {
                          return (
                            <a
                              key={i}
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
                      <TagName
                        key={index}
                        className={`${defaultClassName}__title`}
                      >
                        {!!post.meta.kicker && (
                          <span
                            className={`${defaultClassName}__kicker`}
                            dangerouslySetInnerHTML={{
                              __html: post.meta.kicker,
                            }}
                          />
                        )}
                        <span
                          className={`${defaultClassName}__headline`}
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered.trim(),
                          }}
                        />
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
                      <div key={index} className={`${defaultClassName}__meta`}>
                        {orderMeta.map((metaFragment, i) => {
                          if (
                            metaFragment === 'author' &&
                            displayAuthor &&
                            !!post.author_data
                          ) {
                            return (
                              <a
                                key={i}
                                href={post.author_data.url}
                                className={`${defaultClassName}__byline`}
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
                                key={i}
                                dateTime={format('c', post.date_gmt)}
                                className={`${defaultClassName}__date`}
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

                          if (
                            metaFragment === 'comments' &&
                            displayComments &&
                            !!post.comments_number
                          ) {
                            return (
                              <span
                                key={i}
                                className={`${defaultClassName}__comments`}
                              >
                                {post.comments_number}
                              </span>
                            )
                          }
                        })}
                      </div>
                    )
                  }
                  if (
                    contentFragment === 'excerpt' &&
                    displayExcerpt &&
                    !!post.excerpt
                  ) {
                    return (
                      <RawHTML
                        key={index}
                        className={`${defaultClassName}__excerpt`}
                      >
                        {excerptLength <
                        post.excerpt.rendered.trim().split(' ').length
                          ? post.excerpt.rendered
                              .trim()
                              .split(' ', excerptLength)
                              .join(' ') + '…'
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
                        key={index}
                        href={post.link}
                        className={`${defaultClassName}__read-more`}
                        target="_blank"
                        rel={relAttribute ? relAttribute : null}
                        data-link-name="article"
                      >
                        {readMore}
                      </a>
                    )
                  }
                })}
              </div>
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a
                href={`${fleximpleblocksPluginData.homeUrl}/wp-admin/post.php?post=${post.id}&action=edit`}
                className={`${defaultClassName}__link-overlay`}
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
            </>
          )
        }
        if (articleFragment === 'extraArticles' && displayExtraArticles) {
          return (
            <footer key={index} className={`${defaultClassName}__footer`}>
              <InnerBlocks
                template={getExtraArticlesTemplate(extraArticles)}
                templateLock="all"
                allowedBlocks={ALLOWED_BLOCKS}
              />
            </footer>
          )
        }
      })}
      <InlineStyles {...{ defaultClassName, attributes, isEditor: true }} />
    </article>
  )
}
