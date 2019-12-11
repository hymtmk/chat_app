//This is a root Component which is rendered whenever Application open
import React from "react"
import Navigation from "./src/Navigation"

import { Provider } from 'react-redux'
import configureStore from './src/store/configureStore'

const store = configureStore()

const App = () => (

  <Provider store={store}>
    <Navigation/>   
  </Provider>
)

export default App
//export default App = () => <Navigation />