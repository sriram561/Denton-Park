import React from 'react';

const SignageCard = ({ signage }) => {
    return (
        <div className="signage-card border border-gray-300 rounded-lg p-4 mb-4 md:w-[20vw] w-full ">
            <img src={signage.src} alt={signage.name} className="w-full h-32 object-contain rounded-md" />
            <h3 className="font-bold text-lg mt-2">{signage.name}</h3>
            <p className="text-gray-600">{signage.description}</p>
        </div>
    );
};

export default SignageCard;