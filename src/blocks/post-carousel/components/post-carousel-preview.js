/**
 * COMPONENT: Post Carousel Preview
 */

/**
 * External dependencies
 */
import classnames from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectFlip,
  EffectCoverflow,
  EffectCube,
  EffectCards,
} from 'swiper'

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
    hasNavigation,
    hasPagination,
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
  const swiperParams = {
    slidesPerView,
    loop,
    ... autoplay
      ? {
        autoplay: {
          delay,
          disableOnInteraction: false,
        },
      }
      : null,
    speed,
    ... hasNavigation
      ? {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
      : null,
    ... hasPagination
      ? {
        pagination: {
          el: '.swiper-pagination',
          type: paginationType,
          clickable: true,
        },
      }
      : null,
    spaceBetween,
    ... effect !== 'slide' ? effect : null,
  }

  const blockProps = useBlockProps()

  const buttonIconColorClass = getColorClassName( 'color', buttonIconColor )

  const buttonPrevClasses = classnames( 'swiper-button-prev', {
    'has-text-color': buttonIconColor || customButtonIconColor,
    [ buttonIconColorClass ]: buttonIconColorClass,
  })

  const buttonPrevIconClasses = classnames({ [ buttonPrevIcon ]: buttonPrevIcon })

  const buttonPrevStyles = {
    fontSize: buttonIconSize,
    color: buttonIconColorClass ? undefined : customButtonIconColor,
  }

  const buttonNextClasses = classnames( 'swiper-button-next', {
    'has-text-color': buttonIconColor || customButtonIconColor,
    [ buttonIconColorClass ]: buttonIconColorClass,
  })

  const buttonNextIconClasses = classnames({ [ buttonNextIcon ]: buttonNextIcon })

  const buttonNextStyles = {
    fontSize: buttonIconSize,
    color: buttonIconColorClass ? undefined : customButtonIconColor,
  }

  return (
    <div { ...blockProps }>
      <Swiper
        modules={ [
          Autoplay,
          Navigation,
          Pagination,
          EffectFade,
          EffectFlip,
          EffectCoverflow,
          EffectCube,
          EffectCards,
        ] }
        { ...swiperParams }
      >
        { hasNavigation &&
          <>
            <button className={ buttonPrevClasses } style={ buttonPrevStyles }>
              <span className="screen-reader-only">
                { __( 'Previous slide', 'fleximpleblocks' ) }
              </span>
              <i className={ buttonPrevIconClasses } aria-hidden="true" />
            </button>
            <button className={ buttonNextClasses } style={ buttonNextStyles }>
              <span className="screen-reader-only">
                { __( 'Next slide', 'fleximpleblocks' ) }
              </span>
              <i className={ buttonNextIconClasses } aria-hidden="true" />
            </button>
          </>
        }

        { hasPagination && <div className="swiper-pagination" /> }

        { postsData.map( ( post, i ) => {
          return (
            <SwiperSlide key={ i }>
              <PostCarouselPreviewArticle post={ post } { ...{ attributes } } />
            </SwiperSlide>
          )
        }) }
      </Swiper>
    </div>
  )
}

export default PostCarouselPreview
