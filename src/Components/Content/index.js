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
            choiceYear: this.nowYear
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
    }


    viewRow(nameMonth, nameYear) {
        this.startMonth = parseInt(new moment().year(nameYear).month(nameMonth).day(1).format('DD'));
        this.endMonth = parseInt(new moment().year(nameYear).month(nameMonth).endOf('month').format('DD'));
        this.rowWeek = [];
        this.sortFirstWeek = parseInt(new moment().year(nameYear).month(nameMonth).day(1).format('DD'));


        this.rowWeek[0] = []                        // Составляем первую неделю
        this.sortFirstWeek = (this.sortFirstWeek == 7) ? 7 : (this.sortFirstWeek - 7)
        this.startMonth = (this.startMonth == 7) ? 7 : (this.startMonth - 7)
        for (let k=0; k<7; k++){

            if (this.sortFirstWeek > 1) {
                this.sortFirstWeek -= 1
                this.rowWeek[0].unshift(this.sortFirstWeek)
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
                />
            </div>
        )
    }

}

// Variables
var memoryCell = 0    // Memory click on cell
var currentDate = 0,  // Current Date
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

var createRow = [{
    day: 10,
    month: 6,
    year: 2018,
    taskText: 'rabotay syka'
}]



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
}
function clickNextYear() {
    let nowYear = this.state.year
    nowYear += 1
    this.setState({
        year: nowYear
    })
    clearPointCell()
    clearCurrentDate()
}
function clickBackYear() {
    let nowYear = this.state.year
    nowYear -= 1
    this.setState({
        year: nowYear
    })
    clearPointCell()
    clearCurrentDate()
}






//TaskTable functions and variables

// Operations with tasktable and rows

var memoryRow = []
var memoryClickRow = 0;
var inputValue = '';

function addRow() {
    if ((this.state.valueText != '')&&(currentDate != 0)) {
        memoryRow.push(<BasicRow clickOnRow={this.clickOnRow}
                                 selDay={this.state.choiceDay}
                                 selMonth={this.state.choiceMonth}
                                 taskText={this.state.valueText}/>)
        this.setState({
          //  choiceDay: currentDate.selDay,
          //  choiceMonth: currentDate.selMonth,
          //  choiceYear: currentDate.selYear,
            viewRows: memoryRow
        })
        clearInputBox()
        DataCalendar.push({
            day: this.state.choiceDay,
            month: this.state.choiceMonth,
            year: this.state.choiceYear,
            id: nowId,
            taskText: this.state.valueText
        })
        nowId += 1
    }
    console.log(currentDate)
}

function clickOnRow(event) {
    let selRow = event.currentTarget
    if (memoryClickRow == selRow) {
        memoryClickRow = 0
    }
    if (selRow.getAttribute('style') !== 'background-color: purple') {
        selRow.setAttribute('style','background-color: purple')
        if (memoryClickRow != 0) {
            memoryClickRow.removeAttribute('style')
        }
        memoryClickRow = selRow
    } else {
        selRow.removeAttribute('style')
        memoryClickRow = selRow
    }
}

function deleteTask() {
    if (memoryClickRow !== 0) {
        if   (memoryClickRow.getAttribute('style') === 'background-color: purple'){
            memoryClickRow.remove()
        }
    }
    clearInputBox()
}

function inputBox(event) {
    inputValue = event.target
    this.setState({
        valueText: inputValue.value
    })
}

function clearInputBox() {
    if (inputValue.value != '') {
        inputValue.value = ''
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
    if (thisCell.getAttribute('style') !== 'background-color: hotpink') {
        thisCell.setAttribute('style','background-color: hotpink')
        if ((memoryCell != 0)) {
            clearPointCell()
        }
    } else {
        thisCell.removeAttribute('style')
        clearCurrentDate()
    }
    memoryCell = thisCell

    if (currentDate != undefined) {
        clearCreateRow()
        for (let i=0; i<DataCalendar.length; i++) {
            if ((currentDate.selDay == DataCalendar[i].day)&&(currentDate.selMonth == DataCalendar[i].month)&&((currentDate.selYear) == DataCalendar[i].year)){
                createRow.push(<BasicRow taskText={DataCalendar[i].taskText}
                                         clickOnRow={this.clickOnRow}/>)
            }
        }
        this.setState({
            viewRows: createRow
        })
    }
}



export default Content