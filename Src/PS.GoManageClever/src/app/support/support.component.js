import React, { Component } from 'react'
import SupportView from './support'
export default class Support extends Component {
    render() {        
        return (
            <>
                <SupportView displayGallery= {this.props.showgallery} />
            </>
        )
    }
}
 