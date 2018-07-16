import React from 'react'
import moment from 'moment'

class ViewRow extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            nowTime: moment().format('LTS')
        }
    }
    updateTime() {
        this.setState({
            nowTime: moment().format('LTS')
        })
    }
    componentDidMount() {
        this.updateId = setInterval(
            () => this.updateTime(), 1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.updateId)
    }


    render() {
        return(
            <div className='viewRow'>
                <span>Today is {moment().format('Do MMMM YYYY')}, {moment().format('dddd')}, now {this.state.nowTime}</span>
            </div>
        )
    }
}

export default ViewRow

