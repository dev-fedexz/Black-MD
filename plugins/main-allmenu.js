import fs from 'fs';

let handler = async (m, { conn, usedPrefix}) => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  let nombre = await conn.getName(m.sender);

  let tags = {
  info: '𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚌𝚒ó𝚗',
  anime: '𝙰𝚗𝚒𝚖𝚎 & 𝚆𝚊𝚒𝚏𝚞𝚜',
  buscador: '𝙱𝚞𝚜𝚌𝚊𝚍𝚘𝚛𝚎𝚜',
  downloader: '𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚜',
  economy: '𝙴𝚌𝚘𝚗𝚘𝚖í𝚊 & 𝙹𝚞𝚎𝚐𝚘𝚜',
  fun: '𝙹𝚞𝚎𝚐𝚘𝚜 𝙳𝚒𝚟𝚎𝚛𝚝𝚒𝚍𝚘𝚜',
  group: '𝙵𝚞𝚗𝚌𝚒𝚘𝚗𝚎𝚜 𝚍𝚎 𝙶𝚛𝚞𝚙𝚘',
  ai: '𝙸𝙰 - 𝙸𝙰',
  game: '𝙹𝚞𝚎𝚐𝚘𝚜 𝙲𝚕á𝚜𝚒𝚌𝚘𝚜',
  serbot: '𝚂𝚞𝚋-𝙱𝚘𝚝𝚜',
  main: '𝙲𝚘𝚖𝚊𝚗𝚍𝚘𝚜 𝙿𝚛𝚒𝚗𝚌𝚒𝚙𝚊𝚕𝚎𝚜',
  nable: '𝚘𝚏𝚏 / 𝚘𝚗',
  nsfw: '𝙽𝚂𝙵𝚆',
  owner: '𝙰𝚍𝚖𝚒𝚗',
  sticker: '𝚂𝚝𝚒𝚌𝚔𝚎𝚛𝚜 & 𝙻𝚘𝚐𝚘𝚜',
  herramientas: '𝙷𝚎𝚛𝚛𝚊𝚖𝚒𝚎𝚗𝚝𝚊𝚜'
};
  
  let header = '> ꒷︶꒥꒷‧₊ ໒( %category )७ ₊˚꒷︶꒷꒥꒷';
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
> ❐ \`Hola,\` Soy *_Shadow - Bot_* 🌱

╰┈□ \`\`\`IᑎᖴO-ᑌՏᗴᖇ\`\`\`
❐ _Usuario:_ ${nombre}
❐ _Premium:_ ${premium}
❐ _Registrados totales:_ ${totalreg}

╰┈□ \`\`\`IᑎᖴO-ᗷOT\`\`\`
❐ _Tiempo activo:_ ${uptime}
❐ _Grupos activos:_ ${groupsCount}
❐ _Comandos disponibles:_ ${totalCommands}
❐ _Fecha actual:_ [${new Date().toLocaleString('es-ES')}]
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

  await m.react('🌱');

  await conn.sendMessage(m.chat, {
    video: { url: videoUrl},
    caption: finalMenu,
    gifPlayback: true,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 999,
      externalAdReply: {
        title: '𝑆ℎ𝑎𝑑𝑜𝑤 - 𝐵𝑜𝑡 | 𝑈𝑙𝑡𝑖𝑚𝑎 𝑣𝑒𝑟𝑠𝑖ó𝑛',
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
