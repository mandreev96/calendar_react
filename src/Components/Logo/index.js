import React from 'react'
import ViewRow from './View-row/index'
import './styles.css'

class Logo extends React.Component{

    render() {
        return(
            <div className='logo'>
                <h2>Calendar</h2>
                <ViewRow/>
            </div>
        )
    }
}

export default Logo