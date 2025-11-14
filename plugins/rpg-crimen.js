let handler = async (m, { conn, usedPrefix, command }) => {
  const currency = 'Coins'; // <-- Aquí definimos la moneda

  if (!db.data.chats[m.chat].economy && m.isGroup) {
    return m.reply(`《✦》Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
  }

  let user = global.db.data.users[m.sender]
  user.lastcrime = user.lastcrime || 0
  user.coin = user.coin || 0

  const cooldown = 8 * 60 * 1000
  const ahora = Date.now()

  if (ahora < user.lastcrime) {
    const restante = user.lastcrime - ahora
    const wait = formatTimeMs(restante)
    return conn.reply(m.chat, `🌿 Debes esperar *${wait}* para usar *${usedPrefix + command}* de nuevo.`, m)
  }

  user.lastcrime = ahora + cooldown

  const evento = pickRandom(crimen)
  let cantidad

  if (evento.tipo === 'victoria') {
    cantidad = Math.floor(Math.random() * 1501) + 6000
    user.coin += cantidad
  } else {
    cantidad = Math.floor(Math.random() * 1501) + 4000
    user.coin -= cantidad
    if (user.coin < 0) user.coin = 0
  }

  await conn.reply(m.chat, `🌿 ${evento.mensaje} *¥${cantidad.toLocaleString()} ${currency}*`, m)
}

handler.tags = ['economy']
handler.help = ['crimen']
handler.command = ['crimen', 'crime']
handler.group = true

export default handler

function formatTimeMs(ms) {
  const totalSec = Math.ceil(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  const partes = []
  if (min) partes.push(`${min} minuto${min !== 1 ? 's' : ''}`)
  partes.push(`${sec} segundo${sec !== 1 ? 's' : ''}`)
  return partes.join(' ')
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const crimen = [
  { tipo: 'victoria', mensaje: "Hackeaste un cajero automático usando un exploit del sistema y retiraste efectivo sin alertas, ganaste." },
  { tipo: 'victoria', mensaje: "Te infiltraste como técnico en una mansión y robaste joyas mientras inspeccionabas la red, ganaste." },
  { tipo: 'victoria', mensaje: "Simulaste una transferencia bancaria falsa y obtuviste fondos antes de que cancelaran la operación, ganaste." },
  { tipo: 'victoria', mensaje: "Interceptaste un paquete de lujo en una recepción corporativa y lo revendiste, ganaste." },
  { tipo: 'victoria', mensaje: "Vaciaste una cartera olvidada en un restaurante sin que nadie lo notara, ganaste." },
  { tipo: 'victoria', mensaje: "Accediste al servidor de una tienda digital y aplicaste descuentos fraudulentos para obtener productos gratis, ganaste." },
  { tipo: 'victoria', mensaje: "Te hiciste pasar por repartidor y sustrajiste un paquete de colección sin levantar sospechas, ganaste." },
  { tipo: 'victoria', mensaje: "Copiaste la llave maestra de una galería de arte y vendiste una escultura sin registro, ganaste." },
  { tipo: 'victoria', mensaje: "Creaste un sitio falso de caridad y lograste que cientos de personas donaran, ganaste." },
  { tipo: 'victoria', mensaje: "Manipulaste un lector de tarjetas en una tienda local y vaciaste cuentas privadas, ganaste." },
  { tipo: 'victoria', mensaje: "Falsificaste entradas VIP para un evento y accediste a un área con objetos exclusivos, ganaste." },
  { tipo: 'victoria', mensaje: "Engañaste a un coleccionista vendiéndole una réplica como pieza original, ganaste." },
  { tipo: 'victoria', mensaje: "Capturaste la contraseña de un empresario en un café y transferiste fondos a tu cuenta, ganaste." },
  { tipo: 'victoria', mensaje: "Convenciste a un anciano de participar en una inversión falsa y retiraste sus ahorros, ganaste." },
  { tipo: 'derrota', mensaje: "Intentaste vender un reloj falso, pero el comprador notó el engaño y te denunció, perdiste." },
  { tipo: 'derrota', mensaje: "Hackeaste una cuenta bancaria, pero olvidaste ocultar tu IP y fuiste rastreado, perdiste." },
  { tipo: 'derrota', mensaje: "Robaste una mochila en un evento, pero una cámara oculta capturó todo el acto, perdiste." },
  { tipo: 'derrota', mensaje: "Te infiltraste en una tienda de lujo, pero el sistema silencioso activó la alarma, perdiste." },
  { tipo: 'derrota', mensaje: "Simulaste ser técnico en una mansión, pero el dueño te reconoció y llamó a seguridad, perdiste." },
  { tipo: 'derrota', mensaje: "Intentaste vender documentos secretos, pero eran falsos y nadie quiso comprarlos, perdiste." }
]