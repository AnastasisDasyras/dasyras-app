import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

interface Plan {
    id: number;
    title: string;
    description: string;
    author: string;
    city_id: string;
    duration: string;
    price: number;
}

export default function PlanEdit({ plan }: { plan: Plan }) {
    // State to store form data
    const [formData, setFormData] = useState<Plan>(plan);

    // State to manage errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // State to manage loading state (for preloader)
    const [loading, setLoading] = useState(false);

    // Handle form input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to validate the form before sending the request
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim())
            newErrors.description = 'Description is required';
        if (!formData.author.trim())
            newErrors.author = 'Author name is required';
        if (!formData.city_id.trim()) newErrors.city_id = 'City ID is required';
        if (!formData.duration.trim())
            newErrors.duration = 'Duration is required';
        if (formData.price <= 0)
            newErrors.price = 'Price must be greater than 0';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate before sending the request
        if (!validateForm()) return;

        setLoading(true); // Show preloader

        try {
            const response = await axios.put(`/plans/${plan.id}`, formData, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            alert('Plan updated successfully! ' + JSON.stringify(response)); // Success feedback
            setErrors({}); // Clear errors after successful update
            window.location.href = '/plans';
            /* eslint-disable  @typescript-eslint/no-explicit-any */
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors); // Display validation errors from Laravel
            } else {
                alert('Something went wrong, please try again.'); // General error message
            }
        } finally {
            setLoading(false); // Hide preloader
        }
    };

    return (
        <>
            <Head title="Edit Plan" />
            <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-lg">
                <h1 className="mb-4 text-2xl font-bold">Edit Plan</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block font-semibold">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                        />
                        {errors.title && (
                            <p className="text-red-500">{errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-semibold">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                        />
                        {errors.description && (
                            <p className="text-red-500">{errors.description}</p>
                        )}
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block font-semibold">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                        />
                        {errors.author && (
                            <p className="text-red-500">{errors.author}</p>
                        )}
                    </div>

                    {/* City ID */}
                    <div>
                        <label className="block font-semibold">City ID</label>
                        <input
                            type="text"
                            name="city_id"
                            value={formData.city_id}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                        />
                        {errors.city_id && (
                            <p className="text-red-500">{errors.city_id}</p>
                        )}
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block font-semibold">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                        />
                        {errors.duration && (
                            <p className="text-red-500">{errors.duration}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block font-semibold">Price (£)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full rounded border p-2"
                        />
                        {errors.price && (
                            <p className="text-red-500">{errors.price}</p>
                        )}
                    </div>

                    {/* Submit Button with Preloader */}
                    <button
                        type="submit"
                        className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loader mr-2"></span>{' '}
                                Updating...
                            </>
                        ) : (
                            'Update Plan'
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
