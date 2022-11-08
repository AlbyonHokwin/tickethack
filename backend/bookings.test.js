const request = require('supertest');
const app = require('./app');

// Test de la route POST /bookings/new'
it('POST /bookings/new', async () => {
    const res = await request(app).post('/bookings/new').send({
        departure: "Paris",
        arrival: "Lyon",
        date: "2022-11-08T09:57:15.297+00:00",
        price: 75,
    });

    let {trip, isPurchased} = res.body.newBooking;

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect({trip, isPurchased}).toEqual({
        trip: "636a2b6a9048386313040966",
        isPurchased: false,
    });

    const res2 = await request(app).post('/bookings/new').send({
        departure: "Paris",
        arrival: "Lyon",
        date: "2022-11-08T09:57:15.297+00:00",
        price: 75,
    });

    expect(res2.statusCode).toBe(200);
    expect(res2.body.result).toBe(false);
});

// Test de la route GET /bookings/cart'
it('GET /bookings/cart', async () => {
    const res = await request(app).get('/bookings/cart');

    const { departure, arrival, date, price } = res.body.bookings[0].trip;
    const trip = { departure, arrival, date, price };
    const isPurchased = res.body.bookings[0].isPurchased;
    
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect({trip, isPurchased}).toEqual({
        trip: {
          departure: "Paris",
          arrival: "Lyon",
          date: "2022-11-08T09:57:15.297Z",
          price: 75
        },
        isPurchased: false,
    });
});

// Test de la route PUT /bookings/purchased'
it('PUT /bookings/purchased', async () => {
    const res = await request(app).put('/bookings/purchased').send({
        departure: "Paris",
        arrival: "Lyon",
        date: "2022-11-08T09:57:15.297+00:00",
        price: 75,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);

    const res2 = await request(app).put('/bookings/purchased').send({
        departure: "Paris",
        arrival: "Lyon",
        date: "2022-11-08T09:57:15.297+00:00",
        price: 75,
    });

    expect(res2.statusCode).toBe(200);
    expect(res2.body.result).toBe(false);
});

// Test de la route GET /bookings'
it('GET /bookings', async () => {
    const res = await request(app).get('/bookings');

    const { departure, arrival, date, price } = res.body.bookings[0].trip;
    const trip = { departure, arrival, date, price };
    const isPurchased = res.body.bookings[0].isPurchased;
    
    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect({trip, isPurchased}).toEqual({
        trip: {
          departure: "Paris",
          arrival: "Lyon",
          date: "2022-11-08T09:57:15.297Z",
          price: 75
        },
        isPurchased: true,
    });
});

// Test de la route DELETE /bookings/cart'
it('DELETE /bookings/cart', async () => {
    const res = await request(app).delete('/bookings/cart/paris&lyon&2022-11-08T09:57:15.297Z&75');

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);

    const res2 = await request(app).delete('/bookings/cart/paris&lyon&2022-11-08T09:57:15.297Z&75');
    
    expect(res2.statusCode).toBe(200);
    expect(res2.body.result).toBe(false);
});
