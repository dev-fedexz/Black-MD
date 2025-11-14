import fs from 'fs';

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`🪴 Por favor ingrese el, Nombre del plugin`);
    }

    if (!m.quoted || !m.quoted.text) {
        return m.reply(`🍁 _Responda al mensaje con el contenido del plugin_`);
    }

    const ruta = `plugins/${text}.js`;
    
    try {
        await fs.writeFileSync(ruta, m.quoted.text);
        m.reply(`🪴 _Guardando plugin en_ ${ruta}`);
    } catch (error) {
        m.reply(`${msm} Ocurrió un error al guardar el plugin: ${error.message}`);
    }
};

handler.help = ['saveplugin'];
handler.tags = ['owner'];
handler.command = ['saveplugin'];
handler.owner = true;

export default handler;