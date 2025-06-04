<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'josue',
                'email' => 'josue@gmail.com',
                'password' => bcrypt('password'),
                'created_at' => now(), // Corregir aquí
                'updated_at' => now(), // Corregir aquí
            ]
        ]);
    }
}
