const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {

    res.setHeader(
    "Access-Control-Allow-Origin",
    "https://localhost:4200"
    );

    res.setHeader(
    "Access-Control-Allox-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

const api = express.Router();
api.get('/job', (req, res) => {
    console.log('Méthode GET avec le chemin /job')
    res.json({
        success: true,
        message: "Hello World",
    });
});

api.post('/job', (req, res) => {
    const data = req.body;

    console.log(data);

    res.json({
        success: true,
        message: data
    });
});

api.get("/search/category/:category?", (req, res) => {
    const category = req.params.category || null;

    const data = `donnée ${category}`;
    const defaultValue = 'list de data';
    console.log(category);

    if (!(category === null)) {
        console.log('ca rentre');
        res.json({
            success: true,
            data
        })
    } else {
        res.json({success: true, defaultValue});
    }
})

api.get("/search/:term/:place?", (req, res) => {
    const term = req.params.term;
    const place = req.params.place || null;

    const data = `${term} et ${place}`;

    res.json({success: true, data});

});

app.use('/api', api);

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})