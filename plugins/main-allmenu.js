import fs from 'fs';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix}) => {
  const nombre = await conn.getName(m.sender);

  const globalIcono = 'https://files.catbox.moe/cbx89a.jpg'; // Se usa solo aquí

  const tags = {
    info: '📘 ɪɴғᴏʀᴍᴀᴄɪᴏ́ɴ',
    anime: '🎎 ᴀɴɪᴍᴇ & ᴡᴀɪғᴜs',
    buscador: '🔍 ʙᴜsᴄᴀᴅᴏʀᴇs',
    downloader: '📥 ᴅᴇsᴄᴀʀɢᴀs',
    jutsus: '🥷 ᴊᴜᴛsᴜs ɴᴀʀᴜᴛᴏ',
    economy: '💰 ᴇᴄᴏɴᴏᴍɪ́ᴀ & ᴊᴜᴇɢᴏs',
    fun: '🎮 ᴊᴜᴇɢᴏs ᴅɪᴠᴇʀᴛɪᴅᴏs',
    group: '👥 ғᴜɴᴄɪᴏɴᴇs ᴅᴇ ɢʀᴜᴘᴏ',
    ai: '🤖 ɪɴᴛᴇʟɪɢᴇɴᴄɪᴀ ᴀʀᴛɪғɪᴄɪᴀʟ',
    game: '🎲 ᴊᴜᴇɢᴏs ᴄʟᴀ́sɪᴄᴏs',
    serbot: '🧩 sᴜʙ-ʙᴏᴛs',
    main: '📌 ᴄᴏᴍᴀɴᴅᴏs ᴘʀɪɴᴄɪᴘᴀʟᴇs',
    nable: '⚙️ ᴀᴄᴛɪᴠᴀʀ / ᴅᴇsᴀᴄᴛɪᴠᴀʀ',
    nsfw: '🔞 ɴsғᴡ',
    owner: '👑 ᴅᴜᴇɴ̃ᴏ / ᴀᴅᴍɪɴ',
    sticker: '🖼️ sᴛɪᴄᴋᴇʀs & ʟᴏɢᴏs',
    herramientas: '🛠️ ʜᴇʀʀᴀᴍɪᴇɴᴛᴀs'
}

  const header = '%category';
  const body = '> ര ׄ ☃️ ׅ *_%cmd_*';
  const footer = '';
  const after = '';

  const user = global.db.data.users[m.sender];
  const premium = user.premium? 'sɪ́': 'ɴᴏ';
  const limit = user.limit || 0;
  const totalreg = Object.keys(global.db.data.users).length;
  const groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length;
  const uptime = clockString(process.uptime());

  function clockString(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

  const infoUser = `
🌵 ʜᴏʟᴀ, ꜱᴏʏ ᴋᴜʀᴜᴍɪ - ʙᴏᴛ
📚 ᴜꜱᴜᴀʀɪᴏ: ${nombre}
☕ ʙᴀɪʟᴇʏꜱ: fedExz-Bails
🍉 ᴘʀᴇᴍɪᴜᴍ: ${premium}
⏳ ᴛɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ: ${uptime}
☁️ ɢʀᴜᴘᴏꜱ ᴀᴄᴛɪᴠᴏꜱ: ${groupsCount}
🌿 ᴄᴏᴍᴀɴᴅᴏꜱ ᴅɪꜱᴘᴏɴɪʙʟᴇꜱ: ${Object.keys(global.plugins).length}
📡 ꜰᴇᴄʜᴀ ᴀᴄᴛᴜᴀʟ: [${new Date().toLocaleString('es-ES')}]
`.trim();

  const commands = Object.values(global.plugins).filter(v => v.help && v.tags && v.command).map(v => ({
    help: Array.isArray(v.help)? v.help: [v.help],
    tags: Array.isArray(v.tags)? v.tags: [v.tags],
    command: Array.isArray(v.command)? v.command: [v.command]
}));

  const menu = [];
  for (const tag in tags) {
    const comandos = commands
.filter(command => command.tags.includes(tag))
.map(command => command.command.map(cmd => body.replace(/%cmd/g, usedPrefix + cmd)).join('\n'))
.join('\n');
    if (comandos) {
      menu.push(header.replace(/%category/g, tags[tag]) + '\n' + comandos + '\n' + footer);
}
}

  const finalMenu = infoUser + '\n\n' + menu.join('\n\n') + '\n' + after;
  const videoUrl = 'https://files.catbox.moe/xqvay6.mp4';

  await m.react('🌻');

  await conn.sendMessage(m.chat, {
    video: { url: videoUrl},
    caption: finalMenu,
    gifPlayback: true,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 999,
      externalAdReply: {
        title: '🌵 ᴋᴜʀᴜᴍɪ ʙᴏᴛ - ᴏғғɪᴄɪᴀʟ',
        body: '© ᴍᴀᴅᴇ ʙʏ ᴅᴇᴠ-ғᴇᴅᴇxʏᴢᴢ',
        thumbnail: await (await fetch(globalIcono)).buffer(),
        mediaType: 1,
        renderLargerThumbnail: true
}
},
    buttons: [
      { buttonId: `${usedPrefix}code`, buttonText: { displayText: '🪐 sᴇʀ sᴜʙ-ʙᴏᴛ'}, type: 1},
      { buttonId: `${usedPrefix}menu`, buttonText: { displayText: '🌾 ᴄᴏᴍᴀɴᴅᴏꜱ'}, type: 1}
    ]
}, { quoted: m});
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú'];
handler.register = true;

export default handler;
