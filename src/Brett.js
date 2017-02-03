import React from 'react';
import {Tall, Bokstaver} from './BrettDetaljer.js';

var Brett = React.createClass({
	renderRute: function(i) {
		var x = i % 8;
		var y = Math.floor(i / 8);
		var farge = (x+y)%2 == 0;
		return (<Rute farge={farge} key={i} />);
	},

	render: function() {
		var stil = {
			width: '560px',
			height: '560px',
			display: 'inline-block'
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
		}
		if (this.props.farge)
			stil.backgroundColor = '#eee';

		return (
			<div style={stil}></div>
			);
	}
}

export default Brett;
