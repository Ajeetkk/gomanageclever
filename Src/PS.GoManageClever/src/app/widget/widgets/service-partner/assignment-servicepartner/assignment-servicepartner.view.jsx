import React, { useState } from "react";
import { Row, Col, Collapse } from "react-bootstrap";
import { Table, Button, Icons } from "../../widget-controls/constants";
import "./assignment-servicepartner.scss";
export default function AssignmentServicePartnerView(props) {
  const [open, setOpen] = useState(true);

  const [Search, setSearch] = useState("");
  const _handleKeyDown = e => {
    if (e.key === "Enter") {
      props.search(Search);
    }
  };
  const handleSearchBtn = e => {
    props.search(Search);
  };

  const _clearSearch = () => {
    setSearch('');
    props.search('');
  }

  return (
    <div className="col-7 assign-service">
      <Row className="sub-header">
        <Col md={10}>
          <h4>Service partner assignment</h4>
        </Col>
        <Col md={2}>
          <span className="collapseBtn" onClick={() => setOpen(!open)}>
            <Icons IconName={!open ? "collapseRevIcon" : "collapseIcon"} />
          </span>
        </Col>
      </Row>
      <Collapse in={open}>
        <div className="m-0">
          <Row className="assign-service-view">
            <Col md={9} className="searchwrapper">
              <input
                type="textbox"
                value={Search}
                onChange={event => setSearch(event.target.value)}
                onKeyDown={_handleKeyDown}
                className="searchBox"
                placeholder="Search"
              />
              {Search.length === 0 ? (
                <button
                  _ngcontent-atc-c2=""
                  className="searchBtn search-icon"
                  type="button"
                  onClick={handleSearchBtn}
                >
                  <Icons IconName={"searchIcon"} />
                </button>
              ) : (
                  <button
                    _ngcontent-atc-c2=""
                    onClick={_clearSearch}
                    className="searchBtn search-icon"
                    type="button"
                  >
                    <Icons IconName={"closeIcon"} />
                  </button>
                )}
            </Col>
            <Col md={3}>
              <Button
                btnClicked={props.openBulkPopup}
                btnClass="custom-btn primary-btn bulk-btn"
                TextValue="Bulk assign"
                disable={!props.disablebulkassign}
              ></Button>
            </Col>
          </Row>
          <Table {...props} />
        </div>
      </Collapse>
    </div>
  );
}
