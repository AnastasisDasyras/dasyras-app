import HeroCarousel from '@/Components/HeroCarousel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
        // header={
        //     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
        //         Welcome to Our Travel Itinerary Platform
        //     </h2>
        // }
        >
            <Head title="Home" />

            <HeroCarousel />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="mt-6 overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        Discover the best local experiences, tailored by those
                        who know the city best!
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
