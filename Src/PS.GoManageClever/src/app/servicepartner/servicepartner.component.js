import React, { Component } from 'react'
import ServicePartnerView from './servicepartner.view'
export default class ServicePartnerComponent extends Component {
    render() {
        return (
            <>
                <ServicePartnerView displayGallery={this.props.showgallery}  />
            </>
        )
    }
}
