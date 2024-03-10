<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Http\Resources\OrderResource;
use Illuminate\Support\Facades\DB;

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

        $orders = Order::with('orderItems')
            ->where('user_id', $user->id)
            ->orderBy('order_date', 'desc')
            ->paginate(10);

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
            'status' => 'Pending'
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
        $order = Order::with('orderItems.product')->find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $orderData = new OrderResource($order);

        return response()->json(['order' => $orderData]);
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
    public function destroy(Order $order)
    {
        $order->orderItems()->delete();
        $order->delete();
    }

    public function topProducts()
    {
        $topProducts = DB::table('order_items')
            ->join('products', 'products.id', '=', 'order_items.product_id')
            ->select('products.id', 'products.name', 'products.image', 'products.stock', DB::raw('SUM(order_items.quantity) as total_quantity'))
            ->groupBy('products.id', 'products.name', 'products.image', 'products.stock')
            ->orderByDesc('total_quantity')
            ->take(5)
            ->get();

        foreach ($topProducts as $product) {
            $product->image = $product->image ? url($product->image) : url("images/proucts/default.jpg");
        }
        return response()->json(['topProducts' => $topProducts]);
    }

    public function recentOrders()
    {
        $recentOrders = Order::with(['orderItems', 'user'])
            ->orderBy('order_date', 'desc')
            ->take(5)
            ->get();

        $recentOrdersData = [];

        foreach ($recentOrders as $order) {
            $orderData = [
                'id' => $order->id,
                'customer_name' => $order->user->name,
                'order_date' => $order->order_date,
                'total_price' => $order->total_price,
                'totalProducts' => $order->orderItems->sum('quantity'),
            ];

            $recentOrdersData[] = $orderData;
        }

        return response()->json(['recentOrders' => $recentOrdersData]);
    }
}
