import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};


const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] }
    }
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, status, postId, content } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});


app.post('/events', (req, res) => {
    try {
        const { type, data } = req.body;

        handleEvent(type, data);

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.send({ error: "Error" })
    }
});

app.listen(4002, async () => {
    console.log('Listening on 4002')
    try {
        const res = await axios.get('http://localhost:4005/events');
        for (let event of res.data) {
            handleEvent(event.type, event.data);
        }

    } catch (error) {
        console.log(error.message);
    }
});
