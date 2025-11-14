import axios from 'axios'
import baileys from '@whiskeysockets/baileys'

async function sendAlbumMessage(conn, jid, medias, options = {}) {
  if (typeof jid !== 'string') throw new TypeError('jid debe ser string')
  if (medias.length < 2) throw new RangeError('Se requieren al menos 2 imágenes')

  const caption = options.caption || ''
  const delay = !isNaN(options.delay) ? options.delay : 500

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(m => m.type === 'image').length,
        expectedVideoCount: medias.filter(m => m.type === 'video').length,
        ...(options.quoted ? {
          contextInfo: {
            remoteJid: options.quoted.key.remoteJid,
            fromMe: options.quoted.key.fromMe,
            stanzaId: options.quoted.key.id,
            participant: options.quoted.key.participant || options.quoted.key.remoteJid,
            quotedMessage: options.quoted.message
          }
        } : {})
      }
    },
    {}
  )

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id })

  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i]
    const img = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: data, ...(i === 0 ? { caption } : {}) },
      { upload: conn.waUploadToServer }
    )
    img.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key }
    }
    await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id })
    await baileys.delay(delay)
  }

  return album
}

const pinterestSearch = async (query) => {
  try {
    const res = await axios.get(`https://ruby-core.vercel.app/api/search/pinterest?q=${encodeURIComponent(query)}`)
    const data = res.data
    if (!data.status || !data.results || data.results.length === 0) return []
    return data.results
  } catch (err) {
    console.error('Error al buscar en Pinterest:', err)
    return []
  }
}

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text)
    return m.reply(`🪴 Por favor ingrese lo que deseas buscar el pinterest

*Ejemplo:* ${usedPrefix}pinterest Itachi Uchiha`)

  try {
    await m.react('🕒')
    const results = await pinterestSearch(text)
    if (results.length === 0)
      return conn.reply(m.chat, `🪴 No se encontraron resultados para "${text}".`)

    const medias = results.slice(0, 12).map(img => ({
      type: 'image',
      data: { url: img.image_large_url || img.image }
    }))

    await sendAlbumMessage(conn, m.chat, medias, {
      caption: `✨ Pinterest Search\n`,
      quoted: m
    })

    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('✖️')
    conn.reply(m.chat, `Error al obtener imágenes de Pinterest.`, m)
  }
}

handler.help = ['pinterest'];
handler.command = ['pinterestsearch', 'pin', 'pinterest'];
handler.tags = ['buscador'];
handler.register = true

export default handler