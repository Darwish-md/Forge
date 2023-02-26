# Forge

## Images:

![Dashboard](./client/imgs/DASHBOARD.jpeg)
![EloBoard](./client/imgs/EloBoard.png)
![RelationshipBoard](./client/imgs/RELATIONSHIP.png)


## API Documentation: 

### players.js

This module defines the player routes for the League of Legends leaderboard application using Node.js and Express framework.Player Routes```GET /me```

This route returns the player profile of the currently authenticated user.Request HeadersHeaderRequiredDescription```x-auth-token```YesThe JWT token obtained after authenticationResponseHTTP StatusResponse BodyDescription200Player ObjectThe player profile401Error messageUnauthorized accessExample Requestbash
```bash
GET /players/me
Content-Type: application/json
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzBhNGQ5NzE5MDQyMTU5NjU5NTZjYyIsIm5hbWUiOiJqb2huZG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.s1v6U80RLV3qyXLR5a5g5vJGkfsx04rTxZwz7soKlVo
```
Example Responsecss
```css
HTTP/1.1 200 OK
Content-Type: application/json

{
    "_id": "6130a4d971904215965956cc",
    "name": "johndoe",
    "wins": 5,
    "losses": 3,
    "rank": "Gold 4",
    "elo": 1450,
    "friends": ["612e73e35cc08c5b44c286d3"],
    "enemies": [],
    "createdAt": "2023-02-22T14:03:37.347Z",
    "updatedAt": "2023-02-24T05:46:24.792Z",
    "__v": 0
}
```
```POST /```

This route allows players to register by providing a name and password. If the registration is successful, a JWT (JSON Web Token) is generated and returned to the client.Request Body ParametersParameterTypeRequiredDescription```name```StringYesThe name of the player.```password```StringYesThe password associated with the player's account.ResponseHTTP StatusResponse BodyDescription200Player ObjectPlayer registration successful400Error messageInvalid request or player name already existsExample Requestbash

```bash
POST /players
Content-Type: application/json

{
    "name": "janedoe",
    "password": "mypassword"
}
```
Example Responsecss
```css
HTTP/1.1 200 OK
Content-Type: application/json

{
    "_id": "6130a4d971904215965956cc",
    "name": "janedoe",
    "createdAt": "2023-02-26T06:03:37.347Z",
    "updatedAt": "2023-02-26T06:03:37.347Z",
    "__v": 0
}
```

### ranking.js

### GET /ranking/:summonerName/:year

This endpoint retrieves a player's Elo rating for the given year. It takes in the player's summoner name and the year as parameters in the URL.Requestbash

Example: GET /ranking/summonerName/2022

Response 200: Successfully retrieved the player's Elo rating for the given yearcss
```css
[  {    "date": "2022-01-15T00:00:00.000Z",    "elo": 1234  },  {    "date": "2022-01-22T00:00:00.000Z",    "elo": 1245  },  {    "date": "2022-01-29T00:00:00.000Z",    "elo": 1250  },  {    "date": "2022-02-05T00:00:00.000Z",    "elo": 1256  },  {    "date": "2022-02-12T00:00:00.000Z",    "elo": 1245  }]
```

##### GET /ranking/:summonerName/:year/:month

This endpoint retrieves a player's Elo rating for the given month of the year. It takes in the player's summoner name, the year, and the month as parameters in the URL.Requestbash
```bash
GET /ranking/summonerName/2022/01
```Response200: Successfully retrieved the player's Elo rating for the given month of the yearcss
```css
[  {    "date": "2022-01-15T00:00:00.000Z",    "elo": 1234  },  {    "date": "2022-01-22T00:00:00.000Z",    "elo": 1245  },  {    "date": "2022-01-29T00:00:00.000Z",    "elo": 1250  }]
```GET /ranking/:year/:month

This endpoint retrieves the Elo ratings and statistics for all players in the given month and year. It takes in the year and the month as parameters in the URL.Requestbash
```bash
GET /ranking/2022/01
```Response200: Successfully retrieved the Elo ratings and statistics for all players in the given month and yearcss
```css
[  {    "name": "player1",    "winRate": 0.6,    "totalKills": 40,    "totalDeaths": 20,    "totalAssists": 30,    "totalGamesPlayed": 10,    "elo": 1300  },  {    "name": "player2",    "winRate": 0.5,    "totalKills": 30,    "totalDeaths": 20,    "totalAssists": 40,    "totalGamesPlayed": 8,    "elo": 1200  },  {    "name": "player3",    "winRate": 0.7,    "totalKills": 50,    "totalDeaths": 30,    "totalAssists": 20,    "totalGamesPlayed": 12,    "elo": 1350  }]
```

### relationship.js

##### suggestPlayers

Returns an array of players with similar skills to the player specified in the request parameter.URLbash
```bash
GET /suggestPlayers/:summonerName
```

Request Parameters```summonerName``` (string) - the name of the player to get recommendations forResponse

Returns an array of players with similar skills to the player specified in the request parameter.Examplebash
```bash
GET /suggestPlayers/JohnDoe
```
json:
```json
[
  {
    "name": "JaneDoe",
    "kills": 8,
    "deaths": 2,
    "assists": 12,
    "winRate": 80,
    "champion": "Zed"
  },
  {
    "name": "BobSmith",
    "kills": 6,
    "deaths": 3,
    "assists": 9,
    "winRate": 70,
    "champion": "Yasuo"
  },
  {
    "name": "AliceWong",
    "kills": 5,
    "deaths": 1,
    "assists": 14,
    "winRate": 75,
    "champion": "Akali"
  }
]
```

##### graphData

Returns the data required to draw the network graph of players with similar skills to the player specified in the request parameter.URLbash
```bash
GET /graphData/:summonerName
```
Request Parameters```summonerName``` (string) - the name of the player to get recommendations forResponse

Returns the data required to draw the network graph of players with similar skills to the player specified in the request parameter.Examplebash
```bash
GET /graphData/JohnDoe
```json
```json
{
  "nodes": [
    {"id": "JohnDoe", "group": 1},
    {"id": "JaneDoe", "group": 2},
    {"id": "BobSmith", "group": 2},
    {"id": "AliceWong", "group": 2}
  ],
  "links": [
    {"source": "JohnDoe", "target": "JaneDoe", "value": 1},
    {"source": "JohnDoe", "target": "BobSmith", "value": 1},
    {"source": "JohnDoe", "target": "AliceWong", "value": 1}
  ]
}
```

API.Endpoints 
```/stats``` 

```GET /stats/:summonerName/:year```

Get player statistics for a specific year.Request Parameters```summonerName```: The name of the player.```year```: The year for which to retrieve player statistics.Response

Returns an object with two keys:```playerStats```: The statistics of the player for the given year.```playerTotalStats```: The total statistics of the player for the given year.```GET /stats/:summonerName/:year/:month```

Get player statistics for a specific month and year.Request Parameters```summonerName```: The name of the player.```year```: The year for which to retrieve player statistics.```month```: The month for which to retrieve player statistics.Response

Returns an object with two keys:```playerStats```: The statistics of the player for the given month and year.```playerTotalStats```: The total statistics of the player for the given month and year.```/relationship``` 

```GET /relationship/suggestPlayers/:summonerName```

Suggest potential partners or enemies for a player based on their performance.Request Parameters```summonerName```: The name of the player.Response

Returns an array of suggested players and their skill level deviation from the player.```GET /relationship/graphData/:summonerName```

Get data for a network graph that shows the relationship between players.Request Parameters```summonerName```: The name of the player.Response

Returns an object with data for a network graph that shows the relationship between players.


### Auth.js

This module defines the authentication routes for the League of Legends leaderboard application using Node.js and Express framework.Authentication Route```POST /```

This route allows registered players to log in by sending their login credentials in the request body. If the credentials are valid, the server generates a JWT (JSON Web Token) which is returned to the client.

```bash
POST /auth
Content-Type: application/json

{
    "name": "johndoe",
    "password": "mysecretpassword"
}
```
Example Response

```python
HTTP/1.1 200 OK
Content-Type: application/json

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzBhNGQ5NzE5MDQyMTU5NjU5NTZjYyIsIm5hbWUiOiJqb2huZG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.s1v6U80RLV3qyXLR5a5g5vJGkfsx04rTxZwz7soKlVo
```

Functions ```validateLogin(player)```

This function validates the request body parameters for the authentication route using the Joi validation library.

The function returns a Joi validation result object, which includes an error object if the validation fails.```module.exports = router```

This exports the Express router object for use in other modules.
