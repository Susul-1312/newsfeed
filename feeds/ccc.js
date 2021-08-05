// example of possibilities with feeds

const cheerio = require('cheerio');
const fetch = require('node-fetch');

var feed = []

fetch('https://www.ccc.de/de/')
    .then(res => res.text())
    .then(body => {
      let $ = cheerio.load(body)
      $('.article_partial').each((i, e) => {
        feed.unshift({
          headline: e.children[1].children[0].children[0].data,
          content: e.children[5].children[0].data
        })
      })
    });

module.exports = function () {
  return feed;
};
