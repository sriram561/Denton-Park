import React from "react";

const AboutUs = () => {
  return (
    <>
      <div className="flex flex-col items-center p-5  ">

        {/* Title Section */}
        <div className="title flex flex-col justify-center items-center h-[20vh]  bg-black w-full">
          <h1 className="text-4xl font-bold text-white transition-transform transform hover:scale-105">Welcome to DENTON Park!</h1>
          <p className="text-3xl text-yellow-600 italic">Where Adventure Awaits!</p>
        </div>

        {/* Landing Section */}
        <div className="landing flex flex-wrap justify-center my-10 bg-slate-300">
          <div className="gallery-item w-full md:w-1/2 p-4 transition-transform transform hover:scale-105">
            <img
              src="https://cdn.pixabay.com/photo/2019/10/09/15/43/star-flyer-4537668_1280.jpg"
              alt="Thrilling Rides"
              className="rounded-lg shadow-lg"
            />
            <h3 className="text-xl font-semibold mt-2">Thrilling Rides</h3>

          </div>

          <div className="description w-full md:w-1/2 p-4 flex flex-col justify-center items-center">
            <div className="flex flex-col">
              <p className="text-gray-800 mb-2">
                Dive into adventure at HAYYIN, where excitement meets fun for all ages! Experience thrilling rides like the Sky Whirlwind and family-friendly attractions that create lasting memories.
              </p>
              <p className="text-gray-800">
                Join us for special events, parades, and live entertainment that bring the magic of HAYYIN to life. Explore our ticket options and plan your visit today—unforgettable adventures await!
              </p>
            </div>
          </div>
        </div>

        {/* Family Section */}
        <div className="family flex flex-wrap justify-center mb-10 bg-slate-400">
          <div className="description w-full md:w-1/2 p-4 flex items-center justify-center">
            <p className="text-gray-800">
              Family-Friendly Facilities: We prioritize comfort and convenience, offering a variety of family-friendly facilities. Our spacious picnic areas, clean restrooms, and nursing rooms ensure that every family has everything they need to enjoy a fun-filled day.
            </p>
          </div>

          <div className="gallery-item w-full md:w-1/2 p-4 transition-transform transform hover:scale-105">
            <img
              src="https://media.istockphoto.com/id/1051006012/photo/happy-family-having-fun-in-an-amusement-park.jpg?s=612x612&w=0&k=20&c=pa2CKxzp6OUeCPX9wD38el2E5THEJ6F5edYKGl6twvM="
              alt="Family Fun"
              className="rounded-lg shadow-lg"
            />
            <h3 className="text-xl font-semibold mt-2">Family Fun</h3>

          </div>
        </div>

        {/* Children Section */}
        <div className="children flex flex-wrap justify-center mb-10 bg-slate-300">
          <div className="gallery-item w-full md:w-1/2 p-4 transition-transform transform hover:scale-105">
            <img
              src="https://media.istockphoto.com/id/1294060074/photo/portrait-of-little-girl-eating-cotton-candy.jpg?s=612x612&w=0&k=20&c=4jcPua9aY3JDA5TS-GiAOiQSu_S8jlUyI53DEO9fSUs="
              alt="Delicious Treats"
              className="rounded-full shadow-lg"
            />
            <h3 className="text-xl font-semibold mt-2">Delicious Treats</h3>

          </div>

          <div className="description w-full md:w-1/2 p-4 flex items-center justify-center">
            <p className="text-gray-800">
              Dining and Shopping: Satisfy your cravings with a wide array of dining options, from quick bites to full-service restaurants. Enjoy classic theme park favorites like cotton candy and funnel cakes, or indulge in gourmet meals prepared by our top chefs.
            </p>
          </div>
        </div>

             {/* Motto Section */}
             <div className="motto flex flex-wrap justify-center mb-10 p-5 bg-gradient-to-r from-yellow-300 to-yellow-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <section className="mission-section w-full md:w-1/2 p-4 flex flex-col justify-center items-start">
            <h2 className="text-3xl font-bold text-black mb-2">Our Mission</h2>
            <p className="text-gray-800">
              To provide a safe and joyful environment for families to create unforgettable memories together.
            </p>
          </section>

          <section className="values-section w-full md:w-1/2 p-4 flex flex-col justify-center items-start">
            <h2 className="text-3xl font-bold text-black mb-2">Our Values</h2>
            <ul className="list-disc list-inside text-gray-800">
              {["Adventure", "Family", "Safety", "Fun", "Community"].map((value) => (
                <li key={value} className="hover:text-yellow-500 transition-colors duration-300">{value}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Team Section */}
        <div className="team mb-10">
          <h2 className="text-3xl font-bold text-black text-center mb-5">Meet Our Amazing Team</h2>
          <div className="team-members flex flex-wrap justify-center">
            {[
              {
                name: "Alex Russo",
                role: "Hayyin Park  Manager",
                img: "https://images.pexels.com/photos/19270854/pexels-photo-19270854/free-photo-of-redhead-model-in-coat-on-city-street.jpeg?auto=compress&cs=tinysrgb&w=600",
              },
              {
                name: "Julia Stone",
                role: "Operations Manager",
                img: "https://images.pexels.com/photos/27914297/pexels-photo-27914297/free-photo-of-fuerza-en-la-mirada.jpeg?auto=compress&cs=tinysrgb&w=600",
              },
              {
                name: "Emily Addams",
                role: "Guest Experience Director",
                img: "https://images.pexels.com/photos/29179695/pexels-photo-29179695/free-photo-of-young-woman-with-headphones-sitting-indoors.jpeg?auto=compress&cs=tinysrgb&w=600",
              },
            ].map((member) => (
              <div className="team-member w-full md:w-1/3 p-4 text-center transition-transform transform hover:scale-105" key={member.name}>
                <div className="bg-white rounded-lg shadow-lg p-5 transition-shadow hover:shadow-2xl">
                  <img src={member.img} alt={member.name} className="rounded-full mb-2 w-32 h-32 mx-auto" />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-700">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer Section */}
        <div className="footer">
          <footer className="about-us-footer text-center mt-10">
            <p className="text-gray-600">Join us for a day full of adventure, laughter, and happiness!</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AboutUs;