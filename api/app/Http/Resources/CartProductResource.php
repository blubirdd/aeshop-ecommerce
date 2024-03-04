<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'product' => new ProductResource($this->whenLoaded('product')),
            'quantity' => $this->quantity,
        ];
    }
}
