import fetch from 'node-fetch'
import { generateWAMessageFromContent, prepareWAMessageMedia} from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, usedPrefix, command}) => {
  const user = global.db.data.users[m.sender]
  const nameFromWA = await conn.getName(m.sender)
  const regex = /^([^\n]+)\.([0-9]+)$/

  if (user.registered) {
    return m.reply(`🌿 *Ya estás registrado.*\n\n¿Deseas volver a registrarte?\nUsa: *${usedPrefix}unreg*`)
}

  if (!regex.test(text)) {
    return m.reply(`❎ *Formato incorrecto.*\n\n📌 Uso correcto:\n*${usedPrefix + command} nombre.edad*\n🧪 Ejemplo:\n*${usedPrefix + command} ${nameFromWA}.19*`)
}

  let [_, name, age] = text.match(regex)
  if (!name) return m.reply('👻 *El nombre no puede estar vacío.*')
  if (!age) return m.reply('❄️ *La edad no puede estar vacía.*')
  if (name.length>= 30) return m.reply('💛 *El nombre es demasiado largo (máx. 30 caracteres).*')

  age = parseInt(age)
  if (age < 5 || age> 100) return m.reply('🌾 *La edad ingresada no es válida (debe estar entre 5 y 100).*')

  user.name = name.trim()
  user.age = age
  user.registered = true
  await global.db.write()

  const fondoURL = 'https://raw.githubusercontent.com/El-brayan502/dat2/main/uploads/e02474-1762062152606.jpg'
  const thumb = await (await fetch(fondoURL)).buffer()

  const media = await prepareWAMessageMedia(
    {
      document: { url: fondoURL},
      mimetype: 'application/pdf',
      fileName: 'Registro',
      jpegThumbnail: thumb
},
    { upload: conn.waUploadToServer}
)

  const caption = `
🎉 *¡Registro exitoso!* 🎉

🧑‍💼 *Nombre:* ${name}
🎂 *Edad:* ${age}
🆔 *Usuario:* @${m.sender.split('@')[0]}
🤖 *Bot:* ${botname}

✨ Usa *#allmenu* para ver todos los comandos disponibles.
`.trim()

  const interactiveMessage = {
    header: {
      title: '',
      hasMediaAttachment: true,
      documentMessage: media.documentMessage
},
    body: {
      text: caption
},
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
                    header: '🌿 Menú completo',
                    title: 'Ver comandos',
                    id: '.allmenu'
},
                  {
                    header: '🗑 Eliminar registro',
                    title: 'Cancelar registro',
                    id: '.unreg'
},
                  {
                    header: '⏳ Estado del bot',
                    title: 'Ver tiempo activo',
                    id: '.ping'
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
        title: '📩 Registro Exitoso',
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

handler.help = ['reg']
handler.tags = ['info']
handler.command = ['verificar', 'reg', 'registrar']

export default handler
