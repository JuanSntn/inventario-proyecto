<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventario extends Model
{
    use HasFactory;
    protected $fillable = [
        'empresa', 
        'bodega',
        'descripcion',
        'marca',
        'modelo',
        'no_serie',
        'area',
        'caracteristicas',
        'manofactura',
        'responsable',
        'cod_interna',
        'fecha_inv'
    ];
}
