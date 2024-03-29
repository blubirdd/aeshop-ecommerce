<?php

namespace App\Http\Controllers\Api;


use App\Filters\Productsfilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;

use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = new Productsfilter();
        $filterItems = $filter->transform($request);

        $product = Product::where($filterItems);

        return new ProductCollection($product->paginate(10)->appends($request->query()));
        // return response()->json(new ProductCollection($product->paginate()->appends($request->query())), 200);
        // return ProductResource::collection(Product::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;

            $file->move('images/products/', $fileName);

            $data['image'] = 'images/products/' . $fileName;
        }

        $product = Product::create($data);

        return response(new ProductResource($product), 201);
        // return new ProductResource(Product::create($request->all()));

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show(Product $product)
    {
        return new ProductResource($product);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $imagePath = $product->image;

            if ($imagePath && file_exists(public_path($imagePath))) {
                unlink(public_path($imagePath));
            }
            // Upload the new image
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '.' . $extension;
            $file->move('images/products/', $fileName);

            $data['image'] = 'images/products/' . $fileName;
        }

        $product->update($data);

        return new ProductResource($product);
        // return response(new ProductResource($product), 201);
        // $product->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $imagePath = $product->image;

        if ($imagePath && file_exists(public_path($imagePath))) {
            unlink(public_path($imagePath));
        }

        if ($product->delete()) {
            return response("", 204);
        } else {
            return response(['error' => 'Failed to delete product'], 500);
        }
    }

}
