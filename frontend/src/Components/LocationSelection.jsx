import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationList = ({ setOpenvehicle, setOpenPanel }) => {
  const locations = [
    {
      id: 1,
      title: "Kempegowda International Airport",
      address: "KIAL Rd, Devanahalli, Bengaluru, Karnataka",
    },
    {
      id: 2,
      title: "Phoenix Marketcity",
      address:
        "Whitefield Rd, Devasandra Industrial Estate, Mahadevapura, Bengaluru, Karnataka",
    },
    {
      id: 3,
      title: "Salarpuria Aura Block B",
      address:
        "BLOCK-B, TOUCH STONE, Chandana, Kadabeesanahalli, Bengaluru, Karnataka",
    },
    {
      id: 4,
      title: "Sheraton Grand Bengaluru Whitefield",
      address:
        "Prestige Shantiniketan Hoodi, Whitefield, Thigalarapalya, Krishnarajapura, Bengaluru",
    },
    {
      id: 5,
      title: "KSR Bengaluru City Junction (Bangalore)",
      address: "M.G. Railway Colony, Majestic, Bengaluru, Karnataka",
    },
    {
      id: 6,
      title: "Set location on map",
      address: "",
    },
  ];

  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {locations.map((elem) => (
          <div
            onClick={() => {
              setOpenvehicle(true);
              setOpenPanel(false);
            }}
            key={elem.id}
            className="flex cursor-pointer items-start gap-4 px-4 py-4 border-b"
          >
            <div className="text-black text-xl">
              <FaLocationDot />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {elem.title}
              </h3>
              <p className="text-sm text-gray-500">{elem.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
