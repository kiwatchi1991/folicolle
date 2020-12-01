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
        $products = Product::all();
        return response()->json($products);
    }
}
