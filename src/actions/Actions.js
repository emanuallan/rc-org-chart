import { FETCH_VTCS, NEW_VTC, DELETE_VTC, EDIT_VTC, UPDATE_VTC, SELECT_VTC } from './types';
import { FETCH_CONTAINER_TYPE, FETCH_CONTAINERS, NEW_CONTAINER, DELETE_CONTAINER, EDIT_CONTAINER, UPDATE_CONTAINER, SELECT_CONTAINER } from './types';
import { message } from 'antd';

/* -------------------------------------------------------------------------- */
/*                             IMPORTANT CONSTANTS                            */
/* -------------------------------------------------------------------------- */
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTY0NjEwMTYyLCJwcml2IjoiZnVsbCIsInJhbmQiOiJYcDh2dFhvMiIsInVzZXJfbmFtZSI6ImFkbWluIn0.sAYte2lY1ddSAHGbPnQUIPjR0h-NFgrQVduk5EyYTtw";
const url = "localhost:3004";


/* -------------------------------------------------------------------------- */
/*                              METHODS FOR VTC'S                             */
/* -------------------------------------------------------------------------- */
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

// EDIT AND UPDATE DO THE SAME THING, HOWEVER WHEN EDITTING A NODE I WOULD USE EDIT
// ON THE OTHER HAND, WHEN UPDATING PARENTS (DRAGGING AND DROPPING OR DELETE NODE ALGORITHMS) I WOULD
// USE UPDATE

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


/* -------------------------------------------------------------------------- */
/*                           METHODS FOR CONTAINERS                           */
/* -------------------------------------------------------------------------- */
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

// EDIT AND UPDATE DO THE SAME THING, HOWEVER WHEN EDITTING A NODE I WOULD USE EDIT
// ON THE OTHER HAND, WHEN UPDATING PARENTS (DRAGGING AND DROPPING OR DELETE NODE ALGORITHMS) I WOULD
// USE UPDATE

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