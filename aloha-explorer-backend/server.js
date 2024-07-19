const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Mock data
const highlights = [
    {
        title: 'Surfing',
        subtitle: 'Best Hawaiian islands for surfing.',
        image: 'https://i.imgur.com/I8oDPIU.png',
        description: 'Experience the thrill of riding the waves in Hawaii, known for its world-class surfing spots. From the North Shore of Oahu to the pristine beaches of Maui, discover the best islands to catch the perfect wave.'
    },
    {
        title: 'Hula',
        subtitle: 'Try it yourself.',
        image: 'https://i.imgur.com/LA2q9CC.png',
        description: 'Immerse yourself in the rich cultural tradition of Hula, a Hawaiian dance that tells stories through graceful movements. Join a class and learn the art of Hula to connect with the island’s heritage and spirit.'
    },
    {
        title: 'Volcanoes',
        subtitle: 'Volcanic conditions can change at any time.',
        image: 'https://i.imgur.com/nersdgq.png',
        description: 'Explore the majestic volcanoes of Hawaii, where the land is alive with geothermal activity. Visit Volcanoes National Park to witness the awe-inspiring power of nature, but be aware that volcanic conditions can change rapidly.'
    },
];

const categories = [
    { id: '1', name: 'Adventure' },
    { id: '2', name: 'Culinary' },
    { id: '3', name: 'Eco-tourism' },
    { id: '4', name: 'Family' },
    { id: '5', name: 'Sport' },

];

const guides = [
    { name: 'Hadwin Malone', since: 2012, image: 'https://i.imgur.com/71lC3Ba.png' },
];

const topSpots = [
    { name: 'Maui', rank: 32, image: 'https://i.imgur.com/iAHyYhR.jpeg' },
    { name: 'Kauai', rank: 72, image: 'https://i.imgur.com/42Hnlxv.jpeg' },
    { name: 'Honolulu', rank: 2, image: 'https://i.imgur.com/ml4VjZw.jpeg' },
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

app.get('/api/categories', (req, res) => {
    res.json(categories);
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