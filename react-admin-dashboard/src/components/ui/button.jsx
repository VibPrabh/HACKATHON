// src/components/ui/button.jsx
export const Button = ({ children, onClick, className }) => {
    return (
      <button
        onClick={onClick}
        className={className}
      >
        {children}
      </button>
    );
  };
  