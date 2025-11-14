import fetch from 'node-fetch'

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

  const thumbnailUrl = 'https://raw.githubusercontent.com/El-brayan502/dat2/main/uploads/e02474-1762062152606.jpg'
  const thumbnail = await (await fetch(thumbnailUrl)).buffer()

  const buttonMessage = {
    image: { url: thumbnailUrl},
    caption: caption,
    footer: 'Itachi-Bot-MD | Brayan Uchiha',
    buttons: buttons,
    headerType: 4,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '🗑 Registro Eliminado',
        thumbnail: thumbnail,
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
