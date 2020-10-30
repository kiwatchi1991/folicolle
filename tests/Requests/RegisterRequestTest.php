<?php

namespace Tests\Requests;

use App\User;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\RegisterRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;


class RegisterRequestTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        // テストユーザー作成
        $this->user = factory(User::class)->create();
    }

    /**
     * カスタムリクエストのバリデーションテスト
     *
     * @param array 項目名の配列
     * @param array 値の配列
     * @param boolean 期待値(true:バリデーションOK、false:バリデーションNG)
     * @dataProvider dataproviderExample
     */
    public function testExample(array $keys, array $values, bool $expect)
    {
        // Log::debug($this->user);
        //入力項目の配列（$keys）と値の配列($values)
        $dataList = array_combine($keys, $values);
        Log::debug('dataList');
        Log::debug($dataList);
        $request = new RegisterRequest();
        //フォームリクエストで定義したルールを取得
        $rules = $request->rules();
        Log::debug('rules');
        Log::debug($rules);
        //Validatorファサードでバリデーターのインスタンスを取得、その際に入力情報とバリデーションルールを引数で渡す
        $validator = Validator::make($dataList, $rules);
        //入力情報がバリデーショルールを満たしている場合はtrue、満たしていな場合はfalseが返る
        $result = $validator->passes();
        //期待値($expect)と結果($result)を比較
        $this->assertEquals($expect, $result);
    }

    public function dataproviderExample()
    {
        return [
            'OK' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'aaa@gmail.com', 'password', 'password'],
                true
            ],
            '名前必須エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                [null, 'aaa@gmail.com', 'password', 'password'],
                false
            ],
            '名前形式エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                [1, 'aaa@gmail.com', 'password', 'password'],
                false
            ],
            '名前最大文字数エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                [str_repeat('a', 256), 'aaa@gmail.com', 'password', 'password'],
                false
            ],
            'OK' => [
                ['name', 'email', 'password', 'password_confirmation'],
                [str_repeat('a', 255), 'aaa@gmail.com', 'password', 'password'],
                true
            ],
            'email必須エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', null, 'password', 'password'],
                false
            ],
            'email形式エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'aaa@gmail.', 'password', 'password'],
                false
            ],
            'email最大文字数エラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', str_repeat('a', 255) . '@gmail.com', 'password', 'password'],
                false
            ],
            'emailユニークエラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', $this->user->email, 'password', 'password'],
                false
            ],
            'passwordユニークエラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'aaa@gmail.com', '', ''],
                false
            ],
            'passwordユニークエラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'aaa@gmail.com', 'pass', 'pass'],
                false
            ],
            'passwordユニークエラー' => [
                ['name', 'email', 'password', 'password_confirmation'],
                ['testuser', 'aaa@gmail.com', 'password', 'password1'],
                false
            ],
        ];
    }
}