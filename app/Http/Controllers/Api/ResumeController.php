<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

//added
use App\Models\Resume;
use App\Http\Requests\StoreResumeRequest;
use App\Http\Requests\UpdateResumeRequest;
use App\Http\Resources\ResumeResource;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ResumeController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ResumeResource::collection(Resume::where('user_id', Auth::id())->latest()->paginate());
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
        // Merge user_id with data
        $data = array_merge($request->validated(), ['user_id' => auth()->id()]);

        // Create resume
        $resume = Resume::create($data);

        return response()->json(new ResumeResource($resume),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Resume $resume)
    {
        $this->authorize('view',$resume);

        return new ResumeResource($resume);
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
        // Merge user_id with data
        $this->authorize('update',$resume);
        $data = $request->validated();
        $resume->update($data);

        return response()->json(new ResumeResource($resume),201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resume $resume)
    {

        $this->authorize('delete',$resume);
        $resume->delete();

        return response('deleted',201);
    }

    public function download(Resume $resume)
    {
        $this->authorize('view',$resume);

        $pdf = Pdf::loadView('resume.pdf',['resume' => $resume]);

        return $pdf->download('resume.pdf');
    }
}
