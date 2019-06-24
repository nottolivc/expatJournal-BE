const express = require('express');
const router = express.Router();
const db = require('../../data/db.js');


router.get('/', (req, res) => {
    db.findStories(req.params.id)
        .then(function (data) {
            res.json(data);
        })

})

router.get('/byId/:id', (req, res) => {
    db.findStoryById(req.params.id)
        .then(function (data) {
            res.json(data);
        })
})

router.get('/byUser/:id', (req, res) => {
    db.findStoryByUser(req.params.id)
        .then(function (data) {
            res.json(data);
        })

})

router.post('/new', (req, res) => {
    const { sName, sContent, user } = req.body;
    db.newStory({ sName, sContent, user })
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db.update(id, changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(count => {
            res.status(200).json({ Message: `Deleted Project #${count}` });
        });
});

// router.get('/with/actions/:id', (req, res) => {
//     db.getBoth(req.params.id)
//         .then(function (data) {
//             res.send(data);
//         })
// });

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     db.findById(id)
//         .then(function (data) {
//             res.json(data);
//         })
// })

// router.post('/', (req, res) => {
//     const { name, description, complete } = req.body;
//     db.insert({ name, description, complete })
//         .then(ids => {
//             res.status(201).json(ids);
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         });
// });

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const changes = req.body;
//     db.update(id, changes)
//         .then(count => {
//             res.status(200).json(count);
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         });
// });

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     db.remove(id)
//         .then(count => {
//             res.status(200).json({ Message: `Deleted Project #${count}` });
//         });
// });


module.exports = router;