function generateYearKeyboard(bot, msg) {
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
    generateMonthKeyboard(msg.data)
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: years
        })
    };
}


function generateMonthKeyboard(msg) {
    const currentMonth = new Date().getMonth();

    const months = [];
    let row = [];
    for (let month = 0; month < 12; month++) {
        row.push({ text: (month + 1).toString(), callback_data: (month + 1).toString() });
        if (row.length === 4 || row.length > 0) {
            months.push(row);
            row = [];
        }
    }

    months.push([{ text: "<-", callback_data: "prevous" }, { text: "->", callback_data: "next" }]);
    console.log(months)
    generateDayKeyboard(msg.data)
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: months
        })
    };
}

function generateDayKeyboard(selectedMonth) {
    const daysInMonth = new Date(new Date().getFullYear(), selectedMonth + 1, 0).getDate();

    const days = [];
    let row = [];
    for (let day = 1; day <= daysInMonth; day++) {
        row.push({ text: day.toString(), callback_data: day.toString() });
        if (row.length === 7 || row.length > 0) {
            days.push(row);
            row = [];
        }
    }

    days.push([{ text: "<-", callback_data: "prevous" }, { text: "->", callback_data: "next" }]);
    console.log(days)
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: days
        })
    };
}


function saveButtonInfo(query){
    const buttonInfo = {
        userId: query.from.id,
        buttonText: query.data,
        date: new Date().toISOString()
    }

    require('fs').writeFileSync('./assets/db/db.json', JSON.stringify(buttonInfo, null, '\t'))
}




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
            ],
            one_time_keyboard: true
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
    generateYearKeyboard: generateYearKeyboard,
    generateDayKeyboard: generateYearKeyboard,
    saveButtonInfo: saveButtonInfo
}