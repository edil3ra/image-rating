import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import * as actions from './actions'
import storeFactory from './utils/storeFactory'
import { Provider } from 'react-redux'

const store = storeFactory()
window.store = store
window.actions = actions

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
