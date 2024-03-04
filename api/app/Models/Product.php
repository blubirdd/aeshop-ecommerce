<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'details',
        'description',
        'category',
        'stock',
        'new_price',
        'old_price',
        'featured',
    ];

    public function carts()
    {
        return $this->hasMany(CartProduct::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected static function booted()
    {
        static::saving(function ($product) {
            $baseSlug = Str::slug($product->name);

            $count = static::where('slug', $baseSlug)->where('id', '<>', $product->id)->count();

            $suffix = $count > 0 ? '-' . ($count + 1) : '';

            $product->slug = $baseSlug . $suffix;
        });
    }

}
