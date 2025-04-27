import { Link } from '@inertiajs/react';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const destinations = [
    {
        id: 1,
        title: '9 best islands to visit near Mykonos',
        category: 'BEST OF',
        image: '/storage/images/mykonos-islands.jpg',
        link: '/destinations/mykonos-islands',
    },
    {
        id: 2,
        title: '12 best things to do in Chios',
        category: 'BEST OF',
        image: '/storage/images/chios.jpg',
        link: '/destinations/chios',
    },
    {
        id: 3,
        title: '10 best things to do in Amorgos',
        category: 'BEST OF',
        image: '/storage/images/amorgos.jpg',
        link: '/destinations/amorgos',
    },
    {
        id: 4,
        title: '8 top things to do with kids in Chania',
        category: 'BEST OF',
        image: '/storage/images/chania.jpg',
        link: '/destinations/chania',
    },
    {
        id: 5,
        title: '8 best things to do in Tilos',
        category: 'BEST OF',
        image: '/storage/images/tilos.jpg',
        link: '/destinations/tilos',
    },
    {
        id: 6,
        title: '10 Best things to do in Agios Nikolaos',
        category: 'BEST OF',
        image: '/storage/images/agios-nikolaos.jpg',
        link: '/destinations/agios-nikolaos',
    },
];

export default function HighlightsSection() {
    const [isHovered, setIsHovered] = useState(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: !isHovered,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="highlights mt-28">
            <div className="mx-auto max-w-[660px] text-center">
                <h2 className="mb-4 text-xl font-semibold">Highlights</h2>
                <div className="mb-16 text-gray-600">
                    Welcome to the very best of Greece
                </div>
            </div>

            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Slider {...settings} className="px-4">
                    {destinations.map((destination) => (
                        <div key={destination.id} className="px-4">
                            <article className="card mb-9 shadow-md transition-shadow duration-300 hover:shadow-lg">
                                <Link href={destination.link} className="block">
                                    <div className="card__image relative h-64 overflow-hidden">
                                        <img
                                            src={destination.image}
                                            alt={destination.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-2 text-sm font-medium text-blue-600">
                                            {destination.category}
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold">
                                            {destination.title}
                                        </h3>
                                    </div>
                                </Link>
                            </article>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
