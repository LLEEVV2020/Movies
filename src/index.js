import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/app'
import AppStorage from './services/storage'

const ratedFilmsStorage = new AppStorage('rated-films3', window.localStorage)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App ratedFilmsStorage={ratedFilmsStorage} />
  </React.StrictMode>
)
