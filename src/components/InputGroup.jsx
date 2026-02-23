import React from 'react';

/**
 * Reusable field component that handles accessibility elements like labels, 
 * accessible descriptions, and inline error rendering.
 */
export default function InputGroup({
    id, label, type = 'text', error, ...props
}) {
    const hasError = !!error;

    return (
        <div className="flex flex-col mb-5">
            <label htmlFor={id} className="mb-1.5 text-sm font-semibold text-circlehd-dark">
                {label}
                {props.required && <span className="text-circlehd-error ml-1" aria-hidden="true">*</span>}
            </label>

            {type === 'textarea' ? (
                <textarea
                    id={id}
                    name={id}
                    className={`input-field min-h-[120px] resize-y ${hasError ? 'input-error' : ''}`}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                    {...props}
                />
            ) : type === 'select' ? (
                <div className="relative">
                    <select
                        id={id}
                        name={id}
                        className={`input-field appearance-none pr-10 ${hasError ? 'input-error' : ''} ${!props.value ? 'text-circlehd-gray' : 'text-circlehd-dark'}`}
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${id}-error` : undefined}
                        {...props}
                    >
                        {props.children}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-circlehd-gray">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            ) : (
                <input
                    id={id}
                    name={id}
                    type={type}
                    className={`input-field ${hasError ? 'input-error' : ''}`}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                    spellCheck={type === 'email' ? false : undefined}
                    {...props}
                />
            )}

            {hasError && (
                <p id={`${id}-error`} className="mt-1.5 text-sm text-circlehd-error font-medium" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
