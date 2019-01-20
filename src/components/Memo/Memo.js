import React from 'react';
import Radium from 'radium';

import './Memo.css';

const Memo = (props) => (
	<div style={memoStyle[props.color]} onClick={props.clicked}>
		<h3>{props.title}</h3>
		<hr />
		<div>{props.content}</div>
	</div>
);

const memoStyle = {
	'YELLOW': {
		border: '30px solid #feef9c',
		backgroundColor: '#feef9c',
		padding: '0px',
		margin: '10px 10px',
		boxShadow: '3px 3px 2px #ccc',
		boxSizing: 'border-box',
		display: 'inline-block',
		textAlign: 'left',
		maxWidth: '800px',
		maxHeight: '800px',
		overflow: 'hidden',
		whiteSpace: 'pre-wrap',
		':hover': {
			cursor: 'pointer',
			boxShadow: '5px 5px 5px #ccc'
		},
		':active': {
			boxShadow: '10px 10px 10px #ccc'
		},
		'@media (max-width: 500px)': {
			margin: '20px 20px',
			display: 'block'
		}
	},
	'PURPLE': {
		border: '30px solid #DCDFFF',
		backgroundColor: '#DCDFFF',
		padding: '0px',
		margin: '10px 10px',
		boxShadow: '3px 3px 2px #ccc',
		boxSizing: 'border-box',
		display: 'inline-block',
		textAlign: 'left',
		maxWidth: '800px',
		maxHeight: '800px',
		overflow: 'hidden',
		whiteSpace: 'pre-wrap',
		':hover': {
			cursor: 'pointer',
			boxShadow: '5px 5px 5px #ccc'
		},
		':active': {
			boxShadow: '10px 10px 10px #ccc'
		},
		'@media (max-width: 500px)': {
			margin: '20px 20px',
			display: 'block'
		}
	},
	'ORANGE': {
		border: '30px solid #feccaf',
		backgroundColor: '#feccaf',
		padding: '0px',
		margin: '10px 10px',
		boxShadow: '3px 3px 2px #ccc',
		boxSizing: 'border-box',
		display: 'inline-block',
		textAlign: 'left',
		maxWidth: '800px',
		maxHeight: '800px',
		overflow: 'hidden',
		whiteSpace: 'pre-wrap',
		':hover': {
			cursor: 'pointer',
			boxShadow: '5px 5px 5px #ccc'
		},
		':active': {
			boxShadow: '10px 10px 10px #ccc'
		},
		'@media (max-width: 500px)': {
			margin: '20px 20px',
			display: 'block'
		}
	},
	'GREEN': {
		border: '30px solid #b1ffb1',
		backgroundColor: '#b1ffb1',
		padding: '0px',
		margin: '10px 10px',
		boxShadow: '3px 3px 2px #ccc',
		boxSizing: 'border-box',
		display: 'inline-block',
		textAlign: 'left',
		maxWidth: '800px',
		maxHeight: '800px',
		overflow: 'hidden',
		whiteSpace: 'pre-wrap',
		':hover': {
			cursor: 'pointer',
			boxShadow: '5px 5px 5px #ccc'
		},
		':active': {
			boxShadow: '10px 10px 10px #ccc'
		},
		'@media (max-width: 500px)': {
			margin: '20px 20px',
			display: 'block'
		}
	},
	'BLUE': {
		border: '30px solid #d8f1ff',
		backgroundColor: '#d8f1ff',
		padding: '0px',
		margin: '10px 10px',
		boxShadow: '3px 3px 2px #ccc',
		boxSizing: 'border-box',
		display: 'inline-block',
		textAlign: 'left',
		maxWidth: '800px',
		maxHeight: '800px',
		overflow: 'hidden',
		whiteSpace: 'pre-wrap',
		':hover': {
			cursor: 'pointer',
			boxShadow: '5px 5px 5px #ccc'
		},
		':active': {
			boxShadow: '10px 10px 10px #ccc'
		},
		'@media (max-width: 500px)': {
			margin: '20px 20px',
			display: 'block'
		}
	},
	'PINK': {
		border: '30px solid #feb0bc',
		backgroundColor: '#feb0bc',
		padding: '0px',
		margin: '10px 10px',
		boxShadow: '3px 3px 2px #ccc',
		boxSizing: 'border-box',
		display: 'inline-block',
		textAlign: 'left',
		maxWidth: '800px',
		maxHeight: '800px',
		overflow: 'hidden',
		whiteSpace: 'pre-wrap',
		':hover': {
			cursor: 'pointer',
			boxShadow: '5px 5px 5px #ccc'
		},
		':active': {
			boxShadow: '10px 10px 10px #ccc'
		},
		'@media (max-width: 500px)': {
			margin: '20px 20px',
			display: 'block'
		}
	}
};
		



export default Radium(Memo);