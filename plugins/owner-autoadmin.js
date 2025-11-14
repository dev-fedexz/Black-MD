let handler = async (m, { conn, isAdmin }) => {
if (m.fromMe) throw 'Nggk'
if (isAdmin) throw '🍎 _Mi creador ahora es admin_'
await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")}
handler.help = ['autoadmin']
handler.tags = ['owner']
handler.command = ['admin','atad','autoadmin']
handler.rowner = true
handler.botAdmin = true
export default handler
