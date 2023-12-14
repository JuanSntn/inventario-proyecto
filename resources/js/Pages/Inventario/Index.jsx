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


export default function Dashboard(props) {
    const [modal,setModal] = useState(false);
    const [title,setTitle] = useState ('');
    const [operation,setOperation] = useState ('1');
    const [searchTerm, setSearchTerm] = useState('');
    const EmpresaInput = useRef();
    const BodegaInput = useRef();
    const DescripcionInput = useRef();
    const MarcaInput = useRef();
    const ModeloInput = useRef();
    const No_serieInput = useRef();
    const AreaInput = useRef();
    const CaracteristicasInput = useRef();
    const ManofacturaInput = useRef();
    const ResponsableInput = useRef();
    const Cod_internaInput = useRef();
    const Fecha_invInput = useRef();
    const { data,setData,delete:destroy,post,put,
        processing,reset,errors} = useForm({
        id:'', empresa:'', bodega:'', descripcion:'',
        marca:'', modelo:'', no_serie:'', area:'',
        caracteristicas:'', manofactura:'', responsable:'',
        cod_interna:'', fecha_inv:''
    });
    const openModal = (op,id,empresa,bodega,descripcion,marca,modelo,no_serie,area,caracteristicas,manofactura,responsable,cod_interna,fecha_inv)=> {
        setModal (true);
        setOperation(op);
        setData({empresa:'',bodega:'',descripcion:'',marca:'',modelo:'',no_serie:'',area:'',caracteristicas:'',manofactura:'',responsable:'',cod_interna:'',fecha_inv:''});
        if (op === 1){
            setTitle('Añadir al inventario');
        }
        else{
            setTitle('Modificar');
            setData({id:id,
                empresa:empresa,
                bodega:bodega,
                descripcion:descripcion,
                marca:marca,
                modelo:modelo,
                no_serie:no_serie,
                area:area,
                caracteristicas:caracteristicas,
                manofactura:manofactura,
                cod_interna:cod_interna,
                fecha_inv:fecha_inv})
        }
    }
    const closeModal = () =>{
        setModal(false);
    } 
    const save = (e) =>{
        e.preventDefault();
        if(operation === 1){
            post(route('inventario.store'),{
                onSuccess: () => { ok('Inventario guardado')},
                onError: () => {
                    if(errors.empresa){
                        reset('empresa');
                        EmpresaInput.current.focus();
                    }
                    if(errors.bodega){
                        reset('bodega');
                        BodegaInput.current.focus();
                    }
                    if(errors.descripcion){
                        reset('descripcion');
                        DescripcionInput.current.focus();
                    }
                    if(errors.marca){
                        reset('marca');
                        MarcaInput.current.focus();
                    }
                    if(errors.modelo){
                        reset('modelo');
                        ModeloInput.current.focus();
                    }
                    if(errors.no_serie){
                        reset('no_serie');
                        No_serieInput.current.focus();
                    }
                    if(errors.area){
                        reset('area');
                        AreaInput.current.focus();
                    }
                    if(errors.caracteristicas){
                        reset('caracteristicas');
                        CaracteristicasInput.current.focus();
                    }
                    if(errors.manofactura){
                        reset('manofactura');
                        ManofacturaInput.current.focus();
                    }
                    if(errors.responsable){
                        reset('responsable');
                        ResponsableInput.current.focus();
                    }
                    if(errors.cod_interna){
                        reset('cod_interna');
                        Cod_internaInput.current.focus();
                    }
                    if(errors.fecha_inv){
                        reset('fecha_inv');
                        Fecha_invInput.current.focus();
                    }
                }
            });
        }
        else{
            put(route('inventario.update',data.id),{
                onSuccess: () => { ok('Inventario modificado')},
                onError: () => {
                    if(errors.empresa){
                        reset('empresa');
                        EmpresaInput.current.focus();
                    }
                    if(errors.bodega){
                        reset('bodega');
                        BodegaInput.current.focus();
                    }
                    if(errors.descripcion){
                        reset('descripcion');
                        DescripcionInput.current.focus();
                    }
                    if(errors.marca){
                        reset('marca');
                        MarcaInput.current.focus();
                    }
                    if(errors.modelo){
                        reset('modelo');
                        ModeloInput.current.focus();
                    }
                    if(errors.no_serie){
                        reset('no_serie');
                        No_serieInput.current.focus();
                    }
                    if(errors.area){
                        reset('area');
                        AreaInput.current.focus();
                    }
                    if(errors.caracteristicas){
                        reset('caracteristicas');
                        CaracteristicasInput.current.focus();
                    }
                    if(errors.manofactura){
                        reset('manofactura');
                        ManofacturaInput.current.focus();
                    }
                    if(errors.responsable){
                        reset('responsable');
                        ResponsableInput.current.focus();
                    }
                    if(errors.cod_interna){
                        reset('cod_interna');
                        Cod_internaInput.current.focus();
                    }
                    if(errors.fecha_inv){
                        reset('fecha_inv');
                        Fecha_invInput.current.focus();
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
            title:'Deseas borrar a '+name+ ' del inventario?',
            text:'Se perderá el articulo',
            icon:'question', showCancelButton:true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Si, eliminar',
            cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelr'
        }).then((result) => {
            if(result.isConfirmed){
                destroy(route('inventario.destroy',id),
                {onSuccess: () =>{ok('Articulo eliminado')}});
            }
        });
    }
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };

    const filteredMacs = props.inventario.filter((inventario) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
          inventario.empresa.toLowerCase().includes(searchTermLowerCase) ||
          inventario.bodega.toLowerCase().includes(searchTermLowerCase) ||
          inventario.descripcion.toLowerCase().includes(searchTermLowerCase) ||
          inventario.marca.toLowerCase().includes(searchTermLowerCase) ||
          inventario.modelo.toLowerCase().includes(searchTermLowerCase) ||
          inventario.no_serie.toLowerCase().includes(searchTermLowerCase) ||
          inventario.area.toLowerCase().includes(searchTermLowerCase) ||
          inventario.caracteristicas.toLowerCase().includes(searchTermLowerCase) ||
          inventario.manofactura.toLowerCase().includes(searchTermLowerCase) ||
          inventario.responsable.toLowerCase().includes(searchTermLowerCase) ||
          inventario.cod_interna.toLowerCase().includes(searchTermLowerCase) ||
          inventario.fecha_inv.toLowerCase().includes(searchTermLowerCase) 
        );
      });

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventario</h2>}
        >
            <Head title="Inventario" />

            

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
                <div className="overflow-x-auto bg-white grid v-screen place-items-center py-6 ">
    
                    <table className='table-auto border border-gray-400 w-3/4'>
                        <thead>
                            <tr className='bg-gray-100 '>
                                <th className='px-2 py-2 '>EMPRESA</th>
                                <th className='px-2 py-2 '>BODEGA</th>
                                <th className='px-2 py-2 '>DESCRIPCION</th>
                                <th className='px-2 py-2 '>MARCA</th>
                                <th className='px-2 py-2 '>MODELO</th>
                                <th className='px-2 py-2 '>NO.SERIE</th>
                                <th className='px-2 py-2 '>AREA</th>
                                <th className='px-2 py-2 '>CARACTERISTICAS</th>
                                <th className='px-2 py-2 '>MANOFACTURA</th>
                                <th className='px-2 py-2 '>RESPONSABLE</th>
                                <th className='px-2 py-2 '>COD. INTERNA</th>
                                <th className='px-2 py-2 '>FECHA DE INVENTARIO</th>
                                <th className='px-2 py-2 '></th>
                                <th className='px-2 py-2 '></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMacs.map((inventario, index) => (
                                        <tr key={inventario.id}>
                                    <td className='hidden border border-gray-400 rounded-lg px-2 py-2'>{index + 1}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.empresa}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.bodega}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.descripcion}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.marca}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.modelo}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.no_serie}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.area}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.caracteristicas}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.manofactura}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.responsable}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.cod_interna}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>{inventario.fecha_inv}</td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>
                                    <WarningButton
                                        onClick = {()=>openModal(2, inventario.id,inventario.empresa,inventario.bodega,inventario.descripcion,inventario.marca,inventario.modelo,inventario.no_serie,
                                        inventario.area,inventario.caracteristicas,inventario.manofactura,inventario.responsable,inventario.cod_interna,inventario.fecha_inv)}>
                                        <i className='fa-solid fa-edit'></i>
                                    </WarningButton>
                                    </td>
                                    <td className='border border-gray-400 rounded-lg px-2 py-2'>
                                    <DangerButton 
                                    onClick={() => eliminar(inventario.id,inventario.descripcion)}>
                                        <i className='fa-solid fa-trash'></i>
                                    </DangerButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            
            <Modal show={modal} onClose={closeModal}>
                <h2 className="p-3 text-lg font-medium text-gray-900">
                    {title}
                </h2>
                <form onSubmit={save} className="p-6">
                <div class="grid md:grid-cols-2 md:gap-6">
                <div className='relative z-2 w-full group'>
                <InputLabel for="empresa" value="Empresa"></InputLabel>
                <select
                    id="empresa"
                    name="empresa"
                    ref={EmpresaInput}
                    value={data.empresa}
                    required={true}
                    onChange={(e) => setData('empresa', e.target.value)}
                    className="mt-1 w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                >
                    <option value="">Seleccionar</option>
                    <option value="SA">SA</option>
                    <option value="ATC">ATC</option>
                    <option value="OTC">OTC</option>
                </select>
                <InputError message={errors.empresa} className="mt-2"></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                <InputLabel for="bodega" value="Bodega"></InputLabel>
                <select
                    id="bodega"
                    name="bodega"
                    ref={BodegaInput}
                    value={data.bodega}
                    required={true}
                    onChange={(e) => setData('bodega', e.target.value)}
                    className="mt-1 w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                >
                    <option value="">Seleccionar</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="B4">B4</option>
                    <option value="B5">B5</option>
                </select>
                <InputError message={errors.bodega} className="mt-2"></InputError>
                </div>

                <div className='relative z-0 w-full group'>
                    <InputLabel for="marca" value="Marca"></InputLabel>
                    <TextInput id="marca" name="marca" ref={MarcaInput} 
                    value={data.marca} required='required'
                    onChange={(e)=> setData('marca',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.marca} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                    <InputLabel for="modelo" value="Modelo"></InputLabel>
                    <TextInput id="modelo" name="modelo" ref={ModeloInput} 
                    value={data.modelo} required='required'
                    onChange={(e)=> setData('modelo',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.modelo} classNamemt-2></InputError>
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
                    <InputLabel for="area" value="Area"></InputLabel>
                    <TextInput id="area" name="area" ref={AreaInput} 
                    value={data.area} required='required'
                    onChange={(e)=> setData('area',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.area} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                    <InputLabel for="caracteristicas" value="Caracteristicas"></InputLabel>
                    <TextInput id="caracteristicas" name="caracteristicas" ref={CaracteristicasInput} 
                    value={data.caracteristicas} required='required'
                    onChange={(e)=> setData('caracteristicas',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.caracteristicas} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                    <InputLabel for="manofactura" value="Manofactura"></InputLabel>
                    <TextInput id="manofactura" name="manofactura" ref={ManofacturaInput} 
                    value={data.manofactura} required='required'
                    onChange={(e)=> setData('manofactura',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.manofactura} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                    <InputLabel for="responsable" value="responsable"></InputLabel>
                    <TextInput id="responsable" name="responsable" ref={ResponsableInput} 
                    value={data.responsable} required='required'
                    onChange={(e)=> setData('responsable',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.responsable} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                    <InputLabel for="cod_interna" value="cod_interna"></InputLabel>
                    <TextInput id="cod_interna" name="responsacod_internable" ref={Cod_internaInput} 
                    value={data.cod_interna} required='required'
                    onChange={(e)=> setData('cod_interna',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.cod_interna} classNamemt-2></InputError>
                </div>
                <div className='relative z-0 w-full group'>
                <InputLabel for="fecha_inv" value="Fecha de Inventario"></InputLabel>
                <input
                    id="fecha_inv"
                    name="fecha_inv"
                    type="date"
                    ref={Fecha_invInput}
                    value={data.fecha_inv}
                    required={true}
                    onChange={(e) => setData('fecha_inv', e.target.value)}
                    className="mt-1 w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                />
                <InputError message={errors.fecha_inv} className="mt-2"></InputError>
                </div>

                

                <div className='relative z-0 w-full group '>
                    <InputLabel for="descripcion" value="Descripcion"></InputLabel>
                    <TextInput id="descripcion" name="descripcion" ref={DescripcionInput} 
                    value={data.descripcion} required='required'
                    onChange={(e)=> setData('descripcion',e.target.value)}
                    className="mt-1 block w-full" ></TextInput>
                    <InputError message={errors.descripcion} classNamemt-2></InputError>
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