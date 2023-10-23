import React, { Component } from 'react'

import './app.css'

import NavTabs from '../nav-tabs'

class App extends Component {
  render() {
    return (
      <section className="movies">
        <NavTabs />
        <Search />
      </section>
    )
  }
}
export default App
