import React from 'react';


export class Chesspiece extends React.Component{
	render(){
		var s = {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			display: 'inline-block',
		}
		return (<div style={s}>{this.props.name}</div>);

		}
}

