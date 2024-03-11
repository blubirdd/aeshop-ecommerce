<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartResource;
use App\Models\CartProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        $cart = $user->cart;

        $cart->load('products.product');

        return new CartResource($cart);
    }

    public function getCartSummary(Request $request)
    {
        $user = $request->user();

        if (!$user->cart) {
            $cart = $user->cart()->create();
        } 
        
        $cart = $user->cart;

        $cart->load('products');

        $totalQuantity = $cart->products->count();
        $totalAmount = $cart->calculateTotalPrice();
        return response()->json([
            'totalQuantity' => $totalQuantity,
            'totalAmount' => $totalAmount,
        ]);
    }
    /**
     * Store a newly created resource in storage.   
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // check if user has cart, else create
        if (!$user->cart) {
            $cart = $user->cart()->create();
        } else {
            $cart = $user->cart;
        }

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::find($request->product_id);

        // check if the product exists
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // check if the product is already in the cart
        $existingCartProduct = $cart->products()->where('product_id', $product->id)->first();

        // update the quantity if product is existing in cart
        if ($existingCartProduct) {
            $existingCartProduct->update(['quantity' => $existingCartProduct->quantity + $request->quantity]);
        } else {
            //add to cart
            $cartProduct = new CartProduct([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
            ]);

            $cart->products()->save($cartProduct);
        }

        // $cart->load('products.product');

        // return new CartResource($cart);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $productId)
    {
        $user = $request->user();
        $cart = $user->cart;
    
        $cartProduct = $cart->products()->where('product_id', $productId)->first();
    
        if (!$cartProduct) {
            return response()->json(['error' => 'Product not found in the cart'], 404);
        }
    
        //check if the action is increment or decrement
        $action = $request->input('action');
    
        if ($action === 'inc') {
            $cartProduct->update(['quantity' => $cartProduct->quantity + 1]);
        }
        else if ($action === 'dec') {
            $cartProduct->update(['quantity' => max(1, $cartProduct->quantity - 1)]);
        } else {
            return response()->json(['error' => 'Invalid action'], 400);
        }
    
        return response()->json(['Success' => 'Updated product quantity']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $productId)
    {
        $user = $request->user();

        $cart = $user->cart;

        // check if the product is in the cart
        $cartProduct = $cart->products()->where('product_id', $productId)->first();

        if (!$cartProduct) {
            return response()->json(['error' => 'Product not found in the cart'], 404);
        }

        // remove the product from the cart
        $cartProduct->delete();

        return response()->json(['message' => 'Product removed from the cart']);
    }
}
