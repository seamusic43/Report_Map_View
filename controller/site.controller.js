const { Site } = require('../models');
const { wrapWithErrorHander } = require('../util');

async function getAll(req, res) {
    const result = await Site.findAll();
    res.status(200).json({ result });
}

async function insertOrUpdate(req, res) {
    console.log(req.body);
    let key_chk = await keycheck(req.body);
    if (key_chk === false) {
        res.status(400).json({ error: 'name and url are required.' })
        return;
    }
    const { name, url } = req.body;

    const count = await Site.count({ where: { name, url } })

    if (count == 0) {
        await Site.create(req.body);
    } else {
        await Site.update(req.body, { where: { name, url } });
    }

    res.status(200).json({ result: 'success' });
}

function keycheck(body) {
    const { name, url } = body;
    console.log(name, url)
    if (!name || !url) {
        return false;
    }
}

async function remove(req, res) {
    let key_chk = await keycheck(req.body);
    if (key_chk === false) {
        res.status(400).json({ error: 'name and url are required.' })
        return;
    }
    const { name, url } = req.body;

    await Site.destroy({
        where: { name, url }
    });

    res.status(200).json({ result: 'success' });
}

module.exports = wrapWithErrorHander({
    getAll,
    insertOrUpdate,
    remove,
});