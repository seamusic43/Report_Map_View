const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const models = require('./models')
const siteController = require('./controller/site.controller.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
});

const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`server is running on port ${port}.`);
    models.sequelize.sync().then(() => {
        console.log('ok');
    }).catch((err) => {
        console.log(err);
        process.exit();
    });
    app.get('/site-info', siteController.getAll);
    app.post('/site-info', siteController.insertOrUpdate);
    app.delete('/site-info', siteController.remove);
})
