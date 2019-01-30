
const giftcards =  [     { id: 1, 
                            cardnumber: 12345, 
                            balance: 200, 
                            storeid: 1
                         },
                         { id: 2, 
                            cardnumber: 67890, 
                            balance: 100, 
                            storeid: 1
                         },
                         {  id: 3, 
                            cardnumber: 89745, 
                            balance: 100, 
                            storeid: 1
                         }
                   ];


module.exports = {
    GiftCardStatus,
    GiftCardBalance,
    GiftCardRedemption,
    GiftCardRedemptionVoid
};
                


async function GiftCardStatus() {
        var resGiftcardStatus = {
                "message": "Welcome to the mock gift card rest service"
        };    
        return resGiftcardStatus;
}
                

async function GiftCardBalance(id, cardnumber) {
    const giftcard = giftcards.find(g => g.id == id && g.cardnumber == cardnumber);

    if (giftcard) 
    {
        var resGiftcardBalance = {
                "message": "Get card balance successful",
                "balance": giftcard.balance,
                "cardNumber": giftcard.cardnumber,
                "expirationDate": null,
                "responseCode": 0,
                "responseCodeName": "SUCCESS"
        };
        return resGiftcardBalance;
    }
}

async function GiftCardRedemption(id, cardnumber, {storeId, amount}) {
    const giftcard = giftcards.find(g => g.id == id && g.cardnumber == cardnumber && g.storeid == storeId);

    if (giftcard) 
    {
        console.log('redeem ' + giftcard);
        var originalBalance=  giftcard.balance;
        var newBalance =  giftcard.balance - amount;
        giftcard.balance = newBalance;
        var resGiftcardRedemption = {
                "message": 'Process redemption successful',
                "amount": amount,
                "balance": originalBalance,
                "cardNumber": cardnumber,
                "changeAmount": amount,
                "keptAmount": newBalance,
                "responseCode":0,
                "responseCodeName": 'Success'
        };
        return resGiftcardRedemption;
    }

}

async function GiftCardRedemptionVoid(id, cardnumber, {storeId, amount, changeAmount, keptAmount}) {
    const giftcard = giftcards.find(g => g.id == id && g.cardnumber == cardnumber && g.storeid == storeId);

    if (giftcard) 
    {
        var originalBalance=  giftcard.balance;
        var newBalance =  giftcard.balance + amount;
        giftcard.balance = newBalance;
        var resGiftcardRedemptionVoid = {
                "message": 'Process void redemption successful',
                "cardNumber": cardnumber,
                "startingBalance": originalBalance,
                "endingBalance": newBalance,
                "amountVoided": amount,
                "responseCode":0,
                "responseCodeName": 'Success'
        };
        return resGiftcardRedemptionVoid;
    }
}


