import { Link } from '@inertiajs/react';

const experiences = [
    {
        id: 1,
        title: 'Explore the hiking paths of Kefalonia',
        description:
            'The hiking trails of Kefalonia are an ideal way to discover the natural beauty of...',
        image: '/storage/images/hiking_kefalonia.jpg',
        link: '/experiences/hiking-kefalonia',
    },
    {
        id: 2,
        title: 'A walking tour of Ioannina city',
        description:
            'Discover the multicultural charm of lakeside Ioannina, a student city with a fascinating history in...',
        image: '/storage/images/ioannina.jpg',
        link: '/experiences/ioannina-walking-tour',
    },
    {
        id: 3,
        title: 'The best food & drink experiences in Naxos',
        description:
            'Discover all the best food & drink experiences in Naxos, with cookery classes and food...',
        image: '/storage/images/naxos-food.jpg',
        link: '/experiences/naxos-food',
    },
    {
        id: 4,
        title: 'Explore the timeless villages of Lesvos',
        description:
            'Exploring the villages of Lesvos is the best way to get to know the traditions...',
        image: '/storage/images/lesvos-villages.jpg',
        link: '/experiences/lesvos-villages',
    },
    {
        id: 5,
        title: 'A boat trip around magical Thassos',
        description:
            "A boat trip is the easiest way to sample a selection of Thassos' most famous...",
        image: '/storage/images/thassos-boat.jpg',
        link: '/experiences/thassos-boat-trip',
    },
];

export default function ExperiencesSection() {
    return (
        <div className="experiences mt-6">
            <div className="mx-auto max-w-[660px] text-center">
                <h2 className="mb-4 text-xl font-semibold">Experiences</h2>
                <div className="mb-12 text-gray-600">
                    Choose the memories you'll be taking home
                </div>
            </div>

            <div className="mx-auto mb-28 max-w-[1100px]">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {experiences.map((experience) => (
                        <article
                            key={experience.id}
                            className="card bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
                        >
                            <div className="card__image relative h-64 overflow-hidden">
                                <picture>
                                    <source
                                        media="(min-width: 700px)"
                                        srcSet={`${experience.image}?w=615&h=615`}
                                        type="image/webp"
                                    />
                                    <source
                                        media="(min-width: 700px)"
                                        srcSet={`${experience.image}?w=615&h=615`}
                                        type="image/jpeg,image/png"
                                    />
                                    <source
                                        media="(max-width: 699px)"
                                        srcSet={`${experience.image}?w=340&h=450`}
                                        type="image/webp"
                                    />
                                    <source
                                        media="(max-width: 699px)"
                                        srcSet={`${experience.image}?w=340&h=450`}
                                        type="image/jpeg,image/png"
                                    />
                                    <img
                                        src={experience.image}
                                        alt={experience.title}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </picture>
                            </div>
                            <div className="group relative p-12">
                                <h3 className="mb-4 text-xl font-semibold">
                                    <Link
                                        href={experience.link}
                                        className="transition-colors hover:text-blue-600"
                                    >
                                        {experience.title}
                                    </Link>
                                </h3>
                                <div className="card__hidden-wrap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <p className="mb-4 text-gray-600">
                                        {experience.description}
                                    </p>
                                    <Link
                                        href={experience.link}
                                        className="font-medium text-blue-600 transition-colors hover:text-blue-800"
                                    >
                                        READ MORE
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mb-12 mt-12 text-center">
                    <Link
                        href="/experiences"
                        className="inline-block rounded-md bg-black px-8 py-4 font-medium text-white transition-colors hover:bg-gray-800"
                    >
                        SEE ALL
                    </Link>
                </div>
            </div>
        </div>
    );
}
