import React from 'react'
import ReactDom from 'react-dom'
import Routing from './Routing'
import {Provider} from 'react-redux'
import store from './redux/store/store'


ReactDom.render(
  <Provider store={store}>
    <React.StrictMode>
      <Routing />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

