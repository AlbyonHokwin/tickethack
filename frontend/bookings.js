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

    for (let booking of bookings) {
        let { departure, arrival, date, price } = booking.trip;
        date = new Date(date);
        const newBooking = `
            <div class="bookingRow">
                <div class="bookingTravel">${departure} > ${arrival}</div>
                <div class="bookingHour">22:10</div>
                <div class="bookingPrice">${price} €</div>
                <div class="bookingDeltaTime">Departure in 5 hours</div>
            </div>
        `;
    }
}

fetch('http://localhost:3000/bookings')
    .then(response => response.json())
    .then(bookings => {
        console.log(bookings);
        // if (!bookings.result) emptyBooking();
        // else filledBookings(bookings.bookings);
    });