




var Game = {
	board: [],
	captured: [],
	history: [],
	turn: 0,

	init:function() {
		var b = []
		for (var i=0; i < 8; i++) {
			b[i] = [];
			for (var j=0; j < 8; j++) {
				b[i][j] = null;
			}
		}
		b[0][0] = "R";
		b[0][1] = "N";
		b[0][2] = "B";
		b[0][3] = "Q";
		b[0][4] = "K";
		b[0][5] = "B";
		b[0][6] = "N";
		b[0][7] = "R";

		b[1][0] = "P";
		b[1][1] = "P";
		b[1][2] = "P";
		b[1][3] = "P";
		b[1][4] = "P";
		b[1][5] = "P";
		b[1][6] = "P";
		b[1][7] = "P";

		b[6][0] = "p";
		b[6][1] = "p";
		b[6][2] = "p";
		b[6][3] = "p";
		b[6][4] = "p";
		b[6][5] = "p";
		b[6][6] = "p";
		b[6][7] = "p";
		

		b[7][0] = "r";
		b[7][1] = "n";
		b[7][2] = "b";
		b[7][3] = "q";
		b[7][4] = "k";
		b[7][5] = "b";
		b[7][6] = "n";
		b[7][7] = "r";

		this.board = b;
	},

	// enkel konvertering fra sjakkposisjoner (e2, e4) til koordinater i 2d arr
	// gjør ingen sjekk på hvorvidt sjakkposisjonene er gyldige
	// tar utgangspunkt i små bokstaver
	coordinates:function(square) {

		var y = square.charCodeAt(0);
		var x = square.charCodeAt(1);
		return [x-49, y-97];

	},
	movePiece:function(square_from, square_to) {
		if (!this.legalMove(square_from, square_to)) return false;
		var [fx, fy] = this.coordinates(square_from);
		var [tx, ty] = this.coordinates(square_to);
		console.log(square_to, ":", tx, ty);
		if (this.board[tx][ty] != null) {
			this.captured.push(this.board[tx][ty]);
		}
		this.board[tx][ty] = this.board[fx][fy];
		this.board[fx][fy] = null;
		this.turn = (this.turn+1) % 2;
		return true;
	},

	legalMove: function(square_from, square_to) {
		var [x, y] = this.coordinates(square_from);
		if (this.board[x][y] == null) 
			return false;
		var piece = this.board[x][y].charCodeAt(0) < 97 ? 0:1;
		if (piece != this.turn)
			return false;
		return true;
	},
	printBoard: function() {
		for (var i=0; i < 8; i++) {
			console.log("");
			for (var j=0; j < 8; j++) {
				if (this.board[i][j] != null)
					process.stdout.write(this.board[i][j]);
				else 
					process.stdout.write(" ");
			}
		}
		console.log("");
	},

	toFEN: function() {
		var fen = "";
		for (var i=7; i >= 0; i--) {
			var blank = 0;
			for (var j=0; j < 8; j++) {
				if (this.board[i][j] == null)
					blank += 1;
				else {
					if (blank > 0)
						fen += blank;
					fen += this.board[i][j];
				}
			}
			if (blank > 0)
				fen += blank;
			fen += "/";
		}
		fen = fen.substr(0, fen.length-1) + " ";
		fen += this.turn == 0 ? "w" : "b";
		return fen;
	}
}



module.exports = Game;
