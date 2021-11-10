/**
 * COMPONENT: Post Preview
 */

/* global fleximpleblocksPluginData */

/**
 * External dependencies
 */
import classnames from 'classnames'
import memoize from 'memize'
import times from 'lodash/times'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { InnerBlocks } from '@wordpress/block-editor'
import { getBlockDefaultClassName } from '@wordpress/blocks'
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date'
import { RawHTML } from '@wordpress/element'

/**
 * Internal dependencies
 */
import metadata from './../block.json'

const { name } = metadata

/**
 * Block constants
 */
const ALLOWED_BLOCKS = [ 'fleximple-blocks/post' ]

const getExtraArticlesTemplate = memoize( extraArticles => {
  return times( extraArticles, () => [
    'fleximple-blocks/post',
    {
      headingLevel: 4,
      displayMedia: false,
      displayCategories: false,
      displayMeta: false,
      displayExcerpt: false,
    },
  ] )
})

function PostPreview({
  attributes: {
    headingLevel,
    excerptLength,
    extraArticles,
    noFollow,
    noReferrer,
    imageSize,
    aspectRatio,
    focalPoint,
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
  postData,
  blockProps,
}) {
  const TagName = 'h' + headingLevel

  const defaultClassName = getBlockDefaultClassName( name )

  const featMediaData = postData.featured_media_data
    ? {
      small: { ...postData.featured_media_data[ imageSize?.small ] },
      medium: { ...postData.featured_media_data[ imageSize?.medium ] },
      large: { ...postData.featured_media_data[ imageSize?.large ] },
    } : null

  const pictureClasses = classnames(
    `${ defaultClassName }__picture`, {
      [ `aspect-ratio-${ aspectRatio.small }--sm` ]: aspectRatio.small !== 'none',
      [ `aspect-ratio-${ aspectRatio.medium }--md` ]: aspectRatio.medium !== 'none' && aspectRatio.medium !== aspectRatio.small,
      [ `aspect-ratio-${ aspectRatio.large }--lg` ]: aspectRatio.large !== 'none' && aspectRatio.large !== aspectRatio.medium,	
      [ `object-position-${ focalPoint.small.x * 100 }-${ focalPoint.small.y * 100 }--sm` ]: imageSize.small !== 'none' && ( focalPoint.small.x || focalPoint.small.y ),
      [ `object-position-${ focalPoint.medium.x * 100 }-${ focalPoint.medium.y * 100 }--md` ]: imageSize.medium !== 'none' && ( focalPoint.medium.x || focalPoint.medium.y ) && ( focalPoint.medium.x !== focalPoint.small.x || focalPoint.medium.y !== focalPoint.small.y ),
      [ `object-position-${ focalPoint.large.x * 100 }-${ focalPoint.large.y * 100 }--lg` ]: imageSize.large !== 'none' && ( focalPoint.large.x || focalPoint.large.y ) && ( focalPoint.large.x !== focalPoint.medium.x || focalPoint.large.y !== focalPoint.medium.y ),	
    },
  )

  const pictureSources = []
  if ( postData.featured_media ) {
    // The generated array needs to be reversed in order for <source> to work properly (from largest to smallest).
    Object.entries( imageSize ).reverse().forEach( ( [ key, value ], index, array ) => {
      if ( value && value !== 'none' ) {
        pictureSources.push(
          <source
            className={ `${ defaultClassName }__image` }
            // Assign the closest lower breakpoint (“small” shouldn’t have a media attribute).
            media={ key !== 'small' ? `(min-width: ${ fleximpleblocksPluginData.settings[ array[ index + 1 ][ 0 ] + 'BreakpointValue' ] }px)` : null }
            srcSet={ featMediaData[ key ].url }
          />,
        )
      }
    })
  }

  const imageSource = postData.featured_media
    ? postData.featured_media_data.full.url
    : `${ fleximpleblocksPluginData.pluginUrl }assets/images/placeholder-image.svg`

  const dateFormat = __experimentalGetSettings().formats.date // eslint-disable-line no-restricted-syntax

  const relAttribute = `${ noFollow ? 'nofollow' : '' } ${ noReferrer ? 'noreferrer' : '' }`.trim()

  return (
    <>
      { !!postData && 
        <article { ...blockProps }>
          <style>
            { ( !!aspectRatio.small || !!focalPoint.small.x || !!focalPoint.small.y ) &&
              `${ aspectRatio.small ? `
                .${ defaultClassName }__picture.aspect-ratio-${ aspectRatio.small }--sm {
                  padding-bottom: ${ aspectRatio.small.split( '-' )[ 1 ] * 100 / aspectRatio.small.split( '-' )[ 0 ] }%;
                }` : '' }
              ${ imageSize.small !== 'none' &&
              ( !!focalPoint.small.x || !!focalPoint.small.y ) &&
                focalPoint.small.x !== 0.5 && focalPoint.small.y !== 0.5 ?
      `.${ defaultClassName }__picture.object-position-${ focalPoint.small.x * 100 }-${ focalPoint.small.y * 100 }--sm .${ defaultClassName }__image {
                  object-position: ${ focalPoint.small.x * 100 }% ${ focalPoint.small.y * 100 }%;
                }` : '' }`
            }

            { ( !!aspectRatio.medium || !!focalPoint.medium.x || !!focalPoint.medium.y ) &&
              `@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.smallBreakpointValue }px) {
                ${ aspectRatio.medium ? `
                  .${ defaultClassName }__picture.aspect-ratio-${ aspectRatio.medium }--md {
                    padding-bottom: ${ aspectRatio.medium.split( '-' )[ 1 ] * 100 / aspectRatio.medium.split( '-' )[ 0 ] }%;
                  }` : '' }
                ${ imageSize.medium !== 'none' &&
                ( focalPoint.medium.x || focalPoint.medium.y ) &&
                focalPoint.medium.x !== 0.5 && focalPoint.medium.y !== 0.5 &&
                ( focalPoint.medium.x !== focalPoint.small.x || focalPoint.medium.y !== focalPoint.small.y ) ? `
                  .${ defaultClassName }__picture.object-position-${ focalPoint.medium.x * 100 }-${ focalPoint.medium.y * 100 }--md .${ defaultClassName }__image {
                    object-position: ${ focalPoint.medium.x * 100 }% ${ focalPoint.medium.y * 100 }%;
                  }` : '' }
              }`
            }

            { ( !!aspectRatio.large || !!focalPoint.large.x || !!focalPoint.large.y ) &&
              `@media only screen and (min-width: ${ fleximpleblocksPluginData.settings.mediumBreakpointValue }px) {
                ${ aspectRatio.large ? `
                  .${ defaultClassName }__picture.aspect-ratio-${ aspectRatio.large }--lg {
                    padding-bottom: ${ aspectRatio.large.split( '-' )[ 1 ] * 100 / aspectRatio.large.split( '-' )[ 0 ] }%;
                  }` : '' }
                ${ imageSize.large !== 'none' &&
                ( focalPoint.large.x || focalPoint.large.y ) &&
                focalPoint.large.x !== 0.5 && focalPoint.large.y !== 0.5 &&
                ( focalPoint.large.x !== focalPoint.medium.x || focalPoint.large.y !== focalPoint.medium.y ) ? `
                  .${ defaultClassName }__picture.object-position-${ focalPoint.large.x * 100 }-${ focalPoint.large.y * 100 }--lg .${ defaultClassName }__image {
                    object-position: ${ focalPoint.large.x * 100 }% ${ focalPoint.large.y * 100 }%;
                  }` : '' }
              }`
            }
          </style>

          { orderArticle.map( articleFragment => {
            if ( articleFragment === 'media' && displayMedia && ( displayFeaturedImage || !!displayAudio ) ) {
              return (
                <div className={ `${ defaultClassName }__media` }>
                  { orderMedia.map( mediaFragment => {
                    if ( mediaFragment === 'featuredImage' && displayFeaturedImage ) {
                      return (
                        <picture className={ pictureClasses }>
                          { !!postData.featured_media && pictureSources }
                          <img
                            className={ `${ defaultClassName }__image` }
                            src={ imageSource }
                            alt={ postData.title.rendered }
                          />
                        </picture>
                      )
                    }

                    if ( mediaFragment === 'audio' && displayAudio && postData.audio_data.length > 0 ) {
                      return (
                        <audio
                          controls
                          src={ postData.audio_data[ 0 ].url }
                          className={ `${ defaultClassName }__audio` }
                        />
                      )
                    }
                  }) }
                </div>
              )
            }

            if ( articleFragment === 'content' && displayContent ) {
              return (
                <>
                  <div className={ `${ defaultClassName }__content` }>
                    { orderContent.map( contentFragment => {
                      if ( contentFragment === 'categories' && displayCategories && !!postData.categories_data ) {
                        return (
                          <div className={ `${ defaultClassName }__categories` }>
                            { postData.categories_data.map( ( category, index ) => {
                              return (
                                <a
                                  key={ index }
                                  className={ `${ defaultClassName }__entry-category` }
                                  href={ category.url }
                                  rel="category"
                                  data-category-slug={ category.slug }
                                  dangerouslySetInnerHTML={ {
                                    __html: `<span class="screen-reader-only">${ __(
                                      'Category:',
                                      'fleximpleblocks',
                                    ) }</span> ${ category.name }`,
                                  } }
                                />
                              )
                            }) }
                          </div>
                        )
                      }

                      if ( contentFragment === 'title' && displayTitle && !!postData.title.rendered ) {
                        return (
                          <TagName className={ `${ defaultClassName }__title` }>
                            { /* <a
                              href={ postData.link }
                              // eslint-disable-next-line react/jsx-no-target-blank
                              target="_blank"
                              rel={ relAttribute }
                              data-link-name="article"
                            > */ }
                            { !!postData.meta.kicker &&
                              <span
                                className={ `${ defaultClassName }__kicker` }
                                dangerouslySetInnerHTML={ { __html: postData.meta.kicker } }
                              />
                            }
                            <span
                              className={ `${ defaultClassName }__headline` }
                              dangerouslySetInnerHTML={ { __html: postData.title.rendered.trim() } }
                            />
                            { /* </a> */ }
                          </TagName>
                        )
                      }

                      if ( contentFragment === 'meta' && displayMeta && ( !!postData.author_data || !!postData.date_gmt || !!postData.comments_number ) ) {
                        return (
                          <div className={ `${ defaultClassName }__meta` }>
                            {
                              // eslint-disable-next-line array-callback-return
                              orderMeta.map( metaFragment => {
                                if ( metaFragment === 'author' && displayAuthor && !!postData.author_data ) {
                                  return (
                                    <a
                                      href={ postData.author_data.url }
                                      className={ `${ defaultClassName }__entry-byline` }
                                      rel="author"
                                      dangerouslySetInnerHTML={ {
                                        __html: `<span class="screen-reader-only">${ __(
                                          'Published by:',
                                          'fleximpleblocks',
                                        ) }</span> ${ postData.author_data.name }`,
                                      } }
                                    />
                                  )
                                }

                                if ( metaFragment === 'date' && displayDate ) {
                                  return (
                                    <time
                                      dateTime={ format( 'c', postData.date_gmt ) }
                                      className={ `${ defaultClassName }__entry-date` }
                                      dangerouslySetInnerHTML={ {
                                        __html: `<span class="screen-reader-only">${ __(
                                          'Published on:',
                                          'fleximpleblocks',
                                        ) }</span> ${ dateI18n(
                                          dateFormat,
                                          postData.date_gmt,
                                        ) }`,
                                      } }
                                    />
                                  )
                                }

                                if ( metaFragment === 'comments' && displayComments && !!postData.comments_number ) {
                                  return (
                                    <span
                                      className={ `${ defaultClassName }__comments` }
                                    >
                                      { postData.comments_number }
                                    </span>
                                  )
                                }
                              })
                            }
                          </div>
                        )
                      }

                      if ( contentFragment === 'excerpt' && displayExcerpt && !!postData.excerpt ) {
                        return (
                          <RawHTML key="html" className={ `${ defaultClassName }__excerpt` }>
                            { excerptLength < postData.excerpt.rendered.trim().split( ' ' ).length
                              ? postData.excerpt.rendered.trim().split( ' ', excerptLength ).join( ' ' ) + '…'
                              : postData.excerpt.rendered.trim().split( ' ', excerptLength ).join( ' ' ) }
                          </RawHTML>
                        )
                      }

                      if ( contentFragment === 'readMore' && displayReadMore ) {
                        return (
                          <a
                            href={ postData.link }
                            className={ `${ defaultClassName }__read-more` }
                            // eslint-disable-next-line react/jsx-no-target-blank
                            target="_blank"
                            rel={ relAttribute ? relAttribute : null }
                            data-link-name="article"
                          >
                            { readMore }
                          </a>
                        )
                      }
                    }) }
                  </div>

                  <a
                    href={ `${ fleximpleblocksPluginData.homeUrl }/wp-admin/post.php?post=${ postData.id }&action=edit` }
                    className={ `${ defaultClassName }__link-overlay` }
                    // eslint-disable-next-line react/jsx-no-target-blank
                    target="_blank"
                    rel={ relAttribute ? relAttribute : null }
                    data-link-name="article"
                    tabIndex="-1"
                    aria-hidden="true"
                    /* translators: edit post link text */
                    dangerouslySetInnerHTML={ {
                      __html: `${ __( 'Edit', 'fleximpleblocks' ) } «${ postData.title.rendered }»`,
                    } }
                  />
                </>
              )
            }

            if ( articleFragment === 'extraArticles' && displayExtraArticles ) {
              return (
                <footer className={ `${ defaultClassName }__footer` }>
                  <InnerBlocks
                    template={ getExtraArticlesTemplate( extraArticles ) }
                    templateLock="all"
                    allowedBlocks={ ALLOWED_BLOCKS }
                  />
                </footer>
              )
            }
          }) }
        </article>
      }
    </>
  )
}

export default PostPreview
