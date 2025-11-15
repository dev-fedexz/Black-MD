import { readdirSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync: (path) => { try { return readdirSync(path).length > 0; } catch { return false; } } };
import path, { join } from 'path' 
import ws from 'ws';

if (!global.icons || !Array.isArray(global.icons)) {
    global.icons = [];
}
if (!global.icons.includes('https://files.catbox.moe/p0fk5h.jpg')) {
    global.icons.push('https://files.catbox.moe/p0fk5h.jpg');
}
if (!global.icons.includes('https://files.catbox.moe/cbx89a.jpg')) {
    global.icons.push('https://files.catbox.moe/cbx89a.jpg');
}

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner}) => {
    const conn = _envio;

    const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command)  
    const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command)  
    const isCommand3 = /^(bots|sockets|socket)$/i.test(command)   

    const getRandomIcon = () => {
        if (global.icons && global.icons.length > 0) {
            return global.icons[Math.floor(Math.random() * global.icons.length)];
        }
        return 'https://cloudkuimages.guru/uploads/images/684d9f4d9c0b8.jpg';
    };

    async function reportError(e) {
        await conn.sendMessage(m.chat, { 
            text: `
┏━━╸「 🚨 ᴇʀʀᴏʀ 🔧 」
│ *ᴏᴄᴜʀʀɪó ᴜɴ ᴇʀʀᴏʀ ɪɴᴇsᴘᴇʀᴀᴅᴏ*
│ *ᴅᴇᴛᴀʟʟᴇ:* ${e.message}
│ ᴇʀʀᴏʀ » 𝕤𝕪𝕤𝕥𝕖𝕞 🅢
┗━━━━━━╸`,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: channelRD.id,
                    newsletterName: canalNombreM,
                    serverMessageId: -1,
                },
                forwardingScore: 999,
                externalAdReply: {
                    title: botname,
                    body: dev,
                    thumbnailUrl: getRandomIcon(),
                    sourceUrl: redes,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                },
            },
        }, { quoted: m })
        console.error("ᴇʀʀᴏʀ ᴇɴ ᴊᴀᴅɪʙᴏᴛ-ʙᴏᴛs:", e);
    }

    switch (true) {       
        case isCommand1:
            let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
            let uniqid = `${who.split`@`[0]}`
            const sessionPath = path.join(`./${jadi}/`, uniqid)

            if (!await fs.existsSync(sessionPath)) {
                await conn.sendMessage(m.chat, { 
                    text: `┏━━╸「 🔌 sᴇsɪóɴ ɴᴏ ᴇɴᴄᴏɴᴛʀᴀᴅᴀ 🚫 」
│ *ᴜsᴛᴇᴅ ɴᴏ ᴛɪᴇɴᴇ ᴜɴᴀ sᴇsɪóɴ ᴀᴄᴛɪᴠᴀ*
│ *ᴘᴜᴇᴅᴇ ᴄʀᴇᴀʀ ᴜɴᴀ ᴜsᴀɴᴅᴏ:*
│ ${usedPrefix}qr
│ 
│ *sɪ ᴛɪᴇɴᴇ ᴜɴᴀ ɪᴅ ᴘᴜᴇᴅᴇ ᴜsᴀʀ:*
│ ${usedPrefix}deletebot \`\`\`(ID)\`\`\`
│ ɪɴғᴏ » 𝕤𝕖𝕤𝕤𝕚𝕠𝕟 🅢
┗━━━━━━╸`,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: channelRD.id,
                            newsletterName: channelRD.name,
                            serverMessageId: -1,
                        },
                        forwardingScore: 999,
                        externalAdReply: {
                            title: botname,
                            body: textbot,
                            thumbnailUrl: getRandomIcon(),
                            sourceUrl: redes,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                        },
                    },
                }, { quoted: m }) 
                return
            }

            let foundConn = global.conns.find(c => c.user && c.user.jid.split('@')[0] === uniqid);
            if (foundConn) {
                try {
                    foundConn.ws.close()
                    let i = global.conns.indexOf(foundConn);
                    if (i > -1) {
                        global.conns.splice(i, 1);
                    }
                } catch (e) {
                    console.error(`ᴇʀʀᴏʀ ᴀʟ ᴄᴇʀʀᴀʀ ᴏ ᴇʟɪᴍɪɴᴀʀ ᴄᴏɴᴇxɪóɴ: ${e.message}`);
                }
            }

            if (global.conn.user.jid !== conn.user.jid) {
                await conn.sendMessage(m.chat, { 
                    text: `┏━━╸「 ❌ ᴄᴏᴍᴀɴᴅᴏ ɴᴏ ᴠáʟɪᴅᴏ ⚠️ 」
│ *ᴜsᴇ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴇɴ ᴇʟ ʙᴏᴛ ᴘʀɪɴᴄɪᴘᴀʟ*
│ *ᴇɴʟᴀᴄᴇ ᴅɪʀᴇᴄᴛᴏ:*
│ https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0
│ ᴇʀʀᴏʀ » ℂ𝕠𝕞𝕞𝕒𝕟𝕕 🅒
┗━━━━━━╸`,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: channelRD.id,
                            newsletterName: channelRD.name,
                            serverMessageId: -1,
                        },
                        forwardingScore: 999,
                        externalAdReply: {
                            title: botname,
                            body: textbot,
                            thumbnailUrl: getRandomIcon(),
                            sourceUrl: redes,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                        },
                    },
                }, { quoted: m })
                return
            }
            
            try {
                await fs.rm(sessionPath, { recursive: true, force: true }); 
                
                await conn.sendMessage(m.chat, { 
                    text: `┏━━╸「 🗑️ sᴇsɪóɴ ᴇʟɪᴍɪɴᴀᴅᴀ ✅ 」
│ *ᴛᴜ sᴇsɪóɴ ᴄᴏᴍᴏ sᴜʙ-ʙᴏᴛ sᴇ ʜᴀ ᴇʟɪᴍɪɴᴀᴅᴏ*
│ *sᴇ ʜᴀɴ ᴇʟɪᴍɪɴᴀᴅᴏ ᴛᴏᴅᴏs ʟᴏs ᴅᴀᴛᴏs*
│ *sᴇsɪóɴ ᴄᴇʀʀᴀᴅᴀ ᴄᴏʀʀᴇᴄᴛᴀᴍᴇɴᴛᴇ*
│ ɪɴғᴏ » 𝕤𝕖𝕤𝕤𝕚𝕠𝕟 🅢
┗━━━━━━╸`,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: channelRD.id,
                            newsletterName: channelRD.name,
                            serverMessageId: -1,
                        },
                        forwardingScore: 999,
                        externalAdReply: {
                            title: botname,
                            body: textbot,
                            thumbnailUrl: getRandomIcon(),
                            sourceUrl: redes,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                        },
                    },
                }, { quoted: m })
            } catch (e) {
                reportError(e)
            }  
            break

        case isCommand2:
            if (global.conn.user.jid == conn.user.jid) {
                await conn.sendMessage(m.chat, { 
                    text: `┏━━╸「 ❌ ᴄᴏᴍᴀɴᴅᴏ ɴᴏ ᴠáʟɪᴅᴏ ⚠️ 」
│ *ɴᴏ ᴘᴜᴇᴅᴇs ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴀϙᴜí*
│ *ᴄᴏɴᴛᴀᴄᴛᴀ ᴀʟ ɴúᴍᴇʀᴏ ᴘʀɪɴᴄɪᴘᴀʟ ᴘᴀʀᴀ sᴇʀ sᴜʙ-ʙᴏᴛ*
│ ᴇʀʀᴏʀ » ℂ𝕠𝕞𝕞𝕒𝕟𝕕 🅒
┗━━━━━━╸`,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: channelRD.id,
                            newsletterName: channelRD.name,
                            serverMessageId: -1,
                        },
                        forwardingScore: 999,
                        externalAdReply: {
                            title: botname,
                            body: textbot,
                            thumbnailUrl: getRandomIcon(),
                            sourceUrl: redes,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                        },
                    },
                }, { quoted: m })
            } else {
                await conn.sendMessage(m.chat, { 
                    text: `┏━━╸「 🔌 ʙᴏᴛ ᴅᴇsᴀᴄᴛɪᴠᴀᴅᴏ 🛑 」
│ *${botname} sᴇ ʜᴀ ᴅᴇsᴀᴄᴛɪᴠᴀᴅᴏ*
│ *ᴄᴏɴᴇxɪóɴ ᴄᴇʀʀᴀᴅᴀ ᴄᴏʀʀᴇᴄᴛᴀᴍᴇɴᴛᴇ*
│ ɪɴғᴏ » 𝕤𝕪𝕤𝕥𝕖𝕞 🅢
┗━━━━━━╸`,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: channelRD.id,
                            newsletterName: channelRD.name,
                            serverMessageId: -1,
                        },
                        forwardingScore: 999,
                        externalAdReply: {
                            title: botname,
                            body: textbot,
                            thumbnailUrl: getRandomIcon(),
                            sourceUrl: redes,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                        },
                    },
                }, { quoted: m })
                
                try {
                    conn.ws.close();
                    let i = global.conns.indexOf(conn);
                    if (i > -1) {
                        global.conns.splice(i, 1);
                    }
                } catch (e) {
                    console.error("ᴇʀʀᴏʀ ᴀʟ ᴄᴇʀʀᴀʀ ᴄᴏɴᴇxɪóɴ ᴅᴇʟ sᴜʙ-ʙᴏᴛ:", e);
                }
            }  
            break

        case isCommand3:
            const users = [...new Set([...global.conns.filter((c) => c.user && c.ws.socket && c.ws.socket.readyState === ws.OPEN).map((c) => c)])];

            function convertirMsADiasHorasMinutosSegundos(ms) {
                if (ms === undefined || ms < 0) return 'ᴅᴇsᴄᴏɴᴏᴄɪᴅᴏ';
                var segundos = Math.floor(ms / 1000);
                var minutos = Math.floor(segundos / 60);
                var horas = Math.floor(minutos / 60);
                var días = Math.floor(horas / 24);
                segundos %= 60;
                minutos %= 60;
                horas %= 24;
                var resultado = "";
                if (días !== 0) resultado += días + " ᴅíᴀs, ";
                if (horas !== 0) resultado += horas + " ʜᴏʀᴀs, ";
                if (minutos !== 0) resultado += minutos + " ᴍɪɴᴜᴛᴏs, ";
                if (segundos !== 0) resultado += segundos + " sᴇɢᴜɴᴅᴏs";
                return resultado.trim().replace(/,$/, ''); 
            }

            const message = users.map((v, index) => {
                const uptime = v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'ᴅᴇsᴄᴏɴᴏᴄɪᴅᴏ';
                
                return `┏━━╸「 sᴜʙ-ʙᴏᴛ #${index + 1} 」
│ *ɴúᴍᴇʀᴏ:* wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado
│ *ɴᴏᴍʙʀᴇ:* ${v.user.name || 'sᴜʙ-ʙᴏᴛ'}
│ *ᴛɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ:* ${uptime}
┗━━━━━━╸`
            }).join('\n\n');

            const totalUsers = users.length;
            
            const replyMessage = message.length === 0 ? `┏━━╸「 🚫 sɪɴ sᴜʙ-ʙᴏᴛs ❌ 」
│ *ɴᴏ ʜᴀʏ sᴜʙ-ʙᴏᴛs ᴀᴄᴛɪᴠᴏs (ᴛᴏᴛᴀʟ: ${global.conns.length})*
│ *ɪɴᴛᴇɴᴛᴀ ᴍás ᴛᴀʀᴅᴇ ᴏ ᴠᴇʀɪғɪᴄᴀ ʟᴀ ᴄᴏɴᴇxɪóɴ*
┗━━━━━━╸` : message;

            const responseMessage = `┏━━╸「 🤖 ʟɪsᴛᴀ ᴅᴇ sᴜʙ-ʙᴏᴛs 📌 」
│ *ᴛᴏᴛᴀʟ ᴄᴏɴᴇᴄᴛᴀᴅᴏs:* ${totalUsers || '0'}
│ 
│ *ᴘᴜᴇᴅᴇs ᴘᴇᴅɪʀ ᴘᴇʀᴍɪsᴏ ᴘᴀʀᴀ ᴜɴɪʀ ᴇʟ ʙᴏᴛ ᴀ ᴛᴜ ɢʀᴜᴘᴏ*
│ *ᴇʟ ɴúᴍᴇʀᴏ ᴘʀɪɴᴄɪᴘᴀʟ ɴᴏ sᴇ ʜᴀᴄᴇ ʀᴇsᴘᴏɴsᴀʙʟᴇ ᴅᴇʟ ᴜsᴏ*
┗━━━━━━╸

${replyMessage.trim()}`.trim();

            await conn.sendMessage(m.chat, {
                text: responseMessage, 
                contextInfo: {
                    mentionedJid: [m.sender],
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: channelRD.id,
                        newsletterName: channelRD.name,
                        serverMessageId: -1,
                    },
                    forwardingScore: 999,
                    externalAdReply: {
                        title: botname,
                        body: 'ʟɪsᴛᴀ ᴅᴇ sᴜʙ-ʙᴏᴛs ᴀᴄᴛɪᴠᴏs',
                        thumbnailUrl: getRandomIcon(),
                        sourceUrl: redes,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, {quoted: m })
            break   
    }
}

handler.tags = ['serbot']
handler.help = ['sockets', 'deletesesion', 'pausarai']
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket']

export default handler
