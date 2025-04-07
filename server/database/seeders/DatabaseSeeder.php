<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Arr;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'johndoe@gmail.com',
            'password' => "John Doe"
        ]);

        Project::factory()->count(5)->create()->each(function (Project $project) {
            $numberOfTasks = Arr::random(range(1, 10));
            Task::factory()->count($numberOfTasks)->create([
                'project_id' => $project->id,
            ]);
        });
    }
}