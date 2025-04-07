<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    public function Project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    protected $fillable = [
        "title",
        "project_id",
        "status",
    ];

    protected $casts = [
        "title" => "string",
        "project_id" => "int",
        "status" => "string",
    ];
}