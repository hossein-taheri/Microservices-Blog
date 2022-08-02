<?php
require_once 'middlewares/validators/CommentMiddlewares.php';
require_once 'middlewares/JWTAuthMiddleware.php';

use Middleware\JWTAuthMiddleware;
use Pecee\SimpleRouter\SimpleRouter;
use Middleware\CommentCreateMiddleware;


SimpleRouter::group(['prefix' => '/post/{post_id}/comment', 'middleware' => [JWTAuthMiddleware::class]], function () {

    SimpleRouter::post('', 'CommentController@create', ['middleware' => [CommentCreateMiddleware::class]])->setName('user.create');

});