import React from 'react';

import './Memo.css';

const Memo = (props) => (
	
	<div className='Memo' onClick={props.clicked}>
		<h4>{props.title}</h4>
		<p>{props.content}</p>
	</div>
				
);


export default Memo;