import React from 'react'
import './styles.css'
import EditRow from './EditRow/index'
import ContentRows from './ContentRows/index'

class TasksTable extends React.Component{

    render() {
        return(
            <div className='tasksTable'>
                <EditRow    newTask={this.props.addRow}
                            deleteTask={this.props.deleteTask}
                            inputBox={this.props.inputBox}
                            changeTask={this.props.changeTask}
                            placeholder={this.props.placeholder}/>
                <ContentRows sortFunc={this.props.sortFunc}/>
            </div>
        )
    }
}




export default TasksTable