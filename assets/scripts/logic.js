const fs = require('fs')
const db = require('../db/db.json')
const { successKeyboard } = require('../keyboard/keyboard')

async function askTimeOfBirth(bot, msg){
    let timeOfBearth = msg.text
    let user = db.find(user => user.username === msg.from.username)
    await bot.sendMessage(msg.message.chat.id, "🕙Напиши своё время рождения:\n Например: 11:31\nЕсли не знаешь, то хотя бы приблизительное или жми кнопку 'Не знаю время рождения'")
    user.timeOfBirth = timeOfBearth
    fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
    askCityOfBirth(bot, msg, timeOfBearth)
}

function formatNumber(number) {
    return number < 10 ? '0' + number : number.toString();
}

async function askCityOfBirth(bot, msg, timeOfBirth){
    let user = db.find(user => user.username === msg.from.username);
    let cityBirthIn = msg.text
    await bot.sendMessage(msg.chat.id, "Пришлите мне название города в котором вы родились")
    const birthDate = {
        dayOfBirth: user.dayOfBirth || "",
        MonthOfBirth: user.MonthOfBirth || "",
        YearOfBirth: user.YearOfBirth || ""
    };
    const day = birthDate.dayOfBirth.length > 0 ? formatNumber(parseInt(birthDate.dayOfBirth)) : '';
    const month = birthDate.MonthOfBirth.length > 0 ? formatNumber(parseInt(birthDate.MonthOfBirth)) : '';
    const year = birthDate.YearOfBirth.length > 0 ? formatNumber(parseInt(birthDate.YearOfBirth)) : '';

    // Формируем строку с датой рождения в формате DD.MM.YY
    const formattedBirthDate = `${day}.${month}.${year}`;

    timeOfBirth = msg.text
    await bot.sendMessage(msg.chat.id, "🕙Напиши своё время рождения:\n Например: 11:31\nЕсли не знаешь, то хотя бы приблизительное или жми кнопку 'Не знаю время рождения'")
    user.cityOfBirth = timeOfBirth
    fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
    success(bot, msg, user)
    await bot.sendMessage(msg.chat.id, "Отлично все твои ответы записаны !")
    await bot.sendMessage(msg.chat.id, `Твой пол: ${user.gender}\n${formattedBirthDate}\n${timeOfBearth}\n${cityBirthIn}`, successKeyboard)


}


async function success(bot, msg, user){

}

module.exports = {
    askTimeOfBirth: askTimeOfBirth
}
