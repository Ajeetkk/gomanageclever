import React from 'react'
import EngineView from './engine.view';
import EngineService from '../service/engineservice';
import AssetsService from '../service/assetsservice';


class EngineComponent extends React.Component {

    constructor(props) {
        super(props);
        this.engineService = new EngineService(props.Url);
        this.assetsService = new AssetsService(props.Url);
        this.state = {
            Header: this.prepareHeader(),
            Body: [],
            assetList: [],
            selectedAsset: undefined,
            selectedEngine: undefined,
            Search: '',
            IsAssinged: false,
            isAssingClicked: false,
            PageSize: 10,
            Page: 1,
            Sort: '+SerialNumber',
            Show: false,
        }
        this.defaultSortFieldOrder = '+';
        this.otherSortFieldOrder = '';
        this.loadEngines();
    }

    loadEngines() {
        const config = {
            pagesize: this.state.PageSize,
            pageindex: this.state.Page,
            search: this.state.Search,
            sort: this.state.Sort,
            isAssinged: this.state.IsAssinged,
        }
        this.engineService.getUnassignEnginList(config).then(data => {
            const engineData = data.items;
            console.log('E', engineData);
             let lstFilterData = engineData.filter(x => x.assignedStatus === "UnAssigned");
            const body = this.prepreActiveBody(lstFilterData);
            this.setState({ "Body": body });
        });
    }

    SearchEngine = (data) => {
        this.setState({ "Search": data, "Page": 1 }, () => {
            this.loadEngines();
        });
    }

    SortEngine = (header, colNumber) => {
        switch (header[colNumber].Text) {
            case 'Serial number':
                this.applySortingOn('SerialNumber', colNumber, this.defaultSortFieldOrder = this.defaultSortFieldOrder === '+' ? '-' : '+');
                break;
            case 'Engine name':
                this.applySortingOn('name', colNumber, this.otherSortFieldOrder = this.otherSortFieldOrder === '+' ? '-' : '+');
                break;
            case 'Model number':
                this.applySortingOn('ModelNumber', colNumber, this.otherSortFieldOrder = this.otherSortFieldOrder === '+' ? '-' : '+');
                break;
            default:
                break;
        }
    }

    applySortingOn = (colName, colNum, order) => {
        if (colName === 'SerialNumber') {
            this.state.Header[1].ClassName = 'sort-order';
            this.state.Header[2].ClassName = 'sort-order';
            this.state.Header[colNum].ClassName = order === '+' ? 'sort-asc-order' : 'sort-dec-order';
            this.setState({ 'Sort': order + colName, 'Header': this.state.Header }, () => {
                this.loadEngines();
            });
        } else {
            this.state.Header[0].ClassName = 'sort-asc-order';
            this.state.Header[1].ClassName = 'sort-order';
            this.state.Header[2].ClassName = 'sort-order';
            this.state.Header[colNum].ClassName = order === '+' ? 'sort-asc-order' : 'sort-dec-order';
            this.setState({ 'Sort': order + colName + ',-SerialNumber', 'Header': this.state.Header }, () => {
                this.loadEngines();
            });
        }
    }

    prepareHeader() {
        return [{ 'Text': 'Serial number', 'IsDefault': true, 'IsSort': true, 'Type': 'Text', 'SortText': 'SerialNumber', 'ClassName': 'sort-asc-order' },
        { 'Text': 'Engine name', 'IsDefault': false, 'IsSort': true, 'Type': 'Text', 'SortText': 'AssetName', 'ClassName': 'sort-order' },
        { 'Text': 'Model number', 'IsDefault': false, 'IsSort': true, 'Type': 'Text', 'SortText': 'ModelNumber', 'ClassName': 'sort-order' },
        { 'Text': 'Operating hours', 'IsDefault': false, 'IsSort': false, 'Type': 'Text' },
        { 'Text': 'Connectivity', 'IsDefault': false, 'IsSort': false, 'Type': 'Text' },
        { 'Text': 'Action', 'IsDefault': false, 'IsSort': false, 'Type': 'Text' }];
    }

    prepreActiveBody(engineData) {
        const lstBody = [];
        var connectivityStatus = <span className="connected">Connected</span>;
        var unconnectivityStatus = <span className="unconnected">Unconnected</span>;
        let i = 0;
        engineData.forEach(e => {
            lstBody.push({
                "body":
                    [{ "Text": e.serialNumber, "Type": "Label" },
                    { "Text": e.deviceName, "Type": "Label" },
                    { "Text": e.modelNumber, "Type": "Label" },
                    { "Text": '1,234 hrs', "Type": "Label" },
                    { "Text": i % 2 === 0 ? connectivityStatus : unconnectivityStatus, "Type": "html" },
                    { "Text": e.isActive, "Type": "Link" },
                    { "Text": { "Action": ["editIcon", "assignTextIcon"], "Object": e }, "Type": "Icon" }]
            });
            i++;
        });
        return lstBody;
    }

    actionButton = (actionType, actionData) => {
        switch (actionType) {
            case 'assignTextIcon':
                // TODO: Need remove harcoded company id once will get it from API
                const companyId = 1446;
                this.engineService.getAssetList(companyId).then(data => {
                    this.setState({ assetList: data.items, isAssingClicked: !this.state.isAssingClicked, selectedEngine: actionData.deviceId });
                });
                break;
            default:

                break;
        }
    }

    onAssignClick = () => {
        this.setState({ isAssingClicked: !this.state.isAssingClicked, selectedAsset: undefined });
    }

    assingEngine = () => {
        if (this.state.selectedAsset) {
            const inputData = {
                "deviceIds": [
                    this.state.selectedEngine
                ]
            }

            const selectedAsset = this.state.selectedAsset;
            this.engineService.assignEngine(inputData, 1446, selectedAsset[0].id).then(data => {
                if (data.items === '200') {
                    let res = data.data.packet.body;
                    if (res.errors.length === 0) {
                        this.loadEngines();
                    } else {
                        // need to show the error message 
                    }
                } else {
                    // show error message in toaster
                }
            });
        }
        this.onAssignClick();
    }

    selectedAsset = (data) => {
        this.setState({ selectedAsset: data });
    }

    render() {
        return (
            <div>
                <EngineView header={this.state.Header} body={this.state.Body} search={this.SearchEngine} Sort={this.SortEngine} assetList={this.state.assetList} Show={this.state.Show} ActionButton={this.actionButton} isAssingClicked={this.state.isAssingClicked} assingClicked={this.onAssignClick} assingEngine={this.assingEngine} selectedAsset={this.selectedAsset} />
            </div>
        )
    }
}

export default EngineComponent;
