import React from 'react';


export class Chesspiece extends React.Component{
	render(){
		var name = {"Pawn","Queen","Bishop","Knight","Rook", "King"};
		var color = {"Black", "White"};
		var s = {
			height: '60px',
			width: 	'20px',
			backgroundColor: 'black'
		}
		return (<div style={s}>name</div>);

		}
}

