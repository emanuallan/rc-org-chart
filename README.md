
<div align="center">
<a href="https://ibb.co/Y8ZzMsP"><img src="https://i.ibb.co/sQH0GYb/Screen-Shot-2019-07-31-at-11-14-15-AM.png" alt="Screen-Shot-2019-07-31-at-11-14-15-AM" border="0"></a>
</div>

<h1 align="center">rc-org-chart</h1>


<div align="center">
React-based organizational structure component for organizing containers and vtc's. Provides users with a visual of their network and allows them to organize it to their needs.
</div>

## 🍭 Characteristics
- Drag & Drop the position of container and vtc nodes.
- Add, Edit, Delete implementations
- Delete 
	- Delete Node (connects children nodes with the grandparent node)
	- Delete Subtree
	- Delete Node & Subtree
- Easy to use and scalable.
- Customizable location change rules.
- Customizable node views.



## 📦 Installation & Setup
```bash
$ git clone http://10.100.0.1/aserna/rc-org-chart.git
$ cd rc-org-chart
$ yarn install
```

- Make sure service-prov API is running on http://127.0.0.1:3004/ (Can be adjusted in Actions.js file to the `url` constant).
- Grab the authentication token from the API and apply it in the Actions.js file (src/actions/Actions.js) to the `AUTH_TOKEN` constant.

```
$ yarn start
```

- Open a browser and visit http://127.0.0.1:8000/GraphDemo

## 🔨 Errors that may appear on start-up

1. If nothing appears or `Could not find "store" in the context of "Connect(GraphDemo)"` , double check the router.js file (src/pages/router.js) and make sure that following code is in the imports: 
*note: this file is considered a hidden file so you may have to make your OS make [hidden files visible](https://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/)*
```
...
import { Provider } from 'react-redux';
import store from '../../store';
```

and the `RouterWrapper` function at the bottom of the file looks like this:
```
...
export  default  function  RouterWrapper(props  =  {})  {
	return (
		<Provider  store={store}>
			<Router  history={history}>
				{renderRoutes(routes,  props)}
			</Router>
		</Provider>
	);
}
```
Save and Reload the application.
***important note**: For some reason, every time you run `yarn start` it removes these two things so you may be doing this multiple times*

2.  If nothing appears, or you get a `TLS handshake error from [::1]:61232: remote error: tls: unknown certificate`, or you get a certification error from the console, make sure to visit the service-prov API's documentation page (found in the url where you're running the service-prov API) and 'proceed anyway' on the certification warning page. Reload the application.

3.  `TypeError: Cannot read property 'length' of undefined` - Application is not receiving containers, therefore the AUTH_TOKEN is most likely not correct. Save and Reload the application.


## ⌨️ API for OrgChart Object
| Attributes | Description | Types | Defaults |
| --- | --- | --- | --- |
| data | Organizational structure data (required and each data must have a unique id) | array | [ ] |
| pan | Whether the layer is allowed to drag | boolean | true |
| zoom | Whether the layer allows zooming | boolean | true |
| draggable | Whether the node allows drag and drop | boolean | true |
| maxZoom | Layer maximum magnification | Integer | 2 |
| minZoom | Layer reduction ratio | Integer | 0.5 |
| zoomStep | Scaling range | Integer | 2 |
| customDrag | The user can formulate a node drag and drop rule according to specific data fields and business scenarios, and return true to allow the drag node to be added to the drop node. | (dropProps, dragProps) => true | true |
| nodeRender | User-defined node rendering | props => <div style="background:#999">{props.name}</div> |  |
| extraRender | Custom rendering at the bottom of the node | props => <div style="background:#999">{props.name}</div> |  |


## ❗️ Known Bugs
- Not all the functions work for the Customer node
	- Add works
	- I assume it has to do with it being a Customer object and not necessarily just a container object
- Deleting a VTC responds with an error message, however it still deletes the VTC (most likely a problem with the service-prov API)
- - While editting a container, if you change its type (user/container) AND its name, the children will disappear

## ❓ More info
Special thanks to Dolov and his OrgChart library that was used for this project. More information about the library that helped make this project possible can be found here: https://github.com/Dolov/rc-org-chart

Orginal developer: aeserna.com