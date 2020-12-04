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
            'description' => 'これは説明です。これは説明です。これは説明です。これは説明です。これは説明です。これは説明です。これは説明です。これは説明です。これは説明です。',
            'body' => "これは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文ですこれは記事本文です"
        ]);

        //各プロダクトに、ランダムで３つカテゴリーを紐づける
        $categories = Category::all();

        $count = 7;
        $arr = [];
        foreach ($products as $product) {
            for ($i = 0; $i < $count; $i++) {
                $r = mt_rand(0, count($categories) - 1);
                $arr[$i] = $categories[$r]->id;
            }
            $product->categories()->sync($arr);
        }
    }
}
