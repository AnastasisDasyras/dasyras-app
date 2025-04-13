import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function LoginPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const background = '/storage/images/login_image.jpeg';

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
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

            {/* Centered Login Box */}
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
                            <h1 className="text-3xl font-bold">
                                Let's Explore
                            </h1>
                            <p className="mt-2 text-sm">
                                Explore hundreds of places to visit
                            </p>
                        </div>
                    </div>

                    {/* Right Half - Login Form */}
                    <div className="w-full p-8 lg:w-5/12">
                        {/* Form */}
                        <h2 className="mb-4 text-2xl font-bold">
                            Welcome Back!
                        </h2>
                        <p className="mb-6 text-gray-500">
                            Here you can explore every place
                        </p>
                        <form onSubmit={submit}>
                            {/* Email Input */}
                            <div className="mb-4">
                                <label
                                    className="mb-1 block text-sm font-medium"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        autoFocus={true}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="yourname@example.com"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                    {/* Email InputError Below */}
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="mb-4">
                                <label
                                    className="mb-1 block text-sm font-medium"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="********"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                                {/* Paaword InputError Below */}
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="mb-6 flex items-center justify-between">
                                <label className="flex items-center text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        onChange={(e) => {
                                            console.log('ee', e.target.checked);
                                            setData(
                                                'remember',
                                                e.target.checked,
                                            );
                                        }}
                                    />
                                    Remember me
                                </label>
                                <a
                                    href="/forgot-password"
                                    className="text-sm text-blue-500"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600"
                            >
                                Login
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <p className="mt-4 text-center text-gray-500">
                            Don't have an account?{' '}
                            <a href="/register" className="text-blue-500">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
