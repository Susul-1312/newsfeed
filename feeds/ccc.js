// example of possibilities with feeds

const cheerio = require('cheerio');
const fetch = require('node-fetch');

var feed = []

updateFeed = async () => {
  for (var i = 0; i <= 100; i++) {
    try {
      const res = await fetch(`https://www.ccc.de/de/?page=${i}`);
      const body = await res.text()
      let feedpart = []

      let $ = cheerio.load(body)
      $('.article_partial').each((ii, e) => {
        feedpart.push({
          headline: e.children[1].children[0].children[0].data,
          content: e.children[5].children[0].data + "(page " + i + ")"
        });
      });

      feed.push(feedpart)
      feed = feed.flat()
    } catch (e) {
      console.error(e);
    }
  }
}

updateFeed()



module.exports = function () {
  return [...feed].reverse();
};
