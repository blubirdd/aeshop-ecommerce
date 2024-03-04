<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = false;
    public function toArray($request)
    {
        return [
            'cart' => [
                'id' => $this->id,
                'user_id' => $this->user_id,
                'products' => CartProductResource::collection($this->products),
            ],
        ];
    }
}
