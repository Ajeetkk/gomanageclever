import React, { Component } from 'react';
import { Gallery } from '../common/constants'
import dragula from "dragula";
import {  Col } from 'react-bootstrap';
class DashboardView extends Component {
    state = {  }
    componentDidMount(){
          dragula([document.getElementById('DashboardLeft'), document.getElementById('Right')]);
    }
    componentDidUpdate(){     
        dragula([document.getElementById('DashboardLeft'), document.getElementById('Right')],{
            copy: function(el, source) {
                return source === document.getElementById('Right');
              },
              accepts: function(el, target) {
                return target !== document.getElementById('Right');
              },
              moves: function(el, source, handle, sibling) {
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
            <React.Fragment>
            <Col id ="DashboardLeft" style={{ textAlign:'center'}}>
             <img src={require("./coming-soon.png")} style={{ marginTop:'10%'}}/>
            </Col>
            { this.props.displayGallery &&
                <Col md="3"   id="Right" style={{ backgroundColor: "#D3D3D3", width: "18rem", float: "right", height: "46rem", textAlign: "center" }}>
                <p>Widget gallery</p>
                <Gallery/>  
            </Col>
            }
            
            </React.Fragment>
         );
    }
}
 
export default DashboardView;
