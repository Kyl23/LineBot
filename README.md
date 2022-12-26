# LineBot
- A reservation system
## About
### Target
  - be a free bot, bring easily to human, who wanna use the reserve system. 
  - It also friendly to elder 
  - digitization our live
  
### FSM
![image](https://user-images.githubusercontent.com/81241494/209500813-3c78b96f-92c8-4e93-b1ab-41115571409c.png)

## Why use this bot
- it maybe clearly control the structure of staff
- after deploy it can only control through the bot with the host(admin) id

# Tech Stack
- Node.js

# Evnironment Setup
- line token in botconfig.json
```
{
    "channelId": "",
    "channelSecret": "",
    "channelAccessToken": ""
}
```
- host (change "{your host line id}") in config.json
```
{
    "admin": {
        "{your host line id}": "0000"
    },
    "staff": {
    },
    "functions": [
        {
            "type": "message",
            "label": "預約",
            "text": "預約"
        },
        {
            "type": "message",
            "label": "預約草稿",
            "text": "預約草稿"
        },
        {
            "type": "message",
            "label": "預約查詢",
            "text": "預約查詢"
        }
    ],
    "worker_functions": [
        {
            "type": "message",
            "label": "管理",
            "text": "管理"
        }
    ],
    "menu": {
        "catergory": [
            {
                "item": "price"
            }
        ]
    }
}
```

# Deploy
- npm install
- node app.js

# API 
- {ip adress}:3000/webhook/line

# Demo （it  maybe diffrent when use different id)
![image](https://user-images.githubusercontent.com/81241494/209501744-636a6b7b-4825-4fdf-973a-eaf53a2cb2d3.png)
