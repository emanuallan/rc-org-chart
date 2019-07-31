// This is the modal that appears when adding a new Child node

import React, { Component } from 'react';
import { Avatar, Icon, Menu, Dropdown, notification, Modal, Button } from 'antd';
import { Tabs, Radio } from 'antd';
import { Input, InputNumber, Tooltip, message } from 'antd';
import VTC_Form from './VTC_Form';
import ContainerForm from './ContainerForm';

const { TabPane } = Tabs;

class ChildModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Modal
                    visible={this.props.showModal}
                    title="Add New Child Node"
                    onCancel={this.props.toggleModal}
                    footer={null}
                >
                    <Tabs defaultActiveKey="1" size='small'>
                        <TabPane tab="New Container" key="1">
                            <ContainerForm container_id={this.props.container_id} customer_id={this.props.customer_id} toggleModal={this.props.toggleModal} />
                        </TabPane>
                        <TabPane tab="New VTC" key="2">
                            <VTC_Form container_id={this.props.container_id} toggleModal={this.props.toggleModal} />
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

export default ChildModal;
