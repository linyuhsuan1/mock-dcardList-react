const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

app.get('/posts', async (req, res) => {
    const limit = req.query.limit;
    const before = req.query.before || undefined;
    try {
      if (before) {
        const data = await axios.get('https://dcard.tw/_api/posts?popular=true'+ '&limit=' + limit + '&before=' + before)
        res.json(data.data);
      } else {
        const data = await axios.get('https://dcard.tw/_api/posts?popular=true'+ '&limit=' + limit)
        res.json(data.data);
      }
    } catch(err) {
        console.log('error...', err)
        res.send(err);
    }
  })
app.get('/post/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const data = await axios.get('https://dcard.tw/_api/posts/'+id)
    res.json(data.data);
  } catch(err) {
    res.send(err);
  }
})
app.get('/users', async (req, res) => {
  console.log('gggg')
const limit = req.query.limit;
const owner = 'linyuhsuan1';
try {
  const data = await axios.get('https://api.github.com/users/' + owner)
  console.log('data',data)
  res.json(data.data);

} catch(err) {
  console.log('error...', err)
  res.send(err);
}
})

const port = 5001;

app.listen(port, () => `Server running on port ${port}`);
