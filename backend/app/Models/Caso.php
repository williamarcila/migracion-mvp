<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Caso extends Model
{
    protected $fillable = [
        'tipo_tramite', 'nacionalidad', 'situacion_actual',
        'nombre', 'email', 'telefono', 'mensaje'
    ];
}
