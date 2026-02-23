import React from 'react';
import { Rating, RoundedStar } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

/**
 * Custom accessible 1-5 star rating selector component using @smastrom/react-rating.
 * This library is fully accessible out of the box (keyboard, screen reader, touch).
 */
export default function RatingSelector({ value, onChange, error, id = 'rating' }) {
    const customStyles = {
        itemShapes: RoundedStar,
        activeFillColor: '#f59e0b',
        inactiveFillColor: '#e2e8f0',
    };

    return (
        <div className="flex flex-col mb-5">
            <fieldset>
                <legend className="mb-2 text-sm font-semibold text-circlehd-dark">
                    Overall Rating <span className="text-circlehd-error ml-1" aria-hidden="true">*</span>
                </legend>

                <div className="p-1 -ml-1 rounded-lg focus-within:ring-4 focus-within:ring-circlehd-blue/40 transition-shadow inline-block">
                    <Rating
                        id={id}
                        style={{ maxWidth: 250 }}
                        value={value || 0}
                        onChange={onChange}
                        itemStyles={customStyles}
                        isRequired
                        aria-describedby={error ? `${id}-error` : undefined}
                    />
                </div>

                {error && (
                    <p id={`${id}-error`} className="mt-2 text-sm text-circlehd-error font-medium" role="alert">
                        {error}
                    </p>
                )}
            </fieldset>
        </div>
    );
}
