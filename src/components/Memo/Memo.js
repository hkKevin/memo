import React from 'react';
import Radium from 'radium';

import './Memo.css';

const Memo = (props) => (
	<div style={props.style} onClick={props.clicked}>
		<h3>{props.title}</h3>
		<hr />
		<div>{props.content}</div>
	</div>
);
		



export default Radium(Memo);