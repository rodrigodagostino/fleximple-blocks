/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import {
  ExternalLink,
  Button,
  PanelBody,
  Placeholder,
  TextControl,
  ToggleControl,
} from '@wordpress/components'
import domReady from '@wordpress/dom-ready'
import { Component, render } from '@wordpress/element'

/**
 * Internal dependencies
 */
import Spinner from 'fleximple-components/components/spinner'
import logo from '../../src/assets/images/logo'

class FleximpleBlocksSettings extends Component {
  constructor() {
    super( ...arguments )

    this.changeOptions = this.changeOptions.bind( this )

    this.state = {
      isAPILoaded: false,
      isAPISaving: false,
      fleximpleblocks_small_breakpoint_value: '',
      fleximpleblocks_medium_breakpoint_value: '',
      fleximpleblocks_large_breakpoint_value: '',
      fleximpleblocks_xlarge_breakpoint_value: '',
      fleximpleblocks_is_font_awesome_active: true,
      fleximpleblocks_is_leaflet_active: true,
      fleximpleblocks_is_swiper_active: true,
      fleximpleblocks_open_weather_api_key: '',
    }
  }

  componentDidMount() {
    wp.api.loadPromise.then( () => {
      this.settings = new wp.api.models.Settings()

      if ( false === this.state.isAPILoaded ) {
        this.settings.fetch().then( response => {
          this.setState({
            fleximpleblocks_small_breakpoint_value:
							response.fleximpleblocks_small_breakpoint_value,
            fleximpleblocks_medium_breakpoint_value:
							response.fleximpleblocks_medium_breakpoint_value,
            fleximpleblocks_large_breakpoint_value:
							response.fleximpleblocks_large_breakpoint_value,
            fleximpleblocks_xlarge_breakpoint_value:
							response.fleximpleblocks_xlarge_breakpoint_value,
            fleximpleblocks_is_font_awesome_active:
							response.fleximpleblocks_is_font_awesome_active,
            fleximpleblocks_is_leaflet_active:
							response.fleximpleblocks_is_leaflet_active,
            fleximpleblocks_is_swiper_active:
							response.fleximpleblocks_is_swiper_active,
            fleximpleblocks_open_weather_api_key:
							response.fleximpleblocks_open_weather_api_key,
            isAPILoaded: true,
          })
        })
      }
    })
  }

  changeOptions( option, value ) {
    this.setState({ isAPISaving: true })

    const model = new wp.api.models.Settings({
      [ option ]: value,
    })

    model.save().then( response => {
      this.setState({
        [ option ]: response[ option ],
        isAPISaving: false,
      })
    })
  }

  render() {
    if ( !this.state.isAPILoaded ) {
      return (
        <Placeholder>
          <Spinner />
        </Placeholder>
      )
    }

    return (
      <>
        <div className="fleximple-blocks-header">
          <div className="fleximple-blocks-container">
            <div className="fleximple-blocks-branding">{ logo }</div>
          </div>
        </div>

        <div className="fleximple-blocks-main">
          <PanelBody title={ __( 'Breakpoints', 'fleximpleblocks' ) }>
            <p>
              { __(
                'Define the breakpoint values that will be used by the Fleximple Blocks.',
                'fleximpleblocks',
              ) }
            </p>
            <div className="fleximple-components-control__row">
              <TextControl
                type="number"
                label={ __( 'Small breakpoint', 'fleximpleblocks' ) }
                help={ __( 'In pixels.', 'fleximpleblocks' ) }
                value={ this.state.fleximpleblocks_small_breakpoint_value }
                onChange={ value =>
                  this.setState({
                    fleximpleblocks_small_breakpoint_value: value,
                  })
                }
                disabled={ this.state.isAPISaving }
                min={ 0 }
              />

              <TextControl
                type="number"
                label={ __( 'Medium breakpoint', 'fleximpleblocks' ) }
                help={ __( 'In pixels.', 'fleximpleblocks' ) }
                value={ this.state.fleximpleblocks_medium_breakpoint_value }
                onChange={ value =>
                  this.setState({
                    fleximpleblocks_medium_breakpoint_value: value,
                  })
                }
                disabled={ this.state.isAPISaving }
                min={ 0 }
              />

              <TextControl
                type="number"
                label={ __( 'Large breakpoint', 'fleximpleblocks' ) }
                help={ __( 'In pixels.', 'fleximpleblocks' ) }
                value={ this.state.fleximpleblocks_large_breakpoint_value }
                onChange={ value =>
                  this.setState({
                    fleximpleblocks_large_breakpoint_value: value,
                  })
                }
                disabled={ this.state.isAPISaving }
                min={ 0 }
              />

              <TextControl
                type="number"
                label={ __( 'Extra large breakpoint', 'fleximpleblocks' ) }
                help={ __( 'In pixels.', 'fleximpleblocks' ) }
                value={ this.state.fleximpleblocks_xlarge_breakpoint_value }
                onChange={ value =>
                  this.setState({
                    fleximpleblocks_xlarge_breakpoint_value: value,
                  })
                }
                disabled={ this.state.isAPISaving }
                min={ 0 }
              />
            </div>

            <div className="fleximple-components-control__row">
              <Button
                isPrimary
                isLarge
                isBusy={ this.state.isAPISaving }
                onClick={ () => {
                  this.changeOptions(
                    'fleximpleblocks_small_breakpoint_value',
                    this.state.fleximpleblocks_small_breakpoint_value,
                  )
                  this.changeOptions(
                    'fleximpleblocks_medium_breakpoint_value',
                    this.state.fleximpleblocks_medium_breakpoint_value,
                  )
                  this.changeOptions(
                    'fleximpleblocks_large_breakpoint_value',
                    this.state.fleximpleblocks_large_breakpoint_value,
                  )
                  this.changeOptions(
                    'fleximpleblocks_xlarge_breakpoint_value',
                    this.state.fleximpleblocks_xlarge_breakpoint_value,
                  )
                } }
              >
                { __( 'Save changes', 'fleximpleblocks' ) }
              </Button>
            </div>
          </PanelBody>

          <PanelBody title={ __( 'Third Parties', 'fleximpleblocks' ) }>
            <div className="fleximple-components-control__row">
              <ToggleControl
                label={ __( 'Load Font Awesome', 'fleximpleblocks' ) }
                checked={ this.state.fleximpleblocks_is_font_awesome_active }
                onChange={ () => {
                  this.setState({
                    fleximpleblocks_is_font_awesome_active:
											!this.state.fleximpleblocks_is_font_awesome_active,
                  })
                } }
                help={ __(
                  'It’s only necessary for icons to work. Deactivate it if you won’t be using them.',
                  'fleximpleblocks',
                ) }
              />
            </div>

            <div className="fleximple-components-control__row">
              <ToggleControl
                label={ __( 'Load Leaflet', 'fleximpleblocks' ) }
                checked={ this.state.fleximpleblocks_is_leaflet_active }
                onChange={ () => {
                  this.setState({
                    fleximpleblocks_is_leaflet_active:
											!this.state.fleximpleblocks_is_leaflet_active,
                  })
                } }
                help={ __(
                  'It’s only necessary for maps to work. Deactivate it if you won’t be using them.',
                  'fleximpleblocks',
                ) }
              />
            </div>

            <div className="fleximple-components-control__row">
              <ToggleControl
                label={ __( 'Load Swiper', 'fleximpleblocks' ) }
                checked={ this.state.fleximpleblocks_is_swiper_active }
                onChange={ () => {
                  this.setState({
                    fleximpleblocks_is_swiper_active:
											!this.state.fleximpleblocks_is_swiper_active,
                  })
                } }
                help={ __(
                  'It’s only necessary for carousels to work. Deactivate it if you won’t be using them.',
                  'fleximpleblocks',
                ) }
              />
            </div>

            <div className="fleximple-components-control__row">
              <TextControl
                label={ __( 'Open Weather API key', 'fleximpleblocks' ) }
                value={ this.state.fleximpleblocks_open_weather_api_key }
                onChange={ value =>
                  this.setState({ fleximpleblocks_open_weather_api_key: value })
                }
                help={
                  <ExternalLink href={ 'https://openweathermap.org/api' }>
                    { __( 'Get your own API key.' ) }
                  </ExternalLink>
                }
                disabled={ this.state.isAPISaving }
              />
            </div>

            <div className="fleximple-components-control__row">
              <Button
                isPrimary
                isLarge
                isBusy={ this.state.isAPISaving }
                onClick={ () => {
                  this.changeOptions(
                    'fleximpleblocks_is_font_awesome_active',
                    this.state.fleximpleblocks_is_font_awesome_active,
                  )
                  this.changeOptions(
                    'fleximpleblocks_is_leaflet_active',
                    this.state.fleximpleblocks_is_leaflet_active,
                  )
                  this.changeOptions(
                    'fleximpleblocks_is_swiper_active',
                    this.state.fleximpleblocks_is_swiper_active,
                  )
                  this.changeOptions(
                    'fleximpleblocks_open_weather_api_key',
                    this.state.fleximpleblocks_open_weather_api_key,
                  )
                } }
              >
                { __( 'Save changes', 'fleximpleblocks' ) }
              </Button>
            </div>
          </PanelBody>
        </div>
      </>
    )
  }
}

// Load all the options into the UI.
domReady( () => {
  render(
    <FleximpleBlocksSettings />,
    document.querySelector( '#fleximple-blocks-settings-page' ),
  )
})
