import fetch from 'node-fetch'
import { generateWAMessageFromContent} from '@whiskeysockets/baileys'

let handler = async (m, { conn, usedPrefix, command}) => {
  const user = global.db.data.users[m.sender]

  if (!user.registered) {
    return m.reply(`❌ *No estás registrado.*\n\nUsa: *${usedPrefix}reg nombre.edad* para registrarte.`)
}

  // Eliminar datos del usuario
  user.name = ''
  user.age = 0
  user.registered = false
  await global.db.write()

  const caption = `
🗑️ *Tu registro ha sido eliminado correctamente.*

🔒 Ya no estás registrado en el sistema.

📌 Si deseas volver a registrarte, usa:
*${usedPrefix}reg nombre.edad*
`.trim()

  const interactiveMessage = {
    body: { text: caption},
    nativeFlowMessage: {
      buttons: [
        {
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: '',
            sections: [
              {
                title: '📂 OPCIONES DISPONIBLES',
                rows: [
                  {
                    header: '🌿 Registrarse nuevamente',
                    title: 'Crear nuevo registro',
                    id: '.reg TuNombre.18'
},
                  {
                    header: '📋 Ver comandos',
                    title: 'Menú completo',
                    id: '.allmenu'
}
                ]
}
            ]
})
}
      ],
      messageParamsJson: ''
},
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

  const msg = generateWAMessageFromContent(
    m.chat,
    { viewOnceMessage: { message: { interactiveMessage}}},
    { userJid: m.sender, quoted: m}
)

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id})
}

handler.help = ['unreg']
handler.tags = ['info']
handler.command = ['unreg', 'eliminarregistro', 'cancelar']

export default handler
