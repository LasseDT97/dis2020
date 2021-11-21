const express = require('express');
const router = express.Router();
const model = require('../models/client');

//Endpoint for all clients
router.get('/', async (req, res) => {
    try {
        let clients = await model.find({});
        res.send(clients);
    } catch (err) {
        console.log(err)
    };
});

//Endpoint for adding client
router.post('/', async (req, res) => {
    const client = new model({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        streetAddress: req.body.streetAddress,
        city: req.body.city
    });
    try {
        await model.create(client)
        return res.json(client);
    }
    catch (err) {
        return res.json(err)
    };  
});

//Endpoint der ændrer en client.
router.put('/:id', async (req, res) => {
    try {
        let client = await model.findOneAndUpdate(req.params.id, { $set: req.body }, { new: true })
        //await accounts.update(accountsBalance)
        return res.json(client);
    }
        catch(err) {
            return res.json(err);
        }
    }
);

//Endpoint that returns account by Id.
router.get('/:id', async (req, res) => {
    try {
        let clients = await model.findOne({_id: req.params.id});
        res.send(clients);
    }
        catch(err) {
            console.log(err);
        }
    }
);

//Endpoint that deletes client by Id.
router.delete('/:id', async (req, res) => {
    try {
    let client = await model.findOneAndDelete(req.params.id)
        return res.json(client);
    }
        catch(err) {
            return res.json(err);
        }
    }
);

module.exports = router;