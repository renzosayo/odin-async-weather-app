async function getData (location) {
    const API_KEY = '8c28d300d260466bad671901242501';
    const weatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
    return await weatherData.json();
}

// only get condition and temp in C
function filterData (data) {
    const temp_c = data.current.temp_c;
    const last_updated = data.current.last_updated;
    return { temp_c, last_updated, ...data.current.condition };
}

function displayResult (data) {
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherDesc = document.querySelector('.weather-desc');
    const temp = document.querySelector('.temp');
    const date = document.querySelector('.date');
    weatherIcon.src = `https:${data.icon}`;
    weatherDesc.textContent = data.text;
    temp.textContent = `${data.temp_c}° C`;
    date.textContent = data.last_updated;
}

function start() {
    const submit = document.querySelector('.submit');
    submit.addEventListener('click', async (e) => {
        e.preventDefault();
        const location = document.querySelector('#location').value;
        const filtered = filterData(await getData(location).catch((err) => console.log(err)));
        displayResult(filtered);
    });
};

start();