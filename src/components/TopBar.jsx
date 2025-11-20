import React from 'react';

const TopBar = () => {
    return (
        <header className="bg-surface text-onSurface px-4 py-3 shadow-sm flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primaryContainer flex items-center justify-center text-onPrimaryContainer">
                    <i className="fa-solid fa-crop-simple text-xl"></i>
                </div>
                <h1 className="text-xl font-medium text-onSurface">Image Studio</h1>
            </div>
            {/* Placeholder for future actions like Dark Mode toggle */}
        </header>
    );
};

export default TopBar;
