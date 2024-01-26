async function getData (location) {
    try {
        const API_KEY = '8c28d300d260466bad671901242501';
        const weatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
        if (weatherData.ok) return await weatherData.json();
        else {
            alert('Invalid input!');
            document.querySelector('.output').classList.add('hide');;
        }
    } catch (e) { console.log(e); }
}

// only get condition and temp in C
function filterData (data) {
    try {
        const temp_c = data.current.temp_c;
        const last_updated = data.current.last_updated;
        const { name, region, country } = data.location;
        return { temp_c, last_updated, name, region, country, ...data.current.condition };
    } catch (e) {
        console.log(e);
    }
}

function displayResult (data) {
    document.querySelector('.output').classList.remove('hide');
    const weatherIcon = document.querySelector('.weather-icon');
    const weatherDesc = document.querySelector('.weather-desc');
    const temp = document.querySelector('.temp');
    const date = document.querySelector('.date');
    const name = document.querySelector('.name');
    const region = document.querySelector('.region');
    const country = document.querySelector('.country');
    weatherIcon.src = `https:${data.icon}`;
    weatherDesc.textContent = data.text;
    temp.textContent = `${data.temp_c}° C`;
    date.textContent = `As of ${data.last_updated}`;
    name.textContent = data.name;
    region.textContent = data.region;
    country.textContent = data.country;
}

function start() {
    const form = document.querySelector('.form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const location = document.querySelector('#location').value;
        const filtered = filterData(await getData(location).catch((err) => console.log(err)));
        displayResult(filtered);
    });
};

start();