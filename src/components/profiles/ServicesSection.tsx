import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'
import { MdEdit, MdDelete } from 'react-icons/md'
import AddIcon from '@mui/icons-material/Add';
import { Service } from '@/interfaces/service';
import { authService } from '@/services';
import Modal from '@/components/ui/Modal';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { CreateServiceDto } from '@/interfaces/createEntities/CreateServiceDto';
import { set } from 'date-fns';
import { EditServiceDTO } from '@/interfaces/editEntities/EditServiceDto';


interface ServicesSectionProps {
    services: Service[];
    professional_id: string;
}

const onEditService = async (id_service: string, editServiceDto: EditServiceDTO) => {
    await authService.editServiceToProfessional(id_service, editServiceDto);
    //window.location.reload();
}

const onDeleteService = async (professional_id: string, id_service: string) => {
    await authService.deleteServiceToProfessional(professional_id, id_service);
    window.location.reload();
}

const onCreateService = async (professional_id: string, createServiceDTO: CreateServiceDto) => {
    await authService.createServiceToProfessional(professional_id, createServiceDTO)
}

function ServicesSection({ services, professional_id }: ServicesSectionProps) {


    // Modal edit service
    const [openModalEditService, setOpenModalEditService] = React.useState(false)
    const [editIdService, setEditIdService] = React.useState('');
    const [editTitleService, setEditTitleService] = React.useState('');
    const [editDescriptionService, setEditDescriptionService] = React.useState('');
    const [editPriceService, setEditPriceService] = React.useState(0);

    // Modal delete service
    const [openModalDeleteService, setOpenModalDeleteService] = React.useState(false)
    //Modal add service
    const [openModalAddService, setOpenModalAddService] = React.useState(false)
    const [selectedService, setSelectedService] = React.useState<Service | null>(null);

    // Form for adding a new service
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [price, setPrice] = React.useState(0)



    return (
        <>
            <div className="main-professional-card bg-white mb-3 rounded-lg shadow-md w-full">
                <div className="bg-blue-500 text-white rounded-tr-md rounded-tl-md px-3 py-3 text-lg font-semibold">
                    <h3 className="ml-3 text-xl">Servicios y Precios</h3>
                </div>
                <div className="px-8 py-5">
                    <p className='mt-2 text-sm font-light mb-3'>Servicios populares</p>
                    <div className="services">
                        {
                            services.map((service: Service) => (
                                <>
                                    <div className="flex" key={service.id}>
                                        <div className="w-full">
                                            <li className='flex items-center text-gray-700 mt-2 font-light mb-2'>
                                                <div className="flex justify-between w-full items-center">
                                                    <div className="">
                                                        <div className='flex items-center'>
                                                            <IoIosArrowForward className='text-xs mr-2' /> {service.title}
                                                        </div>
                                                        <p className='text-gray-700 text-sm font-light mt-1 mb-3' >{service.description}</p>
                                                    </div>
                                                    <p className=' font-light flex'><BiDollar className='h-6' /> {Math.round(service.price).toLocaleString('es-ES')}</p>
                                                </div>
                                            </li>
                                        </div>
                                        <div className="flex">
                                            <button
                                                className="ml-3 py-1 text-gray-400 text-2xl"
                                                onClick={() => {
                                                    setOpenModalEditService(true)
                                                    setEditIdService(service.id)
                                                    setEditTitleService(service.title)
                                                    setEditDescriptionService(service.description)
                                                    setEditPriceService(service.price)
                                                }}
                                            >
                                                <MdEdit />
                                            </button>
                                            <button
                                                className="ml-3 py-1 text-red-400 text-2xl"
                                                onClick={
                                                    () => {
                                                        setOpenModalDeleteService(true)
                                                        setSelectedService(service)
                                                    }
                                                }>
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-gray-200" style={{ height: "0.5px" }}></div>
                                </>
                            ))
                        }

                        <div className="md:flex my-4 justify-end">
                            <button
                                className="px-2 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 ml-2 text-2xl shadow-lg flex items-center justify-center"
                                onClick={() => {
                                    setOpenModalAddService(true)
                                }}
                            >
                                <AddIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for editing the services */}
            <Modal
                isOpen={openModalEditService}
                onClose={() => setOpenModalEditService(false)}
            >
                <h3 className='font-bold text-3xl mb-10'>Editar Servicio</h3>
                <form>
                    <div className="flex flex-col items-start mb-3">
                        <label className='mb-2 font-light' >Título</label>
                        <TextField
                            value={editTitleService}
                            onChange={(e) =>
                                setEditTitleService(e.target.value)
                            }
                            fullWidth
                            required
                            placeholder='Título'
                            InputProps={{
                                classes: {
                                    input: 'placeholder-gray-500'
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-start mb-3">
                        <label className='mb-2 font-light'>Descripción</label>
                        <TextField
                            value={editDescriptionService}
                            onChange={(e) => setEditDescriptionService(e.target.value)}
                            placeholder='Descripción'
                            fullWidth
                            required
                            multiline
                            rows={4}
                            InputProps={{
                                classes: {
                                    input: 'placeholder-gray-500'
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-start mb-10">
                        <label className='mb-2 font-light'>Precio</label>
                        <FormControl fullWidth>
                            <OutlinedInput
                                value={editPriceService}
                                onChange={(e) => setEditPriceService(Number(e.target.value.replace(/\D/g, '')))}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                type="number"
                            />
                        </FormControl>
                    </div>
                    <button
                        onClick={(e) => {
                            onEditService(editIdService, { 
                                id: editIdService,
                                title: editTitleService, 
                                description: editDescriptionService, 
                                price: editPriceService
                              });
                        }}
                        className="z-10 mt-5 cursor-pointer w-full bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center py-3 px-5 rounded-md text-white font-bold text-lg"
                    >
                        Editar Servicio
                    </button>
                </form>
            </Modal>
            {/* Modal for deleting the services */}
            <Modal
                isOpen={openModalDeleteService}
                onClose={() => {
                    setOpenModalDeleteService(false)
                }}
            >
                <p className='font-light text-left mb-10'>¿Estás seguro de eliminar el servicio?</p>
                {selectedService && (
                    <div className="bg-white mb-20 rounded-lg shadow-md w-full flex p-5 border" key={selectedService.id}>
                        <div className="w-full">
                            <li className='flex items-center text-gray-700 mt-2 font-light mb-2'>
                                <div className="flex justify-between w-full items-center">
                                    <div className="">
                                        <div className='flex items-center font-semibold'>
                                            {selectedService.title}
                                        </div>
                                        <p className='text-gray-700 text-sm font-light mt-1 mb-3 mr-5 text-justify ' >{selectedService.description}</p>
                                    </div>
                                    <p className=' font-light flex'><BiDollar className='h-6' /> {Math.round(selectedService.price).toLocaleString('es-ES')}</p>
                                </div>
                            </li>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => {
                        onDeleteService(professional_id, services[0].id)
                        setOpenModalDeleteService(false)
                    }}
                    className="z-10 mt-5 cursor-pointer w-full bg-gradient-to-r from-red-300 to-red-600 flex justify-center py-3 px-5 rounded-md text-white font-bold text-lg"
                >
                    Eliminar Servicio
                </button>
            </Modal>
            {/* Modal for adding the services */}
            <Modal
                isOpen={openModalAddService}
                onClose={() => setOpenModalAddService(false)}
            >
                <h3 className='font-semibold text-2xl mb-5'>Crear un servicio</h3>
                {/* Make a form to add a new service with the following attributes: id: string; title: string; description: string; price: number; */}
                <form>
                    <div className="flex flex-col items-start mb-3">
                        <label className='mb-2 font-light' >Título</label>
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            required
                            placeholder='Título'
                            InputProps={{
                                classes: {
                                    input: 'placeholder-gray-500'
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-start mb-3">
                        <label className='mb-2 font-light'>Descripción</label>
                        <TextField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Descripción'
                            fullWidth
                            required
                            multiline
                            rows={4}
                            InputProps={{
                                classes: {
                                    input: 'placeholder-gray-500'
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-col items-start mb-10">
                        <label className='mb-2 font-light'>Precio</label>
                        <FormControl fullWidth>
                            <OutlinedInput
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value.replace(/\D/g, '')))}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                type="number"
                            />
                        </FormControl>
                    </div>
                    <button
                        onClick={(e) => {
                            onCreateService(professional_id, { title, description, price });
                        }}
                        className="z-10 mt-5 cursor-pointer w-full bg-gradient-to-r from-blue-300 to-blue-600 flex justify-center py-3 px-5 rounded-md text-white font-bold text-lg"
                    >
                        Añadir Servicio
                    </button>
                </form>

            </Modal>

        </>
    )
}

export default ServicesSection