    <?php

    use App\Http\Controllers\Api\AuthController;
    use App\Http\Controllers\Api\User\CartController;
    use App\Http\Controllers\Api\UserController;
    use App\Http\Controllers\Api\PostController;
    use App\Http\Controllers\Api\ProductController;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;

    /*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | is assigned the "api" middleware group. Enjoy building your API!
    |
    */

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::apiResource('cart', CartController::class);
        Route::get('/cartSummary', [CartController::class, 'getCartSummary']);
    });

    Route::middleware('auth:sanctum', 'admin')->group(function () {
        Route::apiResource('/users', UserController::class);
        Route::apiResource('/posts', PostController::class);
        Route::apiResource('/products', ProductController::class);
        Route::get('/posts/search', [PostController::class, 'search']);
    });

    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);