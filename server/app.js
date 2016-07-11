var express = require ( 'express' );
var app = express();
var path = require ( 'path' );
var pg = require ( 'pg' );
var bodyParser = require ( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( { extended: false } );

var connectionString = 'postgres://localhost:5432/bean_counter_db';  //ATTN: Modify, once db is created.

app.use( bodyParser.json() );

app.listen( 8000, 'localhost', function( req, res ) {  //PORT number.
  console.log( 'Hailing frequencies open. Listening on PORT 8000.' );
});

app.use( express.static( 'public' ) );  //Public folder is set to static.

app.get( '/', function( req, res ) {  //Base view page.
  res.sendFile( path.resolve( 'public/views/base.html' ) );
});

app.get( '/trackSpending', function( req, res ) {  //get path.
  pg.connect( connectionString, function( err, client, done ) {
    var query = client.query( 'SELECT * FROM expenses WHERE ...' );
  });  //End pg.connect
});  //End app.get

app.post( '/inputExpense', urlencodedParser, function( req, res ) {
  console.log('post on server', req.body);
  //post path.
  pg.connect( connectionString, function( err, client, done ) {
    console.log( 'POST received: ' + req.body.category + ' ' + req.body.amount + ' ' + req.body.yyyy + '.' );
    client.query( 'INSERT INTO expenses ( category, amount, description, recurring, date_day, date_month, date_year ) VALUES ( $1, $2, $3, $4, $5, $6, $7 )', [ req.body.category, req.body.amount, req.body.description, req.body.type, req.body.dd, req.body.mm, req.body.yyyy ] );
    res.end();
  });  //End pg.connect
});  //end app.post
