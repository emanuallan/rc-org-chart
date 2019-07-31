import { FETCH_VTCS, NEW_VTC, DELETE_VTC, EDIT_VTC, UPDATE_VTC, SELECT_VTC } from './types';
import { FETCH_CONTAINER_TYPE, FETCH_CONTAINERS, NEW_CONTAINER, DELETE_CONTAINER, EDIT_CONTAINER, UPDATE_CONTAINER, SELECT_CONTAINER } from './types';
import { message } from 'antd';

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTY0NTExMDY1LCJwcml2IjoiZnVsbCIsInJhbmQiOiI2dU1qanFmQyIsInVzZXJfbmFtZSI6ImFkbWluIn0.SlyGJxJSd3zFuERhYGDEmxHZe_6_tWtOPzwqNzXJDSc";
const url = "localhost:3004";

export const fetchVTCS = () => dispatch => {
    fetch('https://' + url + '/api/vtcs?offset=0&limit=1000&fields=*&filter=&related=*', {
        method: 'GET',
        headers: {
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        }
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: FETCH_VTCS,
            payload: data.resource
        }))
        .catch(error => {
            message.error("VTCs not fetched. " + error.toString());
        });
};

export const createVTC = (requestData) => dispatch => {
    fetch('https://' + url + '/api/vtcs?fields=*&related=*', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
        body: "{\"" + "resource" + "\"" + " : [" + JSON.stringify(requestData) + "] }"
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: NEW_VTC,
            payload: data.resource[0] //Remember that .resource is an array of VTCs
        }))
        .catch(error => {
            message.error("VTC not created. " + error.toString());
        });
};

export const editVTC = (requestData) => dispatch => {
    fetch('https://' + url + '/api/vtcs?fields=*&related=*', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
        body: "{\"" + "resource" + "\"" + " : [" + JSON.stringify(requestData) + "] }"
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: EDIT_VTC,
            payload: data.resource[0] //Remember that .resource is an array of VTCs
        }))
        .catch(error => {
            message.error("VTC not updated. " + error.toString());
        });
};

export const updateVTC = (requestData) => dispatch => {
    fetch('https://' + url + '/api/vtcs?fields=*&related=*', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
        body: "{\"" + "resource" + "\"" + " : [" + JSON.stringify(requestData) + "] }"
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: UPDATE_VTC,
            payload: data.resource[0] //Remember that .resource is an array of VTCs
        }))
        .catch(error => {
            message.error("VTC not updated. " + error.toString());
        });
};

export const deleteVTC = (delID) => dispatch => {
    fetch('https://' + url + '/api/vtcs/' + delID + '?fields=*&related=*', {
        method: 'DELETE',
        headers: {
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        }
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: DELETE_VTC
        }))
        .catch(error => {
            message.error("VTC not deleted. " + error.toString());
        });
};

export const selectVTC = (selected_vtc_id) => dispatch => {
    fetch('https://' + url + '/api/vtcs/' + selected_vtc_id + '?fields=*&related=*', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: SELECT_VTC,
            payload: data.resource[0] //Remember that .resource is an array of VTCs
        }))
        .catch(error => {
            message.error("VTC not selected. " + error.toString());
        });
};

export const fetchContainers = () => dispatch => {
    fetch('https://' + url + '/api/containers?offset=0&limit=1000&fields=*&filter=', {
        method: 'GET',
        headers: {
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        }
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: FETCH_CONTAINERS,
            payload: data.resource
        }))
        .catch(error => {
            message.error("Containers not fetched. " + error.toString());
        });
};

export const fetchContainerType = (type) => dispatch => {
    fetch('https://' + url + '/api/containers?filter=type=?,' + type, {
        method: 'GET',
        headers: {
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        }
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: FETCH_CONTAINER_TYPE,
            payload: data.resource
        }))
        .catch(error => {
            message.error("Containers not fetched. " + error.toString());
        });
};

export const createContainer = (requestData) => dispatch => {
    fetch('https://' + url + '/api/containers?fields=*', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
        body: "{\"" + "resource" + "\"" + " : [" + JSON.stringify(requestData) + "] }"
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: NEW_CONTAINER,
            payload: data.resource[0] //Remember that .resource is an array of Containers
        }))
        .catch(error => {
            message.error("Container not created. " + error.toString());
        });
};

export const editContainer = (requestData) => dispatch => {
    fetch('https://' + url + '/api/containers?fields=*', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
        body: "{\"" + "resource" + "\"" + " : [" + JSON.stringify(requestData) + "] }"
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: EDIT_CONTAINER,
            payload: data.resource[0] //Remember that .resource is an array of VTCs
        }))
        .catch(error => {
            message.error("Container not updated. " + error.toString());
        });
};

export const updateContainer = (requestData) => dispatch => {
    fetch('https://' + url + '/api/containers?fields=*', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
        body: "{\"" + "resource" + "\"" + " : [" + JSON.stringify(requestData) + "] }"
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: UPDATE_CONTAINER,
            payload: data.resource[0] //Remember that .resource is an array of VTCs
        }))
        .catch(error => {
            message.error("Container not updated. " + error.toString());
        });
};

export const deleteContainer = (delID) => dispatch => {
    fetch('https://' + url + '/api/containers/' + delID + '?fields=*', {
        method: 'DELETE',
        headers: {
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        }
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: DELETE_CONTAINER
        }))
        .catch(error => {
            message.error("Container not deleted. " + error.toString());
        });
};

export const selectContainer = (selID) => dispatch => {
    fetch('https://' + url + '/api/containers/' + selID + '?fields=*', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-DISPERSIVE-SESSION-TOKEN': AUTH_TOKEN
        },
    })
        .then(response => response.json())
        .then(data => dispatch({
            type: SELECT_CONTAINER,
            payload: data.resource[0] //Remember that .resource is an array of VTCs
        }))
        .catch(error => {
            message.error("Container not selected. " + error.toString());
        });
};

  // recursiveOnDelete = (container_id, current) => {
  //   for (var i = 0; i < current.children.length; i++) {
  //     if (current.children[i].id == container_id) {
  //       var deletedContainer = current.children[i];
  //       current.children.splice(i, 1);
  //       return deletedContainer;
  //     }
  //   }
  //   for (var i = 0; i < current.children.length; i++) {
  //     if (current.children[i].type !== "vtc") {
  //       this.recursiveOnDelete(container_id, current.children[i]);
  //     }
  //   }
  // }


  // onDeleteContainer = (container_id) => {
  //   this.props.deleteContainer(container_id)
  //   this.recursiveOnDelete(container_id, this.state.data[0]);
  //   this.setState({ containers: this.state.containers });
  // }

  // onDeleteVTC = (vtc_id) => {
  //   this.props.deleteVTC(vtc_id);
  //   this.recursiveOnDelete(vtc_id, this.state.data[0]);
  //   this.setState({ vtcs: this.state.vtcs });
  // }

  //method that deletes a node and all its children
  // deleteAll = (current, parent) => {
  //   console.log("current: ", current, " parent: ", parent)
  //   if (current.type !== "vtc" && current.children.length > 0) {
  //     console.log("RECURSIVE CALL OPTION + CONTAINER HAS CHILDREN")
  //     for (var i = 0; i < current.children.length; i++) {
  //       this.deleteAll(current.children[i], current);
  //     }
  //     this.onDeleteContainer(current.id)
  //   } else {
  //     console.log("2")
  //     if (current.type == "vtc") {
  //       console.log("DELETE VTC OPTION")
  //       console.log("onDeleteVTC: " + current.id)
  //       this.onDeleteVTC(current.id);
  //       for (var i = 0; i < parent.children.length; i++) {
  //         if (parent.children[i].id == current.id) {
  //           parent.children.splice(i, 1);
  //         }
  //       }
  //     } else {
  //       console.log("CONTAINER DOESNT HAVE CHILDREN OPTION")
  //       this.props.deleteContainer(current.id);
  //       console.log("PARENT: ", parent)
  //       for (var i = 0; i < parent.children.length; i++) {
  //         if (parent.children[i].id == current.id) {
  //           parent.children.splice(i, 1);
  //         }
  //       }
  //     }
  //   }
  // }
