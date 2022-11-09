let tripInCart = [];

function emptyCart() {
    document.querySelector('#cartContainer').innerHTML = `
        <div id="emptycart">
            <p>No tickets in your cart.</p>
            <p>Why not plan a trip?</p>
        </div>
    `;
}

function filledCart(bookings) {
    document.querySelector('#cartContainer').innerHTML = `
        <div id="notEmptycart">
            <h2 id="cartHeader">My cart</h2>
            <div id="cartFooter">
                <div id="cartTotal"></div>
                <button id="btnPurchase">Purchase</button>
            </div>
        </div>
    `;

    let total = 0;

    for (let booking of bookings) {
        let { departure, arrival, date, price } = booking.trip;
        total += price;

        date = new Date(date);
        const day = `0${date.getDate()}`.slice(-2);
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const year = `${date.getFullYear()}`.slice(-2);
        dateStr = `${month}/${day}/${year}`;
        const hour = `0${date.getHours()}`.slice(-2);
        const min = `0${date.getMinutes()}`.slice(-2);
        hourStr = `${hour}:${min}`;

        tripInCart.push({
            departure,
            arrival,
            date: date.getTime(),
            price,
        });

        const newBooking = `
            <div class="cartRow">
                <div class="cartTravel">${departure} > ${arrival}</div>
                <div class="cartDay">${dateStr}</div>
                <div class="cartHour">${hourStr}</div>
                <div class="cartPrice">${price} €</div>
                <button class="cartDelete">X</button>
            </div>
        `;
        document.querySelector('#cartFooter').insertAdjacentHTML('beforebegin', newBooking);
    }

    document.querySelector('#cartTotal').textContent = `Total : ${total} €`;

    document.querySelectorAll('.cartDelete').forEach((btn, i) => {
        btn.addEventListener('click', function () {
            const trip = tripInCart[i];
            const urlToFetch = `http://localhost:3000/bookings/cart/${trip.departure}&${trip.arrival}&${trip.date}&${trip.price}`;
            fetch(urlToFetch, { method: 'DELETE' })
                .then(response => response.json())
                .then(deleted => {
                    if (deleted.result) {
                        btn.parentNode.remove();
                        tripInCart.splice(i, 1);
                    }
                });
        });
    });
}

fetch('http://localhost:3000/bookings/cart')
    .then(response => response.json())
    .then(bookings => {
        if (!bookings.result) emptyCart();
        else filledCart(bookings.bookings);
    })
    .then(() => {
        !!document.querySelector('#btnPurchase') &&
            document.querySelector('#btnPurchase').addEventListener('click', function () {
                tripInCart.forEach((booking, i) => {
                    const {departure, arrival, date, price} = booking;
                    fetch('http://localhost:3000/bookings/purchased', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            departure,
                            arrival,
                            date,
                            price,
                        })
                    }).then(response => response.json())
                    .then(updated => {
                        updated.result && console.log('Trip has been purchased');
                    });
                });
                tripInCard = [];
                emptyCart();
                window.location.assign('bookings.html');
            });
    });
