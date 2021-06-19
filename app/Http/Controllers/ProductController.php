<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\UseCases\Products\ShowUseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     *
     */
    public function index()
    {
        $products = Product::with(["user", "categories"])->get();
        return response()->json($products);
    }
    public function show(ShowUseCase $useCase, int $id)
    {
        return $useCase($id);
    }
}
