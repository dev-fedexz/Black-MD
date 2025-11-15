const { parse} = require('url');

const handler = async (m, { conn, args, command}) => {
  if (args.length < 2) {
    return m.reply(`❌ Uso incorrecto.\nEjemplo:\n.react https://whatsapp.com/channel/0029Vb7GXFc9cDDW4i1gJY1m/691 🌱`);
}

  const url = args[0];
  const emoji = args[1];

  try {
    const { pathname} = parse(url);
    const partesURL = pathname.split('/');
    const channelId = partesURL[2];
    const messageId = partesURL[3];

    if (!channelId ||!messageId) {
      return m.reply('❌ URL inválida. Asegúrate de usar el formato correcto.');
}

    await conn.sendReaction({
      reaction: emoji,
      messageId: messageId,
      channelId: channelId,
});

    m.reply(`✅ Reaccioné con ${emoji} al mensaje ${messageId}`);
} catch (e) {
    console.error(e);
    m.reply('❌ Error al intentar reaccionar al mensaje.');
}
};

handler.command = /^react|raact$/i;
handler.tags = ['tools'];
handler.help = ['react <url> <emoji>'];
handler.register = true;

module.exports = handler;
