var express = require ( 'express' );
var app = express();
var path = require ( 'path' );
var pg = require ( 'pg' );
var bodyParser = require ( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( { extended: false } );

var connectionString = 'postres://localhost:5432/bean_counter_db';  //ATTN: Modify, once db is created.

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

app.post( '/inputExpense', urlencodedParser, function( req, res ) {  //post path.
  pg.connect( connectionString, function( err, client, done ) {
    var query = client.query( 'INSERT INTO expenses ( category, amount, description, date_day, date_week, date_month, date_year, recurring ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )', [req.body.category, req.body.amount, req.body.description, req.body.day_date, req.body.week_date, req.body.month_date, req.body.year_date, req.body.recurring] );
    res.end();
  });  //End pg.connect
});  //end app.post
