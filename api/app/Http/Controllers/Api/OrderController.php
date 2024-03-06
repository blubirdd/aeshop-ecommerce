<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
    
        $orders = Order::where('user_id', $user->id)->orderBy('order_date', 'desc')->paginate(10);
    
        $orderData = OrderResource::collection($orders);
    
        return response()->json(['orders' => $orderData]);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart;

        if ($cart->products->isEmpty()) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }
        
        $totalPrice = $cart->calculateTotalPrice();

        $order = Order::create([
            'user_id' => $user->id,
            'order_date' => now(),
            'total_price' => $totalPrice,
            'status' => 'pending'
        ]);

        foreach ($cart->products as $cartProduct) {
            $product = $cartProduct->product;

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $cartProduct->quantity,
                'price' => $product->new_price,
            ]);

            $cartProduct->delete();
        }

        $cart->products()->delete();

        return response()->json(['message' => 'Order created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}