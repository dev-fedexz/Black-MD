let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]

  if (!user.registered)
    return m.reply(`❌ 𝗡𝗼 𝘁𝗶𝗲𝗻𝗲𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼 𝗮𝗰𝘁𝗶𝘃𝗼.\n\n𝗣𝘂𝗲𝗱𝗲𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘁𝗲 𝗰𝗼𝗻:\n*${usedPrefix}verificar nombre.edad*`)

  if (!text)
    return m.reply(`⚙️ 𝗣𝗮𝗿𝗮 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 𝘁𝘂 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼, 𝗲𝘀𝗰𝗿𝗶𝗯𝗲:\n*${usedPrefix + command} ${user.name}*\n\n❗ 𝗘𝗷𝗲𝗺𝗽𝗹𝗼:\n*${usedPrefix + command} ${user.name}*`)

  if (text !== user.name)
    return m.reply(`❗ 𝗘𝗹 𝗻𝗼𝗺𝗯𝗿𝗲 𝗻𝗼 𝗰𝗼𝗶𝗻𝗰𝗶𝗱𝗲 𝗰𝗼𝗻 𝘁𝘂 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼.\n\n𝗘𝘀𝗰𝗿𝗶𝗯𝗲 𝗲𝘅𝗮𝗰𝘁𝗮𝗺𝗲𝗻𝘁𝗲:\n*${usedPrefix + command} ${user.name}*`)
    
  user.registered = false
  user.name = ''
  user.age = 0

  let caption = `
╭━━━〘 *REGISTRO ELIMINADO* 〙━━━╮
│ 🌾 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: *@${m.sender.split('@')[0]}*
│ 🕊️ 𝗘𝗹 𝗰𝗮𝗺𝗶𝗻𝗼 𝘀𝗲 𝗵𝗮 𝗿𝗲𝗶𝗻𝗶𝗰𝗶𝗮𝗱𝗼...
│ 🍃 𝗣𝘂𝗲𝗱𝗲𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘁𝗲 𝗱𝗲 𝗻𝘂𝗲𝘃𝗼
│ 💬 𝗖𝗼𝗻: *${usedPrefix}verificar nombre.edad*
╰━━━━━━━━━━━━━━━━━━━╯
> 𝗟𝗮 𝗽𝗮𝘇 𝗹𝗹𝗲𝗴𝗮 𝗰𝘂𝗮𝗻𝗱𝗼 𝗲𝗹 𝗱𝗼𝗹𝗼𝗿 𝘁𝗲𝗿𝗺𝗶𝗻𝗮... 🥀
`

  await conn.sendMessage(m.chat, {
    text: caption,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '🩸 Registro Eliminado',
        body: 'Itachi observa tu destino...',
        thumbnailUrl: 'https://chat.whatsapp.com/E6bm08DbKnB84LhBFQGUUr',
        thumbnail: await (await fetch(icono)).buffer(),
        sourceUrl: 'https://chat.whatsapp.com/E6bm08DbKnB84LhBFQGUUr',
        mediaType: 1,
        showAdAttribution: false
      }
    }
  }, { quoted: m })
}

handler.help = ['unreg']
handler.tags = ['info']
handler.command = ['unreg']

export default handler