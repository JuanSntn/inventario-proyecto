<?php

namespace App\Http\Controllers;

use App\Models\Inventario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventarioController extends Controller
{
    public function index()
    {
        $inventario = inventario::all();
        return Inertia::render('Inventario/Index', ['inventario'=>$inventario]);
    }


    public function store(Request $request)
    {
        $request -> validate([

            'empresa' =>  'required',
            'bodega' =>  'required',
            'descripcion' =>  'required',
            'marca' =>  'required',
            'modelo' =>  'required',
            'no_serie' =>  'required',
            'area' =>  'required',
            'caracteristicas' =>  'required',
            'manofactura' =>  'required',
            'responsable' =>  'required',
            'cod_interna' =>  'required',
            'fecha_inv' =>  'required',
        ]);

        $inventario = new inventario($request->input());
        $inventario->save();
        return redirect ('inventario');

    }

    
    public function update(Request $request, $id)
    {
        $inventario = inventario::find($id);
        $inventario->fill($request->input())->saveOrFail();
        return redirect('inventario');
    }

   
    public function destroy($id)
    {
        $inventario = inventario::find($id);
        $inventario->delete();
        return redirect ('inventario');
    }
}
