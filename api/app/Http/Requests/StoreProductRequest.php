<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'unique:products'],
            'details'=> ['required'],
            'description'=> ['required'],
            'category'=> ['required'],
            'stock'=> ['required', 'numeric'],
            'newPrice'=> ['required', 'numeric'],
            'oldPrice'=> ['required', 'numeric'],
            'featured'=> ['required', Rule::in(['Yes', 'No'])],
        ];
    }
}
