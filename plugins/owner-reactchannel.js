import { WAMessageStubType } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [channelId, msgId, emoji] = text.split(' ');

    if (!channelId || !msgId || !emoji) {
        return m.reply(
`Uso incorrecto. Necesitas el ID del canal, el ID del mensaje y el emoji.

*Ejemplo:*
${usedPrefix + command} 1234567890@newsletter ABCDEFGHIJK123 👍`
        );
    }
    
    // Asegurarse de que el ID del canal tenga el formato correcto
    if (!channelId.endsWith('@newsletter')) {
        channelId += '@newsletter';
    }

    try {
        await m.reply(`Enviando reacción [${emoji}] al canal...`);

        // 1. Construir la 'key' del mensaje al que se va a reaccionar
        // (El 'id' es el ID único del mensaje del canal)
        const reactionKey = {
            remoteJid: channelId,
            id: msgId,
            fromMe: false // Asumimos que el bot no envió el mensaje original
        };

        // 2. Enviar la reacción
        await conn.sendMessage(channelId, {
            react: {
                text: emoji,
                key: reactionKey
            }
        });

        m.reply("✅ ¡Reacción enviada!");

    } catch (e) {
        console.error(e);
        m.reply(`Error al enviar la reacción. Asegúrate de que:\n1. El bot siga ese canal.\n2. El ID del canal y el ID del mensaje sean correctos.\n\n${e.message}`);
    }
}
handler.command = ['reactchannel'];
handler.help = ['reactchannel <id-canal> <id-mensaje> <emoji>'];
handler.tags = ['owner'];
handler.rowner = true; 

export default handler;
