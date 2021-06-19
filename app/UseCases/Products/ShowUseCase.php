<?php

namespace App\UseCases\Products;

use App\Models\Product;

class ShowUseCase
{

    public function __construct()
    {
        //
    }

    public function __invoke($id): array
    {
        $product = Product::with(["user", "categories"])->find($id);
        return ['data' => $product];
    }
}
