<?php
require_once 'middlewares/validators/PostMiddlewares.php';
require_once 'middlewares/JWTAuthMiddleware.php';

use Middleware\JWTAuthMiddleware;
use Pecee\SimpleRouter\SimpleRouter;
use Middleware\PostIndexMiddleware;
use Middleware\PostShowMiddleware;
use Middleware\PostStoreMiddleware;


SimpleRouter::group(['prefix' => '/post', 'middleware' => [JWTAuthMiddleware::class]], function () {

    SimpleRouter::get('/', 'PostController@index', ['middleware' => [PostIndexMiddleware::class]])->setName('user.index');

    SimpleRouter::get('/{id}', 'PostController@show', ['middleware' => [PostShowMiddleware::class]])->setName('user.show');

    SimpleRouter::post('/', 'PostController@create', ['middleware' => [PostStoreMiddleware::class]])->setName('user.create');

});