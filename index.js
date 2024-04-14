require('dotenv').config({path: "./assets/modules/.env"})
const TelegramApi = require('node-telegram-bot-api')
const bot = new TelegramApi(process.env.devStatus ? process.env.TEST_TOKEN : process.env.DEFAULT_TOKEN, {polling: true})
const { startKeyboard, generateYearKeyboard, chooseOptions, chooseGender, generateDayKeyboard } = require('./assets/keyboard/keyboard')
const commands = JSON.parse(require('fs').readFileSync('./assets/commands/commands.json'))
const db = require('./assets/db/db.json')
const { saveData } = require('./assets/scripts/logic')

bot.setMyCommands(commands)

bot.on('message', async msg => {
    let user = db.find(user => user.username === msg.from.username)
    if (msg.text === '/start'){
        if (!user){
            db.push({
                username: msg.from.username,
                selection: "",
                yearOfBirth: "",
                monthOfBearth: "",
                dayOfBearth: "",
                gender: "",
            })
        }
        require('fs').writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
        await bot.sendPhoto(msg.chat.id, './assets/images/startimage.jpg', {caption: `Приветствуем тебя, ${msg.from.username}! 👋\n\n\nС тобой на связи <b>профессиональная команда Астрологов!</b> Мы поможем рассчитать персональную натальную карту, <b>матрицу судьбы, совместимость с нужным человеком, асцендент, карьерный успех, богатство и многое другое</b> 😉`, parse_mode: 'HTML', reply_markup: startKeyboard.reply_markup})
    }
})

bot.on('callback_query', async msg => {
    const yearOfBirth = generateYearKeyboard(msg)
    const dayOfBirth = generateDayKeyboard(msg)
    let user = db.find(user => user.username === msg.message.from.username)
    switch(msg.data){
        case 'natal_cards':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendMessage(msg.message.chat.id, `Отлично, сейчас нам нужно небольшую информацию о тебе, чтобы сделать карту специально под тебя!\n\nНужно ответить всего на пару вопросов✍️`, chooseOptions)
            saveData(user?.username)
            break;
        case 'create_card':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendMessage(msg.message.chat.id, "Отлично, сейчас нам нужно небольшую информацию о тебе, чтобы сделать карту специально под тебя!\n\nНужно ответить всего на пару вопросов✍️", chooseGender)
            break;
        case 'male':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendMessage(msg.message.chat.id, "🗓Выбери свою дату рождения:", yearOfBirth)
            break;
        case 'female':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendMessage(msg.message.chat.id, "🗓Выбери свою дату рождения:", yearOfBirth)
        case 'matrix':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendMessage(msg.message.chat.id, `asd`)
            break
        case 'ascendent':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendMessage(msg.message.chat.id, `asd`)
            break;
        case parseInt(msg.data):
            console.log("msg.data")
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            // await bot.sendMessage(msg.message.chat.id, "hello world", dayOfBirth)
        case 'personal_garo':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendMessage(msg.message.chat.id, `asd`)
            break;
        case 'relationship':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendMessage(msg.message.chat.id, `asd`)
            break;
        case 'success':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendMessage(msg.message.chat.id, `asd`)
            break;
        default:
            await bot.sendMessage(msg.message.chat.id, msg.data)
            break;
    }
})

bot.on('polling_error', console.log)