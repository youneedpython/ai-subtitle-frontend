// src/components/common/Button.jsx
import React from 'react';

function Button({ children, onClick, disabled, primary, style, htmlFor, ...props }) { // htmlFor prop 추가
    const buttonStyle = {
        backgroundColor: primary ? "#4CAF50" : (disabled ? "#cccccc" : "#2196F3"),
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "bold",
        ...style
    };

    const hoverStyle = disabled ? {} : { backgroundColor: primary ? "#45a049" : "#1976D2" };

    if (htmlFor) { // htmlFor prop이 있으면 <label>처럼 동작하도록
        return (
            <label htmlFor={htmlFor} style={{ ...buttonStyle, display: 'inline-block', textAlign: 'center' }}>
                {children}
            </label>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;