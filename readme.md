
# Currency Exchange 
My Angular project plan is to do a currency exchange app. It would recive user input and use currency rate api from <link>https://api.exchangeratesapi.io</link> to get the current rates and show users what their exchange would be in a diffrent country. 
Things I would store in the database is the name and the currency rates of the country the api allows.
* country
* Currency rate of $1 usd compared to other country 

ex: 
* * "CAD":1.3171828596,
* * "HKD":7.7500212134, 
* * "ISK":138.6508273229,
* * "PHP":48.5625795503,
* * "IDR":14720.101824353,
* * "INR":73.3088672041,
* * "USD":1.0,
* * "MXN":21.0537123462,
* * "SGD":1.3568095036,
* * "AUD":1.4064488757,
* * "PLN":3.8797624098

},"base":"USD","date":"2020-10-19"}%

User would be able to: 
* input the amount they want to convert 
* select what country they want to convert to 
* add more country to compare 
* delete country 