<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiController extends Controller
{
    public function tailorSummary(Request $request)
    {
 $jobDescription = $request->input('job_description');
    $resumeSummary = $request->input('summary');

    $prompt = "Rewrite this resume summary to better match the following job description:\n\n"
            . "Resume Summary: $resumeSummary\n"
            . "Job Description: $jobDescription";

    $response = Http::withToken(env('OPENAI_API_KEY'))->post('https://api.openai.com/v1/chat/completions', [
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            ['role' => 'system', 'content' => 'You are a professional resume assistant.'],
            ['role' => 'user', 'content' => $prompt],
        ],
        'max_tokens' => 150,
        'temperature' => 0.7,
    ]);

    if (!$response->successful()) {
        return response()->json([
            'error' => 'OpenAI request failed',
            'details' => $response->body()
        ], 500);
    }

    $text = $response['choices'][0]['message']['content'] ?? null;

    return response()->json([
        'tailored_output' => trim($text) ?: 'No result',
    ]);

    }
}
