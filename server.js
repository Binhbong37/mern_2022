import express from 'express';

const app = express();

app.use('/', (req, res) => {
    res.send('Hello world');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Sever is running from post ${port}`));
