const { Store } = require('../models');
const { wrapWithErrorHander } = require('../util');

async function insertOrUpdate(req, res) {
    const { id, site_id, store_id, title, location, category, post_type, address, apply_stated_at, apply_ended_at, selected_at, posting_started_at, posting_ended_at
    } = req.body;

    const count = Store.count({ where: { store_id } });
    if (count == 0) {
        // 입력
    } else {
        // 수정
    }
}

async function getAll(req, res) {
    const { store_id } = req.body;
    if (isNaN(store_id)) {
        const result = Store.findAll();
    } else {
        const result = Store.find({ where: { store_id } });
    }
    res.status(200).json(result);
}

module.exports = wrapWithErrorHander({
    getAll,
    insertOrUpdate,
    //    remove,
});