/**
 * Extiende la conexión con funciones personalizadas
 * Compatible con el cualquier baileys 
 * El bot detecta en grupos con @lid
 * CREATOR BRAYANX330 | ALIAS NAGATO
 */

import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏
 
global.owner = [
  ['5491124918653', ' 𝘊𝘳𝘦𝘢𝘥𝘰𝘳 🌾', true],
  ['50231458537', 'BrayanX330 👑', true],
  ['573244278232', '𝖧𝖺𝗌𝗁𝗂𝗋𝖺𝗆𝖺', true],
];

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.mods = ['5491124918653']

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.packname = 'Shadow`S - IA'
global.botname = '𝙎𝙝𝙖𝙙𝙤𝙬 - 𝘽𝙤𝙩'
global.author = '🄲 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘋𝘦𝘷-𝘧𝘦𝘥𝘦𝘹𝘺𝘻'
global.dev = '🄲 𝘔𝘢𝘥𝘦 𝘣𝘺 𝘥𝘦𝘷-𝘧𝘦𝘥𝘦𝘹𝘺𝘻'
global.textbot = 'Ｓｈａｄｏｗ`Ｓ - Ｂｏｔ'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

// === INPORTANTE ===
global.namew = 'Shadow`𝐒 - 𝐁𝐨𝐭'
global.namev = '𝙎𝙝𝙖𝙙𝙤𝙬`𝙎 - 𝘽𝙤𝙩'
global.erorr = 'ᴇʀʀᴏʀ ɴᴏ ᴘᴜᴇᴅᴇs ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ 🚫'
global.erorr1 = 'ᴅᴇɴᴇɢᴀᴅᴏ ɴᴏ ᴘᴜᴇᴅᴇs ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ 🚫'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17' 
global.languaje = 'Español'
global.vs = '2.2.0'
global.vsJB = '5.0'
global.nameqr = 'Shadow - Bot'
global.namebot = 'Shadow`S - Bot'
global.sessions = 'ItachiSessions'
global.jadi = 'jadibts' 
global.ItachiJadibts = true

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.moneda = 'Yenes' // moneda principal 

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.catalogo = fs.readFileSync('./src/shadow.jpg');

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

let catalogo2;
try {
  catalogo2 = fs.readFileSync('./src/catalogo.png');
} catch (error) {
  console.log('Warning: ./src/catalogo.png not found, using catalogo as fallback');
  catalogo2 = catalogo; // Using the existing 'catalogo' variable as fallback
}
global.photoSity = [catalogo2]

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.ch = {
  ch1: '120363417186717632@newsletter',
}

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   


global.multiplier = 69
global.maxwarn = '3'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
