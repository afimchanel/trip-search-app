const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;
const JSON_SERVER_URL = 'http://localhost:9000/trips';

// Middleware
app.use(cors());
app.use(express.json());

// Search API
app.get('/api/trips', async (req, res) => {
    try {
        const keyword = req.query.keyword?.toLowerCase();

        const response = await axios.get(JSON_SERVER_URL);
        const trips = response.data;

        const filteredTrips = trips.filter(trip => {
            const inTitle = trip.title.toLowerCase().includes(keyword);
            const inDescription = trip.description.toLowerCase().includes(keyword);
            const inTags = trip.tags.some(tag => tag.toLowerCase().includes(keyword));
            return inTitle || inDescription || inTags;
        });

        res.status(200).json({ trips: filteredTrips });
    } catch (error) {
        console.error('Error fetching trips:', error.message);
        res.status(500).json({ error: 'An error occurred fetching trips' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});
