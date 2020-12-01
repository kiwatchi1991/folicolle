<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    /**
     * 削除済みユーザー以外を表示する
     */
    use SoftDeletes;

    protected $table = 'products';
    protected $dates = ['deleted_at'];

    /**
     * ユーザーに紐づくアイデア情報
     *
     * @return array
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo('App\User');
    }
}
