import fetch from "node-fetch"
import yts from "yt-search"

async function makeFkontak() {
  try {
    const res = await fetch('https://i.postimg.cc/rFfVL8Ps/image.jpg') // icono
    const thumb2 = Buffer.from(await res.arrayBuffer())
    return {
      key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
      message: { locationMessage: { name: 'Music downloader', jpegThumbnail: thumb2 } },
      participant: '0@s.whatsapp.net'
    }
  } catch {
    return undefined
  }
}

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, command }) => {
  try {
    let fkontak = await makeFkontak()

    if (!text || !text.trim()) {
      return conn.reply(m.chat, `🍁 Ingrese el nombre o el enlace de la música`, fkontak, rcanal)
    }

    await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key }})

    let videoIdToFind = text.match(youtubeRegexID) || null
    let ytplay2 = await yts(videoIdToFind ? "https://youtu.be/" + videoIdToFind[1] : text)

    if (videoIdToFind) {
      const videoId = videoIdToFind[1]
      ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)
    }

    ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2
    if (!ytplay2) {
      await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key }})
      return conn.reply(m.chat, "🪴 No se encontraron resultados, intenta más tarde", fkontak)
    }

    let { title, thumbnail, timestamp, views, url, author } = ytplay2
    const vistas = formatViews(views)
    const canal = author?.name || "Desconocido"

    const infoMessage = `
*🎧 ${title}*
📺 Canal: ${canal}
⏱ Duración: ${timestamp}
👁‍🗨 Vistas: ${vistas}

> Preparando tu descarga...
    `.trim()

    const thumb = (await conn.getFile(thumbnail))?.data
    
    await conn.sendMessage(m.chat, {
      image: thumb,
      caption: infoMessage
    }, { quoted: fkontak })

    if (["play", "yta", "ytmp3", "playaudio"].includes(command)) {
      let audioData = null
      try {
        const r = await (await fetch(`https://ruby-core.vercel.app/api/download/youtube/mp3?url=${encodeURIComponent(url)}`)).json()
        if (r?.status && r?.download?.url) {
          audioData = { link: r.download.url, title: r.metadata?.title }
        }
      } catch {}

      if (!audioData) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key }})
        return conn.reply(m.chat, "🍁 No fue posible enviar el audio después de unos intentos", fkontak)
      }

      await conn.sendMessage(m.chat, {
        audio: { url: audioData.link },
        fileName: `${audioData.title || "music"}.mp3`,
        mimetype: "audio/mpeg",
        ptt: false
      }, { quoted: fkontak })

      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key }})
    }

    else if (["play2", "ytv", "ytmp4", "mp4"].includes(command)) {
      let videoData = null
      try {
        const r = await (await fetch(`https://ruby-core.vercel.app/api/download/youtube/mp4?url=${encodeURIComponent(url)}`)).json()
        if (r?.status && r?.download?.url) {
          videoData = { link: r.download.url, title: r.metadata?.title }
        }
      } catch {}

      if (!videoData) {
        await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key }})
        return conn.reply(m.chat, "🪴 No fue posible enviar el video intenta más tarde", fkontak)
      }

      await conn.sendMessage(m.chat, {
        video: { url: videoData.link },
        fileName: `${videoData.title || "video"}.mp4`,
        caption: `${title}`,
        mimetype: "video/mp4"
      }, { quoted: fkontak })

      await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key }})
    }

    else {
      return conn.reply(m.chat, "*[❗]︎ Comando no válido, revisa el menú*", fkontak)
    }

  } catch (error) {
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key }})
    return conn.reply(m.chat, `[❗] Error inesperado:\n\n${error}`, fkontak)
  }
}

handler.command = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4', 'playaudio', 'mp4']
handler.help = ["play", "play2", "ytmp3", "ytmp4"]
handler.tags = ["downloader"]

export default handler

function formatViews(views) {
  if (!views) return "No disponible"
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k`
  return views.toString()
}