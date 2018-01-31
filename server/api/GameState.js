const STATE_READY = 'ready'
const STATE_PLAYING = 'playing'
const STATE_DONE = 'done'

class GameState {

    constructor(data) {
        this.gameToken = data.gameToken
        this.idOwner = data.idOwner
        this.idOpponent =  data.idOpponent
        this.ownerName =  data.ownerName ? data.ownerName : null
        this.opponentName =  data.opponentName ? data.opponentName : null
        this.idWhoTurn = data.idWhoTurn        
        this.gameDuration = data.gameDuration        
        this.field = data.field
        this.idWinner = data.idWinner
        this.state = data.state ? data.state : null
    }

    getGameState() {
        if(this.state){
            return this.state
        }

        if(this.idWinner) {
            this.setStateDone()
            return this.state
        }
        if(this.idOpponent && this.idOwner) {
            this.setStatePlaying()
            return this.state
        }
        if(this.idOwner) {
            this.setStateReady()
            return this.state
        }
    }

    setStateDone() {
        this.state = STATE_DONE
    }

    setStateReady() {
        this.state = STATE_READY
    }

    setStatePlaying() {
        this.state = STATE_PLAYING
    }

    isStateDone() {
        return this.state == STATE_DONE
    }

    generateGameToken() {
        this.gameToken =  (new Date()).getMilliseconds()+'_'+Math.random(1000);
    }

    getWinnerOwnerOrOpponent() {
        if(this.idWinner) {
            return this.idWinner == this.idOwner ? 'owner' : 'opponent'    
        }
        if(this.isStateDone() && !this.idWinner) {
            return 'draw'
        }
        return null
        
    }

    changePlayer() {        
        this.idWhoTurn = (this.idWhoTurn == this.idOwner) ? this.idOpponent : this.idOwner
    }

    checkIsWinner() {
        const winnerCombine = [
            [[0, 0],[0, 1],[0, 2]],
            [[0, 0],[1, 1],[2, 2]],
            [[0, 0],[1, 0],[2, 0]],
            [[1, 0],[1, 1],[1, 2]],
            [[2, 0],[2, 1],[2, 2]],
            [[0, 1],[1, 1],[2, 1]],
            [[0, 2],[1, 2],[2, 2]],
            [[2, 0],[1, 1],[0, 2]]
        ]
        
        let stepFieldSimbol = this.getStepSymbol()

        for(let index = 0; index< winnerCombine.length; index++) {
            let row_0 = winnerCombine[index][0][0]
            let col_0 = winnerCombine[index][0][1]
            let row_1 = winnerCombine[index][1][0]
            let col_1 = winnerCombine[index][1][1]
            let row_2 = winnerCombine[index][2][0]
            let col_2 = winnerCombine[index][2][1]
            if(this.field[row_0][col_0] == stepFieldSimbol &&
                this.field[row_1][col_1] == stepFieldSimbol &&
                this.field[row_2][col_2] == stepFieldSimbol) {
                this.idWinner = this.idWhoTurn
                this.setStateDone()
                return true
            }
        }
        return false;
    }

    checkIsDraw() {        
        for(let index = 0; index < this.field.length ; index++) {
            if(this.field[index].indexOf('?') != -1) {
                return false
            }
        }

        this.setStateDone()
        return true
    }

    getStepSymbol() {
        if(this.idOwner == this.idWhoTurn) {
            return 'X'
        } else if (this.idOpponent == this.idWhoTurn) {
            return '0'
        }
        return null
    }

    doStep(row, col) {
        if(!this.idWinner && this.field[row][col] == '?') {
            let stepFieldSimbol = this.getStepSymbol()
            if(stepFieldSimbol) {
                let rowArr = this.field[row].split('')
                rowArr[col] = stepFieldSimbol
                this.field[row] = rowArr.join('')
                this.checkIsWinner()
                this.checkIsDraw()
                this.changePlayer()
            }
        }        
    }

    getData() {
        return {            
            idWhoTurn: this.idWhoTurn,            
            field: this.field,
            idWinner:this.idWinner
        }
    }

}

module.exports = GameState; 