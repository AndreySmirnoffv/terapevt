require('dotenv').config({path: "./assets/modules/.env"})
const TelegramApi = require('node-telegram-bot-api')
const bot = new TelegramApi(process.env.devStatus ? process.env.TEST_TOKEN : process.env.DEFAULT_TOKEN, {polling: true})
const { startKeyboard, generateYearKeyboard, chooseOptions, chooseGender, generateDayKeyboard, successKeyboard, endKeyboard } = require('./assets/keyboard/keyboard')
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
                timeOfBirth: 0,
                cityBirthIn: ""
            })
        }
        require('fs').writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
        await bot.sendPhoto(msg.chat.id, './assets/images/startimage.jpg', {caption: `Приветствуем тебя, ${msg.from.username}! 👋\n\n\nС тобой на связи <b>профессиональная команда Астрологов!</b> Мы поможем рассчитать персональную натальную карту, <b>матрицу судьбы, совместимость с нужным человеком, асцендент, карьерный успех, богатство и многое другое</b> 😉`, parse_mode: 'HTML', reply_markup: startKeyboard.reply_markup})
    }
})

bot.on('callback_query', async msg => {
    let user = db.find(user => user.username === msg.message.from.username);
    let yearOfBirth, dayOfBirth;

    switch(msg.data){
        case 'natal_cards':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, `Отлично, сейчас нам нужно небольшую информацию о тебе, чтобы сделать карту специально под тебя!\n\nНужно ответить всего на пару вопросов✍️`, chooseOptions);
            saveData(user?.username);
            break;
        case 'create_card':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, "Отлично, сейчас нам нужно небольшую информацию о тебе, чтобы сделать карту специально под тебя!\n\nНужно ответить всего на пару вопросов✍️", chooseGender);
            break;
        case 'male':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, "🗓Выбери свою дату рождения:", generateYearKeyboard(bot, msg));
            console.log(msg);
            break;
        case 'female':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, "🗓Выбери свою дату рождения:", generateYearKeyboard(bot, msg));
            break;
        case 'matrix':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, `asd`);
            break;
        case 'ascendent':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, `asd`);
            break;
        case parseInt(msg.data):
            console.log(msg);
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, "hello world", generateDayKeyboard(bot, msg));
            break;
        case /^(0?[1-9]|[12][0-9]|3[01])$/.test(callbackData):
            
        case 'personal_garo':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, `asd`);
            break;
        case 'relationship':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, `asd`);
            break;
        case 'success':
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id);
            await bot.sendMessage(msg.message.chat.id, `asd`);
            break;
        case "successyes":
            await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendPhoto('./assets/images/success.jpg', {caption: "Спасибо за твои ответы, вот что у нас получилось составить в твоей карте:\n\n✅ Сценарии судьбы в любой сфере вашей жизни.\n✅ Психологические характеристики.\n✅ Уровни развития в разных сферах жизни (в любой сфере у каждого есть своё дно и свой пик эволюции).\n✅ Причины и следствия выбора в разных сферах жизни (Карма).\n✅ Сильные и слабые стороны вашей личности.\n\nПолучи полную и понятную расшифровку👇", reply_markup: endKeyboard.reply_markup})
        default:
            // await bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
            await bot.sendMessage(msg.message.chat.id, "сработал блок дефолт")
            // generateDayKeyboard(bot, msg)
            break;
    }
});
bot.on('polling_error', console.log)