<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameTwitterToTwitterUrlAndGithubGithubUrlOnUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('twitter', 'twitter_url');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('github', 'github_url');
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
            $table->renameColumn('twitter_url', 'twitter');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('github_url', 'github');
        });
    }
}
