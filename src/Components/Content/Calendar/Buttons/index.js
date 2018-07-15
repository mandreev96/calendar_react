import React from 'react';
import './styles.css'
import ButtonsMonth from "./Buttons-Month/index"
import ButtonsYear from './Buttons-Year/index'


class Buttons extends React.Component{
    render(){
        return (
            <div className='buttons'>
                <ButtonsMonth   onClickLeftMonth={this.props.onClickLeftMonth}
                                onClickRightMonth={this.props.onClickRightMonth}
                                buttonTextMonth={this.props.buttonTextMonth}/>
                <ButtonsYear    onClickLeftYear={this.props.onClickLeftYear}
                                onClickRightYear={this.props.onClickRightYear}
                                buttonTextYear={this.props.buttonTextYear}/>
            </div>
        )
    }
}

export default Buttons