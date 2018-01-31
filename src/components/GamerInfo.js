import React, { Component} from 'react'
import Cell from './Cell'

class GamerInfo extends Component {

    constructor(props){
        super(props)
    }
    

    render() {
        const { name, type, isWinner, isActive } = this.props

        return (
            <div className={'gamer ' +type + (isWinner ? ' winner' : '') }>
                <div className={isActive ? 'active' : ''}>
                    <span>{name}</span>
                    <Cell type={type} />
                </div>
            </div>
        )
    }
    
}



export default GamerInfo