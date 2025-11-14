let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted || !/image/.test(m.quoted.mimetype)) 
        return m.reply(`🪴 Responde a un imagen para actualizar el perfil del grupo`)
    try {
        let media = await m.quoted.download()
        await conn.updateProfilePicture(m.chat, media)
    } catch {
        m.reply('🍂 _Error al actualizar el perfil del grupo_')
    }
}

handler.help = ['setppgc']
handler.tags = ['group']
handler.command = ['setppgc', 'setppgrupo', 'setppgroup']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler