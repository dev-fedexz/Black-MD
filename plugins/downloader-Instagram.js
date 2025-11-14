import axios from 'axios'

/**
 * Downloader Instagram robusto:
 * - Prueba varias APIs en orden
 * - Acepta múltiples formatos de respuesta
 * - Retries y manejo de errores
 */

const INSTAGRAM_APIS = [
  (url) => `https://apis-starlights-team.koyeb.app/starlight/instagram-dl?url=${encodeURIComponent(url)}`,
  (url) => `https://mayapi.ooguy.com/instagram?url=${encodeURIComponent(url)}&apikey=may-f53d1d49`,
  (url) => `https://apiadonix.kozow.com/download/instagram?apikey=${global.apikey || ''}&url=${encodeURIComponent(url)}`
]

async function tryFetchApi(apiUrl, timeout = 8000) {
  try {
    const res = await axios.get(apiUrl, { timeout })
    return res?.data
  } catch (e) {
    // console.error('API error', apiUrl, e.message)
    return null
  }
}

function extractMediaFromResponse(result) {
  // Normalizamos distintas respuestas posibles
  // Retornamos array de objetos { url, type } preferiblemente video
  if (!result) return []

  // Si la API devuelve directamente una URL
  if (typeof result === 'string' && result.startsWith('http')) {
    return [{ url: result, type: 'video' }]
  }

  // Si la API devuelve { download: { url }, metadata... }
  if (result.download && (result.download.url || result.download?.url_hd || result.download?.url_sd)) {
    return [{ url: result.download.url || result.download.url_hd || result.download.url_sd, type: 'video' }]
  }

  // Algunas APIs devuelven { data: [...] } o { result: [...] } o { media: [...] }
  const listCandidates = result.data || result.result || result.media || result.items || result.items_media || result.items || result.files

  if (Array.isArray(listCandidates) && listCandidates.length > 0) {
    return listCandidates.map(item => {
      // posibles campos: dl_url, url, link, video, video_url, link_hd, link_sd, file
      const url = item.dl_url || item.url || item.link || item.video || item.video_url || item.link_hd || item.link_sd || item.file || item.play || item.src
      const type = (item.type || item.mime || (url && url.includes('.mp4') ? 'video' : 'unknown')) || 'video'
      return url ? { url, type } : null
    }).filter(Boolean)
  }

  // Algunas respuestas devuelven objeto con campos directos: { dl_url: '...', url: '...' }
  if (result.dl_url || result.url || result.link || result.video_url) {
    return [{ url: result.dl_url || result.url || result.link || result.video_url, type: 'video' }]
  }

  // Otras variantes: result[0]...
  if (Array.isArray(result) && result.length > 0) {
    return result.map(r => {
      if (typeof r === 'string' && r.startsWith('http')) return { url: r, type: 'video' }
      if (r.dl_url || r.url || r.link) return { url: r.dl_url || r.url || r.link, type: 'video' }
      return null
    }).filter(Boolean)
  }

  return []
}

const handler = async (m, { conn, args }) => {
  try {
    if (!args[0]) {
      return conn.reply(m.chat, '🪴 _Por favor ingresa un enlace de Instagram_\nEjemplo:\n#ig https://www.instagram.com/reel/xxxxxxxxx', m, rcanal)
    }

    const url = args[0].trim()
    await m.react?.('⏳')

    let mediaList = []
    // Probar APIs en orden
    for (const apiBuilder of INSTAGRAM_APIS) {
      const apiUrl = apiBuilder(url)
      const data = await tryFetchApi(apiUrl)
      if (!data) continue
      const extracted = extractMediaFromResponse(data)
      if (extracted.length > 0) {
        mediaList = extracted
        break
      }
    }

    if (!Array.isArray(mediaList) || mediaList.length === 0) {
      await m.react?.('❌')
      return conn.reply(m.chat, '🌿 No se encontraron resultados para ese enlace (probé varias APIs).', m)
    }

    // Priorizar video (mp4) sobre imágenes si existen múltiples
    let chosen = mediaList.find(x => x.url && x.url.includes('.mp4')) || mediaList[0]
    let mediaUrl = chosen.url

    // Si la URL es relativa o no comienza con http, abortar
    if (!mediaUrl || !/^https?:\/\//i.test(mediaUrl)) {
      await m.react?.('❌')
      return conn.reply(m.chat, '🪴 La API devolvió un formato no soportado. Intenta con otro enlace o pásame uno diferente.', m)
    }

    // Intentos para enviar el archivo (por si la descarga falla)
    const maxRetries = 3
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Si es video
        await conn.sendMessage(m.chat, {
          video: { url: mediaUrl },
          caption: '🍁 Aquí tienes tu vídeo de *INSTAGRAM*',
          fileName: 'instagram.mp4',
          mimetype: 'video/mp4'
        }, { quoted: m })
        await m.react?.('✅')
        break
      } catch (e) {
        if (attempt === maxRetries) {
          await m.react?.('❌')
          return conn.reply(m.chat, '🪴 No fue posible enviar el video después de varios intentos. Puedes intentar descargarlo manualmente:\n' + mediaUrl, m)
        }
        // esperar antes de reintentar
        await new Promise(res => setTimeout(res, 1000 * attempt))
      }
    }
  } catch (err) {
    console.error('Instagram-downloader error:', err)
    await m.react?.('❌')
    return conn.reply(m.chat, '🌿 Ocurrió un error al procesar tu enlace. Intenta más tarde.', m)
  }
}

handler.help = ['instagram <url>']
handler.tags = ['downloader']
handler.command = ['ig', 'instagram', 'igdl']
handler.register = true

export default handler