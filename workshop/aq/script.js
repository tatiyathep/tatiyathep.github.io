(() => {
    async function getAirQuality({ city, state, country, key }) {
        const response = await fetch(
            `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${key}`
        );
        const { data: { current } } = await response.json();
        const { pollution, weather } = current;
        return {
            aqi: pollution.aqius,
            temperature: weather.tp,
            humidity: weather.hu,
            wind: weather.ws
        };
    }

    function setElementInnerText(element, text) {
        element.innerText = text;
    }

    function displayAirQuality({ city, state, country, aqi, temperature, humidity, wind }) {
        const cityElem = document.querySelector('.city');
        const statCountryeElem = document.querySelector('.state-country');
        const aqiElem = document.querySelector('.aqi > h1');
        const temperatureElem = document.querySelector('.temperature');
        const humidityElem = document.querySelector('.humidity');
        const windElem = document.querySelector('.wind');

        setElementInnerText(cityElem, city);
        setElementInnerText(statCountryeElem, `${state},${country}`);
        setElementInnerText(aqiElem, aqi);
        setElementInnerText(temperatureElem, `Temp : ${temperature} °C`);
        setElementInnerText(humidityElem, `Humidity : ${humidity}%`);
        setElementInnerText(windElem, `Wind : ${wind} m/s`);
    }

    function setAirQualityColor(aqi) {
        const statusElem = document.querySelector('.aqi > h3');
        if (aqi <= 50) {
            document.documentElement.style.setProperty(
                '--current-aqi-color', 'var(--good-aqi-color)'
            );
            setElementInnerText(statusElem, 'Good Air Quality');
        } else if (aqi <= 100) {
            document.documentElement.style.setProperty(
                '--current-aqi-color', 'var(--medium-aqi-color)'
            );
            setElementInnerText(statusElem, 'Medium Air Quality');
        } else {
            document.documentElement.style.setProperty(
                '--current-aqi-color', 'var(--bad-aqi-color)'
            );
            setElementInnerText(statusElem, 'Bad Air Quality');
        }
    }

    async function run() {
        const key = '01096c46-2ea0-4ab4-9ac4-76a0ad85dc56';
        const city = 'Bangkok';
        const state = 'Bangkok';
        const country = 'Thailand';
        const { aqi, temperature, humidity, wind } = await getAirQuality({ city, state, country , key });
        displayAirQuality({ city, state, country, aqi, temperature, humidity, wind });
        setAirQualityColor(aqi);
    }
    run();
})();