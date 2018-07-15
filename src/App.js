import React, { Component } from 'react';
import './App.css';
import Content from './Components/Content/index'
import Logo from './Components/Logo/index'
import 'lato-font/css/lato-font.min.css'

class App extends Component {
  render() {
    return (
        <div className='container'>
            <Logo/>
            <Content/>
        </div>
    )
  }
}

export default App;
