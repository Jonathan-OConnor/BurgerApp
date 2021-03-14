const express = require('express')
const burger = require('../models/burger.js')

const router = express.Router()

router.get('/', (req, res) => {
    burger.all((data) => {
        const hbsObject = {
            burgers: data,
        };
        res.render('index', hbsObject);
    });
});

router.post('/api/add/:name', (req, res) => {
    burger.insertOne(['burger_name', 'devoured'], [req.params.name, 0], (result) => {
        // Send back the ID of the new quote
        console.log(result.insertId)
        res.send({ id: result.insertId });
    });
});

router.put('/api/burgers/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    console.log(req.body)
    burger.updateOne(
        {
            devoured: 1,
        },
        condition,
        (result) => {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

module.exports = router