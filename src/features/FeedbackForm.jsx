import React, { useState } from 'react';
import InputGroup from '../components/InputGroup';
import RatingSelector from '../components/RatingSelector';
import { mockSubmit } from '../utils/api';

export default function FeedbackForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        rating: null,
        experienceType: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';

        if (!formData.email.trim()) {
            newErrors.email = 'Please enter your email address';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email format';
        }

        if (!formData.rating) newErrors.rating = 'Please select a rating from 1 to 5';
        if (!formData.experienceType) newErrors.experienceType = 'Please select a type of experience';
        if (!formData.message.trim()) newErrors.message = 'Please provide your feedback message';

        setErrors(newErrors);

        // Focus first invalid element automatically
        if (Object.keys(newErrors).length > 0) {
            const firstErrorKey = Object.keys(newErrors)[0];
            const element = document.getElementById(firstErrorKey);
            if (element) {
                element.focus();
            }
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleRatingChange = (score) => {
        setFormData(prev => ({ ...prev, rating: score }));
        if (errors.rating) setErrors(prev => ({ ...prev, rating: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await mockSubmit(formData);
            onSuccess(response);
        } catch (err) {
            setErrors({ global: 'Failed to submit. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-circlehd-dark mb-1">We Value Your Feedback</h2>
                <p className="text-circlehd-gray text-sm">Help us improve your AI learning experience.</p>
            </div>

            {errors.global && (
                <div className="mb-4 p-3 bg-red-50 text-circlehd-error text-sm font-medium border border-red-200 rounded-lg">
                    {errors.global}
                </div>
            )}

            <InputGroup
                id="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                required
                placeholder="e.g. Jane Doe"
                autoComplete="name"
            />

            <InputGroup
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                placeholder="e.g. jane@company.com"
                autoComplete="email"
            />

            <InputGroup
                id="experienceType"
                label="Experience Type"
                type="select"
                value={formData.experienceType}
                onChange={handleChange}
                error={errors.experienceType}
                required
            >
                <option value="" disabled>Select the area you are reviewing</option>
                <option value="platform">Platform Navigation</option>
                <option value="content">Course Content</option>
                <option value="ai">AI Features</option>
                <option value="support">Customer Support</option>
            </InputGroup>

            <RatingSelector
                id="rating"
                value={formData.rating}
                onChange={handleRatingChange}
                error={errors.rating}
            />

            <InputGroup
                id="message"
                label="Feedback Message"
                type="textarea"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
                placeholder="Tell us what you loved or what could be better..."
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className={`
          mt-2 w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 
          flex items-center justify-center gap-2 
          focus-visible:ring-4 focus-visible:ring-circlehd-blue/50 focus-visible:outline-none
          ${isSubmitting
                        ? 'bg-circlehd-blue/70 cursor-not-allowed'
                        : 'bg-circlehd-blue hover:bg-blue-600 active:scale-[0.98] shadow-card hover:shadow-hover'
                    }
        `}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                    </>
                ) : (
                    'Submit Feedback'
                )}
            </button>
        </form>
    );
}
