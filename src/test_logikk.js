var game = require('./sjakk_logikk.js');
var stdin = process.openStdin();

game.init();
game.printBoard();
process.stdout.write("move: ");
console.log(game.toFEN());
stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    
	var [f, t] = d.toString().trim().split(" ");

	game.movePiece(f, t);
	game.printBoard();
	process.stdout.write("move: ");

  });