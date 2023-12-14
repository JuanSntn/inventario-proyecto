<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Macs;

class ArchivoController extends Controller
{
    public function guardarArchivo(Request $request)
    {
        // Validación y procesamiento del archivo
        if ($request->hasFile('file')) {
            $archivo = $request->file('file');

            // Lógica para almacenar el archivo en el sistema de archivos o en un servicio de almacenamiento como AWS S3

            // Ejemplo de cómo guardar información relacionada con el archivo en la base de datos
            $nuevoArchivo = new Macs(); // Utilizando el modelo Macs
            $nuevoArchivo->nombre = $archivo->getClientOriginalName();
            $nuevoArchivo->tipo = $archivo->getClientMimeType();
            $nuevoArchivo->ruta = $archivo->store('carpeta_destino');
            // Otros campos y lógica según tu modelo Macs
            $nuevoArchivo->save();

            return response()->json(['message' => 'Archivo guardado correctamente'], 200);
        }

        return response()->json(['message' => 'No se ha encontrado ningún archivo para guardar'], 400);
    }
}


