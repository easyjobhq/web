import { Place } from '@/interfaces/place'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MdEdit, MdDelete } from 'react-icons/md'
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import Modal from '../ui/Modal';
import { Circle, GoogleMap, Libraries, Marker, useLoadScript } from '@react-google-maps/api';
import { authService } from '@/services';
import { TextField } from '@mui/material';
import { Professional } from '@/interfaces/professional';

const mapStyles = {
    width: '100%',
    height: '100%',
};


const libraries: Libraries = ['places']; // Define the libraries array outside of the component


function LocationsSection({ professional }: {professional: Professional }) {

    const [isOpenAddLocation, setIsOpenAddLocation] = React.useState(false);
    const [isOpenDeleteLocation, setIsOpenDeleteLocation] = React.useState(false);
    const [isOpenSeeLocation, setIsOpenSeeLocation] = React.useState(false);

    const [selectedPlace, setSelectedPlace] = React.useState<Place | undefined>();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || '',
        libraries,
    });

    const onDeleteLocation = async (id: string) => {
        await authService.deletePlace(id)
        window.location.reload()
    }

    const onAddLocation = async (name: string, latitude: number, longitude: number) => {
        if (name === '') {
            alert("Ingresa un nombre para la ubicacion");
            return;
        }
        if (latitude === 0 || longitude === 0) {
            alert("Selecciona una ubicacion en el mapa");
            return;
        }
        const response = await authService.addPlaceToProfessional(professional.id, {name, latitude, longitude});
        if (response) {
            setIsOpenAddLocation(false);
            window.location.reload();
        } else {
            alert("Error al añadir la ubicacion");
        }
    }
    
    //Variables to create the new place
    const [newPlaceName, setNewPlaceName] = React.useState('');
    const [newPlaceLatitude, setNewPlaceLatitude] = React.useState(0);
    const [newPlaceLongitude, setNewPlaceLongitude] = React.useState(0);


    return (
        <div className="bg-white mb-3 rounded-lg shadow-md w-full">
            <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
                <h3 className="ml-3 text-xl">Ubicaciones</h3>
            </div>
            <div className="p-6">
                <p>Tus ubicaciones:</p>
                <div className="mt-4">
                    {professional.places.map((place, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-y">
                            <div className="flex items-center">
                                <div className="p-2 bg-gray-200 mr-3 rounded-full">
                                    <LocationOnIcon />
                                </div>

                                <div>
                                    <p className="text-base">{place.name}</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <button
                                    className="ml-3 py-1 text-gray-400 text-2xl hover:text-gray-600 transition duration-300 ease-in-out"
                                    onClick={() => {
                                        setIsOpenSeeLocation(true);
                                        setSelectedPlace(place);
                                    }}
                                >
                                    <VisibilityIcon />
                                </button>
                                {/* <button className="ml-3 py-1 text-gray-400 text-2xl hover:text-gray-600 transition duration-300 ease-in-out"><MdEdit /></button> */}
                                <button
                                    className="ml-3 py-1 text-red-400 text-2xl hover:text-red-600 transition duration-300 ease-in-out"
                                    onClick={() => {
                                        setIsOpenDeleteLocation(true);
                                        setSelectedPlace(place);
                                    }}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-end mt-5">
                    <button
                        className="px-2 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ml-2 text-2xl shadow-lg flex items-center justify-center"
                        onClick={() => setIsOpenAddLocation(true)}
                    >
                        <AddIcon />
                    </button>
                </div>
            </div>
            {/* Modal to see the location */}
            <Modal isOpen={isOpenSeeLocation} onClose={() => setIsOpenSeeLocation(false)} >
                <div className="p-8 border shadow-md rounded-lg">
                    <h3 className='flex mb-5'> <p className='font-semibold text-lg text-left mr-3'>Nombre:</p> <p className='text-lg'> {selectedPlace?.name}</p></h3>
                    <div className="w-full h-96">
                        {isLoaded ? (
                            <GoogleMap
                                key={JSON.stringify(professional.places)}
                                clickableIcons={false}
                                mapContainerClassName='rounded-lg'
                                mapContainerStyle={mapStyles}
                                zoom={11}
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
                            >
                                {selectedPlace && (
                                    <Marker
                                        position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
                                    //radius={200}
                                    //options={circleOptions}
                                    >
                                    </Marker>
                                )}
                            </GoogleMap>
                        ) : (
                            <p>Cargando...</p>
                        )

                        }
                    </div>
                </div>
            </Modal>
            {/* Modal to delete the  the location */}
            <Modal isOpen={isOpenDeleteLocation} onClose={() => setIsOpenDeleteLocation(false)} >
                <h2 className='text-left mb-10 font-light'>Estas seguro que quieres eliminar esta ubicacion?</h2>
                <div className="p-8 border shadow-md rounded-lg">
                    <h3 className='flex mb-5'> <p className='font-semibold text-lg text-left mr-3'>Nombre:</p> <p className='text-lg'> {selectedPlace?.name}</p></h3>
                    <div className="w-full h-96">
                        {isLoaded ? (
                            <GoogleMap
                                key={JSON.stringify(professional.places)}
                                clickableIcons={false}
                                mapContainerClassName='rounded-lg'
                                mapContainerStyle={mapStyles}
                                zoom={11}
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
                            >
                                {selectedPlace && (
                                    <Marker
                                        position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
                                    //radius={200}
                                    //options={circleOptions}
                                    >
                                    </Marker>
                                )}
                            </GoogleMap>
                        ) : (
                            <p>Cargando...</p>
                        )

                        }
                    </div>
                </div>
                <button
                    onClick={() => {
                        onDeleteLocation('')
                        setIsOpenDeleteLocation(false)
                    }}
                    className="z-10 mt-10 cursor-pointer w-full bg-gradient-to-r from-red-300 to-red-600 flex justify-center py-3 px-5 rounded-md text-white font-bold text-lg"
                >
                    Eliminar Ubicacion
                </button>
            </Modal>
            {/* Modal to add a location */}
            <Modal isOpen={isOpenAddLocation} onClose={() => setIsOpenAddLocation(false)} >
                <h2 className='text-center mb-10 font-semibold text-2xl'>Añadir Ubicacion</h2>
                <div className="p-8 border shadow-md rounded-lg">
                    <p className='text-left font-light mb-3'>Ingresa el nombre de la ubicacion</p>
                    <TextField
                        placeholder='Nombre de la ubicacion'
                        variant="outlined"
                        fullWidth
                        value={newPlaceName}
                        onChange={(e) => setNewPlaceName(e.target.value)}
                        className="mb-4"
                    />
                    <p className='text-left font-light mb-3'>Selecciona la ubicacion</p>
                    <div className="w-full h-96">
                        {isLoaded ? (
                            <GoogleMap
                                key={JSON.stringify(professional.places)}
                                clickableIcons={false}
                                mapContainerClassName='rounded-lg'
                                mapContainerStyle={mapStyles}
                                zoom={11}
                                center={
                                    { lat: 3.421, lng: -76.521 }
                                }
                                options={{
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
                                onClick={(e) => {
                                    const lat = e.latLng?.lat();
                                    const lng = e.latLng?.lng();
                                    if (lat && lng) {
                                        setNewPlaceLatitude(lat);
                                        setNewPlaceLongitude(lng);
                                    }
                                }}
                            >
                                {newPlaceLatitude !== 0 && newPlaceLongitude !== 0 && (
                                    <Marker
                                        position={{ lat: newPlaceLatitude, lng: newPlaceLongitude }}
                                    //radius={200}
                                    //options={circleOptions}
                                    >
                                    </Marker>
                                )}
                                
                            </GoogleMap>
                        ) : (
                            <p>Cargando...</p>
                        )

                        }
                    </div>
                </div>
                <button
                    onClick={() => {
                        onAddLocation(newPlaceName, newPlaceLatitude, newPlaceLongitude)
                    }}
                    className="z-10 mt-10 cursor-pointer w-full bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center py-3 px-5 rounded-md text-white font-bold text-lg"
                >
                    Añadir Ubicacion
                </button>
            </Modal>
        </div>
    )
}

export default LocationsSection