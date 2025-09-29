# Url Cleaner Discord Bot (currently v1)
v1: 
This discord bot will warn users about potential tracking parameters in urls in their messages by replying to their message with the flagged params.

v2:
This discord bot will warn users about potential tracking parameters in urls in their messages by replying to their message with the flagged params. It also includes commands to 
sanitize the url for them and configuration to enable automatic message replacement with sanitized urls.

## Setup
- Create a config.json in the root of this project with the following:
```
{
    "token": "your-token-goes-here"
}
```
- Run the bot using ```npm run dev```

## Commands (Todo)
- [] Clean link/message

## Todo
- [x] Scan on message for urls
    - [x] Check if urls have params
        - [x] If so, check if params are in flagged params list, warn user
        - [] v2: offer user option to clean url for them
            - []: bot sanitizes message for user automatically and deletes old message
                - []: configuration to replace or warn

            - []: slash command to send a message with sanitized url
