'use strict';
const request = require('request-promise'),
      cheerio = require('cheerio'),
      router = require('express').Router();

const options = {
  url: 'http://archiveofourown.org/works?tag_id=',
  transform: body => cheerio.load(body)
};

router.get('/', (req, res) => {
  let tag = 'Aaron+Dingle*s*Robert+Sugden';
  options.url += `${tag}&page=${req.query.page || 1}`;
  request(options)
    .then($ => {
      let works = [];
      $('li.work').each((i, el) => {
        let heading = $(el).find('h4'),
            title = heading.children().first(),
            author = heading.children().eq(1),
            summary = $(el).find('blockquote.summary').html();

        let work = {
          title: title.text(),
          url: title.attr('href'),
          author: author.text(),
          authorUrl: author.attr('href'),
          date: $(el).find('.datetime').text(),
          rating: $(el).find('.rating .text').text(),
          words: $(el).find('dd.words').text(),
          chapters: $(el).find('dd.chapters').text(),
          kudos: $(el).find('dd.kudos').text(),
          summary: summary ? summary.trim() : ''
        };
        works.push(work);
      });
      res.json({works});
    })
    .catch(console.log);
});

module.exports = router;
