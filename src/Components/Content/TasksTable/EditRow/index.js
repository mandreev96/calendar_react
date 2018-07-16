import React from 'react'
import './styles.css'

class EditRow extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className='editRow'>
                <i className="fa fa-calendar-plus-o editRow-add" aria-hidden="true" onClick={this.props.newTask}></i>
                <input type="text" placeholder={this.props.placeholder} onChange={this.props.inputBox} id='input'/>
                <span className='reminder' style={{display: this.props.remindState}}>{this.props.remind}</span>
                <i className="fa fa-pencil-square-o editRow-edit" aria-hidden="true" onClick={this.props.changeTask}></i>
                <i className="fa fa-minus-square editRow-del" aria-hidden="true" onClick={this.props.deleteTask}></i>
            </div>
        )
    }

}

export default EditRow