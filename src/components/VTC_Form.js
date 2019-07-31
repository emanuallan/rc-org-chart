import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createVTC, editVTC } from '../actions/Actions';
import { Input, Tooltip, Icon, Button, Radio } from 'antd';
import { Row, Col } from 'antd';

class VTC_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {

            vtc_id: "",
            common_name: "default",
            whitelist: "off",
            user_auth: "no",
            reg_required: "no",
            netflow_index: null,
            home_dps: "dsx01",
            nic_rl_mbps: 0,
            exclude_tcp_ports: "80,81",
            exclude_udp_ports: "80,81",
            pm_enable: "no",

            // defaulting would just be a matter of leaving those blank
        };


        this.onChangeInt = this.onChangeInt.bind(this);
        this.onChangeString = this.onChangeString.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /* -------------------------------------------------------------------------- */
    /*                               HELPER METHODS                               */
    /* -------------------------------------------------------------------------- */

    //For String inputs
    onChangeString(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    //For number inputs
    onChangeInt(e) {
        let val = Number(e.target.value);
        if (Number.isNaN(val)) {
            this.setState({ [e.target.id]: 'null' });
        } else {
            this.setState({ [e.target.id]: val });
        }
    }

    //Resets form to blanks
    onReset = () => {
        this.setState({
            vtc_id: "",
            common_name: "",
            whitelist: "off",
            user_auth: "no",
            reg_required: "no",
            netflow_index: null,
            home_dps: "",
            nic_rl_mbps: null,
            exclude_tcp_ports: "",
            exclude_udp_ports: "",
            pm_enable: "no"
        });
    }

    //handler for radio buttons
    onChangeRadio = name => ({ target: { value } }) => {
        this.setState({ [name]: value })
    }

    //handler for submissions 
    onSubmit(e) {
        e.preventDefault();


        //one has container_id the other one doesn't
        if (this.props.edittingVTC) {
            const vtc = {
                vtc_id: this.state.vtc_id,
                common_name: this.state.common_name,
                whitelist: this.state.whitelist,
                user_auth: this.state.user_auth,
                reg_required: this.state.reg_required,
                netflow_index: this.state.netflow_index,
                home_dps: this.state.home_dps,
                nic_rl_mbps: this.state.nic_rl_mbps,
                exclude_tcp_ports: this.state.exclude_tcp_ports,
                exclude_udp_ports: this.state.exclude_udp_ports,
                pm_enable: this.state.pm_enable,
            }
            this.props.editVTC(vtc);
        } else {
            const vtc = {
                vtc_id: this.state.vtc_id,
                common_name: this.state.common_name,
                whitelist: this.state.whitelist,
                user_auth: this.state.user_auth,
                reg_required: this.state.reg_required,
                netflow_index: this.state.netflow_index,
                home_dps: this.state.home_dps,
                nic_rl_mbps: this.state.nic_rl_mbps,
                exclude_tcp_ports: this.state.exclude_tcp_ports,
                exclude_udp_ports: this.state.exclude_udp_ports,
                pm_enable: this.state.pm_enable,
                container_id: this.props.container_id
            }
            this.props.createVTC(vtc);
        }

        this.props.toggleModal()
        this.onReset();
    }

    /* -------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------- */


    componentWillReceiveProps(nextProps) {
        //this component receives props because when you select a VTC (or container) for editting, the API is called 
        // and returns the properties of the selected VTC

        if (nextProps.selectedVTC) {
            if (!(typeof nextProps.selectedVTC.vtc_id == "undefined") && this.props.edittingVTC) {
                this.setState({
                    vtc_id: nextProps.selectedVTC.vtc_id,
                    common_name: nextProps.selectedVTC.common_name,
                    whitelist: nextProps.selectedVTC.whitelist,
                    user_auth: nextProps.selectedVTC.user_auth,
                    reg_required: nextProps.selectedVTC.reg_required,
                    netflow_index: nextProps.selectedVTC.netflow_index,
                    home_dps: nextProps.selectedVTC.home_dps,
                    nic_rl_mbps: nextProps.selectedVTC.nic_rl_mbps,
                    exclude_tcp_ports: nextProps.selectedVTC.exclude_tcp_ports,
                    exclude_udp_ports: nextProps.selectedVTC.exclude_udp_ports,
                    pm_enable: nextProps.selectedVTC.pm_enable
                })
            }
        }
    }

    render() {
        const vtc_id_input_enabled = (
            <Input
                allowClear
                placeholder="VTC ID"
                id="vtc_id"
                value={this.state.vtc_id}
                onChange={this.onChangeString}
                style={{ marginTop: "7%" }}
                prefix={
                    <Tooltip title="CHAR 64, Cannot be left empty & Needs to be Unique">
                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} /> '
                </Tooltip>
                }
            />
        )

        const vtc_id_input_disabled = (
            <Input
                allowClear
                placeholder="VTC ID"
                id="vtc_id"
                value={this.state.vtc_id}
                onChange={this.onChangeString}
                style={{ marginTop: "7%" }}
                disabled
                prefix={
                    <Tooltip title="CHAR 64, Cannot be left empty & Needs to be Unique">
                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} /> '
                </Tooltip>
                }
            />
        )

        var vtc_id_input = vtc_id_input_enabled;

        if (this.props.edittingVTC) {
            vtc_id_input = vtc_id_input_disabled;
            //disables vtc id input section if in editting mode
        }

        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    <Input
                        allowClear
                        placeholder="Common Name"
                        id="common_name"
                        value={this.state.common_name}
                        onChange={this.onChangeString}
                        size="large"
                        prefix={
                            <Tooltip title="Cannot have special characters">
                                <Icon type="project" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }

                    />

                    {vtc_id_input}

                    <Input
                        allowClear
                        placeholder="Home DPS"
                        id="home_dps"
                        value={this.state.home_dps}
                        onChange={this.onChangeString}
                        style={{ marginTop: "3%" }}
                        prefix={<Tooltip title="Min length is 0. Max length is 63. Valid characters are [a-zA-Z0-9()+-./: ]">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>}
                    />

                    <Input
                        allowClear
                        placeholder="nic rl mbps"
                        id="nic_rl_mbps"
                        value={this.state.nic_rl_mbps}
                        onChange={this.onChangeInt}
                        style={{ marginTop: "3%" }}
                        prefix={
                            <Tooltip title="Min nic_rl_mbps is 0. Max nic_rl_mbps is 2000.">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                    />

                    <Input
                        allowClear
                        placeholder="Netflow Index"
                        id="netflow_index"
                        value={this.state.netflow_index}
                        onChange={this.onChangeInt}
                        style={{ marginTop: "3%" }}
                        prefix={
                            <Tooltip title="Valid netflow_index values are 'null' for disabled or an index greater or equal to 0">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }

                    />

                    <Input
                        allowClear
                        placeholder="Exclude TCP Ports"
                        id="exclude_tcp_ports"
                        value={this.state.exclude_tcp_ports}
                        onChange={this.onChangeString}
                        style={{ marginTop: "3%" }}
                        prefix={<Tooltip title="Must be either 'null' or a comma separated list of valid port numbers. ex. '80,81,1234'">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>}
                    />


                    <Input
                        allowClear
                        placeholder="Exclude UDP Ports"
                        id="exclude_udp_ports"
                        value={this.state.exclude_udp_ports}
                        onChange={this.onChangeString}
                        style={{ marginTop: "3%" }}
                        prefix={<Tooltip title="Must be either 'null' or a comma separated list of valid port numbers. ex. '80,81,1234'">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>}
                    />


                    <br />
                    <br />

                    <Row>
                        <Col span={8}>
                            <p> Registration Required </p>
                            <Radio.Group size="small" defaultValue="no" buttonStyle="solid" value={this.state.reg_required} onChange={this.onChangeRadio('reg_required')}>
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                            </Radio.Group>
                        </Col>
                        <Col span={8}>
                            <p> PM Enable </p>
                            <Radio.Group size="small" defaultValue="no" buttonStyle="solid" value={this.state.pm_enable} onChange={this.onChangeRadio('pm_enable')}>
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                            </Radio.Group>
                        </Col>
                        <Col span={8}>
                            <p> User Authorization </p>
                            <Radio.Group size="small" defaultValue="no" buttonStyle="solid" value={this.state.user_auth} onChange={this.onChangeRadio('user_auth')}>
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>

                    <br />

                    <p> Whitelist </p>
                    <Radio.Group size="small" defaultValue="off" buttonStyle="solid" value={this.state.whitelist} onChange={this.onChangeRadio('whitelist')}>
                        <Radio.Button value="ingress">Ingress</Radio.Button>
                        <Radio.Button value="egress">Egress</Radio.Button>
                        <Radio.Button value="both">Both</Radio.Button>
                        <Radio.Button value="off">Off</Radio.Button>
                    </Radio.Group>

                    <br />

                    <div style={{ textAlign: "right", marginBottom: "2%", marginTop: "9%" }}>
                        <Button type="normal" size="large" onClick={this.onReset} style={{ marginRight: "1.5%" }}> Reset </Button>
                        <Button type="primary" size="large" onClick={this.onSubmit}> Submit </Button>
                    </div>

                </div>

            </div >
        );
    }
}

VTC_Form.propTypes = {
    createVTC: PropTypes.func.isRequired,
    editVTC: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    vtcs: state.nodes.vtcs, //from index.js in ../reducers
    selectedVTC: state.nodes.sel_vtc
})


export default connect(mapStateToProps, { createVTC, editVTC })(VTC_Form);
