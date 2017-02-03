var Color = {
	white: 0,
	black: 1,
};

var PieceType = {
	Rook 	: "R",
	Knight	: "N",
	Bishop 	: "B",
	Queen	: "Q",
	King	: "K",
	Pawn	: "P",
}

function Piece(type, color) {
	this.type = type;
	this.color = color;
	this.fen = function() {
		if (this.color == Color.black)
			return this.type.toLowerCase();
		return this.type;
	}

}




var Game = {
	board: [],
	captured: [],
	history: [],
	turn: Color.white,

	init:function() {
		var b = clearBoard();
		b[0][0] = new Piece(PieceType.Rook, Color.white);
		b[0][1] = new Piece(PieceType.Knight, Color.white);
		b[0][2] = new Piece(PieceType.Bishop, Color.white);
		b[0][3] = new Piece(PieceType.Queen, Color.white);
		b[0][4] = new Piece(PieceType.King, Color.white);
		b[0][5] = new Piece(PieceType.Bishop, Color.white);
		b[0][6] = new Piece(PieceType.Knight, Color.white);
		b[0][7] = new Piece(PieceType.Rook, Color.white);

		b[1][0] = new Piece(PieceType.Pawn, Color.white);
		b[1][1] = new Piece(PieceType.Pawn, Color.white);
		b[1][2] = new Piece(PieceType.Pawn, Color.white);
		b[1][3] = new Piece(PieceType.Pawn, Color.white);
		b[1][4] = new Piece(PieceType.Pawn, Color.white);
		b[1][5] = new Piece(PieceType.Pawn, Color.white);
		b[1][6] = new Piece(PieceType.Pawn, Color.white);
		b[1][7] = new Piece(PieceType.Pawn, Color.white);

		b[6][0] = new Piece(PieceType.Pawn, Color.black);
		b[6][1] = new Piece(PieceType.Pawn, Color.black);
		b[6][2] = new Piece(PieceType.Pawn, Color.black);
		b[6][3] = new Piece(PieceType.Pawn, Color.black);
		b[6][4] = new Piece(PieceType.Pawn, Color.black);
		b[6][5] = new Piece(PieceType.Pawn, Color.black);
		b[6][6] = new Piece(PieceType.Pawn, Color.black);
		b[6][7] = new Piece(PieceType.Pawn, Color.black);
		

		b[7][0] = new Piece(PieceType.Rook, Color.black);
		b[7][1] = new Piece(PieceType.Knight, Color.black);
		b[7][2] = new Piece(PieceType.Bishop, Color.black);
		b[7][3] = new Piece(PieceType.Queen, Color.black);
		b[7][4] = new Piece(PieceType.King, Color.black);
		b[7][5] = new Piece(PieceType.Bishop, Color.black);
		b[7][6] = new Piece(PieceType.Knight, Color.black);
		b[7][7] = new Piece(PieceType.Rook, Color.black);

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
	movePiece:function(sq1, sq2) {
		if (!this.legalMove(sq1, sq2)) return false;

		var [x1, y1] = this.coordinates(sq1);
		var [x2, y2] = this.coordinates(sq2);
		
		/*
		if (this.board[x][ty] != null) {
			this.captured.push(this.board[tx][ty]);
		}*/
		this.board[x2][y2] = this.board[x1][y1];
		this.board[x1][y1] = null;
		this.turn = (this.turn+1) % 2;
		return true;
	},

	/*
	 * most of the chess logic culminates in the legalMove function
	 * you can see we have all these baby functions legalKnight, legalPawn, etc
	 * which are all handled by this function
	 */

	legalMove: function(sq1, sq2) {
		if (sq1 == sq2) 
			return false;
		if (!this.validSquare(sq1) || !this.validSquare(sq2)) 
			return false;

		var [x1, y1] = this.coordinates(sq1);
		var [x2, y2] = this.coordinates(sq2);
		var dx = Math.abs(x1-x2);
		var dy = Math.abs(y1-y2);

		var piece1 = this.board[x1][y1];
		var piece2 = this.board[x2][y2];

		if (piece1 == null) 
			return false;
		if (piece1.color != this.turn) 
			return false;
		if (piece2 != null && piece1.color == piece2.color)
			return false;

		var legal;
		console.log("la testen begynne");
		switch (this.board[x1][y1].type) {
			case PieceType.Rook:
				legal = this.legalRook(dx, dy);
				break;
			case PieceType.Bishop:
				legal = this.legalBishop(dx, dy);
				break;
			case PieceType.Queen:
				legal = this.legalQueen(dx, dy);
				break;
			case PieceType.King:
				legal = this.legalKing(dx, dy);
				break;
			case PieceType.Pawn:
				legal = this.legalPawn(dx, dy);
				break;
			case PieceType.Knight:
				return this.legalKnight(dx, dy);
		}
		console.log("in the way:", this.inTheWay(sq1, sq2));
		return (!this.inTheWay(sq1, sq2) && legal);
	},

	validSquare: function(square) {
		if (square.length != 2) return false;
		var y = square.charCodeAt(0)-97;
		var x = square.charCodeAt(1)-49;
		if (x < 0 || y < 0 || x > 7 || y > 7)
			return false;
		return true;


	},

	legalKnight: function(dx, dy) {
		return (dx == 2 && dy == 1) || (dx == 1 && dy == 2);
	},

	legalKing: function(dx, dy) {
		return (dx <= 1 && dy <= 1);
	},

	legalBishop: function(dx, dy) {
		return (dx == dy);
	},

	legalRook: function(dx, dy) {
		return (dx == 0 || dy == 0);
	},

	legalQueen: function(dx, dy) {
		return legalRook(dx, dy) || legalBishop(dx, dy);
	},

	legalPawn: function() {
		return true;
	},

	/*
	 *	checks if there's a piece in between the moving piece and the destination
	 *
	 */
	inTheWay: function(sq1, sq2) {
		var [x1, y1] = this.coordinates(sq1);
		var [x2, y2] = this.coordinates(sq2);
		var dx = (x2-x1) < 0 ? -1 : 1;
		var dy = (y2-y1) < 0 ? -1 : 1;
		if (x1 != x2) x1 += dx;
		if (y1 != y2) y1 += dy;
		while (x1 != x2 || y1 != y2) {
			if (this.board[x1][y1] != null)
				return true;
			if (x1 != x2) x1 += dx;
			if (y1 != y2) y1 += dy;
		}
		return false;

	},
	inCheck: function(color) {
		return false;
	},

	printBoard: function() {
		for (var i=7; i >= 0; i--) {
			console.log("");
			for (var j=0; j < 8; j++) {
				if (this.board[i][j] != null)
					process.stdout.write(this.board[i][j].fen());
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
					fen += this.board[i][j].fen();
				}
			}
			if (blank > 0)
				fen += blank;
			fen += "/";
		}
		fen = fen.substr(0, fen.length-1) + " ";
		fen += this.turn == 0 ? "w" : "b";
		return fen;
	},
	fromFEN: function(fen) {
		/*
		var b = clearBoard();
		var x = 0;
		var y = 0;
		var color;
		for (var i=0; i < fen.length; i++) {
			var c = fen.charCodeAt(i);

			if (c == 47) {	// new row '/'
				x++;
				y = 0;
			}
			if (c > 48 && c < 57) {
				y += (c-48);
			}
			if (c >= 97 && c < 122)
				color = Color.black;
			if (c >= 65 && c < 90)
				color = Color.white;

		}
		*/
	}
}

function clearBoard() {
	var b = [];
	for (var i=0; i < 8; i++) {
		b.push([]);
		for (var j=0; j< 8; j++) {
			b[i][j] = null;
		}
	}
	return b;
}

module.exports = Game;
