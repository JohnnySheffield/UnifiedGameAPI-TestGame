var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendfile( __dirname + '/game.html');
});

app.listen(process.env.VMC_APP_PORT || 8282, null);
console.log('Local Fake game running on http://localhost:8282/');
