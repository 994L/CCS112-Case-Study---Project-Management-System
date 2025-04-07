<?php

namespace App\Http\Controllers\API;

use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(["message" => "Project not found", 404]);
        }
        return response()->json(["tasks" => $project->Task], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        return response()->json(["created_task" => Task::create($request->validated())], 201);
    }

    public function update(UpdateTaskRequest $request, Task $id)
    {
        $id->update($request->validated());
        return response()->json(["msg" => "Task is updated"], 200);
    }
}