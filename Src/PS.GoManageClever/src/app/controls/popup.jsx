import Modal from 'react-bootstrap/Modal'
import React from 'react'
//import { Button } from 'react-bootstrap';

const ModalPopup = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} centered size="xl" className="watchTrailer">
                <Modal.Body>
                    <iframe title="videoPopup" width="465px" height="310px"
                        src="https://www.youtube.com/embed/GCJa0J5KeR4">
                    </iframe>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalPopup;