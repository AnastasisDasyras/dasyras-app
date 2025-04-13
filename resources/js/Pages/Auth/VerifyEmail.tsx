import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Verify Your Email
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Thanks for signing up! Please verify your email address by
                    clicking the link we sent you. If you didn’t receive the
                    email, we’ll gladly send you another.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-md bg-green-100 px-4 py-3 text-sm text-green-700 dark:bg-green-600 dark:text-white">
                    A new verification link has been sent to the email address
                    you provided.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <PrimaryButton disabled={processing} type="submit">
                        Resend Verification Email
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
