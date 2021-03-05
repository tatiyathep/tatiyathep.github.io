(() => {
    function setElementInnerText(element, text) {
        const Elems = document.querySelector(element);
        Elems.innerText = text;
    }

    async function getData() {
        const response = await fetch(
            `https://covid19.th-stat.com/api/open/today`
        );
        const data = await response.json();
        const { Confirmed, Recovered, Hospitalized, Deaths, NewConfirmed, NewRecovered, NewDeaths, UpdateDate} = data;

        setElementInnerText('.confirmed', Confirmed);
        setElementInnerText('.recovered', Recovered);
        setElementInnerText('.hospitalized', Hospitalized);
        setElementInnerText('.deaths', Deaths);
        setElementInnerText('.newConfirmed', `[ +${NewConfirmed} ]`);
        setElementInnerText('.newRecovered', `[ +${NewRecovered} ]`);
        if (NewDeaths){
            setElementInnerText('.newDeaths', `[ +${NewDeaths} ]`);
        }
        setElementInnerText('.updateDate', `Updated at : ${UpdateDate}`);
    }

    async function run() {
        await getData();
    }
    run();
})();