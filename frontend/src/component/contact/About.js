import React from 'react';
import LinkIcon from '@material-ui/icons/Link';
import './contact.css'
const About = () => {

    let url="https://nilkantmanik.netlify.app"
  return (
    <div className='about-container'>
      <span style={{margin:"8px",padding:"5px"}}>
        Visit my portfolio to know about me on
      </span>

      <a href={url} className="link">
          Nilkantmanik.com <LinkIcon />
        </a>
    </div>
  );
};

export default About;
