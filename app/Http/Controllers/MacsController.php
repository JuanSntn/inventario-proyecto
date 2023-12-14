<?php

namespace App\Http\Controllers;

use App\Models\Macs;
use Illuminate\Http\Request;
use Inertia\Inertia;


class MacsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $macs = macs::all();
        return Inertia::render('Inventario/Macs', ['macs'=>$macs]);
    }

   
    public function store(Request $request)
    {
        $request -> validate([

            'responsable' =>  'required',
            'area' =>  'required',
            'mac' =>  'required',
            'so' =>  'required',
            'version' =>  'required',
            'no_serie' =>  'required',
            'fecha_compra'  =>  'required',
        ]);

        $macs = new macs($request->input());
        $macs->save();
        return redirect ('macs');
    }
  
    public function update(Request $request, $id)
    {
        $macs = macs::find($id);
        $macs->fill($request->input())->saveOrFail();
        return redirect('macs');
    }


    public function destroy($id)
    {
        $macs = macs::find($id);
        $macs->delete();
        return redirect ('macs');
    }
}
