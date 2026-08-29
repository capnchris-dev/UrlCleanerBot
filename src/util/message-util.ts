import { Message } from "discord.js";
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
      isSanitizedMessage = true;
    }
    newMessage += " " + parsedWord

    if(isSanitizedMessage){
      overrideMessage(originalMessage, newMessage);
    }
  });
  
}

function overrideMessage(originalMessage: Message, newMessage: string): void {
  console.log(`Sanitized message: ${newMessage}`);
  originalMessage.client.channels.cache.get(originalMessage.channelId).send(newMessage);
  console.log(`Original message: ${originalMessage.content}`);
    if(originalMessage.deletable){
      console.log(`Deleting original message: ${originalMessage.content}`);
      originalMessage.delete()
    }
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
  // remove the flagged params from the url and return the sanitized url
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
    } catch (e) {}
  }
}
