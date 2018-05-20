const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/scrape', (req, res) => {

    url = 'https://www.etsy.com/listing/556713773/floating-shelves-wooden-shelves-wall?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=small%20wooden%20shelves&ref=sc_gallery-1-1&plkey=041cdcf3494f196dc143d65b8a92ecb35c80cfe4:556713773&more_colors=1';

    request(url, (error, response, html) => {
        if(!error){
            const $ = cheerio.load(html);
            let title, price, rating;
            const json = { title: "", price: "", rating: "" };

            $('#listing-title').filter(function(){
               const data = $(this);   
               title = data.children().first().text();
               
               json.title = title;

            });

            $('.buy-box__price ui-toolkit').filter(function(){
                const data = $(this);
                price = data.children().first().text();
                json.price = price;
            });
            
            $('.aggregate_rating display-inline-block').filter(function(){
                const data = $(this);
                rating = data.children().first().children().eq(1).text();
                json.rating = rating;
            })

        }
    })
})


app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;