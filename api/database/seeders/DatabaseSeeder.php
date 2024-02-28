<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::create([
            'name' => 'Admin',
            'email' => 'admin@User.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => "Admin", 
        ]);

        \App\Models\Product::create([
            'name' => 'Chongyun 8bit Controller',
            'details' => 'Immerse yourself in the pixelated world of Teyvat with the Chongyun Pixel Pro 8-bit Controller. This uniquely customized gaming accessory pays homage to the classic era of gaming while capturing the essence of Genshin Impact\'s frosty hero, Chongyun.',
            'description' => 'Game Controller',
            'category' => 'Tech & Gadgets',
            'stock' => 50,
            'new_price' => 399,
            'old_price' => 499,
            'featured' => 'Yes',
        ]);

        \App\Models\Product::create([
            'name' => 'BEE AND PUPPYCAT',
            'details' => 'Adulting is hard when you\'ve got bills to pay. While temp-work may not sound like much, things can get wild when you\'re traveling between dimensions. Wherever your quests take you, PuppyCat will be there to accompany you as this fun plush toy companion. Crafted with the utmost care and attention to detail, this soft character plushie will make your journey through Fishbowl Space extraordinary.',
            'description' => 'Cute Plushie',
            'category' => 'Toys and Games',
            'stock' => 10,
            'new_price' => 100,
            'old_price' => 120,
            'featured' => 'No',
        ]);
        
        

        \App\Models\User::factory(10)->create();

        \App\Models\Post::factory(3)->create();
        // $this->call(PostSeeder::class);

    }
}
