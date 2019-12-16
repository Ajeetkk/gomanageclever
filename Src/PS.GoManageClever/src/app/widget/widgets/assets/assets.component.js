import React from 'react'
import AssetsView from './assets.view';
import AssetsService from '../service/assetsservice';
import { toast } from 'react-toastify';

class AssetsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.Url = props.Url;
        this.assetsService = new AssetsService(this.Url);
        this.state = {
            Header: [],
            Body: [],
            Search: '',
            IsDeleted: false,
            PageSize: 10,
            Page: 1,
            Sort: '+Name',
            IsEngineGridDisplayed: false,
            AssetEnginesHeader: [],
            AssetEnginesBody: [],
            SelectedAssetId: '',
            IsDeleteClicked: false,
            AssetName: '',
            IsEditClicked: false,
            AssetList: [],
            CountryList: [],
            AssetsList: [],
            ApplicationList: [],
            getEditRowData:'',
            assetname:'',
            mmsi:'',
            imo:'',
            assettype:'',
            

        }
        this.AssetNameSort = 'sort-asc-order';
        this.ApplicationSort = '';
        this.InformationSort = '';
        this.PageConfig = {
            PageCount: 0,
            PageSize: 0,
            CurrentPageNumber: 1
        };
        this.addAssets = this.addAssets.bind(this);
        this.updateAssets = this.updateAssets.bind(this);

        this.assetsHeader = [];
        this.isSortClicked = false;
        this.loadAssets = this.loadAssets.bind(this);
    }

    componentDidMount() {
        this.loadAssets(this.state.Page);
    }
    
    actionButton = (actionType, data) => {
        switch (actionType) {
            case 'deleteIcon':
                this.SetDeletePopup();
                this.setState({ "AssetName": data.name, "SelectedAssetId": data.id });
                break;
            case 'editIcon':                
                this.setState({ "getEditRowData": data });
                if(data.applicationType.code){ 
                    this.getApplicationType(data.applicationType.code);
                    this.SetEditPopup();
                } 
                break;
            default:
                break;
        }
    }

    setAssettype(assets){ 
        if(assets){
            let assetType = this.state.ApplicationList.find(v => v.applicationTypeCode === assets).assetTypes;             
            this.setState({AssetsList:assetType})
            if(assets === "PowerGen"){
                this.getCountries();
            }
        }
                
    }

    getCountries() {
        this.assetsService.getCountries(this.props.Url).then(data => {
            let listCountries = data.lookUpData
            this.setState({ CountryList: listCountries })
        })
    }

    isApplicationType(application){
        if(application === true){
           this.getApplicationType();
        }else{
            //nothing
        }
    }
    getApplicationType(applicationdata){
        this.assetsService.getApplicationType(this.props.Url).then(data => {             
            let listApplication = data
            this.setState({ApplicationList:listApplication})
            this.setAssettype(applicationdata);
        })
    }
    

    addAssets(applicationTypeRadioValue) {
        const applicationTypeRValue = applicationTypeRadioValue;
        console.log("application type = ", applicationTypeRValue);
       
        if(applicationTypeRValue === "Marine"){ 
           
            // if(assetsList==""){               
            //     setErrorAssetType("Please select asset type");   
            // }else if(!assetName.match(/^[a-zA-Z0-9-\s]+$/i) || assetName==""){               
            //     setErrorMarineAssetName("Valid asset name is required");   
            // }else if(!marineMMISNumber.match(/^[a-zA-Z0-9-\s]+$/i) || marineMMISNumber==""){
            //     setErrorMMSI("Valid mmis number is required");
            // }else if(!marineMIOHullNumber.match(/^[a-zA-Z0-9-\s]+$/i) || marineMIOHullNumber==""){
            //     setErrorIMO("Valid mio number is required");
            // }else{
                
            //     setErrorAssetType('');
            //     setErrorMarineAssetName('');
            //     setErrorIMO('');
            //     setErrorMMSI('');
                
                const  assetDTO = {
                    "name": this.state.assetname,
                    "applicationType": applicationTypeRValue,
                    "assettype": this.state.assettype,
                    "extendedProperties": {
                      "MMSINumber": this.state.mmsi,
                      "IMOHullNumber": this.state.imo
                    },
                    "companyId": 1446, 
                    "assignedCompanies": [],
                    "assetAddresses": []
                }
                this.assetsService.addAssets(assetDTO).then(data => {
                    toast.success('Asset added sucessfully', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    this.loadAssets(this.state.Page);
                })
    
                    // props.addAssets(assetDTO);
                    // ShowPopup(false);
            // } 
        }else if(applicationTypeRValue === "PowerGen"){    
            
            // if(assetsList==""){               
            //     setErrorPowerGenAssetType("Please select asset type");   
            // }else if(!powergenAssetName.match(/^[a-zA-Z0-9-\s]+$/i) || powergenAssetName==""){               
            //     setErrorPowergenAssetName("Valid asset name is required");   
            // }else if(!powergenStreet.match(/^[a-zA-Z0-9-\s]+$/i) || powergenStreet==""){
            //     setErrorStreet("Valid street is required");
            // }else if(!powergenCity.match(/^[a-zA-Z0-9-\s]+$/i) || powergenCity==""){
            //     setErrorCity("Valid city is required");
            // }else if(!powergenPostalCode.match(/^[a-zA-Z0-9-\s]+$/i) || powergenPostalCode==""){
            //     setErrorPostal("Valid postal code is required");
            // }else if(powergenCountry==""){               
            //     setErrorCountry("Please select country");   
            // }else{
            //     setErrorPowergenAssetName('');
            //     setErrorCity('');
            //     setErrorStreet('');
            //     setErrorPowerGenAssetType('');
            //     setErrorCountry('');
            
            // const  assetDTO =  { 
            //     "name": powergenAssetName,
            //     "applicationType": applicationTypeRValue,
            //     "assettype": assetsList,
            //     "extendedProperties": {},
            //     "companyId": 1446,
            //     "assignedCompanies": [],
            //     "assetAddresses": [
            //       {
            //         "addressLine1": powergenStreet,
            //         "addressLine2": "",
            //         "addressLine3": "",
            //         "addressLine4": "",
            //         "houseNumber": "",
            //         "city": powergenCity,
            //         "CountryCode": powergenCountry,
            //         "postalCode": powergenPostalCode
            //       }
            //     ]
            // } 
        //     props.addAssets(assetDTO);
        //     ShowPopup(false);
        // }
        }else if(applicationTypeRValue === "Rail"){       
            
            // if(assetsList==""){               
            //     setErrorRailAssetType("Please select asset type");   
            // }else if(!railAssetName.match(/^[a-zA-Z0-9-\s]+$/i) || railAssetName==""){               
            //     setErrorRailAssetName("Valid asset name is required");   
            // }else{
            //     setErrorRailAssetName('');
            //     setErrorRailAssetType('');
            // const  assetDTO ={
            //    "name": railAssetName,
            //    "applicationType": applicationTypeRValue,
            //     "assettype": assetsList,
            //       "extendedProperties": {
            //       "AdditionalInformation": railAdditionalInformation
            //     },
            //     "companyId": 1446, 
            //     "assignedCompanies": [],
            //     "assetAddresses": []
            //   }   
            // props.addAssets(assetDTO);
            // ShowPopup(false);
            // }
        }else {
            //---
        }
   
        // this.assetsService.addAssets(marineData).then(data => {
        //     toast.success('Asset added sucessfully', {
        //         position: "top-right",
        //         autoClose: 3000,
        //         hideProgressBar: true,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //     });
        //     this.loadAssets(this.state.Page);
        // })
    }
    updateAssets(marineeditformdata) {
        const marineeditData = marineeditformdata;
        this.assetsService.updateAssets(marineeditData).then(data => {
            toast.success('Asset updated sucessfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            this.loadAssets(this.state.Page);
        })
    }

    loadAssets(page) {
        const config = {
            pagesize: this.state.PageSize,
            pageindex: page,
            search: this.state.Search,
            sort: this.state.Sort,
            isDeleted: this.state.IsDeleted
        }
        this.assetsService.getAssets(config).then(data => {
            this.setState({ "AssetList": data.items });
            this.PageConfig.PageCount = data.count;
            this.PageConfig.PageSize = this.state.PageSize;
            let header = this.isSortClicked ? this.assetsHeader : this.prepareAssetsHeader();
            this.setState({ "Header": header });
            let body = this.prepareAssetsBody(this.state.AssetList);
            this.setState({ "Body": body });
            let assetEnginesHeader = this.prepareAssetEnginesHeader();
            this.setState({ "AssetEnginesHeader": assetEnginesHeader });
            let assetEngineBody = this.prepareAssetEnginesBody(this.state.AssetList);
            this.setState({ "AssetEnginesBody": assetEngineBody });
        });
    }

    prepareAssetsHeader() {
        // Prepare Head
        let lstHead = [];
        lstHead.push({ "Text": "Asset Name", "IsDefault": true, "IsSort": true, "Type": "Text", "ClassName": 'sort-asc-order' });
        lstHead.push({ "Text": "Application", "IsDefault": false, "IsSort": true, "Type": "Text", "ClassName": 'sort-order' });
        lstHead.push({ "Text": "Information", "IsDefault": false, "IsSort": false, "Type": "Text", "ClassName": '' });
        lstHead.push({ "Text": "Engines", "IsDefault": false, "IsSort": false, "Type": "Text", "ClassName": '' });
        lstHead.push({ "Text": "Action", "IsDefault": false, "IsSort": false, "Type": "Text", "ClassName": '' });
        return lstHead;
    }

    prepareAssetsBody(assetList) {
        let lstBody = [];
        assetList.forEach(e => {
            let information = "";
            if (e.applicationType.code === 'Marine') {
                information = [<p> MMSI: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{e.extendedAttributes ? e.extendedAttributes.MMSINumber : ''}</span></p>, <p>IMO Hull:&nbsp;&nbsp;<span>{e.extendedAttributes ? e.extendedAttributes.IMOHullNumber : ''}</span></p>];
            }
            if (e.applicationType.code === 'Rail' || e.applicationType.code === 'Generic') {
                information = [<p>{(e.extendedAttributes && e.extendedAttributes.additionalInformation) ? e.extendedAttributes.additionalInformation : 'No Information available'}</p>];
            }
            if (e.applicationType.code === 'PowerGen') {
                information = [<p>{e.address[0].addressLine1},  {e.address[0].city}, {e.address[0].postalCode}, {e.address[0].country}</p>];
            }
            lstBody.push({ "body": [{ "Text": e.name, "Type": "Label" }, { "Text": e.applicationType ? e.applicationType.code : "", "Type": "Label" }, { "Text": information, "Type": "html" }, { "Text": e.engineCount, "Type": "Label" }, { "Text": { "Action": ["editIcon", "deleteIcon"], "Object": e }, "Type": "Icon" }], "ClassName": '' });
        });
        return lstBody;
    }

    prepareAssetEnginesHeader() {
        let lstHead = [];
        lstHead.push({ "Text": "Asset Name", "IsDefault": true, "IsSort": false, "Type": "Text" });
        lstHead.push({ "Text": "Engines", "IsDefault": false, "IsSort": false, "Type": "Text" });
        return lstHead;
    }

    prepareAssetEnginesBody(assetList) {
        let lstBody = [];
        assetList.forEach(e => {
            lstBody.push({ "body": [{ "Text": e.name, "Type": "Label" }, { "Text": e.engineCount, "Type": "Label" }], "ClassName": '' });
        });
        return lstBody;
    }

    SelectedRow = (rowIndex, colIndex) => {
        if (colIndex != 4) {
            let asset = this.state.AssetList[rowIndex];
            this.ShowEngines(true);
            this.setState({ "SelectedAssetId": asset.id, "AssetName": asset.name });
        }
        this.state.AssetEnginesBody.forEach((data, i) => {
            data.ClassName = (i === rowIndex) ? 'selectedRow' : '';
        });
        this.state.AssetEnginesBody[rowIndex].ClassName = 'selectedRow';
        this.setState({ "AssetEnginesBody": this.state.AssetEnginesBody });
    }

    SetDeletePopup = () => {
        this.setState({ "IsDeleteClicked": !this.state.IsDeleteClicked, "AssetName": '' });
    }

    DeleteAsset = () => {
        this.SetDeletePopup();
        this.assetsService.deleteAsset(this.state.SelectedAssetId).then(data => {
            this.loadAssets(this.state.Page);
            toast.success('Deleted sucessfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    }

    SetEditPopup = () => {
        this.setState({ "IsEditClicked": !this.state.IsEditClicked });
    }

    EditAsset = () => {
        this.SetEditPopup();
    }

    SearchAssets = (data) => {
        if (!this.state.IsEngineGridDisplayed) {
            this.state.Search = data;
            this.setState({ "Search": this.state.Search, "Page": 1 });
            this.loadAssets(this.state.Page);
        }
    }

    sortAssets = (th, i) => {
        if (th[i].IsSort) {
            this.isSortClicked = true;
            if (i === 0) { // 0 is column index of Asset name
                this.AssetNameSort = this.AssetNameSort === 'sort-asc-order' ? 'sort-dec-order' : 'sort-asc-order';
                this.state.Sort = (this.AssetNameSort === 'sort-asc-order' ? '+' : '-') + 'Name';
                this.setState({ "Sort": this.state.Sort });
            } else {
                if (i === 1) { // 1 is column index of Application
                    this.ApplicationSort = this.ApplicationSort === 'sort-asc-order' ? 'sort-dec-order' : 'sort-asc-order';
                    this.state.Sort = (this.ApplicationSort === 'sort-asc-order' ? '+' : '-') + 'ApplicationType' + ',+Name';
                    this.setState({ "Sort": this.state.Sort });
                }
                else if (i === 2) { //2 is column index of information
                    this.InformationSort = this.InformationSort === 'sort-asc-order' ? 'sort-dec-order' : 'sort-asc-order';
                    this.state.Sort = (this.InformationSort === 'sort-asc-order' ? '+' : '-') + 'Information' + ',+Name';
                    this.setState({ "Sort": this.state.Sort });
                }
            }
            this.loadAssets(this.state.Page);
            th.forEach(a => {
                if (a.IsSort) {
                    a.Text === "Asset Name" ? a.ClassName = 'sort-asc-order' : a.ClassName = 'sort-order';
                }
            });

            i === 0 ? this.state.Header[i].ClassName = this.AssetNameSort :
                this.state.Header[i].ClassName = (i === 1 ? this.ApplicationSort : this.InformationSort);
            this.assetsHeader = this.state.Header;
        }
    }

    ShowEngines = (isShowEngines) => {
        this.setState({ "IsEngineGridDisplayed": isShowEngines });
    }

    ChangePage = (number) => {
        this.state.Page = number;
        this.setState({ "Page": this.state.Page });
        this.loadAssets(this.state.Page);
    };
    // get fieldValue
    fieldValue(fildValue, fieldname){
        // let fildValueMarineAssetName = fildValue;
        // let field_name = fieldname;
        this.setState({
            [fieldname]: fildValue
        },()=>{
            console.log(this.state.assetname);
            console.log(this.state.mmsi);
            console.log(this.state.imo);
            console.log(this.state.assettype);
        })
    //    this.setState({...this.state.name, [fieldname]: fildValue}, ()=>{
    //        console.log(this.state.name);
    //    })
    //    this.setState({name: fildValue}, ()=>{
    //     console.log("name = ",this.state.name);
    // })
    //     console.log("fildvalue as props getting =  ",fildValueMarineAssetName, field_name);
    }

    render() {

        let addAssetFielData = {
            assetName:this.state.assetname,
            mmsi:this.state.mmsi,
            imo:this.state.imo,
            assettype:this.state.assettype
        }

        return (
            <div>
                <AssetsView url={this.props.Url} header={this.state.Header} body={this.state.Body} search={this.SearchAssets} ActionButton={this.actionButton} showEngines={this.ShowEngines} isEngineGridDisplayed={this.state.IsEngineGridDisplayed}
                    assetEnginesHeader={this.state.AssetEnginesHeader} assetEnginesBody={this.state.AssetEnginesBody} enginesForAssetId={this.state.SelectedAssetId} selectedAssetname={this.state.AssetName} isDeleteClicked={this.state.IsDeleteClicked}
                    setDeletePopup={this.SetDeletePopup} deleteAsset={this.DeleteAsset} Sort={this.sortAssets} PageConfig={this.PageConfig} ChangePage={this.ChangePage}
                    isEditClicked={this.state.IsEditClicked} setEditPopUp={this.SetEditPopup} editAsset={this.editAsset} SelectedRow={this.SelectedRow}
                    countries = {this.state.CountryList}
                    setAssettype = {this.setAssettype.bind(this)}
                    assetslist = {this.state.AssetsList}
                    applictionlist = {this.state.ApplicationList}
                    isApplicationType = {this.isApplicationType.bind(this)}
                    addAssets = {this.addAssets}
                    updateAssets = {this.updateAssets}
                    reloadAssets={this.loadAssets} 
                    passEditRowData={this.state.getEditRowData}
                    addAssetFildValue = {this.fieldValue.bind(this)}
                    textFildValue ={addAssetFielData}
                    

                />
            </div>
        )
    }
}

export default AssetsComponent;
