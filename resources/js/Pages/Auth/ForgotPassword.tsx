import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const background = '/storage/images/login_image.jpeg';

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div
            className="relative h-screen w-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            {/* White Overlay */}
            <div className="absolute inset-0 bg-white bg-opacity-70"></div>

            {/* Centered Forgot Password Box */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="flex h-[70vh] w-[80vw] overflow-hidden rounded-lg bg-white shadow-lg">
                    {/* Left Half - Background Image */}
                    <div
                        className="hidden w-7/12 bg-cover bg-center lg:block"
                        style={{
                            backgroundImage: `url(${background})`,
                        }}
                    >
                        <div className="flex h-full flex-col items-center justify-center bg-black bg-opacity-40 p-8 text-white">
                            <h1 className="text-3xl font-bold">Reset Access</h1>
                            <p className="mt-2 text-sm">
                                Enter your email to reset your password
                            </p>
                        </div>
                    </div>

                    {/* Right Half - Form */}
                    <div className="w-full p-8 lg:w-5/12">
                        <h2 className="mb-4 text-2xl font-bold">
                            Forgot Password
                        </h2>
                        <p className="mb-6 text-gray-500">
                            No worries. We'll email you a reset link.
                        </p>
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    autoFocus
                                    placeholder="yourname@example.com"
                                />
                                {/* we dont want to display the errors */}
                                {/* <InputError
                                    message={errors.email}
                                    className="mt-2"
                                /> */}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600"
                            >
                                Send Password Reset Link
                            </button>
                        </form>
                        <p className="mt-4 text-center text-gray-500">
                            Remembered it?{' '}
                            <a href="/" className="text-blue-500">
                                Go back to login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
