import Notification from '@/Components/Notification';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

interface Plan {
    id: number;
    title: string;
    description: string;
    price: string;
    duration: string;
    city_id: string;
    author_id: number;
    author: {
        id: number;
        name: string;
    };
    reviews_sum?: number;
    total_reviews?: number;
}

interface Props extends PageProps {
    plans: Plan[];
}

interface NewPlanForm {
    title: string;
    description: string;
    price: string;
    duration: string;
    city_id: string;
}

interface NotificationState {
    show: boolean;
    message: string;
    type: 'success' | 'error';
}

export default function PlanList({ plans }: Props) {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(false);
    const [showNewPlanModal, setShowNewPlanModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newPlan, setNewPlan] = useState<NewPlanForm>({
        title: '',
        description: '',
        price: '',
        duration: '',
        city_id: '',
    });
    const [errors, setErrors] = useState<Partial<NewPlanForm>>({});
    const [notification, setNotification] = useState<NotificationState>({
        show: false,
        message: '',
        type: 'success',
    });

    const validateForm = (): boolean => {
        const newErrors: Partial<NewPlanForm> = {};
        let isValid = true;

        // Title validation
        if (!newPlan.title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        } else if (newPlan.title.length > 255) {
            newErrors.title = 'Title must not exceed 255 characters';
            isValid = false;
        }

        // Description validation
        if (!newPlan.description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        } else if (newPlan.description.length > 500) {
            newErrors.description =
                'Description must not exceed 500 characters';
            isValid = false;
        }

        // Price validation
        if (newPlan.price.trim()) {
            const price = parseFloat(newPlan.price);
            if (isNaN(price) || price < 0) {
                newErrors.price = 'Price must be a positive number';
                isValid = false;
            }
        }

        // Duration validation
        if (newPlan.duration.trim()) {
            const duration = parseInt(newPlan.duration);
            if (isNaN(duration) || duration < 1) {
                newErrors.duration =
                    'Duration must be a positive number of days';
                isValid = false;
            }
        }

        // City ID validation
        if (newPlan.city_id.trim()) {
            if (newPlan.city_id.length > 100) {
                newErrors.city_id = 'City ID must not exceed 100 characters';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({
            show: true,
            message,
            type,
        });
    };

    const hideNotification = () => {
        setNotification((prev) => ({ ...prev, show: false }));
    };

    const confirmDelete = (plan: Plan) => {
        setPlanToDelete(plan);
    };

    const cancelDelete = () => {
        setPlanToDelete(null);
    };

    const handleDelete = async () => {
        if (!planToDelete) return;

        setLoading(true);

        try {
            await axios.delete(`/plans/${planToDelete.id}`, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            });
            showNotification('Plan deleted successfully', 'success');
            window.location.reload();
        } catch (error) {
            if (error instanceof AxiosError) {
                showNotification(
                    error.response?.data?.error || 'Something went wrong!',
                    'error',
                );
            } else {
                showNotification('Something went wrong!', 'error');
            }
        } finally {
            setLoading(false);
            setPlanToDelete(null);
        }
    };

    const handleEditClick = (plan: Plan) => {
        setIsEditing(true);
        setSelectedPlan(plan);
        setNewPlan({
            title: plan.title,
            description: plan.description,
            price: plan.price,
            duration: plan.duration,
            city_id: plan.city_id,
        });
        setShowNewPlanModal(true);
    };

    const handleNewPlanSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        if (!validateForm()) {
            setLoading(false);
            showNotification('Please check the form for errors', 'error');
            return;
        }

        try {
            if (isEditing && selectedPlan) {
                await axios.put(`/plans/${selectedPlan.id}`, newPlan, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                });
                showNotification('Plan updated successfully', 'success');
            } else {
                await axios.post('/plans', newPlan, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                });
                showNotification('Plan created successfully', 'success');
            }

            setShowNewPlanModal(false);
            setNewPlan({
                title: '',
                description: '',
                price: '',
                duration: '',
                city_id: '',
            });
            setIsEditing(false);
            setSelectedPlan(null);
            window.location.reload();
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.errors) {
                setErrors(error.response.data.errors);
                showNotification('Please check the form for errors', 'error');
            } else {
                showNotification('Something went wrong!', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setShowNewPlanModal(false);
        setIsEditing(false);
        setSelectedPlan(null);
        setNewPlan({
            title: '',
            description: '',
            price: '',
            duration: '',
            city_id: '',
        });
        setErrors({});
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setNewPlan((prev) => ({ ...prev, [name]: value }));
        // Clear error for the field being edited
        if (errors[name as keyof NewPlanForm]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Available Plans
                    </h2>
                    <button
                        onClick={() => setShowNewPlanModal(true)}
                        className="inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        New Plan
                    </button>
                </div>
            }
        >
            <Head title="Plans" />

            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={hideNotification}
                />
            )}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {plans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700"
                                    >
                                        <div className="p-6">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                {plan.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                {plan.description}
                                            </p>
                                            <div className="mt-4">
                                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    Price: ${plan.price}
                                                </span>
                                                <span className="mx-2 text-gray-500">
                                                    •
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    Duration: {plan.duration}
                                                </span>
                                            </div>
                                            <div className="mt-4">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    Author: {plan.author.name}
                                                </span>
                                            </div>
                                            <div className="mt-4 flex justify-end space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleEditClick(plan)
                                                    }
                                                    className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        confirmDelete(plan)
                                                    }
                                                    className="inline-flex items-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* New/Edit Plan Modal */}
            {showNewPlanModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            {isEditing ? 'Edit Plan' : 'Create New Plan'}
                        </h2>
                        <form
                            onSubmit={handleNewPlanSubmit}
                            className="mt-4 space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={newPlan.title}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 ${
                                        errors.title
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    }`}
                                    placeholder="Enter plan title"
                                    maxLength={255}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newPlan.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 ${
                                        errors.description
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    }`}
                                    placeholder="Enter plan description"
                                    maxLength={500}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={newPlan.price}
                                        onChange={handleInputChange}
                                        className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 ${
                                            errors.price
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder="Enter price"
                                        min="0"
                                        step="0.01"
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="duration"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Duration (days)
                                    </label>
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        value={newPlan.duration}
                                        onChange={handleInputChange}
                                        className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 ${
                                            errors.duration
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                        placeholder="Enter duration in days"
                                        min="1"
                                    />
                                    {errors.duration && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.duration}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="city_id"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    City ID (Google Place ID)
                                </label>
                                <input
                                    type="text"
                                    id="city_id"
                                    name="city_id"
                                    value={newPlan.city_id}
                                    onChange={handleInputChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 ${
                                        errors.city_id
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    }`}
                                    placeholder="Enter Google Place ID"
                                    maxLength={100}
                                />
                                {errors.city_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.city_id}
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="rounded-md bg-gray-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    {loading
                                        ? isEditing
                                            ? 'Updating...'
                                            : 'Creating...'
                                        : isEditing
                                          ? 'Update Plan'
                                          : 'Create Plan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {planToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            Confirm Delete
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Are you sure you want to delete{' '}
                            <strong>{planToDelete.title}</strong>? This action
                            cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={cancelDelete}
                                className="rounded-md bg-gray-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                {loading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
