let tripInSearch = [];

function emptySearchResults() {
    document.querySelector('#searchResults').innerHTML = `
        <div id="emptySearch">
            <img id="noTripImg" src="images/notfound.png" alt="not found" />
            <hr id="searchDivider>
            <p>No trip found.</p>
        </div>
    `;

    tripInSearch = [];
}

function updateSearchResults(trips) {
    document.querySelector('#searchResults').innerHTML = '<div id="notEmptySearch"></div>';

    for (let trip of trips) {
        let {departure, arrival, date, price} = trip;

        date = new Date(date);
        const hour = `0${date.getHours()}`.slice(-2);
        const min = `0${date.getMinutes()}`.slice(-2);
        hourStr = `${hour}:${min}`;

        tripInSearch.push({
            departure,
            arrival,
            date: date.getTime(),
            price,
        });

        const newSearch = `
            <div class="searchRow">
                <div class="searchTravel">${departure} > ${arrival}</div>
                <div class="searchHour">${hourStr}</div>
                <div class="searchPrice">${price} €</div>
                <button class="btnBook">Book</button>
            </div>
        `;

        document.querySelector('#searchResults').insertAdjacentHTML('beforeend', newSearch);
    }

    document.querySelectorAll('.btnBook').forEach((btn, i) => {
        btn.addEventListener('click', function() {
            const trip = tripInSearch[i];
            console.log(trip);
            const urlToFetch = `http://localhost:3000/bookings/new`;
            fetch(urlToFetch, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(trip)
            }).then(response => response.json())
                .then(results => {
                    console.log(results);
                    if (results.result) window.location.assign('cart.html');
                })
        });
    });
}

const today = new Date();
const todayDay = `0${today.getDate()}`.slice(-2);
const todayMonth = `0${1+today.getMonth()}`.slice(-2);
const todayYear = today.getFullYear();
const todayString = `${todayYear}-${todayMonth}-${todayDay}`;
document.querySelector('#date').value = todayString;

document.querySelector('#btnSearch').addEventListener('click', function () {
    const departure = document.querySelector('#departure').value;
    const arrival = document.querySelector('#arrival').value;
    let date = document.querySelector('#date').value;
    date = new Date(date).getTime();
    const urlToFetch = `http://localhost:3000/trips/search/${departure}&${arrival}&${date}`;

    fetch(urlToFetch).then(response => response.json())
        .then(trips => {
            if (!trips.result) emptySearchResults;
            else updateSearchResults(trips.trips);
        })
        .catch(error => {
            console.error(error);
            emptySearchResults();
        })
});