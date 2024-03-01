<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        'image',
        'details',
        'description',
        'category',
        'stock',
        'new_price',
        'old_price',
        'featured',
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
