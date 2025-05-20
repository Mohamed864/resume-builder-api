<!DOCTYPE html>
<html>

<head>
    <title>Resume PDF</title>
    <style>
        body {
            font-family: DejaVu Sans;
        }
    </style>
</head>

<body>
    <h1>{{ $resume->title }}</h1>
    <p><strong>Summary:</strong> {{ $resume->summary }}</p>

    <h3>Skills</h3>
    <ul>
        @foreach ($resume->skills ?? [] as $skill)
            <li>{{ $skill }}</li>
        @endforeach
    </ul>

    <h3>Education</h3>
    <ul>
        @foreach ($resume->education ?? [] as $edu)
            <li>{{ $edu['school'] }} - {{ $edu['degree'] }}</li>
        @endforeach
    </ul>

    <h3>Experience</h3>
    <ul>
        @foreach ($resume->experience ?? [] as $exp)
            <li>{{ $exp['company'] }} - {{ $exp['role'] }} ({{ $exp['years'] }} years)</li>
        @endforeach
    </ul>
</body>

</html>
