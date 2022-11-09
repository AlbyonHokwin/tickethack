function timeLeftToStr(date, now) {
    const deltaT = new Date(date - now);

    if (deltaT.getTime() <= 0) return 'Passed';

    if (deltaT.getTime() < 1000*3600*24) return `Departure in ${deltaT.getHours()} hours`;

    return `Departure in ${Math.floor(deltaT.getTime() / (1000*3600*24))} days`
}

function emptyBooking() {
    document.querySelector('#bookingContainer').innerHTML =
        `<div id="emptyBooking">
            <p>No booking yet.</p>
            <p>Why not plan a trip?</p>
        </div>`;
}

function filledBookings(bookings) {
    document.querySelector('#bookingContainer').innerHTML = `
        <div id="notEmptyBooking">
            <h2 id="bookingHeader">My bookings</h2>
            <hr id="bookingDivider">
            <div id="bookingFooter">
            <p>Enjoy your travels with Tickethack!</p>
        </div>
    `;

    const currentDate = new Date();

    for (let booking of bookings) {
        let { departure, arrival, date, price } = booking.trip;

        date = new Date(date);
        console.log(date);
        const day = `0${date.getDate()}`.slice(-2);
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const year = `${date.getFullYear()}`.slice(-2);
        dateStr = `${month}/${day}/${year}`;
        const hour = `0${date.getHours()}`.slice(-2);
        const min = `0${date.getMinutes()}`.slice(-2);
        hourStr = `${hour}:${min}`;

        const timeLeftStr = timeLeftToStr(date, currentDate);

        const newBooking = `
            <div class="bookingRow">
                <div class="bookingTravel">${departure} > ${arrival}</div>
                <div class="bookingDay">${dateStr}</div>
                <div class="bookingHour">${hourStr}</div>
                <div class="bookingPrice">${price} €</div>
                <div class="bookingTimeLeft">${timeLeftStr}</div>
            </div>
        `;
        document.querySelector('#bookingDivider').insertAdjacentHTML('beforebegin', newBooking);
    }
}

fetch('http://localhost:3000/bookings')
    .then(response => response.json())
    .then(bookings => {
        if (!bookings.result) emptyBooking();
        else filledBookings(bookings.bookings);
    });