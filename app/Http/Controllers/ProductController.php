<?php

namespace App\Http\Controllers;

use App\Product;
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
}
