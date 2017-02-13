import React from 'react';
import {Tall, Bokstaver} from './BrettDetaljer.js';
import {Chesspiece} from './brikker.js';

var Brett = React.createClass({
	getInitialState: function() {

		var pieceOrder = ["R", "N", "B", "Q", "K", "B", "N", "R"];
		var brett = new Array(8*8);

		for(var i = 0; i < 16; i++){
			if(i < 8){
				brett[i] = pieceOrder[i];

			} else{
				brett[i] = "P";
			}
		}

		var x = 0;
		for(var i = 48; i < 64; i++){
			if(i > 55 ){
				brett[i] = pieceOrder[x++];
			} else{
				brett[i] = "P";
			}
		}



		return {brett: brett};
	},
	renderRute: function(i) {
		var x = i % 8;
		var y = Math.floor(i / 8);
		var farge = (x+y)%2 == 0;
		var id = i % 32;
		if (this.state.brett[i] != undefined) {
			var color;
			if(id < 16){
				color = "black";
			} else {
				color = "white";
			}

			b = <Chesspiece name={this.state.brett[i]} color={color} id={id}/>
		}
		else var b = null;//<Chesspiece type={this.state.brett[i]} />;


		

		return (<Rute farge={farge} key={i} brikke={b}/>);
	},

	render: function() {
		var stil = {
			width: '560px',
			height: '560px',
			display: 'inline-block',

		}
		var ruter = [];
		for (var i=0; i < 64; i++)
			ruter.push(this.renderRute(i));

		return (
			<div className="brett">
				<Tall/>
				<div style={stil}>
					{ruter}
					<Bokstaver/>
					
				</div>

			</div>
			);
	}
});





class Rute extends React.Component {
	render() {
		var stil = {
			height			: '70px',
			width			: '70px',
			backgroundColor	: 'brown',
			display			: 'inline-block',
			position: 'relative'
		}
		if (this.props.farge)
			stil.backgroundColor = '#eee';

		return (
			<div style={stil}>{this.props.brikke}</div>
			);
	}
}

export default Brett;
