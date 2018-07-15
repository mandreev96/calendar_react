import React from 'react'
import './styles.css'

class ButtonsMonth extends React.Component{

    render(){
        return (
            <div className='buttonsMonth'>
                <div className='button' onClick={this.props.onClickLeftMonth}>
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </div>
                <div className='buttonText'>{this.props.buttonTextMonth}</div>
                <div className='button' onClick={this.props.onClickRightMonth}>
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </div>
            </div>
        )
    }
}

export default ButtonsMonth