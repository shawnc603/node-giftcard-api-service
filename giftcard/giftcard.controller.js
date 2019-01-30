const express = require('express');
const router = express.Router();
const giftcardService = require('./giftcard.service');

// routes
router.get('/company/:company/status', GiftCardStatus);
router.get('/company/:company/cards/:cardnumber', GiftCardBalance);
router.put('/company/:company/cards/:cardnumber/redemptions', GiftCardRedemption);
router.put('/company/:company/cards/:cardnumber/redemptions/voids', GiftCardRedemptionVoid);

module.exports = router;


function GiftCardStatus(req, res, next) {
    giftcardService.GiftCardStatus()
        .then(giftcard_status => giftcard_status ? res.json(giftcard_status) : res.status(400).json({ message: 'Cannot find gift card!' }))
        .catch(err => next(err));
}

function GiftCardBalance(req, res, next) {
    
    const id = req.params.company;
    const cardnumber = req.params.cardnumber;
    console.log( 'id:' + id + ' cardnumber:' + cardnumber);

    giftcardService.GiftCardBalance(id, cardnumber)
        .then(giftcardBal =>  giftcardBal ? res.json(giftcardBal): res.status(400).json({ message: 'Cannot find gift card balance!' }))
        .catch(err => next(err));
}

function GiftCardRedemption(req, res, next) {
   
    const id = req.params.company;
    const cardnumber = req.params.cardnumber;

    console.log('GiftCardRedemption');
    console.log('req: ' + req.body);
    req.body = {
        "storeId":1,
        "amount":1
    }
    console.log('redeem id:' + id + ' cardnumber:' + cardnumber + ' body:' + JSON.stringify(req.body));

    giftcardService.GiftCardRedemption(id, cardnumber, req.body) 
        .then(giftcardredeem =>  giftcardredeem ? res.json(giftcardredeem): res.status(400).json({ message: 'Cannot redeem gift card!' }))
        .catch(err => next(err));
}

function GiftCardRedemptionVoid(req, res, next) {
    
    const id = req.params.company;
    const cardnumber = req.params.cardnumber;

    console.log('GiftCardRedemptionVoid');
    console.log('req: ' + req.body);
    req.body = {
        "storeId":1,
        "amount":1
    }
    console.log( 'redeem void id:' + id + ' cardnumber:' + cardnumber + ' body:' + JSON.stringify(req.body));

    giftcardService.GiftCardRedemptionVoid(id, cardnumber, req.body)
        .then(giftcardredeemvoid => giftcardredeemvoid ? res.json(giftcardredeemvoid): res.status(400).json({ message: 'Cannot redeem gift card!' }))
        .catch(err => next(err));
}