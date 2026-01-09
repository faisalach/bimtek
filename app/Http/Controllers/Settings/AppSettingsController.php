<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\AppSettingsRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Settings;

class AppSettingsController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('settings/appSettings');
    }

    public function update(AppSettingsRequest $request): RedirectResponse
    {
        $app_name   = $request->app_name;
        $update     = Settings::where("key","app_name")->update(["value" => $app_name]);
        return to_route('appSettings.edit');
    }
}
