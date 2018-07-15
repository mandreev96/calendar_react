import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import './styles.css'

class ContentRows extends React.Component{
    render() {
        return(
            <div className='contentRows'>
                {this.props.sortFunc}
            </div>
        )
    }
}

export default ContentRows