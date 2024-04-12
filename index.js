const TelegramApi = require('node-telegram-bot-api')
const { startKeyboard } = require('./assets/keyboard/keyboard')
const bot = new TelegramApi("6054730659:AAGPUhfXT-nIdvrTwvmheNHsULaS9o9Itzo", {polling: true})
const commands = JSON.parse(require('fs').readFileSync('./assets/commands/commands.json'))

bot.setMyCommands(commands)

bot.on('message', async msg => {
    if (msg.text === '/start'){
        await bot.sendPhoto(msg.chat.id, './assets/images/startimage.jpg', {caption: `Приветствуем тебя, ${msg.from.username}! 👋\n\n\nС тобой на связи <b>профессиональная команда Астрологов!</b> Мы поможем рассчитать персональную натальную карту, <b>матрицу судьбы, совместимость с нужным человеком, асцендент, карьерный успех, богатство и многое другое</b> 😉`, parse_mode: 'HTML', reply_markup: startKeyboard.reply_markup})
    }
})

bot.on('callback_query', async msg => {
    if(msg.data === 'natal_card'){
        
    }else if(msg.data === 'matrix'){

    }else if(msg.data === 'ascendent'){

    }else if(msg.data === 'personal_garo'){

    }else if(msg.data === 'relationship'){

    }else if(msg.data === 'success'){

    }else{
        await bot.sendMessage(msg.message.chat.id, "")
    }
})

bot.on('polling_error', console.log)