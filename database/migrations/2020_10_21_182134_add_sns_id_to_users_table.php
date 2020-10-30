<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSnsIdToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('twitter_id')->nullable()->after('github_url');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->string('google_id')->nullable()->after('twitter_id');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->string('github_id')->nullable()->after('google_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('twitter_id');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('google_id');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('github_id');
        });
    }
}
