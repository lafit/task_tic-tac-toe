let router = require('express').Router();
let mocks = require('./mock');
let assign = require('object-assign');
let User  = require('./User');
let GameState  = require('./GameState');
let gameListState = mocks.gameListState;
let userList = new Map();
let maxUserId = 0;

initUserList()
initGameListState()

router.get('/games/list', function (req, res, next) {
    let games = []
    gameListState.forEach(gameStateData => {
        
        let gameState = new GameState(gameStateData)
        games.push({
            gameToken: gameState.gameToken,
            owner: gameState.ownerName,
            opponent: gameState.opponentName,
            size: 3,
            gameDuration: gameState.gameDuration ? gameState.gameDuration : 0,
            gameResult: gameState.getWinnerOwnerOrOpponent(),
            state: gameState.getGameState()
        })
    })
    res.json(games)
    //res.json({gamesState: JSON.stringify([...gameListState]), games: games})
});


router.post('/games/join', function (req, res, next) {    
	let body = req.body;	
    let gameToken = body.gameToken
    let userId = +body.userId
    let userToken = body.userToken

    let user = getUserById(userId)

    if(!user) {
        res.status(404).json({error: "user not found"});
    }

    if(!user.isRightToken(userToken)) {
        res.status(403).json({error: "user wrong access token"});
    }

    let gameState = gameListState.get(gameToken)

    if(gameState.idOwner != user.id && !gameState.idOpponent) {
        gameState.idOpponent = user.id
        gameState.opponentName = user.name        
    }
    
    user.gameToken = gameToken
    userList.set(user.id, user)
    gameListState.set(gameToken, gameState)

	res.json(gameState)    
});

router.post('/games/new', function (req, res, next) {    
	let body = req.body;	
    let gameToken = body.gameToken
    let userId = +body.userId
    let userToken = body.userToken

    let user = getUserById(userId)

    if(!user) {
        res.status(404).json({error: "user not found"});
    }

    if(!user.isRightToken(userToken)) {
        res.status(403).json({error: "user wrong access token"});
    }

    let gameState = new GameState({
        'gameToken': null,
        'idOwner': user.id,
        'ownerName': user.name,
        'idOpponent': null,
        'idWhoTurn':user.id,        
        'gameDuration': 0,        
        'field': [
            '???',    
            '???',
            '???'
        ],
        'idWinner' : null
    })
    gameState.generateGameToken()  
    user.gameToken = gameState.gameToken
    userList.set(user.id, user)
    gameListState.set(gameState.gameToken, gameState)
    
	res.json(gameState)    
});

router.get('/games/state/:gameToken', function (req, res, next) {
    let gameToken = req.params.gameToken
    let gameState = gameListState.get(gameToken)
    res.json(gameState)
});

router.get('/games/test', function (req, res, next) {
    let row = 1
    let col = 1

    let gameStateData = gameListState.get('127abc')
    let gameState = new GameState(gameStateData)

    const winnerCombine = [
        [[0, 0],[0, 1],[0, 2]],
        [[0, 0],[1, 0],[2, 0]],
        [[0, 0],[1, 1],[2, 2]],
        [[1, 0],[1, 1],[1, 2]],
        [[2, 0],[2, 1],[0, 2]],
        [[0, 1],[1, 1],[2, 1]],
        [[0, 2],[1, 2],[2, 2]],
        [[2, 0],[1, 1],[0, 0]]
    ]

    let field = ["XX0","??0","???"];
    let stepFieldSimbol = '0';
    let results = []

    let draw = () => {
        field.map((stroka) => {
            if(stroka.indexOf('?') != -1){
                results.push('_no')
                return;
            }
        })
        results.push('_yes')
    }

    // field = ["XX0","000","000"];
    draw();


	res.json(results)
});

router.get('/games/test_login', function (req, res, next) {
   const users = []
   userList.forEach(user => {
       users.push(user)
   });
   res.json(users) 
});

router.post('/games/do_step', function (req, res, next) {    
	let body = req.body;	
    let gameToken = body.gameToken
    let userId = +body.userId
    let userToken = body.userToken
    let row = body.row
    let col = body.col

    let user = getUserById(userId)

    if(!user) {
        res.status(404).json({error: "user not found"});
    }

    if(!user.isRightToken(userToken)) {
        res.status(403).json({error: "user wrong access token"});
    }
    
    let gameStateData = gameListState.get(gameToken)
    let gameState = new GameState(gameStateData)

    if(user.id == gameState.idWhoTurn) {
        gameState.doStep(row, col)
        gameListState.set(gameToken, gameState)
    }

	res.json(gameState.getData())    
});

router.post('/games/get_user', function (req, res, next) {
    let body = req.body;    
    let userId = +body.userId
    let userToken = body.userToken

    let user = getUserById(userId)
    
    if(!user) {
        res.status(404).json({error: "user not found"});
    }    
    
    if(!user.isRightToken(userToken)) {
        res.status(403).json({error: "user wrong access token"});
    }
    
	res.json(user.getData())    
});

router.post('/games/set_new_user', function (req, res, next) {    
	let body = req.body;	
    let name = body.name    

    let user = new User({id: ++maxUserId, name: name})

	res.json(user.getData())    
});


function getUserById(userId) {   
    return userList.get(userId);
}

function initUserList() {
    mocks.userList.forEach(userData => {
        if(userData.id > maxUserId) {
            maxUserId = userData.id
        }

      userList.set(userData.id, new User(userData))
    });
    
}

function initGameListState() {
    gameListState.forEach(gameStateData => {
        let owner = getUserById(gameStateData.idOwner)
        gameStateData.ownerName = owner.name  
        if(gameStateData.idOpponent) {            
            let opponent = getUserById(gameStateData.idOpponent)            
            if(opponent) {                   
                gameStateData.opponentName = opponent.name           
            }
        }
        
        let gameState = new GameState(gameStateData)

        gameListState.set(gameState.gameToken, gameState)
        
    });
}
module.exports = router; 