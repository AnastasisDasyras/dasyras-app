import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

interface Plan {
    id: number;
    title: string;
    description: string;
    author: string;
    city: string | undefined;
    duration: string | undefined;
    price: number | undefined;
    reviews_sum: number | undefined;
    total_reviews: number | undefined;
}

export default function PlanList({ plans }: PageProps<{ plans: Plan[] }>) {
    return (
        <>
            <Head title="Plans" />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Available Plans</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="rounded-lg border p-4 shadow-md"
                        >
                            <h2 className="text-xl font-semibold">
                                {plan.title}
                            </h2>
                            <p className="text-gray-600">{plan.description}</p>
                            <p className="text-sm text-gray-500">
                                By: {plan.author}
                            </p>
                            <p className="text-sm text-gray-500">
                                City: {plan.city}
                            </p>
                            <p className="text-sm text-gray-500">
                                Duration: {plan.duration}
                            </p>
                            <p className="text-lg font-semibold">
                                £{plan.price?.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                                {!!plan.total_reviews && plan.total_reviews > 0
                                    ? `Rating: ${(plan.reviews_sum! / plan.total_reviews).toFixed(1)} ⭐ (${plan.total_reviews} reviews)`
                                    : 'No reviews yet'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
