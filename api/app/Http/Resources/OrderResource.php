<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'customer_name' => $this->user->name,
            'order_date' => $this->order_date,
            'total_price' => $this->total_price,
            'status' => $this->status,
            'totalProducts' => $this->orderItems->count(),
            'products' => OrderItemResource::collection($this->whenLoaded('orderItems')),
        ];
    }
}
