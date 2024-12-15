'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, useLoadScript, Circle, StandaloneSearchBox, } from '@react-google-maps/api';
import { Place } from '@/interfaces/place';
import { FaExpand } from "react-icons/fa";

const mapStyles = {
    width: '100%',
    height: '100%',
};

const libraries = ['places']; // Define the libraries array outside of the component


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
        libraries,
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
                <div className="rounded-lg relative w-full">
                    <button
                        className='z-20 absolute top-4 left-4 flex items-center justify-center bg-blue-500 rounded-lg shadow-md p-2'
                    >
                        <span className='flex items-center text-xs text-white'> Ampliar Mapa  <FaExpand className='ml-2' /></span>
                    </button>
                    {isHovered && (
                        <div className="absolute inset-0 rounded-lg bg-gray-200 bg-opacity-50 pointer-events-none z-10 flex items-center justify-center">
                            <span><FaExpand className='text-blue-500 text-3xl' /></span>
                        </div>
                    )}
                    <GoogleMap
                        key={JSON.stringify(myPlaces)}
                        clickableIcons={false}
                        mapContainerClassName='rounded-lg'
                        mapContainerStyle={mapStyles}
                        zoom={12}
                        center={
                            { lat: 3.421, lng: -76.521 }
                        }
                        options={{
                            disableDefaultUI: true,
                            streetViewControl: false,
                            draggable: false, // Disable dragging
                            zoomControl: false, // Disable zoom control
                            scrollwheel: false, // Disable zooming with scroll
                            disableDoubleClickZoom: true, // Disable zooming with double click
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

                        onMouseOver={() => {
                            console.log('map hovered');
                            setIsHovered(true);
                        }}
                        onMouseOut={() => {
                            console.log('map not hovered');
                            setIsHovered(false);
                        }}
                        onClick={(e) => {
                            console.log('Map clicked at: ');
                        }}
                    >
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
                </div>
            )
            }

        </>
    );
};

export default GoogleMapsWidget;