import fs from 'fs'

function clockString(seconds) {
  let h = Math.floor(seconds / 3600)
  let m = Math.floor(seconds % 3600 / 60)
  let s = Math.floor(seconds % 60)
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

let handler = async (m, { conn, usedPrefix }) => {
  const delay = ms => new Promise(res => setTimeout(res, ms))

  if (!global.db || !global.db.data || !global.db.data.users) {
      return conn.reply(m.chat, '❌ Error: La base de datos de usuarios no está inicializada.', m)
  }
  
  const tags = {
    'main': '🏠 ɪɴғᴏ ᴘʀɪɴᴄɪᴘᴀʟ',
    'info': '💡 ɪɴғᴏ ʏ ᴜᴛɪʟɪᴅᴀᴅᴇs',
    'group': '👥 ᴀᴅᴍɪɴɪsᴛʀᴀᴄɪóɴ ᴅᴇ ɢʀᴜᴘᴏ',
    'economy': '💰 ᴇᴄᴏɴᴏᴍíᴀ ʏ ᴊᴜᴇɢᴏs',
    'game': '🎲 ᴊᴜᴇɢᴏs ᴀᴅɪᴄɪᴏɴᴀʟᴇs',
    'fun': '✨ ғᴜɴᴄɪᴏɴᴇs ᴅɪᴠᴇʀᴛɪᴅᴀs',
    'sticker': '🖼️ ᴄʀᴇᴀᴄɪóɴ ᴅᴇ sᴛɪᴄᴋᴇʀs',
    'downloader': '📥 ᴅᴇsᴄᴀʀɢᴀs ᴍᴜʟᴛɪᴍᴇᴅɪᴀ',
    'anime': '🌸 ғᴜɴᴄɪᴏɴᴇs ᴀɴɪᴍᴇ',
    'jutsus': '🎯 ɴᴀʀᴜᴛᴏ-sʜɪᴘᴜᴅᴇɴ',
    'buscador': '🔍 ғᴜɴᴄɪᴏɴᴇs ᴅᴇ ʙúsϙᴜᴇᴅᴀ',
    'herramientas': '🛠️ ʜᴇʀʀᴀᴍɪᴇɴᴛᴀs ʏ ᴜᴛɪʟɪᴅᴀᴅᴇs',
    'ai': '🤖 ғᴜɴᴄɪᴏɴᴇs ᴅᴇ ɪɴᴛᴇʟɪɢᴇɴᴄɪᴀ ᴀʀᴛɪғɪᴄɪᴀʟ',
    'nable': '⚙️ ᴄᴏɴғɪɢᴜʀᴀᴄɪóɴ (ᴏɴ/ᴏғғ)',
    'nsfw': '🔞 ɴsғᴡ (ᴘᴇʟɪɢʀᴏsᴏ)',
    'serbot': '👑 ғᴜɴᴄɪᴏɴᴇs ᴅᴇʟ ᴊᴀᴅɪʙᴏᴛ',
    'owner': '🔥 ᴏᴘᴄɪᴏɴᴇs ᴅᴇʟ ᴘʀᴏᴘɪᴇᴛᴀʀɪᴏ',
  }

  // Estructura del menú
  const menuFormat = {
    header: '╭─「 %category 」',
    body: '│ 🪴➺ %cmd',
    footer: '╰───────────────',
    after: `> 𝖨𝗍𝖺𝖼𝗁𝗂-𝖡𝗈𝗍-𝖬𝖣 | 𝖡𝗋𝖺𝗒𝖺𝗇 𝖴𝖼𝗁𝗂𝗁𝖺`
  }

  // --- Datos del Usuario y Bot ---
  const user = global.db.data.users[m.sender]
  const nombre = await conn.getName(m.sender)
  const premium = user.premium ? '❌' : '✅'
  const limite = user.limit || 0
  const totalreg = Object.keys(global.db.data.users).length
  const muptime = clockString(process.uptime())

  // --- Información del Usuario (Plantilla Literal) ---
  const infoUser = `
🍁 _¡Hola!_ *🥀¡Muy buenos días🌅, tardes🌇 o noches🌆!*

> 🎳 \`Shadow-Bot\` es un sistema automatizado diseñado para interactuar mediante comandos. Permite realizar acciones como descargar videos de distintas plataformas, hacer búsquedas en la \`web\`, y disfrutar de una variedad de juegos dentro del \`chat\`.

━━━━━━━━━━━━━
\`❒ ᴄᴏɴᴛᴇxᴛ-ɪɴғᴏ ☔\`
${menuFormat.header.replace('╭─「 %category 」', '┌───────────')}
│ 🚩 *User:* ${nombre}
│ 📜 *Premium:* ${user.premium ? '✅ SI' : '❌ NO'}
│ 🌟 *Límite:* ${limite}
│ 🏓 *Activo:* ${muptime}
│ 👤 *Usuarios:* ${totalreg}
${menuFormat.footer.replace('╰───────────────', '└───────────')}
`.trim()

  // --- Obtener Comandos ---
  const commands = Object.values(global.plugins)
      .filter(v => v.help && v.tags && !v.disabled)
      .map(v => ({
          help: Array.isArray(v.help) ? v.help : [v.help],
          tags: Array.isArray(v.tags) ? v.tags : [v.tags]
      }))

  // --- Construcción del Menú por Categoría ---
  let menu = []
  for (const tag in tags) {
      const comandos = commands
          .filter(command => command.tags.includes(tag))
          .map(command => command.help.map(cmd => menuFormat.body.replace(/%cmd/g, usedPrefix + cmd)).join('\n'))
          .join('\n')
          
      if (comandos) {
          const header = menuFormat.header.replace(/%category/g, tags[tag])
          menu.push(`${header}\n${comandos}\n${menuFormat.footer}`)
      }
  }

  // --- Mensaje Final ---
  const finalMenu = infoUser + '\n\n' + menu.join('\n\n') + '\n' + menuFormat.after
  
  const icono = 'https://telegra.ph/file/5a5d095932591605658e8.jpg'

  await conn.sendMessage(m.chat, {
      video: { url: 'https://raw.githubusercontent.com/El-brayan502/dat3/main/uploads/899fc7-1762129754657.mp4' },
      gifPlayback: true,
      caption: finalMenu,
      contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363417186717632@newsletter',
              newsletterName: 'Shadow`S - IA| Channel',
              serverMessageId: -1
          },
          externalAdReply: {
              title: '🌴 Shadow - Bot 🌴',
              body: 'Shadow - MD| Dev-fedexyz',
              thumbnailUrl: 'https://chat.whatsapp.com/E6bm08DbKnB84LhBFQGUUr',
              // Usar 'fetch' solo si 'icono' no está pre-cargado globalmente
              thumbnail: await (await fetch(icono)).buffer(), 
              sourceUrl: 'https://chat.whatsapp.com/E6bm08DbKnB84LhBFQGUUr',
              mediaType: 1,
              showAdAttribution: false
          }
      }
  }, { quoted: m })

  await delay(100)
}

handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['menu2', 'menú', 'allmenu', 'menucompleto']

export default handler
