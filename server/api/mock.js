var gameListState = new Map()
var userList = new Map()

userList
    .set(1, {
        id: 1,        
        userToken: null,
        gameToken: null,
        name: 'Alexander'        
    })
    .set(2, {
        id: 2,
        userToken: null,
        gameToken: '123abc',
        name: 'Criss Parrotisse'        
    })
    .set(3, {
        id: 3,
        userToken: null,
        gameToken: '124abc',
        name: 'Man Rouse'        
    })
    .set(4, {
        id: 4,
        userToken: null,
        gameToken: '125abc',
        name: 'Jason Moore'        
    })
    .set(5, {
        id: 5,
        userToken: null,
        gameToken: '126abc',
        name: 'Clark Fran'        
    })
    .set(6, {
        id: 6,
        userToken: null,
        gameToken: '127abc',
        name: 'Chuck Norris'        
    })
    .set(7, {
        id: 7,
        userToken: null,
        gameToken: '127abc',
        name: 'Jerry Berry'        
    })
    .set(8, {
        id: 8,
        userToken: null,
        gameToken: '128abc',
        name: 'Morris Noore'        
    })
    .set(9, {
        id: 9,
        userToken: null,
        gameToken: '128abc',
        name: 'Block Rob'        
    })
    .set(10, {
        id: 10,
        userToken: null,
        gameToken: '129abc',
        name: 'Rabbit'        
    })
    .set(11, {
        id: 11,
        userToken: null,
        gameToken: '129abc',
        name: 'Jane Simon'        
    })
    .set(12, {
        id: 12,
        userToken: null,
        gameToken: '130abc',
        name: 'Apply C'        
    })
    .set(13, {
        id: 13,
        userToken: null,
        gameToken: '130abc',
        name: 'Tom Wayne'        
    })
    .set(14, {
        id: 14,
        userToken: null,
        gameToken: '131abc',
        name: 'Jonny B'        
    })
    .set(15, {
        id: 15,
        userToken: null,
        gameToken: '131abc',
        name: 'Tomme Lee'        
    })
    .set(16, {
        id: 16,
        userToken: null,
        gameToken: '132abc',
        name: 'Jonnatan Broock'        
    })
    .set(17, {
        id: 17,
        userToken: null,
        gameToken: '132abc',
        name: 'Tommy Lee'        
    })

gameListState
    .set('123abc', {
        'gameToken': '123abc',
        'idOwner': 2,
        'idOpponent': null,
        'idWhoTurn':2,        
        'gameDuration': 2342,        
        'field': [
            '???',    
            '???',
            '???'
        ],
        'idWinner' : null
    })
    .set('124abc', {
        'gameToken': '124abc',
        'idOwner': 3,
        'idOpponent': null,
        'idWhoTurn': 3,  
        'gameDuration': 2342,
        'field': [
            '???',    
            '???',
            '???'
        ],
        'idWinner' : null
    })
    .set('125abc', {
        'gameToken': '125abc',
        'idOwner': 4,
        'idOpponent': null,
        'idWhoTurn': 4,  
        'gameDuration': 2342,
        'field': [
            '???',    
            '???',
            '???'
        ],
        'idWinner' : null
    })
    .set('126abc', {
        'gameToken': '126abc',
        'idOwner': 5,
        'idOpponent': null,
        'idWhoTurn': 5,  
        'gameDuration': 2342,
        'field': [
            '???',
            '???',
            '???'
        ],
        'idWinner' : null
    })
    .set('127abc', {
        'gameToken': '127abc',
        'idOwner': 6,
        'idOpponent': 7,
        'idWhoTurn': 6,  
        'gameDuration': 2342,
        'field': [
            'X?0',
            '???',
            '???'
        ],
        'idWinner' : null
    })
    .set('128abc', {
        'gameToken': '128abc',
        'idOwner': 8,
        'idOpponent': 9,
        'idWhoTurn': 8,  
        'gameDuration': 2342,
        'field': [
            'XX0',
            '???',
            '???'
        ],
        'idWinner' : null
    })
    .set('129abc', {
        'gameToken': '129abc',
        'idOwner': 10,
        'idOpponent': 11,
        'idWhoTurn': 11,  
        'gameDuration': 2342,
        'field': [
            'XX0',
            '??0',
            '??X'
        ],
        'idWinner' : null
    })
    .set('130abc', {
        'gameToken': '130abc',
        'idOwner': 12,
        'idOpponent': 13,
        'idWhoTurn': 12,  
        'gameDuration': 2342,
        'field': [
            'XX0',
            '??0',
            '??X'
        ],
        'idWinner' : null
    })
    .set('131abc', {
        'gameToken': '131abc',
        'idOwner': 14,
        'idOpponent': 15,
        'idWhoTurn': null,  
        'gameDuration': 2342,
        'field': [
            'XX0',
            '??0',
            'X?0'
        ],
        'idWinner' : 15
    })
    .set('132abc', {
        'gameToken': '132abc',
        'idOwner': 16,
        'idOpponent': 17,
        'idWhoTurn': null,  
        'gameDuration': 2342,
        'field': [
            'XX0',
            '0X0',
            '??X'
        ],
        'idWinner' : 16
    })    
var newGame = {
    "status": "ok",
    code:0,
    "accessToken": "768b762c8c28",
    "gameToken": "223abc"
}
    
module.exports = {
	gameListState: gameListState,
    newGame: newGame,
    userList: userList
}