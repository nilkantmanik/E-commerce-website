import React from 'react'
import './contact.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const Contact = () => {
    return (
      <div className="contact-container">
        <span>Mail to </span>
        <a
          className="email-link hover:scale-[1.1] duration-500"
          href="mailto:nilkantmanik87@gmail.com"
        >
          <MailOutlineIcon /> nilkantmanik87@gmail.com
        </a>
      </div>
    );
  };

export default Contact