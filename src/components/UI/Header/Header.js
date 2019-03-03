import React from 'react';

import './Header.css'

const Header = () => (
  <div>
    <header className='header'>
      <i id='title'>
        &lt;MEMO /&gt;
      </i>
      {/* <a href='https://github.com/hkKevin/memo' target='_blank' rel='noopener noreferrer' style={{ color: '#888' }} title='GitHub Repo'>
        <i id='githubIcon' className="fab fa-github"></i>
      </a> */}
      {/* <i id='title'>
        &lt;MEMO /&gt;
      </i> */}
      <div id='headerRight'>
        <a href='https://github.com/hkKevin/memo' target='_blank' rel='noopener noreferrer' style={{ color: '#888' }} title='GitHub Repo'>
          <i id='githubIcon' className="fab fa-github"></i>
        </a>
        <div id='credit'>Developed By<br />
          <a href='https://github.com/hkKevin' target='_blank' rel='noopener noreferrer' title='GitHub Profile'>Pak Kiu Leung</a>
        </div>
      </div>
    </header>
  </div>
);

export default Header;