import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createContainer, editContainer } from '../actions/Actions';
import { Input, Tooltip, Icon, Button, Radio } from 'antd';

class ContainerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "user",
            description: "default",
            customer_id: this.props.customer_id,
            container_id: this.props.container_id
        };

        this.onChangeInt = this.onChangeInt.bind(this);
        this.onChangeString = this.onChangeString.bind(this);
        this.onChangeNic = this.onChangeNic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedContainer) {
            if (!(typeof nextProps.selectedContainer.id == "undefined") && this.props.edittingContainer) {
                this.setState({
                    name: nextProps.selectedContainer.name,
                    description: nextProps.selectedContainer.description,
                    type: nextProps.selectedContainer.type,
                    customer_id: nextProps.selectedContainer.customer_id,
                    container_id: nextProps.selectedContainer.container_id,
                    id: nextProps.selectedContainer.id
                })
            }
        }
    }

    onChangeString(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onChangeInt(e) {
        let val = Number(e.target.value);
        if (Number.isNaN(val)) {
            this.setState({ [e.target.id]: 'null' });
        } else {
            this.setState({ [e.target.id]: val });
        }
    }

    onChangeNic(e) {
        this.setState({ customer_id: Number(e) });
    }

    onReset = () => {
        this.setState({
            name: "",
            description: "",
            type: ""
        });
    }

    onChangeRadio = name => ({ target: { value } }) => {
        this.setState({ [name]: value })
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.props.edittingContainer) {
            const container = {
                name: this.state.name,
                description: this.state.description,
                type: this.state.type,
                id: this.state.id,
                customer_id: this.props.customer_id,
            }
            this.props.editContainer(container)
        } else {
            const container = {
                name: this.state.name,
                description: this.state.description,
                type: this.state.type,
                customer_id: this.props.customer_id,
                container_id: this.props.container_id
            }
            this.props.createContainer(container)

        }
        this.props.toggleModal()
        this.onReset();
    }

    render() {
        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    <Input
                        allowClear
                        placeholder="Container Name"
                        id="name"
                        value={this.state.name}
                        onChange={this.onChangeString}
                        size="large"
                        prefix={
                            <Tooltip title="CHAR 64, Cannot be left empty">
                                <Icon type="project" style={{ color: 'rgba(0,0,0,.25)' }} /> '
                            </Tooltip>
                        }
                    />

                    <Input
                        allowClear
                        placeholder="Container Description"
                        id="description"
                        value={this.state.description}
                        onChange={this.onChangeString}
                        style={{ marginTop: "3%" }}
                        prefix={<Tooltip title="Min length is 0. Max length is 63. Valid characters are [a-zA-Z0-9()+-./: ]">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>}
                    />

                    <br />
                    <br />

                    <p> Container Type </p>
                    <Radio.Group defaultValue="off" buttonStyle="solid" value={this.state.type} onChange={this.onChangeRadio('type')}>
                        <Radio.Button value="user">User</Radio.Button>
                        <Radio.Button value="group">Group</Radio.Button>
                    </Radio.Group>
                </div>

                <div style={{ textAlign: "right", marginBottom: "2%", marginTop: "8%" }}>
                    <Button type="normal" size="large" onClick={this.onReset} style={{ marginRight: "1.5%" }}> Reset </Button>
                    <Button type="primary" size="large" onClick={this.onSubmit} > Submit </Button>
                </div>

            </div >
        );
    }
}

ContainerForm.propTypes = {
    createContainer: PropTypes.func.isRequired,
    editContainer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    containers: state.nodes.containers,
    selectedContainer: state.nodes.sel_container
})

export default connect(mapStateToProps, { createContainer, editContainer })(ContainerForm);
