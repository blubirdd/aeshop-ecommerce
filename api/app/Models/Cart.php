<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(CartProduct::class);
    }

    public function calculateTotalPrice()
    {
        $cartTotal = 0;

        foreach ($this->products as $cartProduct) {
            $product = $cartProduct->product;
            $cartTotal += $product->new_price * $cartProduct->quantity;
        }

        return $cartTotal;
    }
}
