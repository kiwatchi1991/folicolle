<?php

use App\Category;
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
        $products = factory(Product::class, 10)->create([
            'title' => "タイトル",
            'description' => '説明説明説明説明説明説明説明説明説明',
            'body' => "これは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文です"
        ]);

        //各プロダクトに、ランダムで３つカテゴリーを紐づける
        $categories = Category::all();

        foreach ($products as $product) {
            $r = mt_rand(0, count($categories) - 1);
            $r1 = mt_rand(0, count($categories) - 1);
            $r2 = mt_rand(0, count($categories) - 1);

            $product->categories()->sync([
                $categories[$r]->id,
                $categories[$r1]->id,
                $categories[$r2]->id
            ]);
        }
    }
}
