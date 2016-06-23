'use strict';

const express = require('express'),
      app = express(),
      request = require('request-promise'),
      cheerio = require('cheerio');

let options = {
  url: 'http://archiveofourown.org/works?tag_id=Aaron+Dingle*s*Robert+Sugden',
  transform: body => cheerio.load(body)
};

app.get('/query', (req, res) => {
  request(options)
    .then($ => {
      let works = [];
      $('li.work').each((i, el) => {
        let heading = $(el).find('h4'),
            title = heading.children().first();

        let work = {
          title: title.text(),
          url: title.attr('href'),
          author: heading.children().last().text(),
          date: $(el).find('.datetime').text(),
          rating: $(el).find('.rating .text').text(),
          words: $(el).find('dd.words').text(),
          chapters: $(el).find('dd.chapters').text(),
          kudos: $(el).find('dd.kudos').text(),
          summary: $(el).find('.summary').html().trim()
        };
        works.push(work);
      });
      res.json({works});
    })
    .catch(console.log);
});


app.listen(8000, () => console.log('Listen on Port 8000'));
