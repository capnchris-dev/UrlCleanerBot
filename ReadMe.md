# Url Cleaner Discord Bot (currently v1)
v1: 
This discord bot will warn users about potential tracking parameters in urls in their messages by replying to their message with the flagged params.

v2:
This discord bot will warn users about potential tracking parameters in urls in their messages by replying to their message with the flagged params. It also includes commands to 
sanitize the url for them and configuration to enable automatic message replacement with sanitized urls.

## Setup
### Environment Variables
The bot requires the following environment variables to be set:

| Variable               | Description                |
| ---------------------- | -------------------------- |
| `URLCLEANER_TOKEN`     | Your discord bot token     |
| `URLCLEANER_CLIENT_ID` | Your discord client id     |

### Running the bot with Node/NPM
- Run the bot using ```npm run dev```
- Deploy new slash commands with ```npm run deploy-commands```

### Running the bot with Docker
- This repo contains a Dockerfile you can use to build an image and run a container
- Remember to create a .env file in the root of this project so that your environment variables are set

Example:
`docker run --env-file .env --name your_container_name docker_image_id`

## Pre-Configured Flagged Params File
This bot comes equipped with its own starting flagged-params by domain in `src/util/flagged-params.json`. Although commands are coming soon to modify this list from the bot directly, feel free to modify this file in the following format to customize:

```json
[
    {
        "domain": "test.com",
        "params": ["si"]
    },
    {
        "domain": "test2.com",
        "params": ["si"]
    }
]
```
