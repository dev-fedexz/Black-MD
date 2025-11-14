let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
    if (!text) return m.reply(`🪴 Por favor envie una invitación para que ${botname} se una.`);

    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply(`🌿 El enlace de invitación no es válido.`);

    if (isOwner) {
        await conn.groupAcceptInvite(code)
            .then(res => m.reply(`🍁 El bot se unió al grupo.`))
            .catch(err => m.reply(`${msm} Error al unirme al grupo.`));
    } else {
        let message = `*Hola desarrollador 👋🏻*\n*Me invitaron a un chat grupal*\n\n${text}\n\nAcción echa por: @${m.sender.split('@')[0]}`;
        await conn.sendMessage(`${mods}` + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`🪴 La invitación fue enviada a mi desarrollador \n\n🍁 Quieres hablar con el directamente te dejo su número \n\n➡️ WhatsApp: ${creador}`);
    }
};

handler.help = ['join/invite'];
handler.tags = ['owner'];
handler.command = ['invite', 'join'];

export default handler;