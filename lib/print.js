import chalk from 'chalk'
import { parsePhoneNumber } from 'awesome-phonenumber'
import { watchFile } from 'fs'

export default async function (m, conn = { user: {} }) {
  try {
    if (global.opts?.noprint || global.db?.data?.settings?.[conn.user?.jid]?.noprint) return
    if (!m || !m.sender || !m.chat || !m.mtype) return
    
    // --- Extracción y Formato de Datos ---
    let parsed = parsePhoneNumber('+' + m.sender.replace(/[^0-9]/g, ''))
    let numeroTelefono = parsed.valid ? parsed.number.e164.replace('+', '') : m.sender.replace(/[^0-9]/g, '')
    let nombreRemitente = await conn.getName(m.sender) || 'Desconocido'
    let idChat = m.chat
    let nombreChat = await conn.getName(m.chat) || 'Chat Privado'
    let tipoMensaje = m.mtype.replace(/message$/i, '').replace(/^./, v => v.toUpperCase())
    let marcaTiempo = new Date(m.messageTimestamp * 1000).toLocaleString('es-ES', { timeZone: 'America/Mexico_City' }) + ' (CDMX)'
    
    let tamañoArchivo = m.msg
      ? m.msg.fileLength
        ? (typeof m.msg.fileLength === 'object' ? m.msg.fileLength.low || 0 : m.msg.fileLength)
        : m.text ? m.text.length : 0
      : m.text ? m.text.length : 0
      
    let infoTamaño = m.mtype.includes('audio') || m.mtype.includes('image') || m.mtype.includes('video') || m.mtype.includes('document')
      ? `${tamañoArchivo} bytes`
      : `${tamañoArchivo} Caracteres`
      
    let esDelBot = m.key.fromMe ? chalk.bgMagenta.white(' 🤖 BOT ') : chalk.bgBlue.white(' 👤 USER ')
    let textoMensaje = m.text || ''
    let mensajeReducido = textoMensaje.length > 80 ? textoMensaje.substring(0, 80) + '...' : textoMensaje
    let comandoDetectado = textoMensaje.startsWith('.') ? textoMensaje.split(' ')[0] : chalk.gray('N/A')
    
    let destino = m.chat.endsWith('@g.us') ? 'GRUPO'
      : m.chat.endsWith('@s.whatsapp.net') ? 'PRIVADO'
      : m.chat.endsWith('@broadcast') ? 'DIFUSIÓN'
      : m.chat.endsWith('@newsletter') ? 'CANAL'
      : m.chat.endsWith('@lid') ? 'COMUNIDAD'
      : 'DESCONOCIDO'
      
    let colorDestino = m.chat.endsWith('@g.us') ? chalk.bgGreen.black.bold(destino) 
      : m.chat.endsWith('@s.whatsapp.net') ? chalk.bgYellow.black.bold(destino)
      : chalk.bgGray.white.bold(destino)
      
    // --- Impresión en Consola ---
    const SEPARATOR = chalk.hex('#FFC0CB').bold('━').repeat(45) // Color Rosado/Fucsia
    
    console.log(SEPARATOR)
    console.log(chalk.hex('#FFC0CB').bold('NUEVO MENSAJE REGISTRADO') + colorDestino)
    console.log(SEPARATOR)
    
    // Bloque de Remitente y Fuente
    console.log(`${chalk.white.bold('    Remitente:')} ${chalk.yellowBright.bold(nombreRemitente)}`)
    console.log(`${chalk.white.bold('    Número:')} ${chalk.cyanBright.bold(numeroTelefono)}`)
    console.log(`${chalk.white.bold('    Fuente:')} ${esDelBot}`)
    console.log(chalk.gray('   ' + '-'.repeat(40))) // Separador sutil
    
    // Bloque de Chat y Hora
    console.log(`${chalk.white.bold('    Chat:')} ${chalk.greenBright.bold(nombreChat)}`)
    console.log(`${chalk.white.bold('    ID:')} ${chalk.gray(idChat)}`)
    console.log(`${chalk.white.bold('    Hora:')} ${chalk.white.italic(marcaTiempo)}`)
    console.log(chalk.gray('   ' + '-'.repeat(40))) // Separador sutil
    
    // Bloque de Contenido y Tipo
    console.log(`${chalk.white.bold('    Tipo:')} ${chalk.magenta.bold(tipoMensaje)}`)
    console.log(`${chalk.white.bold('    Tamaño:')} ${chalk.white(infoTamaño)}`)
    console.log(`${chalk.white.bold('    Comando:')} ${chalk.red.bold(comandoDetectado)}`)
    
    // Mensaje
    if (textoMensaje) {
      console.log(SEPARATOR)
      console.log(chalk.hex('#ADFF2F').bold('💬 CONTENIDO:')) // Color Verde Neón
      console.log(chalk.white.bold(`   "${mensajeReducido}"`))
    }
    
    console.log(SEPARATOR + '\n') // Espacio al final para separar registros
    
  } catch (err) {
    console.error(chalk.red.bold('\n❌ ERROR en el registro de mensaje: ') + chalk.white(err.message))
  }
}

let file = global.__filename(import.meta.url)
watchFile(file, () => {
  console.log(chalk.bgRed.white.bold(" ⚠️ ¡ACTUALIZACIÓN! ") + chalk.redBright(" 'print.js' ha sido modificado y recargado. "))
})
