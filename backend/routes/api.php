<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\CasoController;

Route::post('/chatbot', [ChatbotController::class, 'ask']);
Route::post('/casos', [CasoController::class, 'store']);
