const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const why = `🪴 Por favor mencione a alguien que *sera owner* o *será eliminado de owner*`;
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  if (!who) return conn.reply(m.chat, why, m, {mentions: [m.sender]});
  switch (command) {
    case 'addowner':
      const nuevoNumero = who;
      global.owner.push([nuevoNumero]);
      await conn.reply(m.chat, `🍁 Listo el usuario ya esta en la lista de owners`, m);
      break;
    case 'delowner':
      const numeroAEliminar = who;
      const index = global.owner.findIndex(owner => owner[0] === numeroAEliminar);
      if (index !== -1) {
        global.owner.splice(index, 1);
        await conn.reply(m.chat, `🌿 El número fue eliminado con éxito `, m);
      } else {
        await conn.reply(m.chat, `🍂 Erorr el número de teléfono no se encuentra en la lista de owners`, m);
      }
      break;
  }
};
handler.help = ['addowner', 'delowner'];
handler.tags = ["owner"];
handler.command = ['addowner', 'delowner']
handler.rowner = true;
export default handler;