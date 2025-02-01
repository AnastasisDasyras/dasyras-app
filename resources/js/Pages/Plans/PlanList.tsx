import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

interface Plan {
    id: number;
    title: string;
    description: string;
    author: string; // To check if the user can delete
    city_id: string;
    duration: string;
    price: number;
    reviews_sum: number;
    total_reviews: number;
}

export default function PlanList({
    plans,
}: {
    plans: Plan[];
    currentUserId: number;
}) {
    // State for delete confirmation modal
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(false);

    // Function to open the delete confirmation modal
    const confirmDelete = (plan: Plan) => {
        setSelectedPlan(plan);
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setSelectedPlan(null);
    };

    // Function to delete a plan
    const handleDelete = async () => {
        if (!selectedPlan) return;

        setLoading(true);

        try {
            await axios.delete(`/plans/${selectedPlan.id}`, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            });

            window.location.reload(); // Refresh page to update the list
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            alert(error.response?.data?.error || 'Something went wrong!');
        } finally {
            setLoading(false);
            setSelectedPlan(null);
        }
    };

    return (
        <>
            <Head title="Plans List" />
            <div className="mx-auto max-w-5xl p-6">
                <h1 className="mb-4 text-2xl font-bold">Available Plans</h1>
                <ul className="space-y-4">
                    {plans.map((plan) => (
                        <li
                            key={plan.id}
                            className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-md"
                        >
                            {/* Plan Details (Aligned Horizontally) */}
                            <div className="flex flex-wrap items-center space-x-4">
                                <h2 className="text-lg font-semibold">
                                    {plan.title}
                                </h2>
                                <p className="text-gray-600">
                                    {plan.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                    By: {plan.author}
                                </p>
                                <p className="text-sm text-gray-500">
                                    City: {plan.city_id}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Duration: {plan.duration}
                                </p>
                                <p className="text-lg font-semibold text-green-600">
                                    £{plan.price}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {!!plan.total_reviews &&
                                    plan.total_reviews > 0
                                        ? `Rating: ${(plan.reviews_sum! / plan.total_reviews).toFixed(1)} ⭐ (${plan.total_reviews} reviews)`
                                        : 'No reviews yet'}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                                <a
                                    href={`/plans/${plan.id}/edit`}
                                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                >
                                    Edit
                                </a>

                                {/* Delete Button (Only if user owns the plan) */}
                                {
                                    <button
                                        onClick={() => confirmDelete(plan)}
                                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Delete Confirmation Modal */}
            {selectedPlan && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="text-xl font-bold">Confirm Delete</h2>
                        <p className="mt-2">
                            Are you sure you want to delete{' '}
                            <strong>{selectedPlan.title}</strong>? This action
                            cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={cancelDelete}
                                className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                            >
                                {loading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
