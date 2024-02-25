# RSSchool NodeJS websocket task

## Installation

1. Clone/download repo.
   `npm install`

## Usage

**Development**

1. `npm run start:http`

- App served @ `http://localhost:8181` with nodemon

2. `npm run start:wss`

- WebSocketServer served @ `ws://localhost:3000` with nodemon

**Note**: Http and WebSocket servers should be started in different terminals

**Production**

1. `npm run build`

- Creates http & wss builds

2. `npm run start:http:prod`

- App served @ `http://localhost:8181` without nodemon

3. `npm run start:wss:prod`

- WebSocketServer served @ `ws://localhost:3000` without nodemon

**Note**: Http and WebSocket servers must be started in different terminals
