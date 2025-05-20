<?php

use App\Models\Resume;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/resume/{id}', function ($id) {
    $resume = Resume::findOrFail($id);
    return view('resume.pdf', compact('resume'));
});
