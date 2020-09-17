<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLikeProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('like_product', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('like_id');
            $table->unsignedBigInteger('product_id');
            $table->timestamps();

            // 外部キー制約
            $table->foreign('like_id')->references('id')->on('likes')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('like_product');
    }
}
