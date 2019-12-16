import React from 'react'
import { User, Assets, ServicePartner, DefaultServicePartner, AssignmentServicePartner, Engines } from '../widget/widgets/constant';
export default function Widgets(props) {

    const userWidget = () => {
        return (<React.Fragment> <User {...props} /> </React.Fragment>)
    }

    const assetWidget = () => {
        return (<React.Fragment><Assets {...props} /></React.Fragment>)
    }
    const servicePartnerWidget = () => {
        return (<React.Fragment><ServicePartner {...props} /></React.Fragment>)
    }
    const defaultServicePartnerWidget = () => {
        return (<React.Fragment><DefaultServicePartner {...props} /></React.Fragment>)
    }
    const assignmentServicePartnerWidget = () => {
        return (<React.Fragment><AssignmentServicePartner {...props} /></React.Fragment>)
    }
    const enginesWidget = () => {
        return (<React.Fragment><Engines {...props} /></React.Fragment>)
    }

    const WidgetView = () => {
        switch (props.Name) {
            case "User":
                return (<React.Fragment> {userWidget()} </React.Fragment>)
            case "Assets":
                return (<React.Fragment> {assetWidget()} </React.Fragment>)
            case "ServicePartner":
                return (<React.Fragment> {servicePartnerWidget()} </React.Fragment>)
            case "DefaultServicePartner":
                return (<React.Fragment> {defaultServicePartnerWidget()} </React.Fragment>)
            case "AssignmentServicePartner":
                return (<React.Fragment> {assignmentServicePartnerWidget()} </React.Fragment>)
            case "Engines":
                return (<React.Fragment> {enginesWidget()} </React.Fragment>)
            default:
                return (<React.Fragment> </React.Fragment>)
        }
    }

    return (
        <React.Fragment>
            {WidgetView()}
        </React.Fragment>
    )
}
