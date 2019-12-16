import React, { Component } from 'react'

export default class AssignRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Role: []
        }
    }

    componentDidMount() {
        let lstRole = [];
        if (this.props.SelectedId !== undefined) {
            this.props.SelectedId.forEach(x => {
                if (x.description === "Go! Manage Clever") {
                    x.roles.forEach(y => {
                        this.props.roles.Role.forEach(element => {
                            if (element.id === y.id) {
                                lstRole.push({ "id": element.id, "name": element.name, "code": element.code, "active": true });
                            } else {
                                lstRole.push({ "id": element.id, "name": element.name, "code": element.code, "active": false });
                            }
                        });
                    });
                }
            });
            this.setState({ "Role": lstRole });
        } else {
            this.props.roles.Role.forEach(element => {
                lstRole.push({ "id": element.id, "name": element.name, "code": element.code, "active": false });
            });
            this.setState({ "Role": lstRole });
        }
    }

    checkboxHandler = (i) => {
        let role = this.state.Role;
        role.forEach(x => { x.active = false });
        role[i].active = true;
        this.state.Role = role;
        this.setState({ "roles": this.state.Role });
        const lstSelectedIds = this.state.Role.filter(x => x.active);
        let id = [];
        lstSelectedIds.forEach(element => {
            id.push(element.code);
        });
        this.props.SelectedRole(id);
    }
    render() {
        return (
            <React.Fragment>{
                this.state.Role.map((data, i) =>
                    <React.Fragment key={i}>
                        <label className="container-radio">{data.name}
                            <input type="radio" name="radio" checked={data.active} onChange={this.checkboxHandler.bind(this, i)} />
                            <span className="checkmark"></span>
                        </label>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}
