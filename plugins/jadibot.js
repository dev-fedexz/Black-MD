import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path' 
import ws from 'ws';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner}) => {
const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command)  
const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command)  
const isCommand3 = /^(bots|sockets|socket)$/i.test(command)   

async function reportError(e) {
await conn.sendMessage(m.chat, { 
  text: `
╭┈ ↷
│ ✐ ꒷ꕤ💎ദ ᴇʀʀᴏʀ
│ *🔧 Ocurrió un error inesperado*
│ *📝 Detalle:* ${e.message}
│ ✦ Error » System 🅢
╰─────────────────`,
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: canalNombreM,
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: botname,
      body: dev,
      thumbnailUrl: 'https://cloudkuimages.guru/uploads/images/684d9f4d9c0b8.jpg',
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
}, { quoted: m })
console.log(e)
}

switch (true) {       
case isCommand1:
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
const path = `./${jadi}/${uniqid}`

if (!await fs.existsSync(path)) {
await conn.sendMessage(m.chat, { 
  text: `╭┈ ↷
│ ✐ ꒷ꕤ💎ദ sᴇsɪóɴ ɴᴏ ᴇɴᴄᴏɴᴛʀᴀᴅᴀ
│ *📌 Usted no tiene una sesión activa*
│ *💡 Puede crear una usando:*
│ ${usedPrefix + command}
│ 
│ *🆔 Si tiene una ID puede usar:*
│ ${usedPrefix + command} \`\`\`(ID)\`\`\`
│ ✦ Info » Session 🅢
╰─────────────────`,
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: botname,
      body: textbot,
      thumbnailUrl: 'https://cloudkuimages.guru/uploads/images/684d9f4d9c0b8.jpg',
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
}, { quoted: jadibot })
return
}
if (global.conn.user.jid !== conn.user.jid) {
await conn.sendMessage(m.chat, { 
  text: `╭┈ ↷
│ ✐ ꒷ꕤ💎ദ ᴄᴏᴍᴀɴᴅᴏ ɴᴏ ᴠáʟɪᴅᴏ
│ *⚠️ Use este comando en el Bot principal*
│ *🔗 Enlace directo:*
│ https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0
│ ✦ Error » Command 🅒
╰─────────────────`,
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: botname,
      body: textbot,
      thumbnailUrl: 'https://cloudkuimages.guru/uploads/images/684d9f4d9c0b8.jpg',
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
}, { quoted: jadibot })
} else {
await conn.sendMessage(m.chat, { 
  text: `╭┈ ↷
│ ✐ ꒷ꕤ💎ദ sᴇsɪóɴ ᴇʟɪᴍɪɴᴀᴅᴀ
│ *✅ Tu sesión como Sub-Bot se ha eliminado*
│ ✦ Info » Session 🅢
╰─────────────────`,
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: botname,
      body: textbot,
      thumbnailUrl: 'https://cloudkuimages.guru/uploads/images/684d9f4d9c0b8.jpg',
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
}, { quoted: m })}
try {
fs.rmdir(`./${jadi}/` + uniqid, { recursive: true, force: true })
await conn.sendMessage(m.chat, { 
  text: `╭┈ ↷
│ ✐ ꒷ꕤ💎ദ sᴇsɪóɴ ᴄᴇʀʀᴀᴅᴀ
│ *🗑️ Se han eliminado todos los datos*
│ *🔒 Sesión cerrada correctamente*
│ ✦ Info » Session 🅢
╰─────────────────`,
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: botname,
      body: textbot,
      thumbnailUrl: 'https://cloudkuimages.guru/uploads/images/684d9f4d9c0b8.jpg',
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
}, { quoted: jadibot })
} catch (e) {
reportError(e)
}  
break

case isCommand2:
if (global.conn.user.jid == conn.user.jid) {
await conn.sendMessage(m.chat, { 
  text: `╭┈ ↷
│ ✐ ꒷ꕤ💎ദ ᴄᴏᴍᴀɴᴅᴏ ɴᴏ ᴠáʟɪᴅᴏ
│ *❌ No puedes usar este comando aquí*
│ *ℹ️ Contacta al número principal para ser Sub-Bot*
│ ✦ Error » Command 🅒
╰─────────────────`,
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: botname,
      body: textbot,
      thumbnailUrl: 'https://cloudkuimages.guru/uploads/images/684d9f4d9c0b8.jpg',
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
}, { quoted: jadibot })
} else {
await conn.sendMessage(m.chat, { 
  text: `╭┈ ↷
│ ✐ ꒷ꕤ💎ദ ʙᴏᴛ ᴅᴇsᴀᴄᴛɪᴠᴀᴅᴏ
│ *🔌 ${botname} se ha desactivado*
│ *⚡ Conexión cerrada correctamente*
│ ✦ Info » System 🅢
╰─────────────────`,
  contextInfo: {
    mentionedJid: [m.sender],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: botname,
      body: textbot,
      thumbnailUrl: 'https://cloudkuimages.guru/uploads/images/684d9f4d9c0b8.jpg',
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
}, { quoted: jadibot })
conn.ws.close()}  
break

case isCommand3:
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];

function convertirMsADiasHorasMinutosSegundos(ms) {
var segundos = Math.floor(ms / 1000);
var minutos = Math.floor(segundos / 60);
var horas = Math.floor(minutos / 60);
var días = Math.floor(horas / 24);
segundos %= 60;
minutos %= 60;
horas %= 24;
var resultado = "";
if (días !== 0) resultado += días + " días, ";
if (horas !== 0) resultado += horas + " horas, ";
if (minutos !== 0) resultado += minutos + " minutos, ";
if (segundos !== 0) resultado += segundos + " segundos";
return resultado;
}

const message = users.map((v, index) => `╭┈ ↷
│ ✐ ꒷ꕤ💎ദ sᴜʙ-ʙᴏᴛ #${index + 1}
│ *📱 Número:* wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado
│ *👤 Nombre:* ${v.user.name || 'Sub-Bot'}
│ *⏳ Tiempo activo:* ${v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido'}
╰─────────────────`).join('\n\n');

const replyMessage = message.length === 0 ? `╭┈ ↷
│ ✐ ꒷ꕤ💎ദ sɪɴ sᴜʙ-ʙᴏᴛs
│ *⚠️ No hay Sub-Bots disponibles*
│ *🔄 Intenta más tarde*
╰─────────────────` : message;

const totalUsers = users.length;
const responseMessage = `╭┈ ↷
│ ✐ ꒷ꕤ💎ദ ʟɪsᴛᴀ ᴅᴇ sᴜʙ-ʙᴏᴛs
│ *🔢 Total conectados:* ${totalUsers || '0'}
│ 
│ *📌 Puedes pedir permiso para unir el bot a tu grupo*
│ *⚠️ El número principal no se hace responsable del uso*
╰─────────────────

${replyMessage.trim()}`.trim();

await _envio.sendMessage(m.chat, {
text: responseMessage, 
contextInfo: {
mentionedJid: [m.sender],
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: channelRD.id,
newsletterName: channelRD.name,
serverMessageId: -1,
},
forwardingScore: 999,
externalAdReply: {
title: botname,
body: 'Lista de Sub-Bots activos',
thumbnailUrl: 'https://raw.githubusercontent.com/El-brayan502/dat4/main/uploads/e45d58-1760860392824.jpg',
sourceUrl: redes,
mediaType: 1,
renderLargerThumbnail: true
}
}
}, {quoted: m })
break   
}}

handler.tags = ['serbot']
handler.help = ['sockets', 'deletesesion', 'pausarai']
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesession', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket']

export default handler