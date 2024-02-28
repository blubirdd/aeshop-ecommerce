<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            "id"=> $this->id,
            "name"=> $this->name,
            "details"=>$this->details,
            "description"=> $this->description,
            "category" => $this->category,
            "stock" => $this->stock,
            "newPrice" => $this->new_price,
            "oldPrice" => $this->old_price,
            "featured" => $this->featured,       
        ];
    }
}