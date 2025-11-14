import fetch from 'node-fetch'
import { generateWAMessageFromContent, generateWAMessageContent, proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn }) => {
  const espera = '⏳ Obteniendo los grupos oficiales...'
  await conn.sendMessage(m.chat, { text: espera }, { quoted: m })

  const imagenSegura = 'https://raw.githubusercontent.com/El-brayan502/dat2/main/uploads/8fe970-1761423379402.jpg'

  async function cargarImagen() {
    const { imageMessage } = await generateWAMessageContent(
      { image: { url: imagenSegura } },
      { upload: conn.waUploadToServer }
    )
    return imageMessage
  }

  // 🔗 Lista de grupos y canal
  const grupos = [
    {
      nombre: '💬 Grupo Oficial 1',
      descripcion: 'Únete al grupo principal y comparte con la comunidad.',
      botones: [{ texto: 'Unirme al Grupo', url: 'https://chat.whatsapp.com/Go7ZcHnMBFJARhj64MxX7m' }]
    },
    {
      nombre: '🌎 Grupo Oficial 2',
      descripcion: 'Grupo secundario para charlas y soporte.',
      botones: [{ texto: 'Unirme al Grupo', url: 'https://chat.whatsapp.com/E6bm08DbKnB84LhBFQGUUr' }]
    },
    {
      nombre: '📢 Canal Oficial',
      descripcion: 'Sigue todas las novedades y actualizaciones del bot.',
      botones: [{ texto: 'Ir al Canal', url: 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i' }]
    }
  ]

  const img = await cargarImagen()
  const tarjetas = []

  for (const grupo of grupos) {
    const btns = grupo.botones.map(b => ({
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: b.texto,
        url: b.url
      })
    }))

    tarjetas.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `🪴 *${grupo.nombre}*\n${grupo.descripcion}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '> Si el enlace no funciona, contacta al propietario del bot.'
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        hasMediaAttachment: true,
        imageMessage: img
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: btns
      })
    })
  }

  const mensaje = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: '🌐 *Grupos Oficiales de Itachi-Bot* 🌐'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Únete a la comunidad y mantente actualizado 💫'
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: tarjetas
          })
        })
      }
    }
  }, {})

  await conn.relayMessage(m.chat, mensaje.message, { messageId: mensaje.key.id })
  await m.react('✅')
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'oficiales', 'canales']

export default handler