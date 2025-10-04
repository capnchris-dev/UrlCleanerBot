import { Client, Events } from 'discord.js'
import { Event } from '.';

export default {
    name: Events.ClientReady,
    once: true,
    execute(client:Client) {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    },
} as Event<Client>;
