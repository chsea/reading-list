'use strict';
const request = require('request-promise'),
      Promise = require('bluebird'),
      writeFile = Promise.promisify(require('jsonfile').writeFile),
      cheerio = require('cheerio'),
      router = require('express').Router();

const options = {
  url: 'http://archiveofourown.org/works?tag_id=',
  transform: body => cheerio.load(body)
};

router.get('/', (req, res) => {
  const filepath = './aaronrobert.json';
  const history = require(filepath);

  let tag = 'Aaron+Dingle*s*Robert+Sugden';
  options.url += `${tag}&page=${req.query.page || 1}`;
  request(options)
    .then($ => {
      let works = [],
          latestFound = false;

      $('li.work').each((i, el) => {
        let $el = $(el),
            heading = $el.find('h4'),
            title = heading.children().first(),
            author = heading.children().eq(1),
            summary = $el.find('blockquote.summary').html();

        let work = {
          id: $el.attr('id'),
          title: title.text(),
          url: title.attr('href'),
          author: author.text(),
          authorUrl: author.attr('href'),
          date: $el.find('.datetime').text(),
          rating: $el.find('.rating .text').text(),
          words: $el.find('dd.words').text(),
          chapters: $el.find('dd.chapters').text(),
          kudos: $el.find('dd.kudos').text(),
          summary: summary ? summary.trim() : ''
        };

        if (!latestFound && work.id != history.latest) work.new = true;
        else if (work.id == history.latest) latestFound = true;

        works.push(work);
      });
      res.json({works});

      if (works[0].id != history.latest) {
        history.latest = works[0].id;
        return writeFile(filepath, history);
      }
    })
    .catch(console.log);
});

module.exports = router;
