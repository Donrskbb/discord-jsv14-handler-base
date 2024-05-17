## Setup
```bash
npm install
```
```bash
npm i -g --add-python-to-path --vs2015 --production windows-build-tools
```
```bash
node bot
```

## Usage

Deploy commands:
> NOTE: max 200 Command per day is the limit.

```bash
npm run deploy
```

**Command Folder Structure:**
- `context` folder contains the Context Menu commands.
- `general` and other folders are slash commands.

## 📚 Guides
- [Creating slash commands](https://discordjs.guide/creating-your-bot/slash-commands.html)
- [Command response methods](https://discordjs.guide/slash-commands/response-methods.html)
- [Handling Commands](https://discordjs.guide/creating-your-bot/command-handling.html#command-handling)