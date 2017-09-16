import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import * as actions from './actions'
import storeFactory from './utils/storeFactory'
import { Provider } from 'react-redux'

import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize'
import './style.css'


$(document).ready(function(){
    $('.materialboxed').materialbox();
});

const store = storeFactory()
window.store = store
window.actions = actions
store.dispatch(actions.fetchImages())


const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
