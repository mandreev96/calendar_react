import React from 'react'
import Calendar from './Calendar/index'
import TasksTable from './TasksTable/index'
import './styles.css'
import BasicRow from '../Content/TasksTable/ContentRows/BasicRow/index'
import moment from 'moment'
import DataCalendar from './data'

class Content extends React.Component{
    constructor(props) {
        super(props)
        this.nowMonth = parseInt(moment().format('MM')) - 1
        this.nowYear = parseInt(moment().format('YYYY'))
        this.nowDay = parseInt(moment().format('DD'))
        this.state = {
            numRows: 0,
            viewRows: [],
            month: this.nowMonth,
            year: this.nowYear,
            valueText: '',
            choiceDay: this.nowDay,
            choiceMonth: this.nowMonth,
            choiceYear: this.nowYear,
            placeholder: 'Insert your task...'
        }

        // TableTask functions
        this.addRow = addRow.bind(this)
        this.clickOnRow = clickOnRow.bind(this)
        this.deleteTask = deleteTask.bind(this)
        // CalendarBox functions
        this.clickBackMonth = clickBackMonth.bind(this)
        this.clickNextMonth = clickNextMonth.bind(this)
        this.clickBackYear = clickBackYear.bind(this)
        this.clickNextYear = clickNextYear.bind(this)
        this.cellClick = cellClick.bind(this)
        this.inputBox = inputBox.bind(this)
        this.sort = sort.bind(this)
        this.clearTableTasks = clearTableTasks.bind(this)
        this.changeTask = changeTask.bind(this)
        this.changePH = changePH.bind(this)
        this.changePHatTransit = changePHatTransit.bind(this)
        this.reminder = reminder.bind(this)
    }


    viewRow(nameMonth, nameYear) {
        this.startMonth = parseInt(new moment().year(nameYear).month(nameMonth).day(1).format('DD'))-7;
        this.endMonth = parseInt(new moment().year(nameYear).month(nameMonth).endOf('month').format('DD'));
        this.rowWeek = [];
        this.sortFirstWeek = parseInt(new moment().year(nameYear).month(nameMonth).day(1).format('DD'))-7;


        this.rowWeek[0] = []   // Составляем первую неделю
        if (this.sortFirstWeek == 9) {
            this.rowWeek[0] = [1]
            this.sortFirstWeek -= 7
            this.startMonth -= 7
        } else if (this.sortFirstWeek == 10) {
            this.rowWeek[0] = [1, 2]
            this.sortFirstWeek -= 7
            this.startMonth -= 7
        }
        else {
            for (let k=0; k<7; k++){
                if (this.sortFirstWeek > 1) {
                    this.sortFirstWeek -= 1
                    this.rowWeek[0].unshift(this.sortFirstWeek)
                }
            }
        }


        for (let j=1; j<5; j++) {                         //Составляем середину
            this.rowWeek[j] = [];
            for (let i=0; i<7; i++) {
                this.rowWeek[j].push(this.startMonth+i)
            }
            this.startMonth += 7
        }

        if (this.rowWeek[4][6] >= this.endMonth) {             //удаляем лишние дни на последней неделе
            for (let k=6; k>0; k--){
                if (this.rowWeek[4][k] > this.endMonth) {
                    delete this.rowWeek[4][k];
                }
            }
        } else {                                                  //добавляем дни на недостающую неделю
            let lastDayOnLastWeek = this.rowWeek[4][6]
            this.rowWeek[5] = []
            for (let k=lastDayOnLastWeek; k<this.endMonth; k++) {
                this.rowWeek[5].push(k+1)
            }
        }

        return (this.rowWeek)
    }

    render(){
        this.viewRow(this.state.month, this.state.year)
        return(
            <div className='content'>
                <Calendar   clickBackYear={this.clickBackYear}
                            clickNextYear={this.clickNextYear}
                            clickBackMonth={this.clickBackMonth}
                            clickNextMonth={this.clickNextMonth}
                            cellClick={this.cellClick}
                            rowWeek = {this.rowWeek}
                            month = {this.state.month}
                            year = {this.state.year}/>
                <TasksTable addRow={this.addRow}
                            deleteTask={this.deleteTask}
                            inputBox={this.inputBox}
                            inputText={this.state.valueText}
                            nameDay={this.state.month}
                            sortFunc={this.state.viewRows}
                            changeTask={this.changeTask}
                            placeholder={this.state.placeholder}
                            remind={remindText}
                            remindState={remindState}
                />
            </div>
        )
    }

}



// Variables
var memoryCell = 0    // Memory click on cell
var currentDate = {
        selDay: this.nowDay,
        selMonth: this.nowMonth,
        selYear: this.nowYear
    },  // Current Date
    nowId = 0

function currentCell(day, month, year) {            // Select current date after click on cell
    currentDate = {
        selDay: day,
        selMonth: month,
        selYear: year,
        id: nowId
    }
}



//Cleaning

function clearPointCell() {
    if (memoryCell != 0) {
        if (memoryCell.getAttribute('style') != '') {
            memoryCell.removeAttribute('style')
        }
    }
}

function clearCurrentDate() {
    currentDate = undefined
}

function clearCreateRow() {
    createRow = []
}

// Sorting and building tabletasks

var createRow = []



// CalendarBox functions and variables
// Changing months and year

function clickBackMonth() {
    let nowMonth = this.state.month
    let nowYear = this.state.year
    if (nowMonth == 0) {
        nowMonth = 11
        nowYear -= 1
    } else {
        nowMonth -= 1
    }
    this.setState({
        month: nowMonth,
        year: nowYear
    })
    clearPointCell()
    clearCurrentDate()
    this.clearTableTasks()
    this.changePHatTransit()
}
function clickNextMonth() {
    let nowMonth = this.state.month
    let nowYear = this.state.year
    if (nowMonth == 11) {
        nowMonth = 0
        nowYear += 1
    } else {
        nowMonth += 1
    }
    this.setState({
        month: nowMonth,
        year: nowYear
    })
    clearPointCell()
    clearCurrentDate()
    this.clearTableTasks()
    this.changePHatTransit()
}
function clickNextYear() {
    let nowYear = this.state.year
    nowYear += 1
    this.setState({
        year: nowYear
    })
    clearPointCell()
    clearCurrentDate()
    this.clearTableTasks()
    this.changePHatTransit()
}
function clickBackYear() {
    let nowYear = this.state.year
    nowYear -= 1
    this.setState({
        year: nowYear
    })
    clearPointCell()
    clearCurrentDate()
    this.clearTableTasks()
    this.changePHatTransit()
}






//TaskTable functions and variables

// Operations with tasktable and rows

var memoryClickRow = [0, false];
var inputValue = '';

function addRow() {
    if ((this.state.valueText != '')&&(currentDate != 0)) {
        clearInputBox()
        DataCalendar.push({
            day: this.state.choiceDay,
            month: this.state.choiceMonth,
            year: this.state.choiceYear,
            id: nowId,
            taskText: this.state.valueText,
            time: moment().format('LT')
        })
        nowId += 1
    }
    this.sort()
    this.setState({
        valueText: ''
    })
}

var idSelRow,
    selRow

function clickOnRow(event) {
    selRow = event.currentTarget
    idSelRow = selRow.id
    if (memoryClickRow[0] == selRow) {
        memoryClickRow[0] = 0
        memoryClickRow[1] = false
    }
    if (selRow.getAttribute('style') !== 'background-color: purple') {
        selRow.setAttribute('style','background-color: purple')
        if (memoryClickRow[0] != 0) {
            memoryClickRow[0].removeAttribute('style')
        }
        memoryClickRow[0] = selRow
        memoryClickRow[1] = true
    } else {
        selRow.removeAttribute('style')
        memoryClickRow[0] = selRow
    }
    this.changePH()
    this.setState({
        placeholder: placeHold
    })

}


function deleteTask() {
    if (memoryClickRow[0] !== 0) {
        if   (memoryClickRow[0].getAttribute('style') === 'background-color: purple'){
            for (let i=0; i<DataCalendar.length; i++) {
                if ((`taskNum-${DataCalendar[i].id}`) == idSelRow){
                    DataCalendar.splice(i,1)
                }
            }
            this.sort()
        }
    }
    clearInputBox()
    this.changePHatTransit()
}




function changeTask() {
    if (this.state.valueText != '') {
        for (let i=0; i<DataCalendar.length; i++) {
            if (`taskNum-${DataCalendar[i].id}`==idSelRow) {
                DataCalendar[i].taskText = this.state.valueText
            }
        }
        this.sort()
        clearInputBox()
    }
    else {

    }
}

function clearTableTasks() {
    this.setState({
        viewRows: ''
    })
}

function inputBox(event) {
    inputValue = event.target
    this.setState({
        valueText: inputValue.value
    })
}

function clearInputBox() {
    if ((inputValue.value != "")&&(inputValue != '')) {
        inputValue.value = ""
    }
}


function cellClick(event) {
    let thisCell = event.currentTarget
    if (thisCell == memoryCell) {
        memoryCell = 0
    }
    let selDay = parseInt(thisCell.innerText)
    let selMonth = this.state.month
    let selYear = this.state.year
    currentCell(selDay, selMonth, selYear)
    this.setState({
        choiceDay: selDay,
        choiceMonth: selMonth,
        choiceYear: selYear
    })
    if (thisCell.getAttribute('style') !== 'background-color: deeppink') {
        thisCell.setAttribute('style','background-color: deeppink')
        if ((memoryCell != 0)) {
            clearPointCell()
        }
    } else {
        thisCell.removeAttribute('style')
        clearCurrentDate()
        this.clearTableTasks()
    }
    memoryCell = thisCell
    this.sort()
    this.changePHatTransit()
}



function sort() {
    if (currentDate != undefined) {
        clearCreateRow()
        for (let i=0; i<DataCalendar.length; i++) {
            if ((currentDate.selDay == DataCalendar[i].day)&&(currentDate.selMonth == DataCalendar[i].month)&&((currentDate.selYear) == DataCalendar[i].year)){
                createRow.push(<BasicRow taskText={DataCalendar[i].taskText}
                                         clickOnRow={this.clickOnRow}
                                         time={DataCalendar[i].time}
                                         idBasicRow={DataCalendar[i].id}/>)
            }
        }
        this.setState({
            viewRows: createRow
        })
    }
}

var placeHold = 'Insert your task...'

function changePH() {
    placeHold = (placeHold == 'Insert your task...') ?  ('Change your task...') : ('Insert your task...')
    this.setState({
        placeholder: placeHold
    })
}

function changePHatTransit() {
    if (memoryClickRow[1] == true) {
        this.changePH()
        memoryClickRow[1] = false
    }
}

var remindText = 'Enter the task text'
var remindState = 'none'

function reminder() {

}





export default Content