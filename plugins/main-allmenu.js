import fs from 'fs';
import { generateWAMessageFromContent } from '@adiwajshing/baileys'; // Asegúrate de que esta línea esté presente si usas 'generateWAMessageFromContent'

let handler = async (m, { conn, usedPrefix}) => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  let nombre = await conn.getName(m.sender);

  let tags = {
    'main': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴍᴀɪɴ`_* ☕',
    'fun': '𓂂𓏸 *_`ᴍᴇɴᴜ ғᴜɴ`_* 🎭',
    'anime': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴀɴɪᴍᴇ`_* 🌸',
    'descargas': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴅᴏᴡɴʟᴏᴀᴅ`_* 🎧',
    'grupo': '𓂂𓏸 *_`ᴍᴇɴᴜ ɢʀᴜᴘᴏs`_* 🍒',
    'ia': '𓂂𓏸 *_`ᴍᴇɴᴜ ɪᴀ`_* ☁️',
    'tools': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴛᴏᴏʟs`_* 🧩',
    'owner': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴏᴡɴᴇʀ`_* ⚙️',
    'serbot': '𓂂𓏸 *_`ᴍᴇɴᴜ ᴊᴀᴅɪ-ʙᴏᴛ`_* ☕',
    'buscador': '𓂂𓏸 *_`ᴍᴇɴᴜ ʙᴜsᴄᴀᴅᴏʀ`_* 🍑',
};

  let header = '%category';
  let body = '> ര ׄ ☃️ ׅ *_%cmd_*';
  let footer = '';
  let after = ``;

  let user = global.db.data.users[m.sender];
  let premium = user.premium? 'sɪ́': 'ɴᴏ';
  let limit = user.limit || 0;
  let totalreg = Object.keys(global.db.data.users).length;
  let groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length;
  let uptime = clockString(process.uptime());

  function clockString(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

  let infoUser = `
\`\`\`🌵 ʜᴏʟᴀ, ꜱᴏʏ ᴋᴜʀᴜᴍɪ - ʙᴏᴛ
❏ ꜱɪꜱᴛᴇᴍᴀ ɪɴᴛᴇʟɪɢᴇɴᴛᴇ ᴘᴀʀᴀ ᴄᴏᴍᴀɴᴅᴏꜱ.

⚙️ ᴄᴀʀᴀᴄᴛᴇʀɪ́ꜱᴛɪᴄᴀꜱ:
• ᴅᴇꜱᴄᴀʀɢᴀʀ ᴠɪ́ᴅᴇᴏꜱ
• ʙᴜꜱᴄᴀʀ ᴇɴ ʟᴀ ᴡᴇʙ
• ᴊᴜᴇɢᴏꜱ ʏ ᴅɪᴠᴇʀꜱɪᴏ́ɴ ᴇɴ ᴇʟ ᴄʜᴀᴛ

📚 ᴜꜱᴜᴀʀɪᴏ: ${nombre}
☕ ʙᴀɪʟᴇʏꜱ: fedExz-Bails
🍉 ᴘʀᴇᴍɪᴜᴍ: ${premium}
⏳ ᴛɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ: ${uptime}
☁️ ɢʀᴜᴘᴏꜱ ᴀᴄᴛɪᴠᴏꜱ: ${groupsCount}
🌿 ᴄᴏᴍᴀɴᴅᴏꜱ ᴅɪꜱᴘᴏɴɪʙʟᴇꜱ: ${Object.keys(global.plugins).length}
📡 ꜰᴇᴄʜᴀ ᴀᴄᴛᴜᴀʟ: [${new Date().toLocaleString('es-ES')}]\`\`\`
`.trim();

  let commands = Object.values(global.plugins).filter(v => v.help && v.tags && v.command).map(v => ({
    help: Array.isArray(v.help)? v.help: [v.help],
    tags: Array.isArray(v.tags)? v.tags: [v.tags],
    command: Array.isArray(v.command)? v.command: [v.command]
}));

  let menu = [];
  for (let tag in tags) {
    let comandos = commands
.filter(command => command.tags.includes(tag))
.map(command => command.command.map(cmd => body.replace(/%cmd/g, usedPrefix + cmd)).join('\n'))
.join('\n');
    if (comandos) {
      menu.push(header.replace(/%category/g, tags[tag]) + '\n' + comandos + '\n' + footer);
}
}

  let finalMenu = infoUser + '\n\n' + menu.join('\n\n') + '\n' + after;

  let bannerUrl = 'https://files.catbox.moe/c65bk7.jpg'; // Se mantiene para el thumbnail del externalAdReply
  let videoUrl = 'https://files.catbox.moe/xqvay6.mp4';
  
  // Objeto 'media' necesario para el interactiveMessage
  let media = {
      documentMessage: {
          url: videoUrl,
          mimetype: 'video/mp4',
          title: 'Kurumi Bot',
          fileSha256: 'video-sha256', // Reemplaza con el hash real si lo tienes
          fileLength: 1000, // Reemplaza con la longitud real
          fileName: 'menu.mp4',
          mediaKey: 'video-media-key', // Reemplaza con la clave real
          messageStubType: 1,
          contextInfo: {
              mentionedJid: [m.sender],
          },
          externalAdReply: {
              title: '🌵 ᴋᴜʀᴜᴍɪ ʙᴏᴛ - ᴏғғɪᴄɪᴀʟ',
              body: '© ᴍᴀᴅᴇ ʙʏ ᴅᴇᴠ-ғᴇᴅᴇxʏᴢᴢ',
              thumbnailUrl: bannerUrl, // El thumbnail en el AdReply sigue siendo la imagen
              mediaType: 1,
              renderLargerThumbnail: true
          }
      }
  };


  await m.react('🌻');

  const interactiveMessage = {
    header: {
      title: '',
      hasMediaAttachment: true,
      documentMessage: media.documentMessage // Solo el video aquí
    },
    body: { text: finalMenu }, // Usamos finalMenu como texto principal
    /*footer: { text: '⠀' },*/
    nativeFlowMessage: {
      buttons: [
        {
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: '⠀',
            sections: [
              {
                title: 'SELECCIONE UNA CATEGORIA 💥',
                rows: [
                  { header: '📚 MENU COMPLETO', title: 'Comandos', id: '.allmenu' },
                  { header: '🔕 Eliminar registro ', title: 'Eliminar registro', id: '.unreg' },
                  { header: '📚 Información sobre el server', title: 'Sobre el server', id: '.estado' },
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
        title: '☁️ Seleccionar boton',
        // Usamos await (await fetch(bannerUrl)).buffer() para obtener el thumbnail de la imagen
        thumbnail: await (await fetch(bannerUrl)).buffer(), 
        mediaType: 1,
        showAdAttribution: false
      }
    }
  }

  const msg = generateWAMessageFromContent(
    m.chat,
    { viewOnceMessage: { message: { interactiveMessage } } },
    { userJid: m.sender, quoted: m }
  )
  
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })

};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú'];

export default handler;
