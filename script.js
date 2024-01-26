async function getData (location) {
    const API_KEY = '8c28d300d260466bad671901242501';
    const weatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
    return await weatherData.json();
}

getData('manila').then((data) => console.log(data));