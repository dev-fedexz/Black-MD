const handler = async (m, { conn, participants, usedPrefix, command }) => {
  const emoji = '🕴';

  if (!m.mentionedJid[0] && !m.quoted) {
    return conn.reply(m.chat, `
🍎 Debes mencionar a alguien para eliminar`, fkontak, fake)
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = global.owner[0][0] + '@s.whatsapp.net';

  if (user === conn.user.jid) {
    return conn.reply(m.chat, `
🌿 No puedo eliminarme ami mismo`, fkontak, fake)
  }

  if (user === ownerGroup) {
    return conn.reply(m.chat, `
🍁 No puedo tocar al creador del grupo, Si se pudiera con gusto`, fkontak, fake)
  }

  if (user === ownerBot) {
    return conn.reply(m.chat, `
👑 No puedo eliminar ami creador`, fkontak, fake)
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
  conn.reply(m.chat, `
*Usuario eliminado correctamente ✅*
*Por motivo no identificado ❌*`, fkontak, fake)
};

handler.help = ['kick'];
handler.tags = ['group'];
handler.command = ['kick','echar','hechar','sacar','ban'];
handler.admin = true;
handler.group = true;
handler.register = true;
handler.botAdmin = true;

export default handler;