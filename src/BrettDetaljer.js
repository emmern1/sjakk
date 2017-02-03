import React from 'react';


export class Tall extends React.Component {
	render() {
		var s = {
			height: '560px',
			display: 'inline-block',
			width: '20px',
			verticalAlign: 'top',
		}
		var miniruter = [];
		var tall = "87654321";
		for (var i=0; i < tall.length; i++) {
			miniruter.push(<MiniRute vertical={true} key={i}>{tall.charAt(i)}</MiniRute>);
		}
		return (
			<div style={s}>{miniruter}</div>
			);
	}
}


export class Bokstaver extends React.Component {
	render() {	
		var s = {
			width: '560px',

		}
		var miniruter = [];
		var abc = "ABCDEFGH";
		for (var i=0; i < abc.length; i++) {
			miniruter.push(<MiniRute vertical={false} key={i}>{abc.charAt(i)}</MiniRute>);
		}
		return (
			<div style={s}>
				{miniruter}
			</div>
			);
	}
}


class MiniRute extends React.Component {

	render() {
		var s = {
			width		: '20px',
			height		: '20px',
			textAlign	: 'center',
			display		: 'inline-block',
			lineHeight	: '20px',
		}
		if (this.props.vertical) {
			s.height = '70px';
			s.lineHeight = '70px';
		}
		else
			s.width = '70px';

		return (<span style={s}>{this.props.children}</span>);
	}
}