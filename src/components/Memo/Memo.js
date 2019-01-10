import React from 'react';

import './Memo.css';

const Memo = (props) => (
    <div className='Memo' onClick={props.clicked}>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
    </div>
);

export default Memo;