<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Caso;

class CasoController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'tipo_tramite' => 'required',
            'nacionalidad' => 'required',
            'situacion_actual' => 'required',
            'nombre' => 'required',
            'email' => 'required|email',
            'telefono' => 'nullable',
            'mensaje' => 'nullable'
        ]);

        Caso::create($data);
        return response()->json(['message' => 'Caso creado']);
    }
}
