import { Events, Interaction } from 'discord.js';
import interactionCreate from './interaction-create'
import messageCreate from './message-create'
import ready from './ready'

export type Event<T> = {
  name: Events;
  once: boolean;
  execute(args: T): Promise<void> | void;
};

export const events = [
    interactionCreate,
    messageCreate,
    ready,
]