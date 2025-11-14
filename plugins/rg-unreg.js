import fetch from 'node-fetch'
import { generateWAMessageFromContent, prepareWAMessageMedia} from '@whiskeysockets/baileys'

let handler = async (m, { conn, usedPrefix}) => {
  const user = global.db.data.users[m.sender]

  if (!user.registered) {
    return m.reply(`❌ *No estás registrado.*\n\nPara registrarte usa:\n*${usedPrefix}reg nombre.edad*`)
}

  // Eliminar datos del usuario
  user.name = ''
  user.age = 0
  user.registered = false
  await global.db.write()

  // Fondo tipo PDF
  const fondoURL = 'https://raw.githubusercontent.com/El-brayan502/dat2/main/uploads/e02474-1762062152606.jpg'
  const thumb = await (await fetch(fondoURL)).buffer()

  const media = await prepareWAMessageMedia(
    {
      document: { url: fondoURL},
      mimetype: 'application/pdf',
      fileName: 'Se eliminó tu registro',
      jpegThumbnail: thumb
},
    { upload: conn.waUploadToServer}
)

  const caption = `
🗑️ *Tu registro ha sido eliminado correctamente.*

🔒 Ya no estás registrado en el sistema.

📌 Si deseas volver a registrarte, usa:
*${usedPrefix}reg nombre.edad*
`.trim()

  const buttons = [
    { buttonId: '.reg nombre.17', buttonText: { displayText: '🌿 Registrarme de nuevo'}, type: 1},
    { buttonId: '.ping', buttonText: { displayText: '⏳ Estado del bot'}, type: 1}
  ]

  const buttonMessage = {
    document: media.documentMessage.document,
    mimetype: media.documentMessage.mimetype,
    fileName: media.documentMessage.fileName,
    jpegThumbnail: media.documentMessage.jpegThumbnail,
    caption: caption,
    footer: 'Itachi-Bot-MD | Brayan Uchiha',
    buttons: buttons,
    headerType: 1,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '🗑 Registro Eliminado',
        thumbnail: await (await fetch(icono)).buffer(),
        mediaType: 1,
        showAdAttribution: false
}
}
}

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m})
}

handler.help = ['unreg']
handler.tags = ['info']
handler.command = ['unreg', 'eliminarregistro', 'cancelar']

export default handler
