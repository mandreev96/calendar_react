import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import './styles.css'

class ButtonsYear extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className='buttonsYear'>
                <div className='button' onClick={this.props.onClickLeftYear}>
                    <i className="fa fa-angle-double-left" aria-hidden="true"></i>
                </div>
                <div className='buttonText'>{this.props.buttonTextYear}</div>
                <div className='button' onClick={this.props.onClickRightYear}>
                    <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                </div>
            </div>
        )
    }
}

export default ButtonsYear