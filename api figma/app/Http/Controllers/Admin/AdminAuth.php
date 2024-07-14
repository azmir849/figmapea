<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminAuth extends Controller
{
    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);
        if ($validation->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validation->errors()->all(),
            ]);
        } else {
            $user = User::where('name', $request->name)->first();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid username and password',
                ]);
            } else {
                if (!Hash::check($request->password, $user->password)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid username and password',
                    ]);
                } else {
                    $token = $user->createToken('token')->plainTextToken;

                    return response()->json([
                        'success' => true,
                        'message' => 'Login Successfully',
                        'token' => $token,
                        'user' => $user
                    ]);
                }
            }
        }
    }

    public function admins(Request $request)
    {
        $users = $request->user();
        return response()->json([$users]);
    }

    public function logout(Request $request)
    {
        $id = $request->user()->id;
        auth()->user()->tokens()->where('tokenable_id', $id)->delete();
    }
}
