import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, Circle, Libraries } from '@react-google-maps/api';
import { Place } from '@/interfaces/place';
import { FaExpand, FaCompress } from "react-icons/fa";
import ProfessionalCard from '@/components/professionals/professionalMap';
import { Speciality } from '@/interfaces/speciality';
import { Service } from '@/interfaces/service';
import { City } from '@/interfaces/city';

// Tipos para los profesionales
interface Professional {
  id:string,
  email:string,
  phone_number:string,
  name: string;
  last_name: string;
  cities: City[];
  roles:string[],
  score:number,
  photo_url: string;
  description:string;
  services: Service[];
  places: Place[];
  specialities: Speciality[];
}

const libraries: Libraries = ['places'];

interface GoogleMapsWidgetProps {
    places: Place[];
    professionals: Professional[];
}

const GoogleMapsWidget: React.FC<GoogleMapsWidgetProps> = ({ places, professionals }) => {
  const [myPlaces, setMyPlaces] = useState<Place[]>([]);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const circleOptions = useMemo(() => ({
    strokeColor: "#3b82f6",
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: "#3b82f6",
    fillOpacity: 0.35,
  }), []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
    libraries,
  });

  useEffect(() => {
    setMyPlaces(places);
}, [places]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    setIsHovered(false);
  };

  if (!isLoaded) {
    return (
      <div className="rounded-lg flex items-center justify-center w-full h-full bg-blue-100 animate-pulse" />
    );
  }

  return (
    <div className="relative w-full h-full">
      {isExpanded ? (
        <div className="fixed inset-0 z-40 flex">
          {/* Mapa expandido */}
          <div className="w-2/3 h-full relative">
            <button
              className="absolute top-4 left-4 z-50 flex items-center justify-center bg-blue-500 hover:bg-blue-600 
                rounded-lg shadow-md p-2 transition-colors"
              onClick={handleExpand}
            >
              <span className="flex items-center text-xs text-white">
                Reducir Mapa <FaCompress className="ml-2" />
              </span>
            </button>

            <GoogleMap
              key={`${JSON.stringify(myPlaces)}-${isExpanded}`}
              clickableIcons={false}
              mapContainerClassName="w-full h-full"
              zoom={12}
              center={{ lat: 3.421, lng: -76.521 }}
              options={{
                disableDefaultUI: true,
                streetViewControl: false,
                draggable: true,
                zoomControl: true,
                scrollwheel: true,
                styles: [
                  {
                    featureType: 'poi',
                    stylers: [{ visibility: 'off' }],
                  },
                  {
                    featureType: 'transit',
                    stylers: [{ visibility: 'off' }],
                  },
                ],
              }}
            >
              {myPlaces.map((place, index) => (
                        <Circle
                            key={`${place.latitude}-${place.longitude}-${index}`}
                            center={{ lat: place.latitude, lng: place.longitude }}
                            radius={200}
                            options={circleOptions}
                            onClick={() => alert('Circle clicked!')}
                        />
                    ))}
            </GoogleMap>
          </div>

          {/* Panel lateral de tarjetas */}
          <div className="w-1/3 h-full bg-gray-50 overflow-y-auto p-4">
            <div className="space-y-4">
              {professionals.map((professional, index) => (
                <ProfessionalCard
                  key={index}
                  {...professional}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Vista normal del mapa
        <div className="relative w-full h-full">
          <button
            className="absolute top-4 left-4 z-50 flex items-center justify-center bg-blue-500 hover:bg-blue-600 
              rounded-lg shadow-md p-2 transition-colors"
            onClick={handleExpand}
          >
            <span className="flex items-center text-xs text-white">
              Ampliar Mapa <FaExpand className="ml-2" />
            </span>
          </button>

          {isHovered && (
            <div className="absolute inset-0 rounded-lg bg-gray-200 bg-opacity-50 pointer-events-none z-10 flex items-center justify-center">
              <span><FaExpand className="text-blue-500 text-3xl" /></span>
            </div>
          )}

          <GoogleMap
            key={`${JSON.stringify(myPlaces)}-${isExpanded}`}
            clickableIcons={false}
            mapContainerClassName="rounded-lg w-full h-full"
            zoom={12}
            center={{ lat: 3.421, lng: -76.521 }}
            options={{
              disableDefaultUI: true,
              streetViewControl: false,
              draggable: false,
              zoomControl: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              styles: [
                {
                  featureType: 'poi',
                  stylers: [{ visibility: 'off' }],
                },
                {
                  featureType: 'transit',
                  stylers: [{ visibility: 'off' }],
                },
              ],
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
          >
            {myPlaces.map((place, index) => (
                        <Circle
                            key={`${place.latitude}-${place.longitude}-${index}`}
                            center={{ lat: place.latitude, lng: place.longitude }}
                            radius={200}
                            options={circleOptions}
                            onClick={() => alert('Circle clicked!')}
                        />
                    ))}
          </GoogleMap>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsWidget;