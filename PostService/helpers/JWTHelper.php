<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

JWT::$leeway = 60 * 60 * 24 * 30 * 50;

class JWTHelper {
    public static function decodeAccessToken($token) {
        $key = $GLOBALS['config']['keys']['JWT'];

        $decoded = JWT::decode($token, new Key($key, 'HS256'));

        if ( $decoded->type != 'AccessToken' ){
            throw new ForbiddenException("Token is not an access token");
        }

        if ($decoded->exp < time()) {
            throw new ForbiddenException("Token has been expired");
        }

        return [
            'user_id' => $decoded->id
        ];
    }
}
