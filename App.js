import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import reducers from './src/redux/reducers'
import ReduxThunk from 'redux-thunk'

import MainScreen from './src/screens/mainapp/MainScreen'

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

const App = () => {
  return(
    <Provider store={store}>
      <MainScreen />
    </Provider>
  )
}

export default App
