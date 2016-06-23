'use strict';

const express = require('express'),
      app = express();

app.use('/', express.static('public'));
app.use('/api', require('./router.js'));

app.listen(8000, () => console.log('Listen on Port 8000'));
