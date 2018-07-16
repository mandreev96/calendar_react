import React, { Component } from 'react';
import './App.css';
import Content from './Components/Content/index'
import Logo from './Components/Logo/index'

class App extends Component {
  render() {
    return (
        <div className='container gradient'>
            <Logo/>
            <Content/>
        </div>
    )
  }
}

export default App;
