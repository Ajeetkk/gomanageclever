import React, { Component } from 'react'
import DashboardView from './dashboard.view'
export default class Dashboard extends Component {
    spinner = () => {
        const spinner = document.getElementById('spinner');
        spinner.classList.add("hide");
        spinner.classList.remove("show");
    }
    render() {
        return (
            <React.Fragment>
                {this.spinner()}
                <DashboardView displayGallery={this.props.showgallery} />
            </React.Fragment>
        )
    }
}
