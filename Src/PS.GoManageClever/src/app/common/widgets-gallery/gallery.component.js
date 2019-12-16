import React, { Component } from 'react';
import Gallery from './gallery.view'
export default class GalleryComponent extends Component {    
    render() {
        return (
            <React.Fragment>
                <Gallery title='User Management' text='User Management Related' />
                <Gallery title='Company Name' text='Fleet Management text' />
                <Gallery title='Asset Management' text='Asset management text' />
            </React.Fragment>
        );
    }
}

