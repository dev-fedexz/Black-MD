import axios from 'axios';
import FormData from 'form-data';

let yeon = async (m, { conn, usedPrefix, command }) => {
    const quoted = m.quoted || m;
    const mime = quoted.mimetype || "";

    if (!/image\/(png|jpe?g|webp)/i.test(mime)) {
        await conn.sendMessage(m.chat, {
            react: { text: "❌", key: m.key }
        });
        return conn.sendMessage(m.chat, {
            text: `🌿 _Por favor responde a una imagen con el comando_ *${usedPrefix + command}* _para eliminar el fondo_`
        });
    }

    try {
        await conn.sendMessage(m.chat, {
            react: { text: "⏳", key: m.key }
        });

        const buffer = await quoted.download();

        const ext = mime.split("/")[1] || "png";
        const randomName = `Fiony_${Math.random().toString(36).slice(2)}.${ext}`;

        const form = new FormData();
        form.append("image", buffer, randomName);
        form.append("format", "png");
        form.append("model", "v1");

        const headers = {
            ...form.getHeaders(),
            accept: "application/json, text/plain, */*",
            "x-client-version": "web",
            "x-locale": "en"
        };

        const res = await axios.post("https://api2.pixelcut.app/image/matte/v1", form, {
            headers,
            responseType: "arraybuffer"
        });

        await conn.sendMessage(m.chat, {
            image: res.data,
            caption: `*El fondo fue eliminado con éxito 🍂*`
        });

        await conn.sendMessage(m.chat, {
            react: { text: "✅", key: m.key }
        });

    } catch (e) {
        console.error('Error:', e.message);
        await conn.sendMessage(m.chat, {
            react: { text: "❌", key: m.key }
        });
        await conn.sendMessage(m.chat, {
            text: `*[❗] Ocurrió un Error intenta más tarde*`
        });
    }
};

yeon.help = ['bg <responder a imagen>'];
yeon.tags = ['ai'];
yeon.command = ['bgremover', 'bg', 'bgremóver']
yeon.register = true;
yeon.limit = true;

export default yeon;