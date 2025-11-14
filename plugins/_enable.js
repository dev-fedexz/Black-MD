const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  const fkontak = {
    key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  };

  const miniopcion = `🎋 *ON / OFF*

${usedPrefix + command} welcome
${usedPrefix + command} antilink
${usedPrefix + command} nsfw
${usedPrefix + command} antiprivado
${usedPrefix + command} jadibotmd
${usedPrefix + command} economy`;

  const isEnable = /true|enable|(turn)?on|1/i.test(command);
  const chat = global.db.data.chats[m.chat] || {};
  const user = global.db.data.users[m.sender];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const type = (args[0] || '').toLowerCase();
  let isAll = false;

  const validateGroupAdmin = () => {
    if (!m.isGroup) {
      if (!isOwner) {
        global.dfail('group', m, conn);
        throw false;
      }
    } else if (!isAdmin && !isOwner) {
      global.dfail('admin', m, conn);
      throw false;
    }
  };

  const validateOwner = () => {
    if (!isOwner) {
      global.dfail('owner', m, conn);
      throw false;
    }
  };

  const validateROwner = () => {
    if (!isROwner) {
      global.dfail('rowner', m, conn);
      throw false;
    }
  };

  switch (type) {
    case 'welcome': case 'bienvenida':
      validateGroupAdmin();
      chat.welcome = isEnable;
      break;

    case 'antilink': case 'antienlace':
      validateGroupAdmin();
      chat.antiLink = isEnable;
      break;

    case 'nsfw': case 'nsfwhot': case 'nsfwhorny':
      validateGroupAdmin();
      chat.nsfw = isEnable;
      break;

    case 'antiprivado': case 'antiprivate': case 'privado':
      isAll = true;
      validateROwner();
      bot.antiPrivate = isEnable;
      break;

    case 'jadibotmd': case 'modejadibot':
      isAll = true;
      validateROwner();
      bot.jadibotmd = isEnable;
      break;

    case 'economy': case 'eco':
      validateGroupAdmin();
      chat.economy = isEnable;
      break;

    default:
      if (!/[01]/.test(command)) {
        return conn.reply(m.chat, miniopcion, m, fkontak);
      }
      throw false;
  }

  // Guardamos los cambios en la DB global
  global.db.data.chats[m.chat] = chat;
  global.db.data.settings[conn.user.jid] = bot;

  return conn.reply(
    m.chat,
    `🪴 *La función "${type}" ha sido ${isEnable ? 'activada' : 'desactivada'} ${isAll ? 'en todo el bot' : 'en este chat'}.*`,
    m,
    fkontak
  );
};

handler.help = ['enable', 'disable'].map(cmd => `${cmd} <opción>`);
handler.tags = ['nable'];
handler.command = ['enable', 'disable', 'on', 'off'];

export default handler;