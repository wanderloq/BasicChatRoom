from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List

app = FastAPI()
 
connections: List[WebSocket] = []
usernames: dict = {}  

@app.websocket("/chatroom/")
async def chatroom(websocket: WebSocket): 
    await websocket.accept() 
    username = await websocket.receive_text() 
    usernames[websocket] = username
    connections.append(websocket) 
    try:
        while True: 
            message = await websocket.receive_text() 
            for connection in connections:
                if connection != websocket:
                    await connection.send_text(f"{usernames[websocket]}: {message}") 
    except WebSocketDisconnect: 
        connections.remove(websocket)
        del usernames[websocket]  
