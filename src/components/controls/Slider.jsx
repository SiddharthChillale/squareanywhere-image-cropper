import React from 'react';

const Slider = ({ value, min, max, onChange, label, unit = '' }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-onSurfaceVariant">{label}</label>
                <span className="text-sm text-onSurfaceVariant">{value}{unit}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1 bg-surfaceVariant rounded-lg appearance-none cursor-pointer accent-primary"
            />
        </div>
    );
};

export default Slider;
