module.exports = {
    startKeyboard: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "🌏 Натальная карта", callback_data: "natal_card"}],
                [{text: "🔮 Матрица судьбы", callback_data: "matrix"}],
                [{text: "🌚 Асцендент", callback_data: "ascendent"}],
                [{text: "⚛️ Личный гороскоп по дате", callback_data: "personal_garo"}],
                [{text: "💞 Совместимость с человеком", callback_data: "relationship"}],
                [{text: "💸 Успех, богатство и изобилие", callback_data: "success"}]
            ]
        })
    }
}