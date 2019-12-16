import React, { Component } from 'react'
import AssetView from './asset.view'
export default class AssetComponent extends Component {
    render() {
        return (
            <>
                <AssetView displayGallery={this.props.showgallery} />
            </>
        )
    }
}
