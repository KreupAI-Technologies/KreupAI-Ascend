import React from 'react';

const TermsSection = () => {
    return (
        <div className="p-8 space-y-16">
            {/* Terms and Conditions Section */}
            <div>
                <h2 className="text-lg font-semibold mb-8">Terms and Conditions</h2>
                <div className="grid grid-cols-[10%,10%,60%] gap-4 items-center">
                    <label className="text-sm text-gray-800 col-span-1 text-right" htmlFor="terms">
                        Terms and Conditions
                    </label>
                    <input
                        type="text"
                        id="terms"
                        className="col-span-2 border border-gray-300 rounded p-2"
                        
                    />
                </div>
            </div>

            {/* Description Information Section */}
            <div>
                <h2 className="text-lg font-semibold mb-8">Description Information</h2>
                <div className="grid grid-cols-[10%,10%,60%] gap-4 items-center">
                    <label className="text-sm text-gray-800 col-span-1 text-right" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="col-span-2 border border-gray-300 rounded p-2"
                        rows="3"
                    />
                </div>
            </div>
        </div>
    );
};

export default TermsSection;
