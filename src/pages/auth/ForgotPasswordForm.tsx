import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordFormProps {
    onSubmit: (email: string) => void;
    switchTo: (page: 'login' | 'register' | 'reset') => void;
}

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // onSubmit(email);
    };

    return (
        <div
            className=" flex items-center justify-center bg-color"
            style={{ height: 'calc(100vh - 168px)' }}
        >
            <div className="primary-color p-8 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-active-color">
                    Forgot password
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-active-color mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full tertiary-color text-white py-2 rounded-md hover:bg-white/5"
                    >
                        Submit
                    </button>
                    <div className="text-center mt-4 text-active-color">
                        Back to
                        <button
                            onClick={() => navigate('/login')}
                            className="text-active-color underline ml-2"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
