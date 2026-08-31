import { Message, TextChannel } from "discord.js";
import { getFlaggedParams } from "./flagged-params";

export function generateWarnMessage(messageContent: string): string {
  const flaggedParams = findFlaggedParams(messageContent);
  if (flaggedParams.length > 0) {
    return `This message contains a url with the flagged param(s):${flaggedParams.map(
      (param) => " " + param
    )}`;
  }
  return "";
}

export function sanitizeMessage(originalMessage: Message): void {
  let newMessage = ""
  let isSanitizedMessage = false;
  const words: string[] = originalMessage.content.split(" ");
  words.forEach(word => {
    let parsedWord = word
    if (isUrl(word)) {
      const url = new URL(word);
      parsedWord = sanitizeUrl(url);
      if (parsedWord != word) {
        isSanitizedMessage = true;
      }
    }
    newMessage += " " + parsedWord
  });

  if (isSanitizedMessage) {
    overrideMessage(originalMessage, newMessage);
  }

}

function overrideMessage(originalMessage: Message, newMessage: string): void {
  (originalMessage.channel as TextChannel).send(`${originalMessage.author} said: \n > ${newMessage}\n\n *(The original message contained a url with blocked trackers.)*`)
    .then(() => {
      if (originalMessage.deletable) {
        originalMessage.delete()
      }
    })
    .catch((e) => {
      console.log(e)
    }).finally(() => {
    });
}


function isUrl(word: string): boolean {
  try {
    new URL(word);
    return true;
  } catch (e) {
    return false;
  }
}

function sanitizeUrl(url: URL): string {
  const domain = url.hostname;
  const domainFlaggedParams = getFlaggedParams(domain);
  const searchParams = url.searchParams;
  for (const param of domainFlaggedParams) {
    if (searchParams.has(param)) {
      searchParams.delete(param);
    }
  }
  return url.toString();
}

function findFlaggedParams(messageContent: string): string[] {
  const urlFound = findUrl(messageContent);
  const foundFlaggedParams = [];
  if (urlFound) {
    const domain = urlFound.hostname;
    const domainFlaggedParams = getFlaggedParams(domain);
    const searchParams = urlFound.searchParams;

    for (const [key] of searchParams) {
      if (domainFlaggedParams.includes(key)) {
        foundFlaggedParams.push(key);
      }
    }
  }
  return foundFlaggedParams;
}

function findUrl(messageContent: string): URL | undefined {
  const words = messageContent.split(" ");
  for (const word of words) {
    try {
      const potentialUrl = new URL(word);
      return potentialUrl;
    } catch (e) { }
  }
}
