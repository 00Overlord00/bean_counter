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

app.post( '/trackSpending', function( req, res ) {  //get path.
  console.log( req.body );
    var requestedInfo = [];
  pg.connect( connectionString, function( err, client, done ) {
    console.log( '/trackSpending received a query between: ', req.body.minQuery, ' and: ', req.body.maxQuery, '.' );
    var min = req.body.minQuery;
    var max = req.body.maxQuery;
    var query = client.query( '( SELECT * FROM expenses WHERE date > $1  AND date < $2 )', [ min, max ] );
    query.on( 'row', function( row ){
      requestedInfo.push( row );
    });  //End dateQuery row push.
    query.on( 'end', function(){
        console.log( "this is requested info Array", requestedInfo );
      return res.json( requestedInfo );
    });  //End dateQuery end function.
        // console.log( "this is requested infor Array", requestedInfo );
  });  //End pg.connect
});  //End /trackSpending

app.post( '/inputExpense', urlencodedParser, function( req, res ) {
  pg.connect( connectionString, function( err, client, done ) {
    console.log( '/inputExpense received: ' + req.body.category + ' ' + req.body.amount + ' ' + req.body.date, '.' );
    client.query( 'INSERT INTO expenses ( category, amount, description, date, recurring ) VALUES ( $1, $2, $3, $4, $5 )', [ req.body.category, req.body.amount, req.body.description, req.body.date, req.body.type ] );
    res.end();
  });  //End pg.connect
});  //End /inputExpense

app.post( '/viewExpenses', function( req, res ) {
  console.log( req.body );
  var bundledInfo = [];
  pg.connect( connectionString, function( err, client, done ) {
    console.log( '/viewExpense received a query between: ', req.body.minQuery, ' and: ', req.body.maxQuery, '.' );
        var min = req.body.minQuery;
        var max = req.body.maxQuery;
      var query = client.query( '( SELECT * FROM expenses WHERE date > $1 AND date < $2 )', [ min, max ] );
    query.on( 'row', function( row ) {
      bundledInfo.push( row );
    });
    query.on( 'end', function() {
      return res.json( bundledInfo );
    });
  });
});
