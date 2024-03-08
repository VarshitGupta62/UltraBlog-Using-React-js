import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children }) {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (authStatus === true) {
            navigate("/");
        }
        else  if (authStatus === false) {
            navigate("/login");
        }
    }, [authStatus, navigate]);

    // Return children directly without wrapping in an object
    return (
        <>
            {children}
        </>
    );
}

export default AuthLayout;
