const request = require('supertest');
const app = require('./app');

// Test de la route GET /trips/search/:departure&:arrival&:day'
it('GET /trips/search/:departure&:arrival&:day', async () => {
    const res = await request(app).get('/trips/search/paris&marseille&2022-11-22');

    expect(res.statusCode).toBe(200);
    expect(res.body.result).toBe(true);
    expect(res.body.trips).toEqual([
        {
            _id: "636a2b6a9048386313041106",
            departure: "Paris",
            arrival: "Marseille",
            date: "2022-11-22T04:00:27.813Z",
            price: 147,
        },
        {
            _id: "636a2b6a9048386313041110",
            departure: "Paris",
            arrival: "Marseille",
            date: "2022-11-22T04:46:53.614Z",
            price: 61,
        },
        {
            _id: "636a2b6a9048386313041123",
            departure: "Paris",
            arrival: "Marseille",
            date: "2022-11-22T06:58:18.002Z",
            price: 65,
        },
        {
            _id: "636a2b6a9048386313041125",
            departure: "Paris",
            arrival: "Marseille",
            date: "2022-11-22T07:06:18.954Z",
            price: 43,
        },
    ]);
});
