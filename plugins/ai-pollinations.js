import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import os from 'os';

let yeon = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.sendMessage(m.chat, {
        text: `🪴 _Debes ingresar un prompt para generar una imagen_
_Ejemplo_

${usedPrefix + command} chica anime con gafas`
    });

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    try {
        const imageUrl = await pollinations(text);

        await conn.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `*Tu prompt fue generada con éxito*`
        });
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (e) {
        console.error('Error:', e.message);
        let errorMsg = `❌❌❌ ERROR  ❌❌❌`;

        if (e.message.includes('Input must be a string')) {
            errorMsg = `🚫 El prompt debe ser texto válido  
Ejemplo: *${usedPrefix + command}* chica anime con gafas`;
        }

        await conn.sendMessage(m.chat, { text: errorMsg });
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
};

async function pollinations(prompt) {
    try {
        const encodedPrompt = encodeURIComponent(prompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?nologo=true`;
        const tempPath = path.join(os.tmpdir(), 'temp_image.jpg');
        const response = await axios.get(imageUrl, { responseType: 'stream' });
        const writer = fs.createWriteStream(tempPath);
        
        response.data.pipe(writer);
        
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        const form = new FormData();
        form.append('reqtype', 'fileupload');
        form.append('fileToUpload', fs.createReadStream(tempPath));
        
        const upload = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: form.getHeaders()
        });

        fs.unlinkSync(tempPath);
        return upload.data;
    } catch (err) {
        throw new Error(err.message);
    }
}

yeon.help = ['pollinations <prompt>'];
yeon.tags = ['ai'];
yeon.command = ['pollinations', 'aipoli']
yeon.register = true;
yeon.limit = true;

export default yeon;