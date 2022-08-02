<?php

namespace Middleware;

require_once 'helpers/Validation.php';

use Helpers\Validation;
use Pecee\Http\Middleware\IMiddleware;
use Pecee\Http\Request;


class PostIndexMiddleware implements IMiddleware
{
    public function handle(Request $request): void
    {
        Validation::validate($_GET, [
            'page' => 'numeric|integer|default:1|min:1',
        ]);
    }
}

class PostShowMiddleware implements IMiddleware
{
    public function handle(Request $request): void
    {
    }
}


class PostCreateMiddleware implements IMiddleware
{
    public function handle(Request $request): void
    {
        Validation::validate($_POST, [
            'title' =>          'required|min:1',
            'description'=>     'required|min:10|max:2000',
        ]);
    }
}

