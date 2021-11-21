const express = require('express');
const router = express.Router();
const model = require('../models/account');

//Endpoint for all accounts
router.get('/', async (req, res) => {
    try {
        let accounts = await model.find({});
        res.send(accounts);
    } catch (err) {
        console.log({message: err})
    };
});

//Endpoint for adding account
router.post('/', async (req, res) => {
    const account = new model({
        client_id: req.body.client_id,
        balance: req.body.balance,
        alias: req.body.alias
    });
    try {
        await model.create(account)
        return res.json(account);
    }
    catch (err) {
        return res.json(err)
    };  
});

//Endpoint that returns account by Id.
router.get('/:id', async (req, res) => {
    try {
        let accounts = await model.findOne({_id: req.params.id});
        res.send(accounts);
    }
        catch(err) {
            console.log(err);
        }
    }
);

//Endpoint der sender penge mellem konti.
router.put('/transfer', async (req, res) => {
    try {
        let fromAccount = await model.findOne({_id: req.body.fromAccount});
        let toAccount = await model.findOne({_id: req.body.toAccount});
        fromAccount.balance -= req.body.amount;
        toAccount.balance += req.body.amount;
        await model.findOneAndUpdate({_id: toAccount._id }, toAccount);
        await model.findOneAndUpdate({_id: fromAccount._id}, fromAccount);
        res.send([fromAccount, toAccount]);        
    } catch(err) {
            res.json(err);
        }
});

//Endpoint der ændrer en konto.
router.put('/:id', async (req, res) => {
    try {
        let accountsBalance = await model.findOneAndUpdate(req.params.id, { $set: req.body }, { new: true })
        //await accounts.update(accountsBalance)
        return res.json(accountsBalance);
    }
        catch(err) {
            return res.json(err);
        }
    }
);

//Endpoint that deletes account by Id.
router.delete('/:id', async (req, res) => {
    try {
    let accounts = await model.findOneAndDelete(req.params.id)
        return res.json(accounts);
    }
        catch(err) {
            return res.json(err);
        }
});

//Endpoint that returns balance by account by Id.
router.get('/:id/balance', async (req, res) => {
    try {
        let accounts = await model.findOne({_id: req.params.id});
        res.end(JSON.stringify(accounts.balance));
    }
        catch(err) {
            console.log(err);
        }
});

module.exports = router;