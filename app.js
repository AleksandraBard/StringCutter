const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

app.post('/test', function (req, res) {

  const {string_to_cut} = req.body;

  if (string_to_cut.length !== 0 && typeof string_to_cut === 'string') {
    res.json(stringCutter(string_to_cut));
  } else {
    res.status(400).send({
      error:
        'Enter the correct data please!',
    });
  }
  res.end();
});

// function to cut given string
const stringCutter = str => {
    if (str.length < 3) return {return_string: ''}
    let resStr = ''
    for (let i = 2; i < str.length; i += 3) {
        resStr += str[i]
    }
    return { return_string: resStr };
};

app.listen(app.get('port'), function() {
    console.log(`Server is running on post ${app.get('port')}!`)
})

module.exports = app