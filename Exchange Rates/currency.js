class Currency{
    constructor(firstCurrency,secondCurrency){
        this.firstCurrency = firstCurrency;
        this.secondCurrency = secondCurrency;
        this.url = "https://api.exchangeratesapi.io/v1/latest?access_key=5a57b43e816c6d8d30fa447ccc2c47b7&base=";
        this.amount = null;
    }
    exchange(){
        // fetch(this.url + this.firstCurrency)
        
        return new Promise((resolve,reject) => {
            fetch(this.url)
            .then(response => response.json())
            .then(data => {
            // const parity = data.rates[this.secondCurrency];
            const parity = data["rates"][this.secondCurrency]; //üsttekiyle aynı
            const amount2 = Number(this.amount); //string gelen amount'ı number'a dönüştürüyoruz.
            
            let total = parity * amount2;

            resolve(total);
        })
        .catch(err => reject(err))
    })
        }

        
    changeAmount(amount){
        this.amount = amount;
        console.log(amount);
    }
    changeFirstCurrency(newFirstCurrency){
        this.firstCurrency = newFirstCurrency;
        console.log(this.firstCurrency);
    }
    changeSecondCurrency(newSecondCurrency){
        this.secondCurrency = newSecondCurrency;
        console.log(this.secondCurrency);
    }
}

