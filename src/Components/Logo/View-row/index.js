import React from 'react'
import moment from 'moment'

export default function ViewRow () {
    function nowTime() {
        return (
            moment().format('Do MMMM YYYY')
        )
    }
    return (
        <div className='viewRow'>
            <span>Today is {nowTime()}, {moment().format('dddd')}</span>
        </div>

    )
}