'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, useLoadScript, Circle, StandaloneSearchBox, } from '@react-google-maps/api';
import { Place } from '@/interfaces/place';

const mapStyles = {
    width: '100%',
    height: '60%',
};


interface GoogleMapsWidgetProps {
    places: Place[];
}

const GoogleMapsWidget: React.FC<GoogleMapsWidgetProps> = ({ places }) => {

    const [myPlaces, setMyPlaces] = useState<Place[]>([]); // Inicializa como array vacío.
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        setMyPlaces(places);
    }, [places]);

    const circleOptions = useMemo(() => ({
        strokeColor: "#3b82f6",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#3b82f6",
        fillOpacity: 0.35,
    }), []);
    

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
        libraries: ['places'],
    });

    return (
        <>
            {!isLoaded ? (
                <div className="rounded-lg flex items-center justify-center w-full h-full bg-green-100 animate-pulse">
                    {/* <svg className="w-6 h-6 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg> */}
                </div>
            ) : (
                
                <GoogleMap
                    key={JSON.stringify(myPlaces)}
                    clickableIcons={false}
                    onMouseOver={() => console.log('map hovered')}
                    mapContainerClassName='rounded-lg'
                    mapContainerStyle={mapStyles}
                    zoom={12}
                    center={
                        { lat: 3.421, lng: -76.521 }
                    }
                    options={{
                        disableDefaultUI: true,
                        streetViewControl: false,
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
                    onMouseUp={
                        () => {
                            setIsHovered(true);
                        }
                    }
                >
                    <button
                        className='z-100 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md'
                    >
                        <span className='text-xs text-black'>Click Me!!</span>
                    </button>
                    {
                        myPlaces.map((place, index) => (
                            <Circle
                                key={`${place.latitude}-${place.longitude}-${index}`} // Clave única
                                center={{ lat: place.latitude, lng: place.longitude }}
                                radius={200}
                                options={circleOptions}
                                onClick={() => alert('Circle clicked!')}
                            >
                            </Circle>
                        ))
                    }
                </GoogleMap>
            )
            }

        </>
    );
};

export default GoogleMapsWidget;