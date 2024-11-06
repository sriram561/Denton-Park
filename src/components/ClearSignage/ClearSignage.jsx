import React, { useState } from "react";

import SignageCard from "../SignageCard";
import { CiSearch } from "react-icons/ci";

const signageData = [
    {
        id: 1,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ocjUXGoCyl9FqwsWBwFdH02y2DPRsJUCGg&s",
        name: "Way Finding Signage",
        description: "Guides visitors to key locations within the park, helping them navigate attractions and amenities."
    },
    {
        id: 2,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvpedLpeiWfMUWS_7PR8jeqlDpC55cwlMW-w&s",
        name: "Fire Extinguisher Signage",
        description: "Indicates the location of fire extinguishers for emergency situations, ensuring safety."
    },
    {
        id: 3,
        src: "https://cdn.pixabay.com/photo/2021/11/06/16/57/signage-6773809_1280.png",
        name: "Safe Zone Signage",
        description: "Designates areas where guests can seek assistance or refuge in case of emergencies."
    },
    {
        id: 4,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgMRwNfuxKWc4mi9WwIHEhEfLfPpO9sr_X-w&s",
        name: "Restroom Signage",
        description: "Directs guests to restroom facilities, clearly marked for convenience."
    },
    {
        id: 5,
        src: "https://img.freepik.com/free-vector/visitor-parking-sign_78370-4318.jpg?semt=ais_hybrid",
        name: "Parking Signage",
        description: "Guides visitors to parking areas and indicates the location of designated parking spots."
    },
    {
        id: 6,
        src: "https://as1.ftcdn.net/v2/jpg/02/99/97/20/1000_F_299972070_fKEPTll4V0IbqPxLhzf7KhC66fpzWoV1.jpg",
        name: "Food Signage",
        description: "Displays information about food options available in the park, including menus and specials."
    },
    {
        id: 7,
        src: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/emergency-exit-signage-design-template-98a908ff58e8cbc3a9117f177dd8a4ea_screen.jpg?ts=1670196646",
        name: "Emergency Exit Signage",
        description: "Indicates the location of emergency exits for safe evacuation in case of an emergency."
    },
    {
        id: 8,
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSFlupRng7AYI_61B2kgZaTeOhgyHg6FSU6g&s",
        name: "Baby Feeding Signage",
        description: "The baby feeding signage provides clear directions to designated feeding areas, promoting a welcoming environment for nursing and bottle-feeding."
    },
];

const Signage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    
    const filteredSignages = signageData.filter(signage =>
        signage.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="signage-container p-4">
            {/* <Users collectionName="signage" heading={"Clear Signage"} /> */}

            
            <div className="searchbar w-full h-[10vh] bg-gray-200 flex items-center justify-center mb-4"
                        style={{
                         backgroundImage: "url('https://img.freepik.com/premium-photo/illustrated-map-amusement-park-with-rollercoasters-water-rides-other-attractions_14117-1055205.jpg')"
                        }}>
                <div className="bar h-[50%] bg-gray-100 flex items-center px-3 rounded-lg shadow-md">
                    <input
                        type="text"
                        placeholder="Search for signage..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 rounded w-full  outline-none"
                    />
                    <CiSearch className="text-2xl text-gray-600 mx-2" />
                </div>
            </div>

            
            <div className="flex flex-col lg:flex-row">
                
                <div className="left w-full lg:w-1/2 p-4 overflow-y-auto h-[60vh] lg:h-[90vh] bg-white rounded-lg shadow-md scrollbar-thin scrollbar-thumb-gray-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredSignages.map(signage => (
                            <SignageCard key={signage.id} signage={signage} />
                        ))}
                    </div>
                </div>

                
                <div className="right w-full lg:w-1/2 h-auto lg:h-[90vh] flex items-center justify-center mt-4 lg:mt-0 lg:ml-4 bg-white rounded-lg shadow-md p-4">
                    <img
                        className="w-full max-h-full object-cover rounded-md"
                        src="https://www.askmeholidays.com/wp-content/uploads/2017/03/wonderla-map.jpg"
                        alt="Theme Park Map"
                    />
                </div>
            </div>
        </div>
    );
};

export default Signage;