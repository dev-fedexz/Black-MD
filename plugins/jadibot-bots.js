import { CONNECTING } from 'ws' 

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!global.conns) {
        global.conns = []
    }

    const principalBot = {
        name: conn.user.name || 'Bot Principal (Owner)',
        id: conn.user.jid,
        status: 'Principal 1',
    };

    const subBotsActivos = global.conns.filter(
        (subConn) => subConn.user && subConn.ws.socket && subConn.ws.socket.readyState !== 3 
    ).map((subConn, index) => {
        const name = subConn.user.name || `Sub-Bot ${index + 1}`;
        const id = subConn.user.jid;
        
        let status;
        if (subConn.ws.socket.readyState === CONNECTING) { 
            status = 'Conectando 🔄';
        } else if (subConn.ws.socket.readyState === 1) { 
            status = 'Activo ✅';
        } else {
            status = 'Desconocido ❓';
        }
        
        return {
            name: name,
            id: id.split('@')[0], 
            status: status,
        };
    });

    let totalBots = subBotsActivos.length + 1; 

    let caption = `
*👥 Sub-Bots Activos*

*📊 Total de Sesiones Activas:* ${totalBots} (incl. Principal)

*Principal 1:* ${principalBot.name}
ID: ${principalBot.id.split('@')[0]}

`;

    if (subBotsActivos.length > 0) {
        caption += `*Sub-Bots Vinculados:* \n`;
        subBotsActivos.forEach((bot, index) => {
            caption += `👤 Bot ${index + 1}: +${bot.id} (${bot.status})\n`;
        });
    } else {
        caption += `*❌ No hay Sub-Bots vinculados actualmente.* \n`;
    }

    caption += `
*Comandos de Desconexión:*
*• Autodesconexión (Para Sub-Bots):*
  Usa *.delcode* o *.delsesion* para que un Sub-Bot cierre su propia sesión.

*• Desconexión por el Principal:*
  Usa *${usedPrefix}delsesi [ID_NUMBER]* para eliminar una sesión específica.
`;

    await conn.reply(m.chat, caption.trim(), m);
}

handler.help = ['subbots', 'botsactivos']
handler.tags = ['info', 'serbot']
handler.command = /^(subbots|botsactivos)$/i

export default handler
