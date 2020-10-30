<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        // テストユーザー作成
        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     */
    public function should_ログインユーザーを返す()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', route('auth'));

        $response
            ->assertStatus(200)
            ->assertJson(["user" => ["name" => $this->user->name]]);

        $this->assertAuthenticatedAs($this->user);
    }

    public function should_ゲストユーザーの場合はnullを返す()
    {
        $response = $this->json('POST', route('logout'));

        $response
            ->assertStatus(200)
            ->assertJson(['name' => null]);
        $this->assertGuest();
    }
}
