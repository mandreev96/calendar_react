import React from 'react'
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