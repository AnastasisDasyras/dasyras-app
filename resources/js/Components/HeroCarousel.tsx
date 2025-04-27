import { Carousel } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect } from 'react';

const images = [
    {
        label: 'Explore Greece',
        description: 'Discover the beauty of ancient Greece',
        imgPath: '/storage/images/login_image.jpeg',
    },
    {
        label: 'Discover Islands',
        description: 'Experience the magic of Greek islands',
        imgPath: '/storage/images/login_image.jpeg',
    },
    {
        label: 'Historic Athens',
        description: 'Walk through the history of Athens',
        imgPath: '/storage/images/login_image.jpeg',
    },
];

export default function HeroCarousel() {
    useEffect(() => {
        // Initialize Bootstrap carousel
        const carousel = new Carousel('#heroCarousel', {
            interval: 5000,
            ride: 'carousel',
        });

        return () => {
            carousel.dispose();
        };
    }, []);

    return (
        <div
            id="heroCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
        >
            {/* Indicators */}
            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#heroCarousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : 'false'}
                    />
                ))}
            </div>

            {/* Carousel items */}
            <div className="carousel-inner">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        style={{ height: '500px' }}
                    >
                        <img
                            src={image.imgPath}
                            className="d-block w-100 h-100 object-cover"
                            alt={image.label}
                        />
                        <div className="carousel-caption d-none d-md-block">
                            <h5 className="mb-2 text-3xl font-bold">
                                {image.label}
                            </h5>
                            <p className="text-lg">{image.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
