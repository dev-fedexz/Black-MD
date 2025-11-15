import fs from 'fs';

let handler = async (m, { conn, usedPrefix}) => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  let nombre = await conn.getName(m.sender);

  let tags = {
  info: 'Información',
  anime: 'Anime & Waifus',
  buscador: 'Buscadores',
  downloader: 'Descargas',
  jutsus: 'Jutsus Naruto',
  economy: 'Economía & Juegos',
  fun: 'Juegos Divertidos',
  group: 'Funciones de Grupo',
  ai: 'Inteligencia Artificial',
  game: 'Juegos Clásicos',
  serbot: 'Sub-Bots',
  main: 'Comandos Principales',
  nable: 'Activar / Desactivar',
  nsfw: 'NSFW',
  owner: 'Dueño / Admin',
  sticker: 'Stickers & Logos',
  herramientas: 'Herramientas'
};

  let header = '> ꒷︶꒥꒷‧₊☆ %category ☆₊˚꒷︶꒷꒥꒷';
  let body = '> ➩ *_%cmd_*';
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
> ❐ \`Hola,\` soy *Shadow - Bot* 🌱

╰┈□ \`\`\`IᑎᖴO-ᑌՏᗴᖇ\`\`\`
❐ Usuario: ${nombre}
❐ Premium: ${premium}.

╰┈□ \`\`\`IᑎᖴO-ᗷOT\`\`\`
❐ Tiempo activo: ${uptime}
❐ Grupos activos: ${groupsCount}
❐ Comandos disponibles: ${Object.keys(global.plugins).length}
❐ Fecha actual" [${new Date().toLocaleString('es-ES')}]
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

  let videoUrl = 'https://files.catbox.moe/xqvay6.mp4';
  let thumbnailUrl = 'https://files.catbox.moe/cbx89a.jpg';

  await m.react('🌻');

  await conn.sendMessage(m.chat, {
    video: { url: videoUrl},
    caption: finalMenu,
    gifPlayback: true,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 999,
      externalAdReply: {
        title: 'Shadow Bot',
        body: 'Ultima version 🌾',
        thumbnailUrl: thumbnailUrl,
        mediaType: 1,
        renderLargerThumbnail: true
}
},
    buttons: [
      { buttonId: `${usedPrefix}code`, buttonText: { displayText: '🪐 sᴇʀ sᴜʙ-ʙᴏᴛ'}, type: 1},
      { buttonId: `${usedPrefix}ping`, buttonText: { displayText: '⚡ ᴠᴇʟᴏᴄɪᴅᴀᴅ ᴅᴇʟ ʙᴏᴛ'}, type: 1}
    ]
}, { quoted: m});
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú'];
handler.register = true;

export default handler;
