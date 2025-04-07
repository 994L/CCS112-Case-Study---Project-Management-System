<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TaskController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, "login"]);

Route::post('/logout', [AuthController::class, "logout"])->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/projects', [ProjectController::class, "index"]);
    Route::post('/projects', [ProjectController::class, "store"]);
    Route::get('/projects/{id}', [ProjectController::class, "show"])->missing(function () {
        return response()->json(["msg" => "Project not found"], 404);
    });
    Route::put('/projects/{id}', [ProjectController::class, "update"])->missing(function () {
        return response()->json(["msg" => "Project not found"], 404);
    });
    Route::delete('/projects/{id}', [ProjectController::class, "destroy"])->missing(function () {
        return response()->json(["msg" => "Project not found"], 404);
    });
    Route::get('/projects/{id}/tasks', [TaskController::class, "index"])->missing(function () {
        return response()->json(["msg" => "Project not found"], 404);
    });
    Route::post('/tasks', [TaskController::class, "store"]);
    Route::put('/tasks/{id}', [TaskController::class, "update"])->missing(function () {
        return response()->json(["msg" => "Project not found"], 404);
    });

});