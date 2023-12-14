import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import WarningButton from '@/Components/WarningButton';
import Swal from 'sweetalert2';
import { matchesProperty } from 'lodash';
import FileUploadButton from '@/Components/FileUploadButton';
import axios from 'axios';


export default function Dashboard(props) {
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState ('');
    const [operation,setOperation] = useState ('1');
    const [searchTerm, setSearchTerm] = useState('');
    const ResponsableInput = useRef();
    const AreaInput = useRef();
    const MacInput = useRef();
    const SoInput = useRef();
    const VersionInput = useRef();
    const No_serieInput = useRef();
    const Fecha_compraInput = useRef();
    const { data,setData,delete:destroy,post,put,
        processing,reset,errors} = useForm({
        id:'', responsable:'', area:'', mac:'',
        so:'', version:'', no_serie:'', fecha_compra:''
    });
    const openModal = (op,id,responsable,area,mac,so,version,no_serie, fecha_compra)=> {
        setModal (true);
        setOperation(op);
        setData({responsable:'',area:'',mac:'',so:'',version:'',no_serie:'',fecha_compra:''});
        if (op === 1){
            setTitle('Añadir al inventario');
        }
        else{
            setTitle('Modificar');
            setData({id:id,
                responsable:responsable,
                area:area,
                mac:mac,
                so:so,
                version:version,
                no_serie:no_serie,
                fecha_compra:fecha_compra})
        }
    }
    const closeModal = () =>{
        setModal(false);
    }
    const save = (e) =>{
        e.preventDefault();
        if(operation === 1){
            post(route('macs.store'),{
                onSuccess: () => { ok('Inventario guardado')},
                onError: () => {
                    if(errors.responsable){
                        reset('responsable');
                        ResponsableInput.current.focus();
                    }
                    if(errors.area){
                        reset('area');
                        AreaInput.current.focus();
                    }
                    if(errors.mac){
                        reset('mac');
                        MacInput.current.focus();
                    }
                    if(errors.so){
                        reset('so');
                        SoInput.current.focus();
                    }
                    if(errors.version){
                        reset('version');
                        VersionInput.current.focus();
                    }
                    if(errors.no_serie){
                        reset('no_serie');
                        No_serieInput.current.focus();
                    }
                    if(errors.fecha_compra){
                        reset('fecha_compra');
                        Fecha_compraInput.current.focus();
                    }
                }
            });
        }
        else{
            put(route('macs.update',data.id),{
                onSuccess: () => { ok('Inventario modificado')},
                onError: () => {
                    if(errors.responsable){
                        reset('responsable');
                        ResponsableInput.current.focus();
                    }
                    if(errors.area){
                        reset('area');
                        AreaInput.current.focus();
                    }
                    if(errors.mac){
                        reset('mac');
                        MacInput.current.focus();
                    }
                    if(errors.so){
                        reset('so');
                        SoInput.current.focus();
                    }
                    if(errors.version){
                        reset('version');
                        VersionInput.current.focus();
                    }
                    if(errors.no_serie){
                        reset('no_serie');
                        No_serieInput.current.focus();
                    }
                    if(errors.fecha_compra){
                        reset('fecha_compra');
                        Fecha_compraInput.current.focus();
                    }
                }
            });

        }

    } 
    const ok = (mensaje) =>{
        reset();
        closeModal();
        Swal.fire({title:mensaje,icon:'success'});
    }
    const eliminar = (id, name) =>{
        const alerta = Swal.mixin({ buttonsStyling:true});
        alerta.fire({
            title:'Deseas borrar a '+ name + ' del inventario?',
            text:'Se perderá el articulo',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelr'
        }).then((result) => {
            if(result.isConfirmed){
                destroy(route('macs.destroy',id),
                {onSuccess: () =>{ok('Articulo eliminado')}});
            }
        });
        
    }
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };

    const filteredMacs = props.macs.filter((mac) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
          mac.responsable.toLowerCase().includes(searchTermLowerCase) ||
          mac.area.toLowerCase().includes(searchTermLowerCase) ||
          mac.mac.toLowerCase().includes(searchTermLowerCase) ||
          mac.so.toLowerCase().includes(searchTermLowerCase) ||
          mac.version.toLowerCase().includes(searchTermLowerCase) ||
          mac.no_serie.toLowerCase().includes(searchTermLowerCase) ||
          mac.fecha_compra.toLowerCase().includes(searchTermLowerCase)
        );
      });
      
    
      
      
      

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Macs</h2>}
        >
            
            <Head title="Mac" />
            <div className="bg-white grid v-screen place-items-center">
                
                <div className='mt-3 mb-3 flex justify-end'>
                    <PrimaryButton onClick={() =>openModal(1)}>
                        <i className='fa-solid fa-plus-circle'></i>
                        Añadir
                    </PrimaryButton>
                    
                </div>
            </div>
            <div class="bg-white grid place-items-center">
            <div class="relative">
                <input
                    type="text"
                    class="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none w-full"
                    placeholder="Buscar"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <i class="fa-solid fa-search text-gray-400"></i>
                </div>
                </div>

                </div>
            <div class="overflow-x-auto bg-white grid v-screen place-items-center py-6">
                <div class="table-container">
                        <table className='table-auto border border-gray-400'>
                            
                            <thead>
                                <tr className='bg-gray-100 '>
                                    <th className='px-2 py-2 '>RESPONSABLE</th>
                                    <th className='px-2 py-2 '>AREA</th>
                                    <th className='px-2 py-2 '>MAC</th>
                                    <th className='px-2 py-2 '>SISTEMA OPERATIVO</th>
                                    <th className='px-2 py-2 '>VERSION DEL SISTEMA</th>
                                    <th className='px-2 py-2 '>NO.SERIE</th>
                                    <th className='px-2 py-2 '>FECHA DE COMPRA</th>
                                    <th className='px-2 py-2 '></th>
                                    <th className='px-2 py-2 '></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {filteredMacs.map((mac, index) => (
                                        <tr key={mac.id}>
                                        <td className='hidden border border-gray-400 rounded-lg px-2 py-2'>{index + 1}</td>
                                        <td className='border border-gray-400 rounded-lg px-2 py-2'>{mac.responsable}</td>
                                        <td className='border border-gray-400 rounded-lg px-2 py-2'>{mac.area}</td>
                                        <td className='border border-gray-400 rounded-lg px-2 py-2'>{mac.mac}</td>
                                        <td className='border border-gray-400 rounded-lg px-2 py-2'>{mac.so}</td>
                                        <td className='border border-gray-400 rounded-lg px-2 py-2'>{mac.version}</td>
                                        <td className='border border-gray-400 rounded-lg px-2 py-2'>{mac.no_serie}</td>
                                        <td className='border border-gray-400 rounded-lg px-2 py-2'>{mac.fecha_compra}</td>
                                        <td className='border border-gray-400 rounded-lg px-2 py-2'>
                                            <WarningButton
                                            onClick={() => openModal(2, mac.id, mac.responsable, mac.area, mac.so, mac.version, mac.no_serie, mac.fecha_compra)}
                                            >
                                            <i className='fa-solid fa-edit'></i>
                                            </WarningButton>
                                        </td>
                                        <td className='border border-gray-400 rounded-lg px-2 py-2'>
                                            <DangerButton onClick={() => eliminar(mac.id, mac.mac)}>
                                            <i className='fa-solid fa-trash'></i>
                                            </DangerButton>
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody>
                        </table>
                    </div> 
                </div>

                <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900">
                    {title}
                </h2>
                <form onSubmit={save} className="p-6">
                <div class="grid md:grid-cols-2 md:gap-6">
                <div className='relative z-2 w-full  group'>
                        <InputLabel for="responsable" value="Responsable"></InputLabel>
                        <TextInput id="responsable" name="responsable" ref={ResponsableInput} 
                        value={data.responsable} required={true} 
                        onChange={(e) => setData('responsable', e.target.value)}
                        className="mt-1 w-full" isFocused />
                        <InputError message={errors.responsable} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full  group'>
                    <InputLabel for="area" value="Area"></InputLabel>
                    <TextInput id="area" name="area" ref={AreaInput} 
                    value={data.area} required='required'
                    onChange={(e)=> setData('area',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.area} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                    <InputLabel for="mac" value="Mac"></InputLabel>
                    <TextInput id="mac" name="mac" ref={MacInput} 
                    value={data.mac} required='required'
                    onChange={(e)=> setData('mac',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.mac} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                    <InputLabel for="so" value="Sistema operativo"></InputLabel>
                    <TextInput id="so" name="so" ref={SoInput} 
                    value={data.so} required='required'
                    onChange={(e)=> setData('so',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.so} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                    <InputLabel for="no_serie" value="Numero de serie"></InputLabel>
                    <TextInput id="no_serie" name="no_serie" ref={No_serieInput} 
                    value={data.no_serie} required='required'
                    onChange={(e)=> setData('no_serie',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.no_serie} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                    <InputLabel for="version" value="version"></InputLabel>
                    <TextInput id="version" name="version" ref={VersionInput} 
                    value={data.version} required='required'
                    onChange={(e)=> setData('version',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.version} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                    <InputLabel for="fecha_compra" value="Fecha de compra"></InputLabel>
                    <input
                        type="date"
                        id="fecha_compra"
                        name="fecha_compra"
                        ref={Fecha_compraInput}
                        value={data.fecha_compra}
                        required='required'
                        onChange={(e) => setData('fecha_compra', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.fecha_compra} className="mt-2"></InputError>
                </div>

                </div>  
                <div className='relative z-0 w-full group py-4'>
                <PrimaryButton processing={processing} className='mt-2 bg-green-500'>
                    <i className='fa-solid fa-save p-2 '></i>Guardar
                </PrimaryButton>
                </div>
                    
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                    </div>

                
                  
                </form>
            </Modal>

            

            
        </AuthenticatedLayout>
    );
    
}




