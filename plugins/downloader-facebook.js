import axios from 'axios'

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🪴 *Por favor ingresa un enlace de Facebook.*\nEjemplo:\n\n#fb https://www.facebook.com/reel/**********', m, rcanal)
  }

  const fbUrl = args[0]
  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

  try {
    const res = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/facebook?url=${encodeURIComponent(fbUrl)}`)
    const data = res.data

    if (!data || (!data.hd && !data.sd)) {
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
      return conn.reply(m.chat, '🪴 No se encontraron enlaces de video válidos.', m, rcanal)
    }

    // Detectar el mejor enlace disponible
    const videoUrl = data.hd || data.sd
    const quality = data.hd ? 'HD (720p)' : 'SD (360p)'

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: `🍁 Tu video de *Facebook*\nCalidad: ${quality}`,
      fileName: 'facebook.mp4',
      mimetype: 'video/mp4'
    }, { quoted: m })

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (error) {
    console.error(error)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    return conn.reply(m.chat, '🪴 Error al obtener o enviar el video. Intenta con otro enlace.', m, rcanal)
  }
}

handler.help = ['facebook <url>', 'fb <url>']
handler.tags = ['downloader']
handler.command = ['facebook', 'fb', 'fbdl']
handler.register = true

export default handler