<?php

namespace Middleware;

require_once 'helpers/Validation.php';

use Helpers\Validation;
use Pecee\Http\Middleware\IMiddleware;
use Pecee\Http\Request;


class CommentCreateMiddleware implements IMiddleware
{
    public function handle(Request $request): void
    {
        Validation::validate($_POST, [
            'body'=>            'required|min:3|max:250',
        ]);
    }
}

