<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
    public function index()
    {
        try {
            $settings = Setting::findOrFail(1);
            return response()->json([
                'success' => true,
                'settings' => $settings
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validation = Validator::make(
            $request->all(),
            [
                'footer_desc' => ['string'],
                'email' => ['string'],
                'address' => ['string'],
                'facebook' => ['string'],
                'instagram' => ['string'],
                'youtube' => ['string'],
                'about_title' => ['string'],
                'about_desc' => ['string'],
                'privacy_desc' => ['string'],
                'terms_desc' => ['string'],
                'other1_desc' => ['string'],
                'other2_desc' => ['string'],
            ]
        );

        if ($validation->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validation->errors()->all(),
            ]);
        } else {
            $result = Setting::findOrFail($id)->update(
                [
                    'header_logo' => '',
                    'footer_logo' => '',
                    'footer_desc' => $request->footer_desc,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'facebook' => $request->facebook,
                    'instagram' => $request->instagram,
                    'youtube' => $request->youtube,
                    'about_title' => $request->about_title,
                    'about_desc' => $request->about_desc,

                    'privacy_desc' => $request->privacy_desc,
                    'terms_desc' => $request->terms_desc,
                    'other1_desc' => $request->other1_desc,
                    'other2_desc' => $request->other2_desc,
                ]
            );
            if ($result) {
                return response()->json([
                    'success' => true,
                    'message' => "Setting Update Successfully",
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => "Some Problem",
                ]);
            }
        }
    }
}
