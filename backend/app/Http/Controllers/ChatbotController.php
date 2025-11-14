<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use OpenAI;

class ChatbotController extends Controller
{
    public function ask(Request $request)
    {
        $messages = $request->input('messages', []);
        $client = OpenAI::client(env('OPENAI_API_KEY'));

        $systemPrompt = "Eres 'Diana', asistente legal de migracion.com.mx. Ayudas con trámites migratorios en México. No das asesoría legal directa, solo guías. Si es complejo, recomiendas consulta con abogada. Habla en español claro, empático. Usa listas y pasos.";

        $response = $client->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => $systemPrompt],
                ...array_map(fn($m) => ['role' => $m['role'], 'content' => $m['content']], $messages)
            ],
            'temperature' => 0.7,
        ]);

        return response()->json(['reply' => $response->choices[0]->message->content]);
    }
}
