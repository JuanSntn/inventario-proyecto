<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Macs extends Model
{
    use HasFactory;
    protected $fillable = [
        'responsable', 
        'area',
        'mac',
        'so',
        'version',
        'no_serie',
        'fecha_compra',
        
    ];
}
