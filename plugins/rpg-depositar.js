let handler = async (m, { args, usedPrefix, command }) => {
  // Revisar si la economía está activada en el grupo
  if (!db.data.chats[m.chat].economy && m.isGroup) {
    return m.reply(`《✦》Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
  }

  let user = global.db.data.users[m.sender]

  if (!args[0]) return m.reply(`🌿 Ingresa la cantidad de *${global.moneda}* que deseas Depositar.`)
  if ((args[0]) < 1) return m.reply(`🌿 Ingresa una cantidad válida de *${global.moneda}*.`)

  if (args[0] == 'all') {
    let count = parseInt(user.coin)
    user.coin -= count * 1
    user.bank += count * 1
    await m.reply(`🌿 Depositaste *${count.toLocaleString()} ${global.moneda}* en el banco, ya no podrán robártelo.`)
    return !0
  }

  if (!Number(args[0])) return m.reply(`🌿 Debes depositar una cantidad válida.\n> Ejemplo 1 » *${usedPrefix}d 25000*\n> Ejemplo 2 » *${usedPrefix}d all*`)

  let count = parseInt(args[0])
  if (!user.coin) return m.reply(`🌿 No tienes suficientes *${global.moneda}* en la Cartera.`)
  if (user.coin < count) return m.reply(`✧ Solo tienes *¥${user.coin.toLocaleString()} ${global.moneda}* en la Cartera.`)

  user.coin -= count * 1
  user.bank += count * 1

  await m.reply(`🌿 Depositaste *¥${count.toLocaleString()} ${global.moneda}* en el banco, ya no podrán robártelo.`)
}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['deposit', 'depositar', 'd', 'dep']
handler.group = true

export default handler