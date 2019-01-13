import React from 'react';

import './Memo.css';

const Memo = (props) => (

	<div className='Memo' onClick={props.clicked}>
		<h3>{props.title}</h3>
		<hr />
		<div>{props.content}</div>
	</div>
				
);


export default Memo;