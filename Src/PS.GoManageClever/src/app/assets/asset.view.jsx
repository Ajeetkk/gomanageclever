import React, { Component } from 'react';
import { Gallery } from '../common/constants'
import dragula from "dragula";
import { Col } from 'react-bootstrap';
import Widgets from '../widget/widget';

class AssetView extends Component {
    state = {}
    componentDidMount() {
        dragula([document.getElementById('Assetviewleft'), document.getElementById('Right')]);
    }
    componentDidUpdate() {
        dragula([document.getElementById('Assetviewleft'), document.getElementById('Right')], {
            copy: function (el, source) {
                return source === document.getElementById('Right');
            },
            accepts: function (el, target) {
                return target !== document.getElementById('Right');
            },
            moves: function (el, source, handle, sibling) {
                var draggable = el.getAttribute('draggable');
                if (draggable === 'false') {
                    return false; // elements are always draggable by default
                } else {
                    return true;
                }
            }
        });
    }
    render() {
        return (
            <>
                <Col id="Assetviewleft" style={{ float: "left" }}>
                     <Widgets Name={"Engines"} Url={"https://azeuw-apimhived01.azure-api.net/api/v1/"} />
                     <Widgets Name={"Assets"} Url={"https://azeuw-apimhived01.azure-api.net/api/v1/"} />
                </Col>
                {this.props.displayGallery &&
                    <Col md="3" id="Right" style={{ backgroundColor: "#D3D3D3", width: "18rem", float: "right", height: "46rem", textAlign: "center" }}>
                        <p>Widget gallery</p>
                        <Gallery />
                    </Col>
                }

            </>
        );
    }
}

export default AssetView;