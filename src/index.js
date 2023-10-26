import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/app'
/*import GeneralApiService from './services/api'

let arrFilms = []
const apiService = new GeneralApiService()
apiService
  .getFilms()
  .then((films) => {
    arrFilms = films
    //console.log(films)

    
  })
  .catch((err) => {
    console.error('Отсутствие фильмов', err)
  })*/

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
