import fs from 'fs'

// Función de utilidad para convertir segundos a formato HH:MM:SS
function clockString(seconds) {
  let h = Math.floor(seconds / 3600)
  let m = Math.floor(seconds % 3600 / 60)
  let s = Math.floor(seconds % 60)
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

// Handler principal
let handler = async (m, { conn, usedPrefix }) => {
  const delay = ms => new Promise(res => setTimeout(res, ms))

  // Asegurar que global.db.data.users existe
  if (!global.db || !global.db.data || !global.db.data.users) {
      return conn.reply(m.chat, '❌ Error: La base de datos de usuarios no está inicializada.', m)
  }
  
  // Definición de las etiquetas del menú
  const tags = {
    'main': '❖  ＩＮＦＯ ＤＥＬ ＢＯＴ',
    'info': '🌐  ＩＮＦＯ Ｙ ＵＴＩＬＩＤＡＤＥＳ',
    'group': '👥  ＡＤＭＩＮ ＤＥ ＧＲＵＰＯ',
    'economy': '💰  ＪＵＥＧＯＳ Ｙ ＥＣＯＮＯＭÍＡ',
    'game': '🎮  ＪＵＥＧＯＳ ＡＤＩＣＩＯＮＡＬＥＳ',
    'fun': '✨  ＦＵＮＣＩＯＮＥＳ ＤＩＶＥＲＴＩＤＡＳ',
    'sticker': '🖼️  ＣＲＥＡＣＩÓＮ ＤＥ ＳＴＩＣＫＥＲＳ',
    'downloader': '⬇️  ＤＥＳＣＡＲＧＡＳ ＭＵＬＴＩＭＥＤＩＡ',
    'anime': '🍥  ＦＵＮＣＩＯＮＥＳ ＡＮＩＭＥ',
    'jutsus': '🎯  ＮＡＲＵＴＯ-ＳＨＩＰＵＤＥＮ',
    'buscador': '🔎  ＢÚＳＱＵＥＤＡＳ',
    'herramientas': '🛠️  ＨＥＲＲＡＭＩＥＮＴＡＳ',
    'ai': '🧠  ＩＮＴＥＬＩＧＥＮＣＩＡ ＡＲＴＩＦＩＣＩＡＬ',
    'nable': '⚙️  ＣＯＮＦＩＧＵＲＡＣＩÓＮ',
    'nsfw': '🔞  ＮＳＦＷ (ＥＸＴＲＥＭＯ)',
    'serbot': '🤖  ＪＡＤＩＢＯＴＳ',
    'owner': '👑  ＯＰＣＩＯＮＥＳ ＤＥＬ ＰＲＯＰＩＥＴＡＲＩＯ',
  }

  // Nuevo Formato de Diseño del Menú
  const menuFormat = {
    header: '╔═⌘「 %category 」⌘',
    body: '║  ⬡  `%cmd`',
    footer: '╚═══════════════',
    after: `> 𝖨𝗍𝖺𝖼𝗁𝗂-𝖡𝗈𝗍-𝖬𝖣 | 𝖡𝗋𝖺𝗒𝖺𝗇 𝖴𝖼𝗁𝗂𝗁𝖺`
  }

  // --- Datos del Usuario y Bot ---
  const user = global.db.data.users[m.sender]
  const nombre = await conn.getName(m.sender)
  const limite = user.limit || 0
  const totalreg = Object.keys(global.db.data.users).length
  const muptime = clockString(process.uptime())
  const taguser = '@' + m.sender.split('@')[0]

  // --- Información del Usuario (Plantilla Literal) ---
  const infoUser = `
👋 *¡HOLA ${taguser}!*

> 🔮 *Itachi-Bot* es tu asistente automático de WhatsApp.

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
  // Unir la información del usuario y el menú de comandos
  const finalMenu = infoUser + '\n\n' + menu.join('\n\n') + '\n\n' + menuFormat.after
  
  // URL del icono (asegúrate de que esta variable esté definida o reemplaza la URL)
  const icono = 'https://telegra.ph/file/5a5d095932591605658e8.jpg' 

  // --- Envío del Mensaje ---
  await conn.sendMessage(m.chat, {
      video: { url: 'https://raw.githubusercontent.com/El-brayan502/dat3/main/uploads/899fc7-1762129754657.mp4' },
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
              title: '🌴 𝖨𝗍𝖺𝖼𝗁𝗂-𝖻𝗈𝗍-𝖬𝖣 🌴',
              body: '𝘐𝘛𝘈𝘊𝘏𝘐-𝘉𝘖𝘛 | 𝘉𝘙𝘈𝘠𝘈𝘕 𝘜𝘊𝘏𝘐𝘏𝘈',
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
handler.command = ['menu2', 'menú', 'allmenu', 'menucompleto']
handler.register = true

export default handler
