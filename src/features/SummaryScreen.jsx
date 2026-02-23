import React from 'react';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

// Maps the stored key back to a user-friendly label for display purposes
const typeMap = {
    platform: 'Platform Navigation',
    content: 'Course Content',
    ai: 'AI Features',
    support: 'Customer Support'
};

/**
 * Summary view shown after successful form submission.
 */
export default function SummaryScreen({ data, onReset }) {
    if (!data) return null;

    const customStyles = {
        itemShapes: RoundedStar,
        activeFillColor: '#f59e0b',
        inactiveFillColor: '#e2e8f0',
    };

    return (
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                    className="w-8 h-8 text-circlehd-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-circlehd-dark mb-2">Thank You!</h2>
                <p className="text-circlehd-gray text-base">
                    We appreciate your time. Your feedback has been securely submitted.
                </p>
            </div>

            <div className="bg-circlehd-light p-5 rounded-xl border border-circlehd-border space-y-4 mb-8">
                <div>
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-circlehd-gray mb-1">Full Name</h3>
                    <p className="text-circlehd-dark font-medium">{data.fullName}</p>
                </div>

                <div className="flex flex-wrap gap-4 xs:gap-8 justify-between">
                    <div className="flex-1">
                        <h3 className="text-xs uppercase tracking-wider font-semibold text-circlehd-gray mb-1">Email</h3>
                        <p className="text-circlehd-dark font-medium truncate">{data.email}</p>
                    </div>
                    <div>
                        <h3 className="text-xs uppercase tracking-wider font-semibold text-circlehd-gray mb-1">Rating</h3>
                        <div className="flex items-center gap-2">
                            <Rating
                                value={data.rating}
                                readOnly
                                style={{ maxWidth: 100 }}
                                itemStyles={customStyles}
                            />
                            <span className="text-circlehd-dark font-bold ml-1">{data.rating}</span>
                            <span className="text-circlehd-gray text-sm">/ 5</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-circlehd-gray mb-1">Experience Type</h3>
                    <span className="inline-block px-3 py-1 bg-white border border-circlehd-border rounded-full text-sm font-medium text-circlehd-dark shadow-sm">
                        {typeMap[data.experienceType] || data.experienceType}
                    </span>
                </div>

                <div>
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-circlehd-gray mb-1">Message</h3>
                    <p className="text-circlehd-dark bg-white p-3 rounded-lg border border-circlehd-border text-sm leading-relaxed max-h-48 overflow-y-auto w-full break-words">
                        {data.message}
                    </p>
                </div>
            </div>

            <button
                onClick={onReset}
                className="w-full py-3.5 px-4 rounded-lg font-semibold text-circlehd-dark bg-white border-2 border-circlehd-border hover:bg-circlehd-light active:scale-[0.98] transition-all duration-200 focus-visible:ring-4 focus-visible:ring-circlehd-blue/50 focus-visible:outline-none"
            >
                Submit Another Response
            </button>
        </div>
    );
}
