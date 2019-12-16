import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function AppSelectionView() {
    const [internal, changeIntrenal] = React.useState(false);
    const [external, changeExternal] = React.useState(false);
    function changeIntenalState() {
        changeIntrenal(true);
        changeExternal(false);
        localStorage.setItem("UserType", "Internal");
    }
    function changeExternalState() {
        changeIntrenal(false);
        changeExternal(true);
        localStorage.setItem("UserType", "External");
    }
    const icon = () => {
        return(<svg version="1.1" id="Layer_1" x="0px" y="0px"
        width="23px" height="15px" viewBox="0 0 23 15" enableBackground="new 0 0 23 15">
   <path id="Combined-Shape" fill="#3B64D6" d="M21.071,5.657l1.414,1.415l-7.071,7.071L14,12.729l4.656-4.657H0v-2h18.656L14,1.414
       L15.414,0L21.071,5.657z"/>
   </svg>)
    }
    return (
        <div>
            <Row className="appSelection">
                <Col md="12">
                    <h1> Welcome to <br />Go! Manage Clever.</h1>
                    <p className="versionTxt">Please select your user type.</p>
                </Col>
                <Col md="12">
                    <Row>
                        <Col md="6" className="padingRight">
                            <label className="checkBoxcontainer">
                                 <input type="checkbox" checked={internal} onChange={() => changeIntenalState(true)} />
                                <span className="checkmark"></span>
                                <span>I am an internal MTU/RRPS employee.</span>
                            </label>
                        </Col>
                    </Row>
                </Col>
                <Col md="12">
                    <Row>
                        <Col md="6" className="padingRight">
                            <label className="checkBoxcontainer">
                                 <input type="checkbox" checked={external} onChange={() => changeExternalState(true)} />
                                <span className="checkmark"></span>
                                <span>I am an external user.</span>
                            </label>

                        </Col>
                    </Row>
                </Col>
            </Row>
            <br />
            <Row>
                <Col md="12">
                    {internal ? <Link to="/login" className="fontSizeTxt"> Proceed to Go! Manage Clever {icon()} </Link> : null}
                    {external ? <Link to="/login" className="fontSizeTxt"> Proceed to login {icon()} </Link> : null}
                </Col>
            </Row>
        </div>
    )
}
