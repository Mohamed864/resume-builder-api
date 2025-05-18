<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

//added
use App\Models\Resume;
use App\Http\Requests\StoreResumeRequest;
use App\Http\Requests\UpdateResumeRequest;
use App\Http\Resources\ResumeResource;



class ResumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return auth()->user()->resumes; // Return only the user's resumes
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResumeRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = auth()->id();

        $resume = Resume::create($data);

        return response()->json(new ResumeResource($resume),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Resume $resume)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resume $resume)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResumeRequest $request, Resume $resume)
    {


        $data = $request->validated();
        $resume->update($data);

        return response()->json(new ResumeResource($resume),201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resume $resume)
    {


        $resume->delete();

        return response('deleted',201);
    }
}
