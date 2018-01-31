import React, { Component }  from 'react'
import SVGInline from "react-svg-inline"
import { render } from 'react-dom'
import './css/cell.css'
import Cross from './images/cross.svg'
import Naught from './images/naught.svg'

class Cell extends Component {
    
    constructor(props) {
        super(props)
    }

    render() {        
        const type = this.props.type
        const shape = type == 'cross' ? Cross : (type == 'naught' ? Naught : null)
        return (
            <div className={'cell '+type}>{shape ? <SVGInline svg={shape} /> :null}</div>
            // <div className={'cell '+type}>{type ? <img src={`./images/${type}.svg`} /> : ''}</div>
        )
    }
}

export default Cell