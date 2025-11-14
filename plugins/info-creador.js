let handler = async (m, { conn }) => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:𝐇𝐚𝐬𝐡𝐢𝐫𝐚𝐦𝐚 𝐒𝐞𝐧𝐣𝐮
ORG:𝐇𝐚𝐬𝐡𝐢𝐫𝐚𝐦𝐚 𝐒𝐞𝐧𝐣𝐮
TITLE:Epictetus, Enchiridion — Chapter 1 (verse 1)
EMAIL;type=INTERNET:brayanfree881@gmail.com
TEL;type=CELL;waid=50231458537:+50231458537
ADR;type=WORK:;;2-chōme-7-5 Fuchūchō;Izumi;Osaka;594-0071;Japan
URL;type=WORK:https://www.instagram.com/naruyaizumi
X-WA-BIZ-NAME:Brayan Uchiha
X-WA-BIZ-DESCRIPTION:𝘾𝙧𝙚𝙖𝙙𝙤𝙧 𝙗𝙮 𝘽𝙧𝙖𝙮𝙖𝙣 𝙪𝙘𝙝𝙞𝙝𝙖
X-WA-BIZ-HOURS:Mo-Su 00:00-23:59
END:VCARD`;

    const q = {
        key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
        },
        message: {
            contactMessage: {
                displayName: "Brayan Uchiha",
                vcard,
            },
        },
    };

    await conn.sendMessage(
        m.chat,
        {
            contacts: {
                displayName: "Brayan Uchiha",
                contacts: [{ vcard }],
            },
            contextInfo: {
                externalAdReply: {
                    title: "© 2024–2025 Itachi Project",
                    body: "Contacta al Propietario vía WhatsApp",
                    thumbnailUrl: "https://raw.githubusercontent.com/El-brayan502/dat1/main/uploads/c82ef3-1760861923954.jpg",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                },
            },
        },
        { quoted: q }
    );
};

handler.help = ["owner"];
handler.tags = ["info"];
handler.command = ['owner', 'creador']

export default handler;