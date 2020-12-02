<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = array(
            //言語
            'HTML/CSS',
            'JavaScript/jQuery',
            'PHP',
            'Ruby',
            'Python',
            'Go',
            //言語FW系
            'Vue.js',
            'Vuex',
            'Nuxt.js',
            'React',
            'Redux',
            'Next.js',
            'TypeScript',
            'CakePHP',
            'Laravel',
            'Rails',
            'Django',
            //DB系
            'MySQL',
            'MongoDB',
            'PostgreSQL',
            //インフラ系
            'AWS',
            'CircleCI',
            'Docker',
            'Heroku',
        );
        $arr = [];
        for ($i = 0; $i < count($categories); $i++) {
            $arr[$i] = array(
                'name' => $categories[$i],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            );
        }

        DB::table('categories')->insert($arr);
    }
}
