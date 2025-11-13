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
    'main': '❖  𝐌𝐄𝐍Ú 𝐏𝐑𝐈𝐍𝐂𝐈𝐏𝐀𝐋',
    'info': '🌐  𝐔𝐓𝐈𝐋𝐈𝐃𝐀𝐃𝐄𝐒 𝐄 𝐈𝐍𝐅𝐎',
    'group': '👥  𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 𝐃𝐄 𝐆𝐑𝐔𝐏𝐎',
    'economy': '💰  𝐄𝐂𝐎𝐍𝐎𝐌Í𝐀 𝐘 𝐑𝐏𝐆',
    'game': '🎮  𝐉𝐔𝐄𝐆𝐎𝐒 𝐀𝐃𝐈𝐂𝐈𝐎𝐍𝐀𝐋𝐄𝐒',
    'fun': '✨  𝐅𝐔𝐍𝐂𝐈𝐎𝐍𝐄𝐒 𝐃𝐄 𝐄𝐍𝐓𝐑𝐄𝐓𝐄𝐍𝐈𝐌𝐈𝐄𝐍𝐓𝐎',
    'sticker': '🖼️  𝐂𝐑𝐄𝐀𝐃𝐎𝐑 𝐃𝐄 𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒',
    'downloader': '⬇️  𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒 𝐌𝐔𝐋𝐓𝐈𝐌𝐄𝐃𝐈𝐀',
    'anime': '🍥  𝐅𝐔𝐍𝐂𝐈𝐎𝐍𝐄𝐒 𝐃𝐄 𝐀𝐍𝐈𝐌𝐄',
    'jutsus': '🎯  𝐍𝐀𝐑𝐔𝐓𝐎 𝐘 𝐒𝐇𝐈𝐏𝐔𝐃𝐄𝐍',
    'buscador': '🔎  𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 𝐃𝐄 𝐁Ú𝐒𝐐𝐔𝐄𝐃𝐀',
    'herramientas': '🛠️  𝐇𝐄𝐑𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒 𝐃𝐈𝐆𝐈𝐓𝐀𝐋𝐄𝐒',
    'ai': '🧠  𝐈𝐍𝐓𝐄𝐋𝐈𝐆𝐄𝐍𝐂𝐈𝐀 𝐀𝐑𝐓𝐈𝐅𝐈𝐂𝐈𝐀𝐋',
    'nable': '⚙️  𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈Ó𝐍 (𝐎𝐍/𝐎𝐅𝐅)',
    'nsfw': '🔞  𝐅𝐔𝐍𝐂𝐈𝐎𝐍𝐄𝐒 𝐍𝐒𝐅𝐖',
    'serbot': '🤖  𝐌𝐀𝐍𝐄𝐉𝐎 𝐃𝐄 𝐉𝐀𝐃𝐈𝐁𝐎𝐓𝐒',
    'owner': '👑  𝐎𝐏𝐂𝐈𝐎𝐍𝐄𝐒 𝐃𝐄𝐋 𝐏𝐑𝐎𝐏𝐈𝐄𝐓𝐀𝐑𝐈𝐎',
  }

  const menuFormat = {
    header: '╔═⌘「 %category 」⌘',
    body: '║  ⬡  `%cmd`',
    footer: '╚═══════════════',
    after: `> Shadow : Dev-fedexyz`
  }

  const user = global.db.data.users[m.sender]
  const nombre = await conn.getName(m.sender)
  const limite = user.limit || 0
  const totalreg = Object.keys(global.db.data.users).length
  const muptime = clockString(process.uptime())
  const taguser = '@' + m.sender.split('@')[0]

  const infoUser = `
👋 *¡HOLA ${taguser}!*

> ☕ *Shadow - MD* es tu asistente automático de WhatsApp.

╔═══ ❖ 𝙄𝙉𝙁𝙊 𝘿𝙀 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 
║ 👤 *Usuario:* ${nombre}
║ 👑 *Premium:* ${user.premium ? '✅ SI' : '❌ NO'}
║ 🌟 *Límite:* ${limite}
╚═══════════════

╔═══ ❖ 𝙄𝙉𝙁𝙊 𝘿𝙀𝙇 𝘽𝙊𝙏
║ ⏱️ *Actividad:* ${muptime}
║ 🫂 *Usuarios Totales:* ${totalreg}
║ ⚙️ *Prefijo:* \`${usedPrefix}\`
╚═══════════════
`.trim()

  const commands = Object.values(global.plugins)
      .filter(v => v.help && v.tags && !v.disabled)
      .map(v => ({
          help: Array.isArray(v.help) ? v.help : [v.help],
          tags: Array.isArray(v.tags) ? v.tags : [v.tags]
      }))

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

  const finalMenu = infoUser + '\n\n' + menu.join('\n\n') + '\n\n' + menuFormat.after
  
  const icono = 'https://telegra.ph/file/5a5d095932591605658e8.jpg' 

  
  await conn.sendMessage(m.chat, {
      video: { url: 'https://raw.githubusercontent.com/El-brayan502/dat3/main/uploads/899fc7-1762129754657.mp4' },
      gifPlayback: true,
      caption: finalMenu,
      contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: '120363417186717632@newsletter',
              newsletterName: 'Shadow`S Bot | Channel',
              serverMessageId: -1
          },
          externalAdReply: {
              title: '🌴 Shadow- Bot🌴',
              body: 'Shadow | Dev-fedexyz',
              thumbnailUrl: 'https://chat.whatsapp.com/E6bm08DbKnB84LhBFQGUUr',
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
handler.command = ['menu', 'menú', 'allmenu', 'menucompleto']

export default handler
