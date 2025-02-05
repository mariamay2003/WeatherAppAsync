const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Serve static files from the 'website' folder
app.use(express.static(path.join(__dirname, 'website')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'index.html'));
});

// Project Data
let projectData = {};

// GET Route
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST Route
app.post('/add', (req, res) => {
    projectData = req.body;
    res.send(projectData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
