import React, { useEffect } from 'react'
import { Professional } from '@/interfaces/professional';
import DynamicIcon from '../ui/icons/DynamicIcon';
import { MdDelete, MdEdit } from 'react-icons/md';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../ui/Modal';
import { authService } from '@/services';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Speciality } from '@/interfaces/speciality';

interface SpecialitySectionProps {
    professional: Professional | undefined;
}

function SpecialitySection({ professional }: SpecialitySectionProps) {


    const [isOpenAddSpeciality, setIsOpenAddSpeciality] = React.useState(false);
    const [isOpenDeleteSpeciality, setIsOpenDeleteSpeciality] = React.useState(false);

    const [allSpecialities, setAllSpecialities] = React.useState<Speciality[]>([]);
    const [selectedSpeciality, setSelectedSpeciality] = React.useState<Speciality | undefined>();
    const [specialityId, SetSpecialityId] = React.useState('');


    useEffect(() => {
        const fetchSpecialities = async () => {
            const all_speciality = await authService.getAllSpecialities();
            setAllSpecialities(all_speciality);
        };
        fetchSpecialities();
    }, [])


    const onDeleteSpeaciality = async (id: string, specialityId: string) => {
        await authService.deleteSpecialityToProfessional(id, specialityId)
        window.location.reload()
    }

    const handleAddSpeciality = async () => {

        if (specialityId === '') {
            alert("Selecciona una especialidad");
            return;
        }
        if (!professional?.id) {
            alert("Profesional no encontrado");
            return;
        }

        const response = await authService.addSpecialityToProfessional(professional.id, specialityId);

        if (response) {
            setIsOpenAddSpeciality(false);
            window.location.reload();
        } else {
            alert("Error al añadir la especialidad");
        }
    }


    return (
        <div className="bg-white mb-3 rounded-lg shadow-md w-full">
            <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
                <h3 className="ml-3 text-xl">Especialidades</h3>
            </div>
            <div className="mt-4 px-8 py-5">
                <p className='mb-2'>Tus Especialidades:</p>
                {professional?.specialities.map((speciality, key) => (
                    <div className='flex justify-between border-y py-2' key={key}>
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-200 mr-3 rounded-full">
                                <DynamicIcon type={speciality.speciality_name} color="#3B82F6" />
                            </div>
                            <p> {speciality.speciality_name}</p>
                        </div>
                        <div className="">
                            <button
                                className="ml-3 px-2 py-1 text-red-400 text-2xl"
                                onClick={() => {
                                    setIsOpenDeleteSpeciality(true);
                                    setSelectedSpeciality(speciality);
                                }}
                            >
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                ))}
                <div className="md:flex my-4 justify-end">

                    <button
                        className="px-2 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ml-2 text-2xl shadow-lg flex items-center justify-center"
                        onClick={() => setIsOpenAddSpeciality(true)}
                    >
                        <AddIcon />
                    </button>
                </div>
            </div>
            <Modal isOpen={isOpenAddSpeciality} onClose={() => setIsOpenAddSpeciality(false)} >
                <p className='text-left mb-10 font-light'>Elige la especialidad que quieres añadir</p>
                <Box
                    sx={{
                        mb: 8
                    }}
                >
                    <FormControl fullWidth>
                        <Select
                            sx={{
                                bgcolor: "rgba(255, 255, 255, 0.2)",
                                color: "black",
                                border: '0.25px solid rgba(255, 255, 255, 0.5)'
                            }}
                            value={specialityId}
                            displayEmpty
                            renderValue={(selected) => {
                                if (selected == '') {
                                    return <em>Especialidad</em>;
                                }
                                const selectedSpecialityObj = allSpecialities?.find(speciality => speciality.id === selected);
                                return selectedSpecialityObj ? <em>{selectedSpecialityObj.speciality_name}</em> : <em>Especialidad</em>;
                            }}
                            onChange={(event: SelectChangeEvent) => {
                                SetSpecialityId(event.target.value);
                            }}
                        >
                            <MenuItem value={''}>Sin filtro</MenuItem>
                            {
                                allSpecialities
                                    .filter(speciality => !professional?.specialities.some(profSpeciality => profSpeciality.id === speciality.id)) // Filtra las especialidades que no están en las especialidades del profesional
                                    .map(speciality => (
                                        <MenuItem key={speciality.id} value={`${speciality.id}`}>
                                            <div className="p-2 bg-blue-200 mr-3 rounded-full">
                                                <DynamicIcon type={speciality.speciality_name} color="#3B82F6" />
                                            </div>
                                            <p>{speciality.speciality_name}</p>
                                        </MenuItem>
                                    ))
                            }
                        </Select>
                    </FormControl>
                </Box>
                <button
                    className="z-10 mt-5 cursor-pointer w-full bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center py-3 px-5 rounded-md text-white font-bold text-lg"
                    onClick={() => {
                        handleAddSpeciality();
                    }}
                >
                    Añadir Especialidad
                </button>
            </Modal>
            <Modal isOpen={isOpenDeleteSpeciality} onClose={() => setIsOpenDeleteSpeciality(false)} >
                <p className='text-left font-light mb-10'>Estas seguro que quieres borrar la siguiente especialidad?</p>
                {selectedSpeciality && (
                    <div className="flex items-center border shadow-md rounded-lg p-3">
                        <div className="p-2 bg-blue-200 mr-3 rounded-full">
                            <DynamicIcon type={selectedSpeciality.speciality_name} color="#3B82F6" />
                        </div>
                        <p> {selectedSpeciality?.speciality_name}</p>
                    </div>
                )}
                <button
                    onClick={() => {
                        {professional?.id && selectedSpeciality?.id && onDeleteSpeaciality(professional.id, selectedSpeciality.id)}
                    }}
                    className="z-10 mt-20 cursor-pointer w-full bg-gradient-to-r from-red-300 to-red-600 flex justify-center py-3 px-5 rounded-md text-white font-bold text-lg"
                >
                    Eliminar Especialidad
                </button>
            </Modal>

        </div>

    )
}

export default SpecialitySection