/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { TextControl } from '@wordpress/components'
import { useDispatch, useSelect } from '@wordpress/data'
import { PluginDocumentSettingPanel } from '@wordpress/editPost'
import { useEffect, useState } from '@wordpress/element'
import { registerPlugin } from '@wordpress/plugins'

const PostMetaBox = () => {
	const {
		meta,
		meta: { kicker },
	} = useSelect( select => ( {
		meta: select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {},
	} ) )

	const { editPost } = useDispatch( 'core/editor' )

	const [ kickerValue, setKickerValue ] = useState( kicker )

	useEffect( () => {
		editPost( {
			meta: {
				...meta,
				kicker: kickerValue,
			},
		} )
	}, [ kickerValue ] )

	return (
		<PluginDocumentSettingPanel
			name="post-meta-box"
			title={ __( 'Kicker', 'fleximpleblocks' ) }
		>
			<TextControl
				label={ __( 'Write a kicker (optional)', 'fleximpleblocks' ) }
				value={ kickerValue }
				onChange={ setKickerValue }
			/>
		</PluginDocumentSettingPanel>
	)
}

if ( window.pagenow === 'post' ) {
	registerPlugin( 'kicker', {
		render: PostMetaBox,
		icon: null,
	} )
}
