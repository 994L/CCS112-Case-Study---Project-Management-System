<?php

namespace App\Http\Controllers\API;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Controllers\Controller;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(["projects" => Project::all()], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        return response()->json(["created_project" => Project::create($request->validated())], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $id)
    {
        return response()->json(["searched_project" => $id], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $id)
    {
        $id->update($request->validated());
        return response()->json(["msg" => "Project is updated"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $id)
    {
        $id->delete();
        return response()->json(["msg" => "Project deleted"], 200);
    }
}