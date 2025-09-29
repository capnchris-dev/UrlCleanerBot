import { FLAGGED_PARAMS } from "./flagged-params";

export function generateWarnMessage(messageContent: string) {
  if (hasUrl(messageContent)) {
    const flaggedParams = findFlaggedParams(messageContent);
    if (flaggedParams.length > 0) {
      return `This message contains a url with the flagged param(s):${flaggedParams.map(
        (param) => " " + param
      )}`;
    }
  }
  return "";
}

function hasUrl(messageContent: string) {
  return messageContent?.includes("http");
}

function findFlaggedParams(messageContent: string) {
  const urlFound = findUrl(messageContent);
  const foundFlaggedParams = [];
  if (urlFound) {
    const searchParams = urlFound.searchParams;

    for (const [key] of searchParams) {
      if (FLAGGED_PARAMS.includes(key)) {
        foundFlaggedParams.push(key);
      }
    }
  }
  return foundFlaggedParams;
}

function findUrl(messageContent: string) {
  const words = messageContent.split(" ");
  for (const word of words) {
    try {
      const potentialUrl = new URL(word);
      return potentialUrl;
    } catch (e) {}
  }
}
