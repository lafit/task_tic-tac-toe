class User {
    constructor(data) {
        this.id = data.id
        this.name = data.name     
        this.gameToken = data.gameToken     
        this.initToken(data.token)
    }

    generateToken() {
        return (new Date()).getMilliseconds()+'_'+Math.random(1000);
    }

    initToken(token) {
        this.token = token ? token : this.generateToken()
    }

    getData() {
        return {
            id: this.id,
            name: this.name,
            token: this.token,
            gameToken: this.gameToken
        }
    }

    isRightToken(token) {
        return token == this.token
    }
}

module.exports = User; 