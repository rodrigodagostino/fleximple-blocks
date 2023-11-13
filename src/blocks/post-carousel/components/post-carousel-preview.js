/**
 * COMPONENT: Post Carousel Preview
 */

/**
 * External dependencies
 */
import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { register } from 'swiper/element/bundle'

register()

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { getColorClassName, useBlockProps } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import PostCarouselPreviewArticle from './post-carousel-preview-article'

const PostCarouselPreview = ({
  attributes,
  attributes: {
    slidesPerView,
    autoplay,
    loop,
    speed,
    delay,
    navigation,
    pagination,
    paginationType,
    spaceBetween,
    effect,
    buttonPrevIcon,
    buttonNextIcon,
    buttonIconSize,
    buttonIconColor,
    customButtonIconColor,
  },
  postsData,
}) => {
  const carouselRef = useRef(null)

  const blockProps = useBlockProps()

  const buttonIconColorClass = getColorClassName('color', buttonIconColor)

  const buttonPrevClasses = classNames('swiper-button-prev', {
    'has-text-color': buttonIconColor || customButtonIconColor,
    [buttonIconColorClass]: buttonIconColorClass,
  })

  const buttonPrevIconClasses = classNames({ [buttonPrevIcon]: buttonPrevIcon })

  const buttonPrevStyles = {
    fontSize: buttonIconSize,
    color: buttonIconColorClass ? undefined : customButtonIconColor,
  }

  const buttonNextClasses = classNames('swiper-button-next', {
    'has-text-color': buttonIconColor || customButtonIconColor,
    [buttonIconColorClass]: buttonIconColorClass,
  })

  const buttonNextIconClasses = classNames({ [buttonNextIcon]: buttonNextIcon })

  const buttonNextStyles = {
    fontSize: buttonIconSize,
    color: buttonIconColorClass ? undefined : customButtonIconColor,
  }

  return (
    <div {...blockProps}>
      <swiper-container
        ref={carouselRef}
        slides-per-view={slidesPerView}
        loop={loop ? loop : null}
        autoplay={autoplay ? autoplay : null}
        autoplay-delay={autoplay ? delay : null}
        autoplay-disabled-on-interaction={autoplay ? false : null}
        speed={speed}
        pagination={pagination ? pagination : null}
        pagination-type={pagination ? paginationType : null}
        pagination-clickable={pagination ? true : null}
        space-between={spaceBetween}
        effect={effect}
      >
        {postsData.map((post, i) => {
          return (
            <swiper-slide key={i}>
              <PostCarouselPreviewArticle post={post} {...{ attributes }} />
            </swiper-slide>
          )
        })}

        <div slot="container-end">
          {navigation && (
            <>
              <button className={buttonPrevClasses} style={buttonPrevStyles}>
                <span className="screen-reader-only">
                  {__('Previous slide', 'fleximpleblocks')}
                </span>
                <i className={buttonPrevIconClasses} aria-hidden="true" />
              </button>
              <button className={buttonNextClasses} style={buttonNextStyles}>
                <span className="screen-reader-only">
                  {__('Next slide', 'fleximpleblocks')}
                </span>
                <i className={buttonNextIconClasses} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
      </swiper-container>
    </div>
  )
}

export default PostCarouselPreview
