import { Events, Message } from "discord.js";
import { sanitizeMessage } from "../util/message-util";
import { Event } from ".";


export default {
  name: Events.MessageCreate,
  once: false,
  execute(message: Message) {
    if (message.author.id != process.env.URLCLEANER_CLIENT_ID) {
      sanitizeMessage(message);
    }
  },
} as Event<Message>;
