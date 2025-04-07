<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            Auth::login($user);

            return response()->json(["msg" => "User logged in", "token" => $user->createToken($user->email)->plainTextToken, "user" => $user], 200);
        }

        return response()->json(["msg" => "User not identified"], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(["msg" => "User logged out"], 200);
    }
}