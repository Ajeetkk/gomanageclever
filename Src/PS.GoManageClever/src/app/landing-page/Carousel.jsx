import React from 'react'
import { Carousel } from 'react-bootstrap';
export default function SlideShow() {
    return (
        <div>
            <Carousel slide={false} controls={false} indicators={false}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require("./1.png")}
                        alt="First slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
