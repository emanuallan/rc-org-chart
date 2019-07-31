// It was awesome working with ya'll! I learned an incrediable amount
// during this internship and feel way better about
// my React and CRUD application development skills.
// I appreciate yall's attention and I am super happy I got to work on this project. 
// I know this is just a start but I'm sure ya'll will do great things with it!
// Thanks once again!
// -ALLAN

import React, { Component, useState } from 'react';
import { Avatar, Icon, Menu, Dropdown, notification, Modal, Button } from 'antd';
import PropTypes from 'prop-types';
import OrgChart from '@/components';
import { connect } from 'react-redux';
import '@/components/style';
import S from './index.less';
import { fetchVTCS, selectVTC, deleteVTC, updateVTC, fetchContainers, deleteContainer, selectContainer, updateContainer } from '../actions/Actions';
import device from '../img/device.png';
import user from '../img/user.png';
import group from '../img/group2.jpg';
import customer from '../img/customer.png'
import ChildModal from '../components/ChildModal';
import VTC_Form from '../components/VTC_Form';
import ContainerForm from '../components/ContainerForm';
import dispersive from "../img/dispersive.png";

const { SubMenu } = Menu;

const ExtraRender = props => {
  const { name } = props
  const [isName, setName] = useState(false)

  let render = <Icon type="question-circle" />
  if (isName) {
    render = <div>{name}</div>
  }
  return (
    <div style={{ "color": "whitesmoke" }} onClick={() => setName(!isName)}>{render}</div>
  )
}
const customDrag = (dropProps, dragProps) => {
  const { employees: dropHot } = dropProps;
  const { employees: dragHot } = dragProps;
  if (!dragHot) return true
  if (dragHot < dropHot) return true
  return false
}

class GraphDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* -------------------------------------------------------------------------- */
      // this holds the direct vtcs that the API returns
      vtcs: this.props.vtcs,
      /* -------------------------------------------------------------------------- */
      // this holds the direct containers that the API returns
      containers: this.props.containers,

      // this holds the different types of objects, and the objects are made specifically for the Orgchart so they 
      // have the following properties: 

      // CONTAINER OBJECT = {
      //   container_id: INTEGER
      //   customer_id: INTEGER
      //   id: INTEGER
      //   name: STRING
      //   title: STRING
      //   type: STRING
      //   avatar: STRING
      //   children: ARRAY 
      // }

      // VTC OBJECT= {
      // container_id: INTEGER
      // customer_id: INTEGER
      // vtc_id: STRING
      // id: STRING
      // name: STRING
      // title: STRING
      // type: STRING 
      // avatar:  STRING
      // children: ARRAY (useless since VTC's can't have children)
      //}
      hierarchy: {
        customers: [],
        groups: [],
        users: [],
        vtcs: []
      },
      /* -------------------------------------------------------------------------- */
      //  when you click the menu options on any node (the "...'s") then this node is "selected"
      selected: {
        container_id: null,
        customer_id: null
      },
      /* -------------------------------------------------------------------------- */
      // source that feeds into the Orgchart to display the Graph
      data: [],
      modals: { // responsible for toggling the modals 
        showChildModal: false,
        showEditContainerModal: false,
        showEditVTCModal: false
      }
    }

    this.getContainerObjectWithID = this.getContainerObjectWithID.bind(this);
    this.onDeleteContainer = this.onDeleteContainer.bind(this);
    this.onDeleteVTC = this.onDeleteVTC.bind(this);
    this.toggleChildModal = this.toggleChildModal.bind(this);
    this.toggleEditContainerModal = this.toggleEditContainerModal.bind(this);
    this.toggleEditVTCModal = this.toggleEditVTCModal.bind(this);
  }

  /* -------------------------------------------------------------------------- */
  /*                               HELPER METHODS                               */
  /* -------------------------------------------------------------------------- */


  /* --------------------------------- TOGGLES -------------------------------- */
  //toggles and displays/removes modal for adding a new child
  toggleChildModal = () => {
    this.setState({
      modals: {
        showChildModal: !this.state.modals.showChildModal,
      }
    });
  }

  //toggles and displays/removes modal for editting a vtc
  toggleEditVTCModal = () => {
    this.setState({
      modals: {
        showEditVTCModal: !this.state.modals.showEditVTCModal,
      }
    });
  }

  //toggles and displays/removes modal for editting a container
  toggleEditContainerModal = () => {
    this.setState({
      modals: {
        showEditContainerModal: !this.state.modals.showEditContainerModal,
      }
    });
  }


  /* -------------------------------- REMOVALS -------------------------------- */
  //removes container from this.state.containers
  removeFromContainersList = (container_id) => {
    for (var i = 0; i < this.state.containers.length; i++) {
      if (this.state.containers[i].id == container_id) {
        this.state.containers.splice(i, 1);
      }
    }
  }

  //removes vtc from this.state.vtcs
  removeFromVTCList = (vtc_id) => {
    for (var i = 0; i < this.state.vtcs.length; i++) {
      if (this.state.vtcs[i].vtc_id == vtc_id) {
        this.state.vtcs.splice(i, 1);
      }
    }
  }

  //removes container object from this.state.hierarchy
  removeFromHierarchyList = (container_obj) => {
    var containers_type;
    var isVTC = false;
    if (container_obj.type === "customer") {
      containers_type = this.state.hierarchy.customers
    } else if (container_obj.type === "user") {
      containers_type = this.state.hierarchy.users;
    } else if (container_obj.type === "group") {
      containers_type = this.state.hierarchy.groups;
    } else {
      containers_type = this.state.hierarchy.vtcs
      isVTC = true;
    }

    if (isVTC) {
      for (var i = 0; i < containers_type.length; i++) {
        if (containers_type[i].id == container_obj.vtc_id) {
          containers_type.splice(i, 1);
          return
        }
      }
    }

    var inherited_children;
    for (var i = 0; i < containers_type.length; i++) {
      if (containers_type[i].id == container_obj.id) {
        inherited_children = containers_type[i].children
        containers_type.splice(i, 1);
        return inherited_children
      }
    }


  }

  //method that deletes container from api and removes from frontend
  onDeleteContainer = (container_id) => {
    this.props.deleteContainer(container_id);
    this.removeFromHierarchyList(this.getContainerObjectWithID(container_id));
    this.removeFromContainersList(container_id);
    this.findNodeAndRemove(this.state.data[0], container_id)
  }

  //method that deletes vtc from api and removes from frontend
  onDeleteVTC = (vtc_id) => {
    this.props.deleteVTC(vtc_id);
    this.removeFromHierarchyList(this.getVTCObjectWithID(vtc_id));
    this.removeFromVTCList(vtc_id);
    this.findNodeAndRemove(this.state.data[0], vtc_id)
  }

  //method for deleting container nodes with children
  //children are updated to have their grandparent as their new parent
  onDeleteParent = (parent) => {
    if (parent.children.length == 0) {
      this.onDeleteContainer(parent.id)
    } else if (parent.type === "customer") {

    } else {
      var grandparentNode = this.getContainerObjectWithID(parent.container_id)
      var index = this.findChildIndex(grandparentNode, parent.id)

      for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i].type !== "vtc") {
          const update_parent = {
            id: parent.children[i].id,
            customer_id: parent.children[i].customer_id,
            container_id: grandparentNode.id
          }
          this.props.updateContainer(update_parent)
          var container_obj = {
            container_id: grandparentNode.id,
            customer_id: parent.children[i].customer_id,
            id: parent.children[i].id,
            name: parent.children[i].name,
            title: parent.children[i].title,
            type: parent.children[i].type,
            avatar: parent.children[i].avatar,
            children: parent.children[i].children
          }
          this.findMyParent(container_obj, index)

        } else if (parent.children[i].type === "vtc") {
          const update_parent = {
            vtc_id: parent.children[i].vtc_id,
            container_id: grandparentNode.id
          }
          this.props.updateVTC(update_parent)
          var vtc_obj = {
            container_id: grandparentNode.id,
            customer_id: parent.children[i].customer_id,
            vtc_id: parent.children[i].vtc_id,
            id: parent.children[i].id,
            name: parent.children[i].name,
            title: parent.children[i].title,
            type: "vtc",
            avatar: parent.children[i].avatar,
            children: []
          }
          this.findMyParent(vtc_obj, index)
        }
      }

      this.onDeleteContainer(parent.id)
    }
  }

  //method for deleting all children of a node
  onDeleteChildren = (parent) => {
    while (parent.children.length != 0) {
      this.onDeleteAll(parent.children[0])
    }
  }

  //method that deletes a node and all its children
  onDeleteAll = (root) => {
    if (root.type === "vtc") {
      this.onDeleteVTC(root.id);
    } else if (root.children.length == 0) {
      this.onDeleteContainer(root.id)
    } else {
      while (root.children.length != 0) {
        this.onDeleteAll(root.children[0])
      }
      this.onDeleteContainer(root.id);
    }
  }

  //finds node and removes it from the front-end (graph)
  findNodeAndRemove(root, child_id) {
    if (typeof root.children == 'undefined' || root.children.length == 0) {
      return
    }

    for (var i = 0; i < root.children.length; i++) {
      if (root.children[i].id == child_id) {
        root.children.splice(i, 1);
        return
      }
    }

    for (var j = 0; j < root.children.length; j++) {
      this.findNodeAndRemove(root.children[j], child_id)
    }
  }



  /* ------------------------------- GET OBJECT ------------------------------- */
  //returns container object when it's supplied the container id
  getContainerObjectWithID = (container_id) => {
    for (var i = 0; i < this.state.containers.length; i++) {
      if (this.state.containers[i].id == container_id) {
        return this.state.containers[i]
      }
    }
  }

  //returns vtc object when it's supplied the vtc id
  getVTCObjectWithID = (vtc_id) => {
    for (var i = 0; i < this.state.vtcs.length; i++) {
      if (this.state.vtcs[i].vtc_id == vtc_id) {
        return this.state.vtcs[i]
      }
    }
  }



  /* ------------------------------- FIND OBJECT ------------------------------ */
  //method that helps find the index of a specific child within the parent's children array
  //used for editting -> helps keep nodes in place within tree 
  findChildIndex(root, child_id) {
    if (typeof root.children == 'undefined' || root.children.length == 0) {
      return 0
    }

    for (var i = 0; i < root.children.length; i++) {
      if (root.children[i].id == child_id) {
        return i;
      }
    }
  }

  //finds the child's parent node and puts the child within the parent's children array
  //index is only used when trying to push in a specifc spot 
  //(used for 'edit' and 'delete' to make sure nodes don't move)
  findMyParent(child, index) {
    var childContainer;
    if (child.type === "customer") {
      return;
    } else if (child.type === "user") {
      childContainer = this.state.hierarchy.users;
    } else if (child.type === "group") {
      childContainer = this.state.hierarchy.groups;
    } else {
      childContainer = this.state.hierarchy.vtcs;
    }
    var child_obj;
    for (var i = 0; i < childContainer.length; i++) {
      if (child.id == childContainer[i].id) {
        child_obj = childContainer[i];
      }
    }

    for (var i = 0; i < this.state.containers.length; i++) {
      if (child.container_id == this.state.containers[i].id) {
        if (Number.isInteger(index)) {
          this.state.containers[i].children.splice(index, 0, child_obj)
        } else {
          this.state.containers[i].children.push(child_obj);
        }
        return;
      }
    }
  }

  //Pushes object to their appropriate hierarchy
  findMyHierarchy(container) {
    if (container.type === 'customer') {
      var index = this.state.hierarchy.customers.findIndex(c => c.id == container.id);
      if (index === -1 || this.props.last_action === "SELECT_CONTAINER") {
        container.avatar = customer;
        this.state.hierarchy.customers.push(container);
      }
    } else if (container.type === 'group') {
      var index = this.state.hierarchy.groups.findIndex(c => c.id == container.id);
      if (index === -1 || this.props.last_action === "SELECT_CONTAINER") {
        container.avatar = group;
        this.state.hierarchy.groups.push(container);
      }
    } else if (container.type === 'user') {
      var index = this.state.hierarchy.users.findIndex(c => c.id == container.id);
      if (index === -1 || this.props.last_action === "SELECT_CONTAINER") {
        container.avatar = user;
        this.state.hierarchy.users.push(container);
      }
    } else {
      var index = this.state.hierarchy.vtcs.findIndex(c => c.id == container.id);
      if (index === -1 || this.props.last_action === "SELECT_VTC") {
        container.avatar = device;
        this.state.hierarchy.vtcs.push(container);
      }
    }
  }



  /* -------------------------------------------------------------------------- */



  componentDidMount() {
    this.props.fetchContainers();
    this.props.fetchVTCS();
  }

  componentWillReceiveProps(nextProps) {
    var containersNeedUpdate = false;
    if (this.props.containers.length !== nextProps.containers.length) {
      var containersNeedUpdate = true;

      //this for loop is in charge of putting the containers in their appropriate hierarchy group
      for (var i = 0; i < nextProps.containers.length; i++) {
        var container = nextProps.containers[i];
        var container_obj = {
          container_id: container.container_id,
          customer_id: container.customer_id,
          id: container.id,
          name: container.id,
          title: container.name,
          type: container.type,
          avatar: "",
          children: []
        }
        this.findMyHierarchy(container_obj)
        this.state.containers.push(container_obj)
      }

      //this for loop is in charge of finding each container's parent
      for (var i = 0; i < nextProps.containers.length; i++) {
        var container = nextProps.containers[i];
        var container_obj = {
          container_id: container.container_id,
          customer_id: container.customer_id,
          id: container.id,
          name: container.id,
          title: container.name,
          type: container.type,
          avatar: container.user,
          children: []
        }
        this.findMyParent(container_obj);
      }
    }

    if (this.props.vtcs.length !== nextProps.vtcs.length) {
      var containersNeedUpdate = true;

      //this for loop is in charge of putting the vtcs  in their appropriate hierarchy group
      for (var i = 0; i < nextProps.vtcs.length; i++) {
        var vtc = nextProps.vtcs[i];
        var vtc_obj = {
          container_id: vtc.container_id,
          customer_id: vtc.customer_id,
          vtc_id: vtc.vtc_id,
          id: vtc.vtc_id,
          name: vtc.vtc_id,
          title: vtc.common_name,
          type: "vtc",
          avatar: device,
        }
        var index = this.state.hierarchy.vtcs.findIndex(v => v.vtc_id == vtc.vtc_id);
        if (index === -1) {
          this.state.hierarchy.vtcs.push(vtc_obj);
        }
      }
      this.setState({ vtcs: nextProps.vtcs });

      //this for loop is in charge of finding each vtc's parent
      for (var i = 0; i < nextProps.vtcs.length; i++) {
        var vtc = nextProps.vtcs[i];
        var vtc_obj = {
          container_id: vtc.container_id,
          customer_id: vtc.customer_id,
          vtc_id: vtc.vtc_id,
          id: vtc.vtc_id,
          name: vtc.vtc_id,
          title: vtc.name,
          type: "vtc",
          avatar: vtc.avatar,
          children: []
        }
        this.findMyParent(vtc_obj);
      }
    }

    if (nextProps.last_action === "NEW_CONTAINER") {
      var container_obj = {
        container_id: nextProps.newContainer.container_id,
        customer_id: nextProps.newContainer.customer_id,
        id: nextProps.newContainer.id,
        name: nextProps.newContainer.id,
        title: nextProps.newContainer.name,
        type: nextProps.newContainer.type,
        avatar: "",
        children: []
      }
      this.state.containers.push(container_obj)
      this.findMyHierarchy(container_obj)
      this.findMyParent(container_obj)
      containersNeedUpdate = true;

    } else if (nextProps.last_action === "EDIT_CONTAINER") {
      this.removeFromContainersList(nextProps.newContainer.id)
      var inherited_children = this.removeFromHierarchyList(nextProps.newContainer);
      var container_obj = {
        container_id: nextProps.newContainer.container_id,
        customer_id: nextProps.newContainer.customer_id,
        id: nextProps.newContainer.id,
        name: nextProps.newContainer.id,
        title: nextProps.newContainer.name,
        type: nextProps.newContainer.type,
        avatar: nextProps.newContainer.children,
        children: inherited_children
      }
      var parentNode = this.getContainerObjectWithID(nextProps.newContainer.container_id)
      var index = this.findChildIndex(parentNode, container_obj.id)
      this.findNodeAndRemove(this.state.data[0], container_obj.id)
      this.state.containers.push(nextProps.newContainer);
      this.findMyHierarchy(container_obj);
      this.findMyParent(container_obj, index);
      containersNeedUpdate = true;
    }

    if (nextProps.last_action === "NEW_VTC") {
      var vtc_obj = {
        container_id: this.state.selected.container_id,
        customer_id: this.state.selected.customer_id,
        vtc_id: nextProps.newVTC.vtc_id,
        id: nextProps.newVTC.vtc_id,
        name: nextProps.newVTC.vtc_id,
        title: nextProps.newVTC.common_name,
        type: "vtc",
        avatar: "",
        children: []
      }
      this.state.vtcs.push(nextProps.newVTC);
      this.findMyHierarchy(vtc_obj);
      this.findMyParent(vtc_obj);
      containersNeedUpdate = true;

    } else if (nextProps.last_action === "EDIT_VTC") {
      this.removeFromVTCList(nextProps.newVTC.vtc_id)
      this.removeFromHierarchyList(nextProps.newVTC)
      var vtc_obj = {
        container_id: nextProps.newVTC.container_id,
        customer_id: nextProps.newVTC.customer_id,
        vtc_id: nextProps.newVTC.vtc_id,
        id: nextProps.newVTC.vtc_id,
        name: nextProps.newVTC.vtc_id,
        title: nextProps.newVTC.common_name,
        type: "vtc",
        avatar: "",
        children: []
      }

      var parentNode = this.getContainerObjectWithID(nextProps.newVTC.container_id)
      var index = this.findChildIndex(parentNode, vtc_obj.vtc_id)
      this.findNodeAndRemove(this.state.data[0], vtc_obj.vtc_id)
      this.state.vtcs.push(nextProps.newVTC);
      this.findMyHierarchy(vtc_obj);
      this.findMyParent(vtc_obj, index);
      containersNeedUpdate = true;
    }

    if (containersNeedUpdate) {
      for (var i = 0; i < this.state.containers.length; i++) {
        if (this.state.containers[i].type === "customer") {
          this.state.data[0] = this.state.containers[i];
          return;
        }
      }
    }
  }



  render() {
    /* --------------------------- MAIN SCREEN (GRAPH) -------------------------- */
    if (this.state.containers.length > 0 && this.state.vtcs.length > 0) {
      return (
        <div style={{ width: "100%" }}>
          <OrgChart
            pan
            zoom
            draggable
            data={this.state.data}
            maxZoom={40}
            minZoom={0.15}
            zoomStep={0.01}
            customDrag={customDrag}
            nodeRender={(props) => {
              const { id, customer_id, title, type, employees, avatar } = props;
              const menuClick = (e) => {
                this.setState({
                  selected: {
                    container_id: id,
                    customer_id: customer_id
                  }
                })

                if (e.key === "addContainer") {
                  this.toggleChildModal()
                } else if (e.key === "editContainer") {
                  this.props.selectContainer(id)
                  this.toggleEditContainerModal()
                } else if (e.key === "deleteContainer") {
                  var parentNode = this.getContainerObjectWithID(id)
                  this.onDeleteParent(parentNode)
                } else if (e.key === "deleteSubtree") {
                  var parentNode = this.getContainerObjectWithID(id);
                  this.onDeleteChildren(parentNode)
                } else if (e.key === "deleteContainerAndSubtree") {
                  var parentNode = this.getContainerObjectWithID(id);
                  this.onDeleteAll(parentNode)
                }

                if (e.key === "editVTC") {
                  this.props.selectVTC(id)
                  this.toggleEditVTCModal()
                } else if (e.key === "deleteVTC") {
                  this.onDeleteVTC(props.id);
                }
              }

              const gen_menu = (
                <Menu onClick={menuClick}>
                  <Menu.Item key="addContainer"> <Icon type="plus-circle" theme="twoTone" twoToneColor="#52c41a" />Add Child Node  </Menu.Item>
                  <Menu.Item key="editContainer"> <Icon type="edit" theme="twoTone" twoToneColor="#2B99FF" />Edit Node </Menu.Item>
                  <SubMenu key="delMenu" title={<span><Icon type="warning" theme="twoTone" twoToneColor="#FA612E" /> <span style={{ marginLeft: "5px" }}> Delete</span></span>}>
                    <Menu.Item key="deleteContainer"> <Icon type="delete" theme="twoTone" twoToneColor="#FA612E" /> Delete Node </Menu.Item>
                    <Menu.Item key="deleteSubtree"> <Icon type="delete" theme="twoTone" twoToneColor="#FA612E" /> Delete Subtree </Menu.Item>
                    <Menu.Item key="deleteContainerAndSubtree"> <Icon type="delete" theme="twoTone" twoToneColor="#FA612E" /> Delete Node & Subtree </Menu.Item>
                  </SubMenu>
                </Menu>
              )

              var menu = gen_menu;

              const vtc_menu = (
                <Menu onClick={menuClick}>
                  <Menu.Item key="editVTC"> <Icon type="edit" theme="twoTone" twoToneColor="#2B99FF" />Edit Node </Menu.Item>
                  <Menu.Item key="deleteVTC"> <Icon type="delete" theme="twoTone" twoToneColor="#FA612E" /> Delete Node </Menu.Item>
                </Menu>
              )

              if (type === "vtc") {
                menu = vtc_menu;
              }

              return (
                <div className={S.nodeRender}>
                  <div className="top">
                    <span className="title">{title}</span>
                    <Avatar size={28} src={avatar} />
                  </div>
                  <div className="bottom">
                    <div className="mess">
                      <div>
                        <span className="title">Type: </span>
                        <span className="position">{type}</span>
                      </div>
                      {employees && (
                        <div>
                          <span className="title">Sample Number: </span>
                          <span>{employees}</span>
                        </div>
                      )}
                    </div>
                    <div className="handleBar">
                      <Dropdown overlay={menu} placement="bottomLeft">
                        <span>...</span>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              )
            }
            }
            extraRender={props => <ExtraRender {...props} />}
          />

          <ChildModal
            showModal={this.state.modals.showChildModal}
            toggleModal={this.toggleChildModal}
            container_id={this.state.selected.container_id}
            customer_id={this.state.selected.customer_id}
          />

          <Modal
            visible={this.state.modals.showEditVTCModal}
            title="Edit VTC"
            onCancel={this.toggleEditVTCModal}
            footer={null}
          >
            <VTC_Form
              toggleModal={this.toggleEditVTCModal}
              container_id={this.state.selected.container_id}
              edittingVTC={this.props.selectVTC}
            />
          </Modal>

          <Modal
            visible={this.state.modals.showEditContainerModal}
            title="Edit Container"
            onCancel={this.toggleEditContainerModal}
            footer={null}
          >
            <ContainerForm
              container_id={this.state.selected.container_id}
              customer_id={this.state.selected.customer_id}
              toggleModal={this.toggleEditContainerModal}
              edittingContainer={this.props.selectContainer}
            />
          </Modal>
        </div>

      )



      /* ----------------------------- LOADING SCREEN ----------------------------- */
    } else {
      return (
        <div style={{ textAlign: "center", width: "100%", height: "100vh" }} >
          <div>
            <img src={dispersive} alt="logo" style={{ marginTop: "13%", marginBottom: "4.5%" }} />
          </div>
          <Icon type="loading" style={{ fontSize: 90, color: "#979797" }} spin />
        </div>)
    }
  }
}

GraphDemo.propTypes = {
  vtcs: PropTypes.array.isRequired,
  fetchVTCS: PropTypes.func.isRequired,
  selectVTC: PropTypes.func.isRequired,
  newVTC: PropTypes.object,
  deleteVTC: PropTypes.func.isRequired,
  updateVTC: PropTypes.func.isRequired,

  containers: PropTypes.array.isRequired,
  deleteContainer: PropTypes.func.isRequired,
  fetchContainers: PropTypes.func.isRequired,
  selectContainer: PropTypes.func.isRequired,
  newContainer: PropTypes.object,
  updateContainer: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  vtcs: state.nodes.vtcs, //from index.js in reducers
  newVTC: state.nodes.vtc,
  last_action: state.nodes.action_type,

  containers: state.nodes.containers,
  newContainer: state.nodes.container,
})


export default connect(mapStateToProps, { fetchVTCS, fetchContainers, deleteContainer, selectContainer, selectVTC, deleteVTC, updateContainer, updateVTC })(GraphDemo);