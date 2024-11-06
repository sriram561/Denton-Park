import React from 'react';


function Restaurant({ handleMenuClick }) {
    const restaurantsdata = [
        {
            id: 1,
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlf_ENPzvqsScAlrmcWtFOlOJVhch5OwUvxw&s",
            title: "Olive & Green",
            estimated: "30$ for 2",
            description: "A Mediterranean oasis offering a fresh, organic menu inspired by the Mediterranean coast.",
        },
        {
            id: 2,
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFj8CBH0_oY4sThjN11HaB8NRd0dO-I2RmA&s",
            title: "Taste of India",
            estimated: "40$ for 2",
            description: "Experience authentic Indian flavors with spices that bring traditional dishes to life.",
        },
        {
            id: 3,
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtfOeX3QCnOuNZAY6yTg6NuW1gny5fWqlwQA&s",
            title: "Phothin",
            estimated: "50$ for 2",
            description: "Asian fusion cuisine combining traditional Thai, Vietnamese, and Korean flavors.",
        },
    ];

    return (
        <>
            <div className="flex flex-col items-center">
                <div className='bg-gray-300 h-[20vh] w-full flex items-center justify-center'>
                    <h1 className='text-gray-600 font-bold text-4xl'>Restaurants of HAYYIN</h1>
                </div>

                <div className="flex flex-col gap-8 p-8 w-full max-w-screen-xl mx-auto items-center">
                    {restaurantsdata.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out w-full sm:w-3/4 md:w-3/4 lg:w-4/5 xl:w-4/5 flex flex-col lg:flex-row items-center"
                        >

                            <img className="w-full lg:w-1/3 h-48 object-cover m-3" src={restaurant.src} alt={restaurant.title} />


                            <div className="p-6 flex-1">
                                <h2 className="font-bold text-2xl text-gray-800">{restaurant.title}</h2>
                                <p className="text-gray-600  mt-2">{restaurant.description}</p>
                                <p className="text-gray-600 font-semibold mt-2">Estimated: {restaurant.estimated}</p>

                            </div>


                            <div className='flex justify-center items-center'>
                                <button
                                    className="mt-4 m-2 w-full p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-200 ease-in-out"
                                    onClick={() => handleMenuClick(restaurant.id)} 
                                >
                                    Menu
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Restaurant;
