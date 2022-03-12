import express from "express";
import axios from "axios";


const app = express();
app.use(express.json());

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event).catch(err => console.log('in post'));
    axios.post('http://localhost:4001/events', event).catch(err => console.log('in comment'));
    axios.post('http://localhost:4002/events', event).catch(err => console.log('in  query'));
    axios.post('http://localhost:4003/events', event).catch(err => console.log('in moderation'));
    res.json({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.json(events);
});

app.listen(4005, () => {
    console.log("Listening ar 4005");
});