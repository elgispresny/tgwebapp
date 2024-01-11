import { Telegraf, Markup } from 'telegraf'
import config from './config.js'

const bot = new Telegraf(config.bot_token)

bot.start((ctx) => ctx.reply('Welcome'));
bot.launch();
