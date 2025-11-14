import fs from 'fs'

let handler = async (m, { conn, usedPrefix}) => {
  const delay = ms => new Promise(res => setTimeout(res, ms))
  let taguser = '@' + m.sender.split('@')[0]

  let tags = {
  info: '📘 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝗰𝗶𝗼́𝗻',
  anime: '🎎 𝗔𝗻𝗶𝗺𝗲 & 𝗪𝗮𝗶𝗳𝘂𝘀',
  buscador: '🔍 𝗕𝘂𝘀𝗰𝗮𝗱𝗼𝗿𝗲𝘀',
  downloader: '📥 𝗗𝗲𝘀𝗰𝗮𝗿𝗴𝗮𝘀',
  jutsus: '🥷 𝗝𝘂𝘁𝘀𝘂𝘀 𝗡𝗮𝗿𝘂𝘁𝗼',
  economy: '💰 𝗘𝗰𝗼𝗻𝗼𝗺𝗶́𝗮 & 𝗝𝘂𝗲𝗴𝗼𝘀',
  fun: '🎮 𝗝𝘂𝗲𝗴𝗼𝘀 𝗗𝗶𝘃𝗲𝗿𝘁𝗶𝗱𝗼𝘀',
  group: '👥 𝗙𝘂𝗻𝗰𝗶𝗼𝗻𝗲𝘀 𝗱𝗲 𝗚𝗿𝘂𝗽𝗼',
  ai: '🤖 𝗜𝗻𝘁𝗲𝗹𝗶𝗴𝗲𝗻𝗰𝗶𝗮 𝗔𝗿𝘁𝗶𝗳𝗶𝗰𝗶𝗮𝗹',
  game: '🎲 𝗝𝘂𝗲𝗴𝗼𝘀 𝗖𝗹𝗮́𝘀𝗶𝗰𝗼𝘀',
  serbot: '🧩 𝗦𝘂𝗯-𝗕𝗼𝘁𝘀',
  main: '📌 𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀 𝗣𝗿𝗶𝗻𝗰𝗶𝗽𝗮𝗹𝗲𝘀',
  nable: '⚙️ 𝗔𝗰𝘁𝗶𝘃𝗮𝗿 / 𝗗𝗲𝘀𝗮𝗰𝘁𝗶𝘃𝗮𝗿',
  nsfw: '🔞 𝗡𝗦𝗙𝗪',
  owner: '👑 𝗗𝘂𝗲𝗻̃𝗼 / 𝗔𝗱𝗺𝗶𝗻',
  sticker: '🖼️ 𝗦𝘁𝗶𝗰𝗸𝗲𝗿𝘀 & 𝗟𝗼𝗴𝗼𝘀',
  herramientas: '🛠️ 𝗛𝗲𝗿𝗿𝗮𝗺𝗶𝗲𝗻𝘁𝗮𝘀'
  }

  let header = '╭───〔 %category 〕───╮'
  let body = '│ ✦ %cmd'
  let footer = '╰────────────────────╯'
  let after = `\n🌸 𝙄𝙩𝙖𝙘𝙝𝙞-𝘽𝙤𝙩-𝙈𝘿 | 𝘽𝙧𝙖𝙮𝙖𝙣 𝙐𝙘𝙝𝙞𝙝𝙖 🌸`

  let user = global.db.data.users[m.sender]
  let nombre = await conn.getName(m.sender)
  let premium = user.premium? '✅ Sí': '❌ No'
  let limite = user.limit || 0
  let totalreg = Object.keys(global.db.data.users).length
  let muptime = clockString(process.uptime())

  function clockString(seconds) {
    let h = Math.floor(seconds / 3600)
    let m = Math.floor(seconds % 3600 / 60)
    let s = Math.floor(seconds % 60)
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

  let infoUser = `
🌟 ¡Hola, *${nombre}*! Bienvenid@ a *Itachi-Bot-MD* 🌟

📊 Tu estado actual:
╭───────────────
│ 👤 Usuario: ${nombre}
│ 💎 Premium: ${premium}
│ 🎯 Límite: ${limite}
│ ⏱️ Activo: ${muptime}
│ 🌍 Usuarios totales: ${totalreg}
╰───────────────
`.trim()

  let commands = Object.values(global.plugins).filter(v => v.help && v.tags).map(v => {
    return {
      help: Array.isArray(v.help)? v.help: [v.help],
      tags: Array.isArray(v.tags)? v.tags: [v.tags]
}
})

  let menu = []
  for (let tag in tags) {
    let comandos = commands
.filter(command => command.tags.includes(tag))
.map(command => command.help.map(cmd => body.replace(/%cmd/g, usedPrefix + cmd)).join('\n'))
.join('\n')
    if (comandos) {
      menu.push(header.replace(/%category/g, tags[tag]) + '\n' + comandos + '\n' + footer)
}
}

  let finalMenu = infoUser + '\n\n' + menu.join('\n\n') + after

  await conn.sendMessage(m.chat, {
    video: { url: 'https://raw.githubusercontent.com/El-brayan502/dat3/main/uploads/899fc7-1762129754657.mp4'},
    gifPlayback: true,
    caption: finalMenu,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363417186717632@newsletter',
        newsletterName: 'Itachi-Bot-MD | Channel',
        serverMessageId: -1
},
      externalAdReply: {
        title: '🌴 Itachi-Bot-MD 🌴',
        body: 'Tu asistente confiable | By Brayan Uchiha',
        thumbnailUrl: 'https://chat.whatsapp.com/E6bm08DbKnB84LhBFQGUUr',
        thumbnail: await (await fetch(icono)).buffer(),
        sourceUrl: 'https://chat.whatsapp.com/E6bm08DbKnB84LhBFQGUUr',
        mediaType: 1,
        showAdAttribution: false
}
}
}, { quoted: m})

  await delay(100)
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú']
handler.register = true

export default handler
