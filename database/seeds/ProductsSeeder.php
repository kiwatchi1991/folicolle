<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Product::class, 10)->create([
            'title' => "タイトル",
            'description' => '説明説明説明説明説明説明説明説明説明',
            'body' => "これは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文です"
        ]);
    }
}
