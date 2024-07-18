const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Mock data
const highlights = [
    { title: 'Surfing', description: 'Best Hawaiian islands for surfing.' },
    { title: 'Hula', description: 'Try it yourself.' },
    { title: 'Volcanoes', description: 'Volcanic conditions can change at any time.' },
];

const guides = [
    { name: 'Hadwin Malone', since: 2012 },
];

const topSpots = [
    { name: 'Maui', rank: 32 },
    { name: 'Kauai', rank: 72 },
    { name: 'Honolulu', rank: 2 },
];

// Endpoints
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Aloha Explorer" });
});


app.get('/api/header', (req, res) => {
    res.json({ "message": "Welcome to Hawaii", "image": "https://i.imgur.com/zJTZkay.png" });
});

app.get('/api/highlights', (req, res) => {
    res.json(highlights);
});

app.get('/api/guides', (req, res) => {
    res.json(guides);
});

app.get('/api/top-spots', (req, res) => {
    res.json(topSpots);
});

app.post('/api/book-trip', (req, res) => {
    const { name, destination, date } = req.body;
    res.json({ message: `Trip booked for ${name} to ${destination} on ${date}` });
});

app.listen(port, () => {
    console.log(`Aloha Explorer backend running on port ${port}, http://localhost:${port}`);
});