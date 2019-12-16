import React, { Component } from 'react';
import DefaultServicePartnerView from './default-servicepartner.view';
import ServicePartnerService from '../../service/servicepartnerservice';
class DefaultServicePartnerComponent extends Component {
    constructor(props) {
        super(props);
        this.servicepartnerservice = new ServicePartnerService(props.Url);
        this.state = {
            CompanyName: '',
            CompanyAdress: '',
            CompanyCity: '',
            Postalcode: '',
            CompanyCountry: '',
            CompanyContact: '+49 75419077777',
            LstServicePartners: [],
            ParentCompanyId: 1446,
            SelectedServicePartner: '',
            ShowChangePopup: false,
            CurrentServicePartner:[]
        }
        this.loadDefaultServicePartner();
        this.loadServicePartners();
        this.changeDefaultServicePartner = this.changeDefaultServicePartner.bind(this);
        this.openChangePopup = this.openChangePopup.bind(this);
        this.closeChangePopup = this.closeChangePopup.bind(this);
    }

    loadDefaultServicePartner() {
        this.servicepartnerservice.getDefaultServicePartnerDetails(this.state.ParentCompanyId).then(data => {
            let defaultservicepartner = data;
            this.setState({ CompanyName: defaultservicepartner.servicePartner.name });
            this.setState({
                CompanyAdress: defaultservicepartner.servicePartner.address[0].addressLine1 +
                    defaultservicepartner.servicePartner.address[0].addressLine2 + ','
            });
            this.setState({ CompanyCity: defaultservicepartner.servicePartner.address[0].city });
            this.setState({ CompanyCountry: defaultservicepartner.servicePartner.address[0].country });
            this.setState({ Postalcode: defaultservicepartner.servicePartner.address[0].postalCode });
        });
    }
    loadServicePartners() {
        this.servicepartnerservice.getServicePartners().then(data => {
            let servicePartner= [];
            let servicepartnerlist = data.items;
            let listofservicepartners = this.prepareListOfServicePartner(servicepartnerlist)
            this.setState({ LstServicePartners: listofservicepartners });            
            servicePartner.push(listofservicepartners.find(e => e.Name == this.state.CompanyName));
            this.setState({CurrentServicePartner: servicePartner});
        });
    }
    prepareListOfServicePartner(servicepartners) {
        let lstservpartner = [];
        servicepartners.forEach(a => { lstservpartner.push({ 'Name': a.name, 'id': a.id }) });
        return lstservpartner;
    }
    handleChange = (selectedoption) => { 
        let newDefaultServicePartner = selectedoption.length > 0 ? selectedoption[0].id:null;       
        this.setState({ SelectedServicePartner: newDefaultServicePartner })
    }
    openChangePopup() {
        this.setState({ ShowChangePopup: true });
    }
    closeChangePopup() {
        this.setState({ ShowChangePopup: false });
    }

    changeDefaultServicePartner() {
        this.servicepartnerservice.changeDefaultServicePartner(this.state.ParentCompanyId, this.state.SelectedServicePartner).then(data => {
            let newServicePartnerObject = this.state.LstServicePartners.find(e => e.id == this.state.SelectedServicePartner);
            this.setState({CurrentServicePartner:[]});
            this.state.CurrentServicePartner.push(newServicePartnerObject);
            this.setState({ShowChangePopup:false});
            this.setState({SelectedServicePartner:''});
            this.loadDefaultServicePartner();
        })
    }
    render() {
        return (
            <DefaultServicePartnerView Name={this.state.CompanyName} Address={this.state.CompanyAdress} City={this.state.CompanyCity} Country={this.state.CompanyCountry} PostalCode={this.state.Postalcode} Contact={this.state.CompanyContact} ServicePartnersList={this.state.LstServicePartners} onChange={this.handleChange} ChangeServicePartner={this.changeDefaultServicePartner} ShowChangePopup={this.state.ShowChangePopup} openChangePopup= {this.openChangePopup} closeChangePopup={this.closeChangePopup} CurrentServicePartner ={this.state.CurrentServicePartner} />
        );
    }
}

export default DefaultServicePartnerComponent;    