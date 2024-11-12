// components/Button.js
import React from 'react';

const Button = ({ label, onClick, type = 'button', className = '' }) => {
  return (
    <button className={`custom-button ${className}`} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;
