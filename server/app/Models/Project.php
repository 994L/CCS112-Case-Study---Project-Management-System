<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    public function Task(): HasMany
    {
        return $this->hasMany(Task::class);
    }
    protected $fillable = [
        'title',
        'status',
        'description',
    ];

    protected $casts = [
        "title" => "string",
        "status" => "string",
        "description" => "string",
    ];
}