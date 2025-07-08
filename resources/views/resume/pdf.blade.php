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
    @php
        $skills = is_array($resume->skills) ? $resume->skills : json_decode($resume->skills, true);
        $education = json_decode($resume->education, true);
        $experience = json_decode($resume->experience, true);
    @endphp

    <h1>{{ $resume->title }}</h1>
    <p><strong>Summary:</strong> {{ $resume->summary }}</p>

    <h3>Skills</h3>
    <ul>
        @foreach ($skills as $skill)
            <li>{{ $skill }}</li>
        @endforeach
    </ul>

    <h3>Education</h3>
    <ul>
        @foreach ($education as $item)
            <li>{{ $item['school'] }} - {{ $item['degree'] }}</li>
        @endforeach
    </ul>

    <h3>Experience</h3>
    <ul>
        @foreach ($experience as $exp)
            <li>{{ $exp['company'] }} - {{ $exp['role'] }} ({{ $exp['years'] ?? 'N/A' }} years)</li>
        @endforeach
    </ul>
</body>

</html>
