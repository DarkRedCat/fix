async function val(num, currency) {
    const resp = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data = await resp.json();

    let s1 = data.Valute.USD.Value;
    let s2 = data.Valute.EUR.Value;
    let s3 = data.Valute.UAH.Value;
    let c = { USD: s1, EUR: s2, UAH: s3, RUB: "1" }; // Устанавливаем курс валют

    return c;
}

export default val;
