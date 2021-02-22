import React from "react";
import './styles.css';

const DropDown = (props) => (
    <div className={`dropdown-container ${props.isOpen ? "drop-open": null}`}>
        {props.children}
    </div>
);

export { DropDown }; 