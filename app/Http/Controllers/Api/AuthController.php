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




        return response()->json([
            'status'=> 'success',
            'data' =>[
                'user' => $user,
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
        }


        return response()->json([
            'status'=> 'success',
            'data' =>[
                'user' => $user,
                'token' => $token
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
     /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function updateUser(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $user,
            ]
        ]);
    }

}
