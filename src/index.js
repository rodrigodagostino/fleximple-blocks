/**
 * WordPress dependencies
 */
import {
  registerBlockType,
  unstable__bootstrapServerSideBlockDefinitions,
} from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import * as ad from './blocks/ad'
import * as button from './blocks/button'
import * as buttons from './blocks/buttons'
import * as contactInfo from './blocks/contact-info'
import * as contactInfoItem from './blocks/contact-info-item'
import * as dateAndTime from './blocks/date-and-time'
import * as feature from './blocks/feature'
import * as header from './blocks/header'
import * as icon from './blocks/icon'
import * as iframe from './blocks/iframe'
import * as map from './blocks/map'
import * as post from './blocks/post'
import * as postCarousel from './blocks/post-carousel'
import * as profile from './blocks/profile'
import * as recentPosts from './blocks/recent-posts'
import * as row from './blocks/row'
import * as tabPanel from './blocks/tab-panel'
import * as tabs from './blocks/tabs'
import * as testimonial from './blocks/testimonial'
import * as weather from './blocks/weather'

export const registerFleximpleBlocks = () => {
  [
    ad,
    button,
    buttons,
    contactInfo,
    contactInfoItem,
    dateAndTime,
    feature,
    header,
    icon,
    iframe,
    map,
    post,
    postCarousel,
    profile,
    recentPosts,
    row,
    tabPanel,
    tabs,
    testimonial,
    weather,
  ].forEach( block => {
    if ( !block ) {
      return
    }
    const { metadata, settings, name } = block
    if ( metadata ) {
      unstable__bootstrapServerSideBlockDefinitions({ [ name ]: metadata })
    }
    registerBlockType( name, settings )
  })
}

registerFleximpleBlocks()

/**
 * Block Variations
 */
// import './block-variations'

/**
 * Hooks
 */
import './hooks/animation'
