<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class UpdateProductRequest extends FormRequest

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
        $method = $this->method();
        if ($method == 'PUT') {
            return [
                'name' => ['required'],
                'details' => ['required'],
                'description' => ['required'],
                'category' => ['required'],
                'stock' => ['required', 'numeric'],
                'new_price' => ['required', 'numeric'],
                'old_price' => ['required', 'numeric'],
                'featured' => ['required',  Rule::in(['Yes', 'No'])],
            ];
        } 
        
        else {
            return [
                'name' => ['sometimes', 'required'],
                'details' => ['sometimes', 'required'],
                'description' => ['sometimes', 'required'],
                'category' => ['sometimes', 'required'],
                'stock' => ['sometimes', 'required', 'numeric'],
                'new_price' => ['sometimes', 'required', 'numeric'],
                'old_price' => ['sometimes', 'required', 'numeric'],
                'featured' => ['sometimes', 'required', Rule::in(['Yes', 'No'])],
            ];
        }

    }
}
