<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductsTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        // テストプロダクト作成
        $this->products = factory(Product::class)->create([
            "title" => 'タイトル１'
        ]);
    }
    /**
     * @test
     */
    public function GETリクエストで200が返ってくる()
    {
        $response = $this->get('api/products/');
        $response->assertStatus(200);
    }
    /**
     * @test
     */
    public function GETリクエストで一覧データが返ってくる()
    {
        $response = $this->get('api/products/');

        $response->assertJsonCount(1)
            ->assertJsonFragment([
                "title" => 'タイトル１'
            ]);
    }

    /**
     * @test
     */
    public function GETリクエストで詳細データが返ってくる()
    {
        $response = $this->get("api/products/{$this->products->id}");

        $response->assertJsonCount(1)
            ->assertJsonFragment([
                "title" => 'タイトル１'
            ]);
    }
}
