function generateYearKeyboard() {
    const currentYear = new Date().getFullYear();

    const years = [];
    let row = [];
    for (let year = 1924; year <= 2024; year++) {
        row.push({text: year.toString(), callback_data: year.toString()});
        if (row.length === 3) {
            years.push(row);
            row = [];
        }
    }

    if (row.length > 0) {
        row.push({text: currentYear.toString(), callback_data: currentYear.toString()});
        years.push(row);
    }

    years.push([{text: "<-", callback_data: "prevous"}, {text: "->", callback_data: "next"}]);

    return {
        reply_markup: JSON.stringify({
            inline_keyboard: years
        })
    };
}

function saveButtonInfo(callback){
    const buttonInfo = {
        userId: query.from.id,
        buttonText: query.data,
        date: new Date().toISOString()
    }

    require('fs').writeFileSync('', JSON.stringify(buttonInfo, null, '\t'))
}

const YearOfBirthKeyboard = generateYearKeyboard();
console.log(YearOfBirthKeyboard);



module.exports = {
    startKeyboard: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "🌏 Натальная карта", callback_data: "natal_cards"}],
                [{text: "🔮 Матрица судьбы", callback_data: "matrix"}],
                [{text: "🌚 Асцендент", callback_data: "ascendent"}],
                [{text: "⚛️ Личный гороскоп по дате", callback_data: "personal_garo"}],
                [{text: "💞 Совместимость с человеком", callback_data: "relationship"}],
                [{text: "💸 Успех, богатство и изобилие", callback_data: "success"}]
            ]
        })
    },
    chooseOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "СОСТАВИТЬ СВОЮ КАРТУ✅", callback_data: "create_card"}],
                [{text: "Назад к выбору◀️", callback_data: "back"}]
            ]
        })
    },
    chooseGender: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Женский 👱🏻‍♀️", callback_data: "female"}],
                [{text: "Мужской 🤵🏻‍♂️", callback_data: "male"}]
            ]
        })
    },
}