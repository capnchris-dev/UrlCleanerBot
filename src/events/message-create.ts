import { Events, Message } from "discord.js";
import { generateWarnMessage } from "../util/message-util";


module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute(message: Message) {
    const warnMessageContent = generateWarnMessage(message.content);
    if (warnMessageContent) {
      sendWarnMessage(message, warnMessageContent);
    }
  },
};

function sendWarnMessage(originalMessage: Message, warnMessageContent: any) {
  originalMessage.reply({
    content: warnMessageContent,
  });
}
