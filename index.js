const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const robloxUserAgentPattern = /Roblox/i;

app.get('/getBadges', async (req, res) => {
    const userAgent = req.get('User-Agent');

    if (!robloxUserAgentPattern.test(userAgent)) {
        return res.status(403).send('Forbidden: Invalid User-Agent');
    }

    try {
        const response = await axios.get('https://badges.roblox.com/v1/universes/2414164590/badges', {
            params: {
                limit: 100,
                sortOrder: 'Asc'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching badges:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
