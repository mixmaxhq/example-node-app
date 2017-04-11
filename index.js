const express = require('express');
const app = express();
const hbs = require('hbs');
const request = require('request');


// Configure handlebars.
app.set('view engine', 'html');
app.engine('html', hbs.__express);

// TODO: Separate this functionality into a different file. Left as an exercise for the reader ;).
function getGifs(query, callback) {
  const giphyKey = 'dc6zaTOxFJmzC';

  request({
    url: 'http://api.giphy.com/v1/gifs/search',
    qs: {
      api_key: giphyKey,
      q: query,
      limit: 6,
      rating: 'pg'
    }
  }, callback);
}

// Routes.
app.get('/', (req, res) => {
  const query = 'cats';

  getGifs(query, (err, response, body) => {
    // TODO: Bring this parsing into `getGifs`.
    const parsed = JSON.parse(body);
    const gifUrls = parsed.data.map((gifData) => {
      return gifData.embed_url;
    });

    res.render('index', { gifUrls, query });
  });
});

app.get('/:query', (req, res) => {
  const query = req.params.query;

  getGifs(query, (err, response, body) => {
    const parsed = JSON.parse(body);
    const gifUrls = parsed.data.map((gifData) => {
      return gifData.embed_url;
    });

    res.render('index', { gifUrls, query });
  });
});


// Start the server.
const PORT = 3005;
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
