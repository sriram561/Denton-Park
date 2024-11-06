import React, { useContext } from "react";
import { CartContext } from "../CartContext"; 

const cameras = [
  { id: 1, name: "Canon EOS 90D", price: 100, image: "https://i1.adis.ws/i/canon/15_eos_90d_bk_thefront_ef-s18-135mm_3.5-5.6isusm_square_6bd191e26825499fb5fe88e57a763f7a" },
  { id: 2, name: "Nikon D780", price: 120, image: "https://images.contentstack.io/v3/assets/blt0e5ec1de4817c440/bltf97ff8e351c974b8/65b83768cfb1d69491bb14b5/mktg-hero-2-d780.jpg" },
  { id: 3, name: "Pentax K 3 Mark III", price: 110, image: "https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2023/06/img-_x700126_jpg.webp" },
];

const RentCamera = () => {
  const { addToCart } = useContext(CartContext); 

  const handleAddToCart = (camera) => {
    addToCart(camera); 
    alert(`${camera.name} added to cart for $${camera.price}`); 
  };

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold">Available Cameras for Rent</h2>
      <div className="camera-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
        {cameras.map((camera) => (
          <div key={camera.id} className="camera-card bg-[#f4f4f4] p-4 rounded-lg flex flex-col items-center">
            <img src={camera.image} alt={camera.name} className="w-32 h-32 object-cover mb-4 rounded-md" />
            <h3 className="text-lg font-semibold">{camera.name}</h3>
            <p>Price: ${camera.price} per day</p>
            <button onClick={() => handleAddToCart(camera)} className="btn mt-2">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentCamera;
