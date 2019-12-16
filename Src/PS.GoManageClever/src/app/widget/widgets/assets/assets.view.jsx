import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Collapse } from "react-bootstrap";
import { Table, Icons, Modal, Radio, Button } from '../widget-controls/constants';
import EnginesComponent from '../assets/engines/engines.component';
import "./assets.scss";

export default function AssetsView(props) {
    const [Search, setSearch] = useState('');
    const [show, ShowPopup] = useState(false);
    const [showAddBtn, showAddButton] = useState(false);
    const [showBlock, showPopupBlock] = useState(false);
    const [showMarine, ShowMarinePopup] = useState(false);
    const [showPowergen, showPowergenPopup] = useState(false);
    const [showRail, ShowRailPopup] = useState(false);
    const [radioValue, setRadioValue] = useState('');
    const [assetName, setAssetName] = useState('');
    const [marineMMISNumber, setMarineMMISNumber] = useState('');
    const [marineMIOHullNumber, setMarineMIOHullNumber] = useState('');
    const [assetsList, setAssetsList] = useState('');

    const [powergenAssetName, setPowergenAssetName] = useState('');
    const [powergenStreet, setPowergenStreet] = useState('');
    const [powergenCity, setPowergenCity] = useState('');
    const [powergenCountry, setPowergenCountry] = useState('');
    const [powergenPostalCode, setpowergenPostalCode] = useState('');
    const [railAdditionalInformation, setrailAdditionalInformation] = useState('');
    const [railAssetName, setRailAssetName] = useState('');
    
    const [editData, setEditData] = useState('');
    const [errorAssetType, setErrorAssetType] = useState('');
    const [errorRailAssetType, setErrorRailAssetType] = useState('');
    const [errorPowerGenAssetType, setErrorPowerGenAssetType] = useState('');
    const [errorCountry, setErrorCountry] = useState('');
           
    
    const [errorAssetName, setErrorMarineAssetName] = useState('');
    const [errorPowergenAssetName, setErrorPowergenAssetName] = useState('');
    const [errorRailAssetName, setErrorRailAssetName] = useState('');
    
    const [errorMMSI, setErrorMMSI] = useState('');
    const [errorStreet, setErrorStreet] = useState('');
    const [errorCity, setErrorCity] = useState('');
    const [errorIMO, setErrorIMO] = useState('');
    const [errorPostal, setErrorPostal] = useState('')
    const [open, setOpen] = useState(true);
    const [editAssetName, setEditAssetName] = useState('');
    const [editPowerGenAssetName, setEditPowergenAssetName] = useState('');    
    const [editMMSI, setEditMMSI] = useState('');
    const [editIMO, setEditIMO] = useState('');
    const [editstreet, setEditStreet] = useState(''); 
    const [editCountry, setEditCountry] = useState('');
    const [editCity, setEditCity] = useState('');
    const [editPostalCode, setEditPostalCode] = useState('');
    const [editRailAssetName, setEditRailAssetName] = useState('');
    const [editRailAdditionalInformation, setEditRailAdditionalInformation] = useState('');
    

    useEffect(() => {
        let data = props.isEditClicked;        
        if(data){
                setEditData(props.passEditRowData)  
                 setEditAssetName(props.passEditRowData && props.passEditRowData.name ? props.passEditRowData.name : null)
                 setEditMMSI( props.passEditRowData.extendedAttributes && props.passEditRowData.extendedAttributes.MMSINumber ? props.passEditRowData.extendedAttributes.MMSINumber : null)
                 setEditIMO(props.passEditRowData.extendedAttributes && props.passEditRowData.extendedAttributes.IMOHullNumber ? props.passEditRowData.extendedAttributes.IMOHullNumber : null) 
                 setEditStreet(props.passEditRowData && props.passEditRowData.address && props.passEditRowData.address[0] ? props.passEditRowData.address[0].addressLine1 : null);
                 setEditPowergenAssetName(props.passEditRowData && props.passEditRowData.name ? props.passEditRowData.name : null);
                 setEditCountry(props.passEditRowData && props.passEditRowData.address && props.passEditRowData.address[0] ? props.passEditRowData.address[0].country : null);
                 setEditCity(props.passEditRowData && props.passEditRowData.address && props.passEditRowData.address[0] ? props.passEditRowData.address[0].city : null);
                 setEditPostalCode(props.passEditRowData && props.passEditRowData.address && props.passEditRowData.address[0] ? props.passEditRowData.address[0].postalCode  : null);
                 setEditRailAssetName(props.passEditRowData && props.passEditRowData.name ? props.passEditRowData.name : null);
                 setEditRailAdditionalInformation(props.passEditRowData && props.passEditRowData.extendedAttributes ? props.passEditRowData.extendedAttributes.AdditionalInformation : null);
                
                }        
    });      
    

    const handleAddAssets = () => {
        ShowPopup(true);
        showPopupBlock({ showBlock: true });
        ShowMarinePopup({ showMarine: false });
        showPowergenPopup({ showPowergen: false });
        ShowRailPopup({ showRail: false });

        props.isApplicationType(true);
    }


    const handleClose = () => ShowPopup(false);

    // Start Redio Handler
    const handleRadioValue = (e) => {
        setRadioValue(e.target.value);
    }
    // End Redio Handler

    //Start Save Handler
    const handleSaveAssets = () => {
        props.addAssets(radioValue);
    }
    // const handleSaveAssets = () => {
    //     if(radioValue === "Marine"){ 
           
    //         if(assetsList==""){               
    //             setErrorAssetType("Please select asset type");   
    //         }else if(!assetName.match(/^[a-zA-Z0-9-\s]+$/i) || assetName==""){               
    //             setErrorMarineAssetName("Valid asset name is required");   
    //         }else if(!marineMMISNumber.match(/^[a-zA-Z0-9-\s]+$/i) || marineMMISNumber==""){
    //             setErrorMMSI("Valid mmis number is required");
    //         }else if(!marineMIOHullNumber.match(/^[a-zA-Z0-9-\s]+$/i) || marineMIOHullNumber==""){
    //             setErrorIMO("Valid mio number is required");
    //         }else{
                
    //             setErrorAssetType('');
    //             setErrorMarineAssetName('');
    //             setErrorIMO('');
    //             setErrorMMSI('');
                
    //             const  assetDTO = {
    //                 "name": assetName,
    //                 "applicationType": radioValue,
    //                 "assettype": assetsList,
    //                 "extendedProperties": {
    //                   "MMSINumber": marineMMISNumber,
    //                   "IMOHullNumber": marineMIOHullNumber
    //                 },
    //                 "companyId": 1446, 
    //                 "assignedCompanies": [],
    //                 "assetAddresses": []
    //             }
    
    //                 props.addAssets(assetDTO);
    //                 ShowPopup(false);
    //         } 
    //     }else if(radioValue === "PowerGen"){    
            
    //         if(assetsList==""){               
    //             setErrorPowerGenAssetType("Please select asset type");   
    //         }else if(!powergenAssetName.match(/^[a-zA-Z0-9-\s]+$/i) || powergenAssetName==""){               
    //             setErrorPowergenAssetName("Valid asset name is required");   
    //         }else if(!powergenStreet.match(/^[a-zA-Z0-9-\s]+$/i) || powergenStreet==""){
    //             setErrorStreet("Valid street is required");
    //         }else if(!powergenCity.match(/^[a-zA-Z0-9-\s]+$/i) || powergenCity==""){
    //             setErrorCity("Valid city is required");
    //         }else if(!powergenPostalCode.match(/^[a-zA-Z0-9-\s]+$/i) || powergenPostalCode==""){
    //             setErrorPostal("Valid postal code is required");
    //         }else if(powergenCountry==""){               
    //             setErrorCountry("Please select country");   
    //         }else{
    //             setErrorPowergenAssetName('');
    //             setErrorCity('');
    //             setErrorStreet('');
    //             setErrorPowerGenAssetType('');
    //             setErrorCountry('');
            
    //         const  assetDTO =  { 
    //             "name": powergenAssetName,
    //             "applicationType": radioValue,
    //             "assettype": assetsList,
    //             "extendedProperties": {},
    //             "companyId": 1446,
    //             "assignedCompanies": [],
    //             "assetAddresses": [
    //               {
    //                 "addressLine1": powergenStreet,
    //                 "addressLine2": "",
    //                 "addressLine3": "",
    //                 "addressLine4": "",
    //                 "houseNumber": "",
    //                 "city": powergenCity,
    //                 "CountryCode": powergenCountry,
    //                 "postalCode": powergenPostalCode
    //               }
    //             ]
    //         } 
    //         props.addAssets(assetDTO);
    //         ShowPopup(false);
    //     }
    //     }else if(radioValue === "Rail"){       
            
    //         if(assetsList==""){               
    //             setErrorRailAssetType("Please select asset type");   
    //         }else if(!railAssetName.match(/^[a-zA-Z0-9-\s]+$/i) || railAssetName==""){               
    //             setErrorRailAssetName("Valid asset name is required");   
    //         }else{
    //             setErrorRailAssetName('');
    //             setErrorRailAssetType('');
    //         const  assetDTO ={
    //            "name": railAssetName,
    //            "applicationType": radioValue,
    //             "assettype": assetsList,
    //               "extendedProperties": {
    //               "AdditionalInformation": railAdditionalInformation
    //             },
    //             "companyId": 1446, 
    //             "assignedCompanies": [],
    //             "assetAddresses": []
    //           }   
    //         props.addAssets(assetDTO);
    //         ShowPopup(false);
    //         }
    //     }else {
    //         //---
    //     }
    // }
    //End Save Handler
    // Edit assets
    const handleEditAsset = () => {
        
        if(props.passEditRowData.applicationType.code === "Marine"){ 

            if(assetsList==""){               
                setErrorAssetType("Please select asset type");   
            }else if(!assetName.match(/^[a-zA-Z0-9-\s]+$/i) || assetName==""){               
                setErrorMarineAssetName("Valid asset name is required");   
            }else if(!marineMMISNumber.match(/^[a-zA-Z0-9-\s]+$/i) || marineMMISNumber==""){
                setErrorMMSI("Valid mmis number is required");
            }else if(!marineMIOHullNumber.match(/^[a-zA-Z0-9-\s]+$/i) || marineMIOHullNumber==""){
                setErrorIMO("Valid asset name is required");
            }else{
                
                setErrorAssetType('');
                setErrorMarineAssetName('');
                setErrorIMO('');
                setErrorMMSI('');
                
                const  assetDTO = {
                    "assetId": props.passEditRowData.id,
                    "name": assetName,
                    "applicationType": props.passEditRowData.applicationType.code,
                    "assettype": assetsList,
                    "extendedProperties": {
                      "MMSINumber": marineMMISNumber,
                      "IMOHullNumber": marineMIOHullNumber
                    },
                    "companyId": props.passEditRowData.company.id, 
                    "assetAddresses": []
                }
    
                    props.updateAssets(assetDTO);
                    ShowPopup(false);
        } 
        
    }else if(props.passEditRowData.applicationType.code === "PowerGen"){    
                  
        if(assetsList==""){               
            setErrorPowerGenAssetType("Please select Asset Type");   
        }else if(powergenCountry==""){               
            setErrorCountry("Please select country");   
        }else if(!powergenStreet.match(/^[a-zA-Z0-9-\s]+$/i) || powergenStreet==""){
            setErrorStreet("Valid street is required");
        }else if(!powergenCity.match(/^[a-zA-Z0-9-\s]+$/i) || powergenCity==""){
            setErrorCity("Valid city is required");
        }else if(!powergenPostalCode.match(/^[a-zA-Z0-9-\s]+$/i) || powergenPostalCode==""){
            setErrorPostal("Valid postal code is required");
        }else{
            setErrorPowergenAssetName('');
            setErrorCity('');
            setErrorStreet('');
            setErrorPowerGenAssetType('');
            setErrorCountry('');
        
        const  assetDTO =  { 
            "assetId": props.passEditRowData.id,
            "name": powergenAssetName,
            "applicationType": props.passEditRowData.applicationType.code,
            "assettype": assetsList,
            "extendedProperties": {},
            "companyId": props.passEditRowData.company.id,
            "assetAddresses": [
              {
                "addressLine1": powergenStreet,
                "addressLine2": "",
                "addressLine3": "",
                "addressLine4": "",
                "houseNumber": "",
                "city": powergenCity,
                "CountryCode": powergenCountry,
                "postalCode": powergenPostalCode
              }
            ]
        } 
        props.updateAssets(assetDTO);
        ShowPopup(false);
    }
    }else if(props.passEditRowData.applicationType.code === "Rail"){       
        
        if(assetsList==""){               
            setErrorRailAssetType("Please select asset type");   
        }else if(!railAssetName.match(/^[a-zA-Z0-9-\s]+$/i) || railAssetName==""){               
            setErrorRailAssetName("Valid asset name is required");   
        }else{
            setErrorRailAssetName('');
            setErrorRailAssetType('');
        const  assetDTO ={
            "assetId": props.passEditRowData.id,
           "name": railAssetName,
           "applicationType": props.passEditRowData.applicationType.code,
            "assettype": assetsList,
              "extendedProperties": {
              "AdditionalInformation": railAdditionalInformation
            },
            "companyId": props.passEditRowData.company.id, 
            "assetAddresses": []
          }   
          props.updateAssets(assetDTO);
          ShowPopup(false);
        }
    }else {
        //---
    }
}

    //Start Next Button Handler
    const handleNext = () => {
        ShowPopup(true);
        showPopupBlock(false);
        props.setAssettype(radioValue)
     
      if(radioValue === "Marine"){ 
          ShowMarinePopup(true);            
      }else if(radioValue === "PowerGen"){          
           showPowergenPopup(true);          
       }else if(radioValue === "Rail"){                       
           ShowRailPopup(true);            
       }else{
           ShowPopup(true);
       }  
    }
    // End Next Button Handler
    const handlerEditAssetName = (value) => {       
        setAssetName(value);
    }
    //start handler marine form
    const handlerAssetName = (e) => {
        setAssetName(e.target.value)
    }
    const handlerMarineMMSINumbetr = (e) => {
        setMarineMMISNumber(e.target.value)
    }
    const handlerMarineIMOHullNumbetr = (e) => {
        setMarineMIOHullNumber(e.target.value)
    }
    const handleAssetsList = (e) => {
        setAssetsList(e.target.value)
    }
    //End handler marine form
    //Start for Powrgen
    const handlerPowergenAssetName = (e) =>{
        setPowergenAssetName(e.target.value)
    }
    const handlerState = (e) => {
        setPowergenStreet(e.target.value)
    }
    const handlerCity = (e) => {
        setPowergenCity(e.target.value)
    }
    const handleCountryList = (e) => {
        setPowergenCountry(e.target.value)
    }
    
    
    const handlePostalCode = (e) => {
        setpowergenPostalCode(e.target.value)
    }
    //End Powergen
    //Rail
    const handleRailAdditionalInformation = (e) => {
        setrailAdditionalInformation(e.target.value)
    }
    const handlerRailAssetName = (e) => {
        setRailAssetName(e.target.value)
    }

    const IsShowEngines = props.isEngineGridDisplayed;
    const [IsLoadEngines, setIsLoadEngines] = useState(false);
    const [IsNoEngines, setIsNoEngines] = useState(false);
    const noSearchAssetsText = "No assets found.";
    const noAssetsText = "There are no assets in this list. Click on the button to add an asset.";

    const _handleKeyDown = (e) => {
        _noEngineRecords(false);
        setIsLoadEngines(false);
        if (e.key === 'Enter') {
            props.search(Search);
            if (IsShowEngines) {
                setIsLoadEngines(true);
            }
        }
    }

    const _clearSearch = () => {
        setSearch('');
        props.search('');
        if (IsShowEngines) {
            setIsLoadEngines(true);
        }
    }

    const _noEngineRecords = (isNoEngines) => {
        setIsNoEngines(isNoEngines);
    }

    const _sortOnAssetsWhenEngines = () => { }

    const marineAssetNameValidation = (e) => {        	        
         let marineAssetsName = e.target.value;        		       
        if(!marineAssetsName.match(/^[a-zA-Z0-9\s]+$/i) || marineAssetsName==""){
            setErrorMarineAssetName("Valid asset name is required");
        }else{
            setErrorMarineAssetName('');
        }
           
    }
    const powergenAssetNameValidation = (e) => {         
        let powergenAssetsName = e.target.value;        
       if(!powergenAssetsName.match(/^[a-zA-Z0-9-\s]+$/i) || powergenAssetsName==""){
           setErrorPowergenAssetName("Valid asset name is required");
       }else{
        setErrorPowergenAssetName('');
       }
   }
   const railAssetNameValidation = (e) => {         
        let railAssetsName = e.target.value;      
        if(!railAssetsName.match(/^[a-zA-Z0-9-\s]+$/i) || railAssetsName==""){
            setErrorRailAssetName("Valid asset name is required");
        }else{
            setErrorRailAssetName('');
        }
    }
    const marineMMSIValidation = (e) => { 
        let marineMMSI = e.target.value;
       if(!marineMMSI.match(/^[a-zA-Z0-9-\s]+$/i) || marineMMSI==""){
           setErrorMMSI("Valid mmsi is required");
       }else{
        setErrorMMSI('');
       }
   }
   const marineIMOValidation = (e) => {         
        let marineIMO = e.target.value;  
    if(!marineIMO.match(/^[a-zA-Z0-9-\s]+$/i) || marineIMO==""){
        setErrorIMO("Valid imo is required");
    }else{
        setErrorIMO('');        
    }
    }
    const streetValidation = (e) => {         
        let pStreet = e.target.value;  
        if(!pStreet.match(/^[a-zA-Z0-9-\s]+$/i) || pStreet==""){
            setErrorStreet("Valid street is required");
        }else{
            setErrorStreet('');
        }
    }
    const cityValidation = (e) => {
        let pCity = e.target.value;  
        if(!pCity.match(/^[a-zA-Z0-9-\s]+$/i) || pCity==""){            
            setErrorCity("Valid city is required");           
        }else{
            setErrorCity('');           
        }
    }
    const postalValidation = (e) => {
        let pPostal = e.target.value;  
        if(!pPostal.match(/^[a-zA-Z0-9-\s]+$/i) || pPostal==""){            
            setErrorPostal("Valid postal code is required");           
        }else{
            setErrorPostal('');
        }
    }
    const marineAssetTypeValidation =(e) => {
        let mAssetType = e.target.value;  
        if(mAssetType==""){            
            setErrorAssetType('Please Select Asset Type');           
        }else{
            setErrorAssetType('');
        }
    }
    const railAssetTypeValidation =(e) => {
        let rAssetType = e.target.value;  
        if(rAssetType==""){            
            setErrorRailAssetType('Please Select Asset Type');           
        }else{
            setErrorRailAssetType('');
        }
    }
    const pwoerGenAssetTypeValidation =(e) => {
        let pAssetType = e.target.value;  
        if(pAssetType==""){            
            setErrorPowerGenAssetType('Please Select Asset Type');           
        }else{
            setErrorPowerGenAssetType('');
        }
    }
    const countryValidation =(e) => {
        let country = e.target.value;  
        if(country==""){            
            setErrorCountry('Please Select country');           
        }else{
            setErrorCountry('');
        }
    }
    
    return (

        <div className="pagewrapper">

            <Row className="subHeader">
                <Col md={3}>
                    <h4>Assets</h4>
                </Col>
                <Col md={9} className="searchwrapper">
                    {open ? <div className="searchboxWrapper">
                        <input type="textbox" value={Search}
                            onChange={event => setSearch(event.target.value)} onKeyDown={_handleKeyDown} className="searchBox" placeholder="Search" />
                        {Search.length === 0 ? (<button className="searchBtn search-icon">
                            <Icons IconName='searchIcon' />
                        </button>) :
                            (<button className="searchBtn search-icon" onClick={_clearSearch}>
                                <Icons IconName='closeIcon' />
                            </button>)}
                    </div> : null}
                    {open ? <Button
                        btnClass="width-auto btn btn-primary"
                        TextValue="Add asset"
                        btnClicked={handleAddAssets}>
                    </Button> : null}
                    <span className="collapseBtn" onClick={() => setOpen(!open)}><Icons IconName={!open ? "collapseRevIcon" : "collapseIcon"} /></span>
                </Col>
            </Row>
            {IsShowEngines && Search && IsNoEngines && <Row className="m-0 noEngines">
                <div className="col-sm-8">
                    <span>No engines found in "{props.selectedAssetname}". </span><button type="button" className="closeEngine btn btn-link" onClick={_clearSearch}> Clear filter? </button>
                </div>
            </Row>}
            <Collapse in={open}>
                <div className="m-0">
                    {!IsShowEngines ? <div className="col-sm-12 p-0 d-flex assetsView"><div className="commonGrid"><Table IsClickable={true} noRecordsText={Search === '' ? noAssetsText : noSearchAssetsText} {...props} /></div></div> :
                        <Row className="m-0">
                            <Col md={3} className="engineTable">
                                {<Table header={props.assetEnginesHeader} IsClickable={true} SelectedRow={props.SelectedRow} body={props.assetEnginesBody} ActionButton={props.ActionButton} Sort={_sortOnAssetsWhenEngines} />}
                            </Col>
                            <Col md={9} className="p-0">
                                {IsShowEngines && <EnginesComponent Url={props.url} searchText={Search} assetId={props.enginesForAssetId} showEngines={props.showEngines} IsLoadEngines={IsLoadEngines} IsNoEngines={_noEngineRecords}
                                    reloadAssets={props.reloadAssets} />}
                            </Col>
                        </Row>}
                </div>
            </Collapse>
            <Modal
                showPopup={props.isDeleteClicked}
                closePopup={props.setDeletePopup}
                modalTitle="Delete asset"
                modalBtnSave="Yes"
                modalBtnClose="No"
                savePopup={props.deleteAsset}
                size={"lg"}
            >
                <div className="service-modal">
                    <p>Are you sure you want to delete the asset "{props.selectedAssetname}" ? This will unassign the engines belonging to this asset.</p>
                </div>
            </Modal>

            <Modal
                showPopup={props.isEditClicked}
                closePopup={props.setEditPopUp}
                modalTitle="Edit Asset"
                modalBtnSave="Save"
                modalBtnClose="Cancel"
                savePopup={handleEditAsset}
                size={"lg"}
            >
                {
                       editData && editData.applicationType && editData.applicationType.code === "Marine" ? <div className="assets-modal">
                      
                       <Row>
                           <Col md={9}>
                           <Form.Row>
                               <Form.Group as={Col}>
                                 
                               <Form.Label>Application Type</Form.Label>
                               <Form.Control type="text" value="Marine" disabled/>
                               </Form.Group>

                               <Form.Group as={Col} className="pl-27">
                               <Form.Label>Asset Type</Form.Label>
                               <span className="custom-dropdown">
                               <Form.Control as="select"  onChange={handleAssetsList} onBlur={marineAssetTypeValidation}>
                             
                                   <option> </option>
                                   { 
                                        props.assetslist && 
                                        props.assetslist.length>0 && 
                                        props.assetslist.map((getData, index) =>  
                                        <option 
                                        value={getData.assetTypeCode} 
                                        key={index} 
                                        selected={getData.assetTypeCode === editData.assetType.code}
                                        onBlur={marineAssetTypeValidation}
                                       >
                                            {
                                                getData.assetTypeCode
                                               
                                            }
                                        </option>                                         
                                        
                                    )} 
                                  
                                   
                               </Form.Control>
                               {
                                       errorAssetType ? <h6 style={{color : "red"}}>{errorAssetType}</h6>: null
                                 }
                               </span>
                               </Form.Group>

                              
                           </Form.Row>
                           </Col>
                           
                       </Row>
                       <Row>
                           <Col md={12}>
                           <Form>
                               <Form.Group>
                                   <Form.Label>Asset Name</Form.Label>
                                   <Form.Control 
                                   type="text" 
                                   placeholder="Asset Name"
                                   onChange={handlerAssetName} 
                                   value={assetName ? assetName : editAssetName}
                                   name={assetName}
                                   minlength="1"
                                   maxlength="100" 
                                   onBlur={marineAssetNameValidation}
                                   />
                                   {
                                      errorAssetName ? <Form.Label style={{color : "red"}}>{errorAssetName}</Form.Label>: null
                                   }
                                
                                  
                               </Form.Group>
                               <Form.Group>
                                   <Form.Label>MMSI</Form.Label>
                                   <Form.Control 
                                   type="text" 
                                   placeholder="MMSI"                                    
                                   onChange={handlerMarineMMSINumbetr}
                                   value={marineMMISNumber ? marineMMISNumber : editMMSI}
                                   minlength="1"
                                   maxlength="20" 
                                   onBlur={marineMMSIValidation}
                                   />
                                   {
                                     errorMMSI ? <Form.Label style={{color : "red"}}>{errorMMSI}</Form.Label>: null
                                   }
                                    
                               </Form.Group>
                               <Form.Group>
                                   <Form.Label>IMO Hull Number</Form.Label>
                                   <Form.Control 
                                   type="text" 
                                   placeholder="IMO Hull Number" 
                                   onChange={handlerMarineIMOHullNumbetr}
                                   value={marineMIOHullNumber ? marineMIOHullNumber : editIMO}
                                   minlength="1"
                                   maxlength="20"
                                   onBlur={marineIMOValidation}
                                   />
                                   {
                                      errorIMO ? <Form.Label style={{color : "red"}}>{errorIMO}</Form.Label>: null
                                   }
                               </Form.Group>
                           </Form>
                           </Col>
                           
                       </Row>
                   
                   </div> : null
                       
                }
                {
                        editData && editData.applicationType && editData.applicationType.code === "PowerGen" ?
                       <div className="assets-modal">
                       
                       <Row>
                           <Col md={9}>
                           <Form.Row>
                               <Form.Group as={Col}>
                               <Form.Label className = "formLabel">Application Type</Form.Label>
                               <Form.Control type="text" value="Powergen" disabled>                                  
                                   
                               </Form.Control>
                               </Form.Group>

                               <Form.Group as={Col} className="pl-27">
                               <Form.Label className = "formLabel">Asset Type</Form.Label>
                               <span class="custom-dropdown">
                               <Form.Control as="select" onChange={handleAssetsList} onBlur={pwoerGenAssetTypeValidation}>
                                  
                                   <option> </option>
                                   { 
                                        props.assetslist && 
                                        props.assetslist.length>0 && 
                                        props.assetslist.map((getData, index) =>  
                                        <option 
                                        value={getData.assetTypeCode} 
                                        key={index}
                                        selected={getData.assetTypeCode === editData.assetType.code}
                                        >
                                           {
                                               getData.assetTypeCode
                                               
                                           }
                                       </option>                                   
                                   )} 
                               </Form.Control>
                               {
                                       errorPowerGenAssetType ? <Form.Label style={{color : "red"}}>{errorPowerGenAssetType}</Form.Label>: null
                                 }
                               </span>
                               </Form.Group>

                              
                           </Form.Row>
                           </Col>
                           
                       </Row>
                       <Row>
                           <Col md={12}>
                           <Form>
                               <Form.Group>
                                   <Form.Label className = "formLabel">Asset Name</Form.Label>
                                   <Form.Control 
                                   type="text"                                    
                                   placeholder="Asset Name" 
                                   value={powergenAssetName ? powergenAssetName : editPowerGenAssetName}
                                   name={powergenAssetName}
                                   onChange={handlerPowergenAssetName}
                                   minlength="1"
                                   maxlength="100" 
                                   onBlur={powergenAssetNameValidation}
                                    />
                                    {
                                       errorPowergenAssetName ? <Form.Label style={{color : "red"}}>{errorPowergenAssetName}</Form.Label>: null
                                    }
                               </Form.Group>
                               <Form.Group className="addrWrapper">
                                   <Form.Label className = "formLabel">Address</Form.Label>
                                   <Form.Control 
                                   type="text" 
                                   placeholder="Street" 
                                   value = {powergenStreet ? powergenStreet : editstreet}
                                   onChange={handlerState}
                                   minlength="1"
                                   maxlength="100"
                                   onBlur={streetValidation}
                                    />
                                    {
                                        errorStreet ? <h6 style={{color : "red", fontSize : "12px"}}>{errorStreet}</h6>: null
                                    }
                                   <Form.Control 
                                   type="text" 
                                   placeholder="City" 
                                   value = {powergenCity ? powergenCity : editCity}
                                   onChange={handlerCity}
                                   minlength="1"
                                   maxlength="100" 
                                   onBlur={cityValidation}
                                   />
                                  
                                   {
                                      errorCity ? <h6 style={{color : "red", fontSize : "12px"}}>{errorCity}</h6>: null
                                   }
                                   
                                   <Col md={9} className="pl-0">
                                   <Form.Row>
                                       <Form.Group as={Col}>
                                       <Form.Label></Form.Label>
                                       <Form.Control 
                                       type="text" 
                                       value = {powergenPostalCode ? powergenPostalCode : editPostalCode}
                                       placeholder="Postal code"
                                       onChange={handlePostalCode}
                                       minlength="3"
                                       maxlength="10" 
                                       onBlur={postalValidation}
                                       />
                                       
                                       {
                                          errorPostal ? <h6 style={{color : "red", fontSize : "12px"}}>{errorPostal}</h6>: null
                                       }
                                       </Form.Group>

                                       <Form.Group as={Col}>
                                       <span class="custom-dropdown">
                                       <Form.Control as="select" onChange={handleCountryList}>
                                       
                                           <option>{props.Countries}</option>
                                           { 
                                               props.countries &&
                                               props.countries.length > 0 &&
                                               props.countries.map((getData, index) =>
                                               <option value={getData.lookUpCode} key={index} selected={getData.lookUpName === editData.address[0].country}>
                                                   {
                                                       getData.lookUpName
                                                       
                                                   }
                                               </option>                                    
                                           )} 
                                           
                                       </Form.Control>
                                       {
                                           errorCountry ? <h6 style={{color : "red", fontSize : "12px"}}>{errorCountry}</h6>: null
                                        }
                                       </span>
                                       </Form.Group>

                                   
                                   </Form.Row>
                               </Col>
                               </Form.Group>

                              
                           </Form>
                           </Col>
                           
                       </Row>
                   
                   
                   </div>
                   : null
                }
                {
                     editData && editData.applicationType && editData.applicationType.code == "Rail" ?
                     <div className="assets-modal">
                         <Row>
                            <Col md={9}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                <Form.Label>Application Type</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Rail" 
                                disabled/>
                                </Form.Group>

                                <Form.Group as={Col} className="pl-27">
                                <Form.Label>Asset Type</Form.Label>
                                <span class="custom-dropdown">
                                <Form.Control as="select" onChange={handleAssetsList}  onBlur={railAssetTypeValidation}>                                    
                                    <option> </option>
                                    { 
                                         props.assetslist && 
                                         props.assetslist.length>0 && 
                                         props.assetslist.map((getData, index) =>  
                                         <option 
                                         value={getData.assetTypeCode} 
                                         key={index}
                                         selected={getData.assetTypeCode === editData.assetType.code}>
                                             {
                                                 getData.assetTypeCode
                                                
                                             }
                                         </option>                                   
                                    )} 
                                </Form.Control>
                                {
                                       errorRailAssetType ? <h6 style={{color : "red"}}>{errorRailAssetType}</h6>: null
                                 }
                                </span>
                                </Form.Group>

                               
                            </Form.Row>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col md={12}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Asset Name</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Assets Name" 
                                    value = {railAssetName ? railAssetName : editRailAssetName}
                                    onChange={handlerRailAssetName}
                                    minlength="1"
                                    maxlength="100" 
                                    onBlur={railAssetNameValidation}
                                    />
                                    {
                                       errorRailAssetName ? <Form.Label style={{color : "red"}}>{errorRailAssetName}</Form.Label>: null
                                    }
                                </Form.Group>
                                
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Additional Information</Form.Label>
                                    <Form.Control 
                                    as="textarea" 
                                    rows="7"  
                                    value = {railAdditionalInformation ? railAdditionalInformation : editRailAdditionalInformation}
                                    onChange={handleRailAdditionalInformation}
                                    minlength="1"
                                    maxlength="250" 
                                    // onBlur={changeTo}
                                    />
                                </Form.Group>
                            </Form>
                            </Col>
                            
                        </Row>
                    
                     
                     </div> : null
                     
                }
                
          
                {/* <div className="service-modal">
                    <p>Edit Asset code here</p>
                </div> */}

                {/* start edit for marine */}
            </Modal>
            {/* Add Assets Model */}
            <Modal
                showPopup={show}
                closePopup={handleClose}
                modalTitle="Add Asset"
                size={"lg"}
                hideshowbtn = {showAddBtn}
                modalBtnSave={
                    // showBlock ? "Next" : showAddBtn ? "Add" : null
                    showBlock ? "Next" :  "Add" 
                }
                modalBtnClose="Cancel"

                nextModalPopup={
                    showBlock ? handleNext : handleSaveAssets
                }


            >
                {
                    showBlock ?

                        <div className="assets-modal">
                            <p className="mb-26">Please select the application type.</p>

                            {
                                props.applictionlist &&
                                props.applictionlist.length > 0 &&
                                props.applictionlist.map((getData, index) =>
                                    <Radio
                                        key={index}
                                        name={getData.applicationTypeCode}
                                        code={getData.applicationTypeCode}
                                        radioBtnID={index}
                                        radioBtnValue={handleRadioValue}
                                    />
                                )}
                        </div>
                        : null
                }
                {/* Start Marine Block */}
                {
                    showMarine === true?

                    <div className="assets-modal">
                       
                        {/* <p>Add Marine.</p>
                        <br /> */}
                        <Row>
                            <Col md={9}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                  
                                <Form.Label>Application Type</Form.Label>
                                <Form.Control type="text" value="Marine" disabled/>
                                </Form.Group>

                                <Form.Group as={Col} className="pl-27">
                                <Form.Label>Asset Type</Form.Label>
                                <span className="custom-dropdown">
                                <Form.Control as="select" 
                                // onChange={handleAssetsList} 
                                name = "assettype"
                                onChange= {(e)=>{props.addAssetFildValue(e.target.value, e.target.name)}}
                                onBlur={marineAssetTypeValidation}>
                              
                                    <option> </option>
                                    { 
                                         props.assetslist && 
                                         props.assetslist.length>0 && 
                                         props.assetslist.map((getData, index) =>  
                                         <option value={getData.assetTypeCode} key={index}>
                                             {
                                                 getData.assetTypeCode
                                                
                                             }
                                         </option>                                         
                                         
                                     )} 
                                   
                                    
                                </Form.Control>
                                {
                                       errorAssetType ? <Form.Label style={{color : "red"}}>{errorAssetType}</Form.Label>: null
                                 }
                                </span>
                                </Form.Group>

                               
                            </Form.Row>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col md={12}>
                            <Form>
                                <Form.Group>
                                
                                    <Form.Label>Asset Name</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Asset Name" 
                                    // onChange={handlerAssetName}
                                    name="assetname"
                                    value={props.textFildValue.assetName}
                                    onChange = {(e)=>{props.addAssetFildValue(e.target.value, e.target.name)}}
                                   
                                    minlength="1"
                                    maxlength="100" 
                                    onBlur={marineAssetNameValidation}
                                    />
                                    {
                                       errorAssetName ? <Form.Label style={{color : "red"}}>{errorAssetName}</Form.Label>: null
                                    }
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>MMSI</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="MMSI"                                    
                                    // onChange={handlerMarineMMSINumbetr}
                                    value={props.textFildValue.mmsi}
                                    name="mmsi"
                                    onChange = {(e)=>{props.addAssetFildValue(e.target.value, e.target.name)}}
                                    minlength="1"
                                    maxlength="20" 
                                    onBlur={marineMMSIValidation}
                                     />
                                     {
                                       errorMMSI ? <Form.Label style={{color : "red"}}>{errorMMSI}</Form.Label>: null
                                     }
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>IMO Hull Number</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="IMO Hull Number" 
                                    // onChange={handlerMarineIMOHullNumbetr}
                                    value={props.textFildValue.imo}
                                    name="imo"
                                    onChange = {(e)=>{props.addAssetFildValue(e.target.value, e.target.name)}}
                                    minlength="1"
                                    maxlength="20"
                                    onBlur={marineIMOValidation}
                                    />
                                    {
                                       errorIMO ? <Form.Label style={{color : "red"}}>{errorIMO}</Form.Label>: null
                                    }
                                </Form.Group>
                            </Form>
                            </Col>
                            
                        </Row>
                    
                    </div>
                   :null
                }
                {/* End Marine Block */}
               
                {/* Start Powergen Block */}
                {
                    showPowergen === true ?
                    <div className="assets-modal">
                        {/* <p>Add Powergen.</p> */}
                        <Row>
                            <Col md={9}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                <Form.Label className = "formLabel">Application Type</Form.Label>
                                <Form.Control type="text" value="Powergen" disabled>                                  
                                    
                                </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} className="pl-27">
                                <Form.Label className = "formLabel">Asset Type</Form.Label>
                                <span class="custom-dropdown">
                                <Form.Control as="select" onChange={handleAssetsList} onBlur={pwoerGenAssetTypeValidation}>
                               
                                    <option> </option>
                                    { 
                                         props.assetslist && 
                                         props.assetslist.length>0 && 
                                         props.assetslist.map((getData, index) =>  
                                         <option value={getData.assetTypeCode} key={index}>
                                            {
                                                getData.assetTypeCode
                                                
                                            }
                                        </option>                                   
                                    )} 
                                </Form.Control>
                                {
                                       errorPowerGenAssetType ? <Form.Label style={{color : "red"}}>{errorPowerGenAssetType}</Form.Label>: null
                                 }
                                </span>
                                </Form.Group>

                               
                            </Form.Row>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col md={12}>
                            <Form>
                                <Form.Group>
                                    <Form.Label className = "formLabel">Asset Name</Form.Label>
                                    <Form.Control 
                                    type="text"                                    
                                    placeholder="Asset Name" 
                                    onChange={handlerPowergenAssetName}
                                    minlength="1"
                                    maxlength="100" 
                                    onBlur={powergenAssetNameValidation}
                                    />
                                    {
                                       errorPowergenAssetName ? <Form.Label style={{color : "red"}}>{errorPowergenAssetName}</Form.Label>: null
                                    }
                                </Form.Group>
                                <Form.Group className="addrWrapper">
                                    <Form.Label className = "formLabel">Address</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Street" 
                                    onChange={handlerState}
                                    minlength="1"
                                    maxlength="100"
                                    onBlur={streetValidation}
                                    />
                                    {
                                        errorStreet ? <h6 style={{color : "red", fontSize : "12px"}}>{errorStreet}</h6>: null
                                    }
                                   
                                    <Form.Control 
                                    type="text" 
                                    placeholder="City" 
                                    onChange={handlerCity}
                                    minlength="1"
                                    maxlength="100" 
                                    onBlur={cityValidation}
                                    />
                                   
                                    {
                                       errorCity ? <h6 style={{color : "red", fontSize : "12px"}}>{errorCity}</h6>: null
                                    }
                                    
                                    
                                    <Col md={9} className="pl-0">
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                        <Form.Label></Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Postal code"
                                        onChange={handlePostalCode}
                                        minlength="3"
                                        maxlength="10" 
                                        onBlur={postalValidation}
                                        />
                                        
                                        {
                                           errorPostal ? <h6 style={{color : "red", fontSize : "12px"}}>{errorPostal}</h6>: null
                                        }
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                        <span class="custom-dropdown">
                                        <Form.Control as="select" onChange={handleCountryList}  onBlur={countryValidation}>
                                        
                                            <option>{props.Countries}</option>
                                            { 
                                                props.countries &&
                                                props.countries.length > 0 &&
                                                props.countries.map((getData, index) =>
                                                <option value={getData.lookUpCode} key={index}>
                                                    {
                                                        getData.lookUpName
                                                        
                                                    }
                                                </option>                                    
                                            )} 
                                            
                                        </Form.Control>
                                        {
                                           errorCountry ? <h6 style={{color : "red", fontSize : "12px"}}>{errorCountry}</h6>: null
                                        }
                                        </span>
                                        </Form.Group>

                                    
                                    </Form.Row>
                                </Col>
                                </Form.Group>

                               
                            </Form>
                            </Col>
                            
                        </Row>
                    
                    
                    </div>
                    : null
                }
                {/* End Powergen Block */}

                {/* Start Rail Block */}
                {
                     showRail === true ?
                     <div className="assets-modal">
                         <Row>
                            <Col md={9}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                <Form.Label>Application Type</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Rail" 
                                disabled/>
                                </Form.Group>

                                <Form.Group as={Col} className="pl-27">
                                <Form.Label>Asset Type</Form.Label>
                                <span class="custom-dropdown">
                                <Form.Control as="select" onChange={handleAssetsList}  onBlur={railAssetTypeValidation}>                                    
                                    <option> </option>
                                    { 
                                         props.assetslist && 
                                         props.assetslist.length>0 && 
                                         props.assetslist.map((getData, index) =>  
                                         <option 
                                         value={getData.assetTypeCode} 
                                         key={index}>
                                             {
                                                 getData.assetTypeCode
                                                
                                             }
                                         </option>                                   
                                    )} 
                                </Form.Control>
                                {
                                       errorRailAssetType ? <Form.Label style={{color : "red"}}>{errorRailAssetType}</Form.Label>: null
                                 }
                                </span>
                                </Form.Group>

                               
                            </Form.Row>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col md={12}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Asset Name</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Assets Name" 
                                    onChange={handlerRailAssetName}
                                    minlength="1"
                                    maxlength="100" 
                                    onBlur={railAssetNameValidation}
                                    />
                                    {
                                       errorRailAssetName ? <Form.Label style={{color : "red"}}>{errorRailAssetName}</Form.Label>: null
                                    }
                                </Form.Group>
                                
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Additional Information</Form.Label>
                                    <Form.Control 
                                    as="textarea" 
                                    rows="7" 
                                    onChange={handleRailAdditionalInformation}
                                    minlength="1"
                                    maxlength="250" 
                                    // onBlur={changeTo}
                                    />
                                </Form.Group>
                            </Form>
                            </Col>
                            
                        </Row>
                    
                     
                     </div>
                    : null
                }
                {/* End Rail Block */}

            </Modal>
        </div >
    )
}
