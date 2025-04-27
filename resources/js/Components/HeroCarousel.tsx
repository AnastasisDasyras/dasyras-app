import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

const background = '/storage/images/login_image.jpeg';

const images = [
    {
        label: 'Explore Greece',
        imgPath: background,
    },
    {
        label: 'Discover Islands',
        imgPath: background,
    },
    {
        label: 'Historic Athens',
        imgPath: background,
    },
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handleBack = () => {
        setIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length,
        );
    };

    // Autoplay every 5 seconds
    useEffect(() => {
        const timer = setInterval(handleNext, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Box className="relative h-[500px] w-full overflow-hidden">
            {images.map((step, i) => (
                <Box
                    key={i}
                    className={`absolute left-0 top-0 h-full w-full transition-opacity duration-1000 ${
                        i === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
                    }`}
                >
                    <img
                        src={step.imgPath}
                        alt={step.label}
                        className="h-full w-full object-cover"
                    />
                </Box>
            ))}

            {/* Previous Button */}
            <IconButton
                onClick={handleBack}
                className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-white bg-opacity-50 hover:bg-opacity-75"
            >
                <ArrowBackIos />
            </IconButton>

            {/* Next Button */}
            <IconButton
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-white bg-opacity-50 hover:bg-opacity-75"
            >
                <ArrowForwardIos />
            </IconButton>

            {/* Dots */}
            <Box className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`h-3 w-3 rounded-full ${
                            i === index ? 'bg-white' : 'bg-gray-400'
                        }`}
                    />
                ))}
            </Box>
        </Box>
    );
}
