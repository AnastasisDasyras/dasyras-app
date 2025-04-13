import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function RegisterPage() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const background = '/storage/images/login_image.jpeg';

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div
            className="relative h-screen w-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute inset-0 bg-white bg-opacity-70"></div>

            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="flex h-[70vh] w-[80vw] overflow-hidden rounded-lg bg-white shadow-lg">
                    {/* Left Panel */}
                    <div
                        className="hidden w-7/12 bg-cover bg-center lg:block"
                        style={{ backgroundImage: `url(${background})` }}
                    >
                        <div className="flex h-full flex-col items-center justify-center bg-black bg-opacity-40 p-8 text-white">
                            <h1 className="text-3xl font-bold">Join Us</h1>
                            <p className="mt-2 text-sm">
                                Start your adventure now
                            </p>
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className="w-full p-8 lg:w-5/12">
                        <h2 className="mb-4 text-2xl font-bold">
                            Create Account
                        </h2>
                        <p className="mb-6 text-gray-500">
                            Sign up to explore amazing places
                        </p>

                        <form onSubmit={submit}>
                            {/* Name */}
                            <div className="mb-4">
                                <label
                                    className="mb-1 block text-sm font-medium"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label
                                    className="mb-1 block text-sm font-medium"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label
                                    className="mb-1 block text-sm font-medium"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-6">
                                <label
                                    className="mb-1 block text-sm font-medium"
                                    htmlFor="password_confirmation"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600"
                            >
                                Sign Up
                            </button>
                        </form>

                        <p className="mt-4 text-center text-gray-500">
                            Already have an account?{' '}
                            <a href={route('login')} className="text-blue-500">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
