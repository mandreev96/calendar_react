import React from 'react'
import Row from './Row/index'
import moment from 'moment'
import Buttons from './Buttons/index'
import './styles.css'

class Calendar extends React.Component{

    showCalendar(date){
        return date.map(el => {
            return <Row date = {el} cellClickRow={this.props.cellClick} dataKey={this.props.dataKey} key={el} sendNowDay={this.props.sendNowDay}/>
        })
    }

    render(){

        return(
           <div className='calendarBox'>
               <Buttons onClickLeftMonth={this.props.clickBackMonth}
                        onClickRightMonth={this.props.clickNextMonth}
                        buttonTextMonth={moment().month(this.props.month).format('MMMM')}
                        onClickLeftYear={this.props.clickBackYear}
                        onClickRightYear={this.props.clickNextYear}
                        buttonTextYear={moment().year(this.props.year).format('YYYY')}/>
               <div className='calendar'>
                   {this.showCalendar(this.props.rowWeek)}
               </div>
           </div>
       )
    }

}


export default Calendar