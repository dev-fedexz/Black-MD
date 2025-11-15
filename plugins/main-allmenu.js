import fetch from 'node-fetch'
import { format} from 'util'

let handler = async (m, { conn, args}) => {
  let mentionedJid = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]: m.sender
  let user = global.db.data.users[mentionedJid] || {}
  let nombre = conn.getName(mentionedJid)
  let premium = user.premium? '✅ Sí': '❌ No'
  let uptime = format(process.uptime() * 1000).split('.')[0]
  let groupsCount = Object.values(conn.chats).filter(v => v.isGroup).length
  let totalreg = Object.keys(global.db.data.users).length
  let totalCommands = Object.values(global.plugins).filter(v => v.help && v.tags).length

  let txt = `
> ❐ \`Hola,\` Soy *_Shadow - Bot_* 🌱

╰┈□ \`\`\`IᑎᖴO-ᑌՏᗴᖇ\`\`\`
❐ _Usuario:_ ${nombre}
❐ _Premium:_ ${premium}
❐ _Registrados totales:_ ${totalreg}

╰┈□ \`\`\`IᑎᖴO-ᗷOT\`\`\`
❐ _Tiempo activo:_ ${uptime}
❐ _Grupos activos:_ ${groupsCount}
❐ _Comandos disponibles:_ ${totalCommands}
❐ _Fecha actual:_ [${new Date().toLocaleString('es-ES')}]


> ꒷︶꒥꒷‧₊ ໒( 𝙸𝚗𝚏𝚘𝚛𝚖𝚊𝚌𝚒ó𝚗 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.owner_*
> ➩ *_.creador_*
> ➩ *_.grupos_*
> ➩ *_.oficiales_*
> ➩ *_.canales_*
> ➩ *_.ping_*
> ➩ *_.p_*
> ➩ *_.reporte_*
> ➩ *_.report_*
> ➩ *_.reportar_*
> ➩ *_.bug_*
> ➩ *_.error_*
> ➩ *_.status_*
> ➩ *_.unreg_*
> ➩ *_.verificar_*
> ➩ *_.reg_*
> ➩ *_.registrar_*


> ꒷︶꒥꒷‧₊ ໒( 𝙰𝚗𝚒𝚖𝚎 & 𝚆𝚊𝚒𝚏𝚞𝚜 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.angry_*
> ➩ *_.enojado_*
> ➩ *_.bite_*
> ➩ *_.morder_*
> ➩ *_.nights_*
> ➩ *_.noche_*
> ➩ *_.noches_*
> ➩ *_.dias_*
> ➩ *_.dia_*
> ➩ *_.days_*
> ➩ *_.coffe_*
> ➩ *_.cafe_*
> ➩ *_.cry_*
> ➩ *_.llorar_*
> ➩ *_.cuddle_*
> ➩ *_.acurrucarse_*
> ➩ *_.happy_*
> ➩ *_.feliz_*
> ➩ *_.hello_*
> ➩ *_.hola_*
> ➩ *_.kiss_*
> ➩ *_.besar_*
> ➩ *_.punch_*
> ➩ *_.pegar_*
> ➩ *_.golpear_*
> ➩ *_.waifurequest_*
> ➩ *_.rw_*
> ➩ *_.w_*


> ꒷︶꒥꒷‧₊ ໒( 𝙱𝚞𝚜𝚌𝚊𝚍𝚘𝚛𝚎𝚜 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.pinterestsearch_*
> ➩ *_.pin_*
> ➩ *_.pinterest_*
> ➩ *_.tiktoksearch_*
> ➩ *_.tiktoks_*
> ➩ *_.ytbuscar_*
> ➩ *_.ytsearch_*
> ➩ *_.yts_*


> ꒷︶꒥꒷‧₊ ໒( 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚜 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.mediafire_*
> ➩ *_.mf_*
> ➩ *_.apk_*
> ➩ *_.modapk_*
> ➩ *_.aptoide_*
> ➩ *_.facebook_*
> ➩ *_.fb_*
> ➩ *_.fbdl_*
> ➩ *_.ig_*
> ➩ *_.instagram_*
> ➩ *_.igdl_*
> ➩ *_.pindl_*
> ➩ *_.play_*
> ➩ *_.yta_*
> ➩ *_.ytmp3_*
> ➩ *_.play2_*
> ➩ *_.ytv_*
> ➩ *_.ytmp4_*
> ➩ *_.playaudio_*
> ➩ *_.mp4_*
> ➩ *_.tiktok_*
> ➩ *_.tt_*
> ➩ *_.tiktokdl_*


> ꒷︶꒥꒷‧₊ ໒( 𝙴𝚌𝚘𝚗𝚘𝚖í𝚊 & 𝙹𝚞𝚎𝚐𝚘𝚜 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.crimen_*
> ➩ *_.crime_*
> ➩ *_.w_*
> ➩ *_.work_*
> ➩ *_.chambear_*
> ➩ *_.chamba_*
> ➩ *_.trabajar_*


> ꒷︶꒥꒷‧₊ ໒( 𝙹𝚞𝚎𝚐𝚘𝚜 𝙳𝚒𝚟𝚎𝚛𝚝𝚒𝚍𝚘𝚜 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.doxear_*
> ➩ *_.doxxeo_*
> ➩ *_.doxeo_*
> ➩ *_.doxxing_*
> ➩ *_.formarpareja_*
> ➩ *_.formarparejas_*
> ➩ *_.formarpareja5_*
> ➩ *_.huevo_*
> ➩ *_.jalame_*
> ➩ *_.jalamela_*
> ➩ *_.chaqueteame_*
> ➩ *_.chaqueta_*
> ➩ *_.top_*


> ꒷︶꒥꒷‧₊ ໒( 𝙵𝚞𝚗𝚌𝚒𝚘𝚗𝚎𝚜 𝚍𝚎 𝙶𝚛𝚞𝚙𝚘 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.group_*
> ➩ *_.grupo_*
> ➩ *_.del_*
> ➩ *_.delete_*
> ➩ *_.hidetag_*
> ➩ *_.tag_*
> ➩ *_.kick_*
> ➩ *_.echar_*
> ➩ *_.hechar_*
> ➩ *_.sacar_*
> ➩ *_.ban_*
> ➩ *_.lid_*
> ➩ *_.promote_*
> ➩ *_.darpija_*
> ➩ *_.promover_*
> ➩ *_.setppgc_*
> ➩ *_.setppgrupo_*
> ➩ *_.setppgroup_*
> ➩ *_.tagadmin_*
> ➩ *_.listadmin_*
> ➩ *_.tagall_*
> ➩ *_.all_*
> ➩ *_.invocar_*
> ➩ *_.todos_*
> ➩ *_.link_*
> ➩ *_.enlace_*


> ꒷︶꒥꒷‧₊ ໒( 𝙸𝙰 - 𝙸𝙰 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.bgremover_*
> ➩ *_.bg_*
> ➩ *_.bgremóver_*
> ➩ *_.pollinations_*
> ➩ *_.aipoli_*


> ꒷︶꒥꒷‧₊ ໒( 𝙹𝚞𝚎𝚐𝚘𝚜 𝙲𝚕á𝚜𝚒𝚌𝚘𝚜 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.ahorcado_*
> ➩ *_.delttc_*
> ➩ *_.delttt_*
> ➩ *_.delxo_*
> ➩ *_.tictactoe_*
> ➩ *_.matemáticas_*
> ➩ *_.mates_*
> ➩ *_.math_*
> ➩ *_.ppt_*


> ꒷︶꒥꒷‧₊ ໒( 𝚂𝚞𝚋-𝙱𝚘𝚝𝚜 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.code_*
> ➩ *_.codebot_*
> ➩ *_.qr_*
> ➩ *_.serbot_*
> ➩ *_.token_*


> ꒷︶꒥꒷‧₊ ໒( 𝙲𝚘𝚖𝚊𝚗𝚍𝚘𝚜 𝙿𝚛𝚒𝚗𝚌𝚒𝚙𝚊𝚕𝚎𝚜 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.menu_*
> ➩ *_.help_*
> ➩ *_.menú_*


> ꒷︶꒥꒷‧₊ ໒( 𝚘𝚏𝚏 / 𝚘𝚗 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.enable_*
> ➩ *_.disable_*
> ➩ *_.on_*
> ➩ *_.off_*


> ꒷︶꒥꒷‧₊ ໒( 𝙰𝚍𝚖𝚒𝚗 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.addowner_*
> ➩ *_.delowner_*
> ➩ *_.admin_*
> ➩ *_.atad_*
> ➩ *_.autoadmin_*
> ➩ *_./(?:)/i_*
> ➩ *_.backup_*
> ➩ *_.backupbot_*
> ➩ *_.export_*
> ➩ *_.respaldo_*
> ➩ *_.delai_*
> ➩ *_.dsowner_*
> ➩ *_.cleartmp_*
> ➩ *_.vaciartmp_*
> ➩ *_.getplugin_*
> ➩ *_.gp_*
> ➩ *_.invite_*
> ➩ *_.join_*
> ➩ *_.reactchannel_*
> ➩ *_.restart_*
> ➩ *_.reiniciar_*
> ➩ *_.salir_*
> ➩ *_.leave_*
> ➩ *_.saveplugin_*
> ➩ *_.setppbot_*
> ➩ *_.setpp_*
> ➩ *_.update_*
> ➩ *_.actualizar_*


> ꒷︶꒥꒷‧₊ ໒( 𝚂𝚝𝚒𝚌𝚔𝚎𝚛𝚜 & 𝙻𝚘𝚐𝚘𝚜 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.brat_*
> ➩ *_.s_*
> ➩ *_.sticker_*
> ➩ *_.stiker_*
> ➩ *_.toimg_*
> ➩ *_.img_*
> ➩ *_.jpg_*


> ꒷︶꒥꒷‧₊ ໒( 𝙷𝚎𝚛𝚛𝚊𝚖𝚒𝚎𝚗𝚝𝚊𝚜 )७ ₊˚꒷︶꒷꒥꒷
> ➩ *_.mejorar_*
> ➩ *_.hd_*
> ➩ *_.ssweb_*
> ➩ *_.ss_*
> ➩ *_.tomp3_*
> ➩ *_.toaudio_*`.trim()
await conn.sendMessage(m.chat, { 
text: txt,
contextInfo: {
mentionedJid: [userId],
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: channelRD.id,
serverMessageId: '',
newsletterName: channelRD.name
},
externalAdReply: {
title: botname,
body: textbot,
mediaType: 1,
mediaUrl: redes,
sourceUrl: redes,
thumbnail: await (await fetch(banner)).buffer(),
showAdAttribution: false,
containsAutoReply: true,
renderLargerThumbnail: true
}}}, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler
