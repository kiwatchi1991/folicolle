<?php

namespace Tests\Requests;

use Illuminate\Support\Facades\Validator;
use App\Http\Requests\LoginRequest;
use Tests\TestCase;
use Log;


class LoginRequestTest extends TestCase
{
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
        //入力項目の配列（$keys）と値の配列($values)
        $dataList = array_combine($keys, $values);

        $request = new LoginRequest();
        //フォームリクエストで定義したルールを取得
        $rules = $request->rules();
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
                ['email', 'password'],
                ['aaa@gmail.com', 'password'],
                true
            ],
            'メール必須エラー' => [
                ['email', 'password'],
                ['', 'password'],
                false
            ],
            'メール形式エラー1' => [
                ['email', 'password'],
                ['aaa', 'password'],
                false
            ],
            'メール形式エラー2' => [
                ['email', 'password'],
                ['aaa@', 'password'],
                false
            ],
            'メール形式エラー3' => [
                ['email', 'password'],
                ['aaa@gmail.', 'password'],
                false
            ],
            'OK' => [
                ['email', 'password'],
                ['aaa@gmail.c', 'password'],
                true
            ],
            'パスワード必須エラー' => [
                ['email', 'password'],
                ['aaa@gmail.com', ''],
                false
            ],
            'パスワード最小文字数エラー' => [
                ['email', 'password'],
                ['aaa@gmail.com', 'pass'],
                false
            ],
        ];
    }
}
