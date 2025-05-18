<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//Added
use App\Models\User;
use Illuminate\Support\Facades\Auth;
//Added
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;



class AuthController extends Controller
{
    //Register function
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),

        ]);

        // Create one token and save it manually
        $token = $user->createToken('main')->plainTextToken;
        $pureToken = explode('|', $token)[1] ?? '$token';
        $user->access_token = $pureToken;
        $user->save();


        return response()->json([
            'status'=> 'success',
            'data' =>[
                'user' => $user,
                'token' => $pureToken,
                ]
        ]);

    }


    //Login function
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                'message'=>'Provided email or password is incorrect'
            ], 422);
        }

        $user = Auth::user();

        // Check if the user already has a token
        if(!$user->access_token){
            $token = $user->createToken('main')->plainTextToken;
            $pureToken = explode('|', $token)[1] ?? '$token';
            $user->access_token = $pureToken;
            $user->save();
        }


        return response()->json([
            'status'=> 'success',
            'data' =>[
                'user' => $user,
                'token' => $user->access_token,
                ]
        ]);
    }

    //Get User function
    public function user(Request $request)
    {
        return $request->user();
    }


    //Logout function
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToke()->delete();
        return response('logged out',204);
    }
}
