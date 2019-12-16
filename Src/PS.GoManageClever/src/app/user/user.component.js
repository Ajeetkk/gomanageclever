import React, { Component } from 'react'
import User from './user.view'
export default class UserComponent extends Component {
    render() {
        return (
            <>
                <User displayGallery={this.props.showgallery} />
            </>
        )
    }
}
