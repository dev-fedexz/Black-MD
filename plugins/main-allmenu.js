// Este archivo maneja las categorías del menú principal de tu bot.

import fetch from 'node-fetch';

// URL de la imagen que proporcionaste para el menú
const getMenuImageUrl = () => "https://files.catbox.moe/7xbyyf.jpg"; 

let handler = async (m, { conn, usedPrefix, command }) => {
    // Título principal
    const title = 'Kurumi bot🚀';

    // Descripción de bienvenida
    const welcomeMessage = `
¡Hola ${m.pushName}!

Soy **Kurumi Asistencia**, tu compañero de confianza.
Usa los siguientes comandos para explorar mis funciones:
`;

    // Lista de categorías con sus comandos y descripciones
    const categories = [
        {
            name: 'ℹ️ Info Grupos',
            description: 'Información de grupos',
            command: '.infogrupos', 
            emoji: '💬',
            statusEmoji: '🟢' // Estado (como en la imagen)
        },
        {
            name: '🤖 Info Bot',
            description: 'Información del bot',
            command: '.infobot', 
            emoji: '🤖',
            statusEmoji: '⚪'
        },
        {
            name: '📖 Menú Completo',
            description: 'Ver todos los comandos disponibles',
            command: '.allmenu',
            emoji: '📚',
            statusEmoji: '⚪'
        },
        {
            name: '📝 Auto Reg',
            description: 'Registro automático',
            command: '.autoreg', 
            emoji: '✍️',
            statusEmoji: '⚪'
        },
        {
            name: '⚡ Ping',
            description: 'Velocidad del bot',
            command: '.ping',
            emoji: '💨',
            statusEmoji: '⚪'
        },
        {
            name: '📊 Status',
            description: 'Estado del bot',
            command: '.status',
            emoji: '📈',
            statusEmoji: '⚪'
        }
    ];

    // Construir el cuerpo del mensaje de las categorías
    let categoriesText = categories.map(cat => {
        return `*${cat.statusEmoji}* *${cat.name}:*\n  - _${cat.description}_ (Usar: \`${cat.command}\`)`;
    }).join('\n\n');

    const fullMessage = `
*${title}*
${welcomeMessage}
${categoriesText}

----------------------------------------
*¡Gracias por usar Uchiha Itachi Asistencia!*
    `.trim();

    try {
        const imageUrl = getMenuImageUrl();
        let imageBuffer;
        
        // Intentar descargar la imagen
        try {
            const res = await fetch(imageUrl);
            if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
            imageBuffer = await res.buffer();
        } catch (fetchError) {
            console.error("Error al descargar la imagen:", fetchError);
            imageBuffer = null; // Marcar como nulo para usar solo texto
        }

        if (imageBuffer) {
            // Enviar la imagen junto con el texto del menú
            await conn.sendMessage(m.chat, {
                image: imageBuffer,
                caption: fullMessage,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: "Kurumi bot Asistencia",
                        body: "Tu bot personal de WhatsApp",
                        thumbnailUrl: imageUrl, // Usar la misma URL para la miniatura
                        mediaType: 1, // 1 = imagen
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        } else {
            // Si falla la descarga de la imagen, enviar solo el texto
            await conn.sendMessage(m.chat, { text: fullMessage }, { quoted: m });
        }

    } catch (e) {
        console.error("Error general en main-menu:", e);
        // Fallback final: enviar solo texto
        await conn.sendMessage(m.chat, { text: fullMessage }, { quoted: m });
    }
};

handler.help = ['allmenu', 'start'];
handler.tags = ['main'];
handler.command = ['allmenu', 'start'];

export default handler;
