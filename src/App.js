import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import GraphDemo from './pages/GraphDemo';


function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <div className="body">
                    <GraphDemo />
                </div>
            </div>
        </Provider>
    );
}

export default App;
