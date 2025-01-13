import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

const LocationList = ({
  setOpenvehicle,
  setOpenPanel,
  setPickup,
  setDestination,
  query,
  isPickup,
}) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.predictions) {
            const formattedLocations = response.data.predictions.map(
              (item) => ({
                id: item.place_id,
                title: item.structured_formatting.main_text,
                address: item.structured_formatting.secondary_text,
              })
            );
            setLocations(formattedLocations);
          } else {
            setLocations([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching location suggestions:", error);
          setLocations([]);
        });
    } else {
      setLocations([]);
    }
  }, [query]);

  const handleLocationClick = (location) => {
    if (isPickup) {
      setPickup(location.title);
    } else {
      setDestination(location.title);
    }
    // setOpenvehicle(true);
    // setOpenPanel(false);
  };

  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {locations.map((elem) => (
          <div
            onClick={() => handleLocationClick(elem)}
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
