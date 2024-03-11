<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 
        'user_id',
        'order_date',
        'total_price',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(){
        return $this->hasMany(OrderItem::class)->with('product');
    }

    public $incrementing = false;
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            $order->id = self::generateOrderId();
        });
    }

    protected static function generateOrderId()
    {
        $counter = Cache::increment('order_counter', 1, 0);

        $length = 6;
        $formattedCounter = str_pad($counter, $length, '0', STR_PAD_LEFT);

        return $formattedCounter;
    }

}
