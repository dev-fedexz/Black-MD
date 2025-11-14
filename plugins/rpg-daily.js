let handler = async (m, { conn, usedPrefix }) => {
  // Revisar si la economía está activada en el grupo
  if (!db.data.chats[m.chat].economy && m.isGroup) {
    return m.reply(`《✦》Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
  }

  // Obtener el usuario
  let mentionedJid = await m.mentionedJid
  let who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : m.sender

  if (!(who in global.db.data.users)) return m.reply(`ꕥ El usuario no se encuentra en mi base de datos.`)

  let user = global.db.data.users[who]
  let coin = user.coin || 0
  let bank = user.bank || 0
  let total = coin + bank

  // Obtener el nombre del usuario
  let name = await (async () => global.db.data.users[who].name || 
    (async () => { 
      try { 
        const n = await conn.getName(who); 
        return typeof n === 'string' && n.trim() ? n : who.split('@')[0] 
      } catch { 
        return who.split('@')[0] 
      } 
    })()
  )()

  // Mensaje de balance usando global.moneda
  const texto = `🔥 Informacion -  Balance 🔥
  
🔥 Usuario » *${name}*   
🌿 Cartera » *¥${coin.toLocaleString()} ${global.moneda}*
🌿 Banco » *¥${bank.toLocaleString()} ${global.moneda}*
🌿 Total » *¥${total.toLocaleString()} ${global.moneda}*

> *Para proteger tu dinero, ¡depósitalo en el banco usando #deposit!*`

  await conn.reply(m.chat, texto, m)
}

handler.help = ['bal']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank'] 
handler.group = true 

export default handler