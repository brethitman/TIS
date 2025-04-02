<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (Auth ::attempt($credentials))
        {
            return response()->json(["message" => "Credenciales incorrectas 401"]);

        }

        $user = User::find(Auth::user()['id']);

        $token = $user->createToken("token")->plainTexttToken;

        return response()->json([
            "user" => $user,
            "token" => $token


        ]);

    }


    public function logout(){

    }


    public function register(){

    }

    public function checkToken(Request $request){

    }
}

