import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        // <div className="fixed inset-0 flex justify-center items-center h-screen">
        //     <div className="loader"></div>
        //     {/* <p>Loading....</p> */}
        // </div>

        <div className="flex justify-center items-center h-screen">
            <div className="loader"></div>
        </div>
    );
};

export default LoadingSpinner;
