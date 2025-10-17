import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-16">
                    <div className="flex items-center">
                       <img 
                           src="https://www.lwscientific.com/cdn/shop/files/Asset_1_5a6663e3-ee5b-4e60-8c63-2caa594f2153.jpg?v=1717600368" 
                           alt="Company Logo" 
                           className="h-14 w-auto"
                       />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;