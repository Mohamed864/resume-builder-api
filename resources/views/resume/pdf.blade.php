<!DOCTYPE html>
<html>

<head>
    <title>{{ $resume->title ?? 'Resume' }}</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }

        h2 {
            color: #2980b9;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            margin-top: 10px;
        }

        h3 {
            color: #16a085;
            margin-bottom: 5px;
        }

        .section {
            margin-bottom: 10px;
        }

        .item {
            margin-bottom: 15px;
        }

        .item-header {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
        }

        .item-subheader {
            display: flex;
            justify-content: space-between;
            font-style: italic;
            margin-bottom: 5px;
        }

        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .skill-item {
            background: #f0f0f0;
            padding: 3px 8px;
            border-radius: 3px;
        }

        /* Alternative: Skills with commas (no boxes) */
        /*
        .skills-list {
            padding: 0;
            margin: 0;
            list-style: none;
        }
        .skill-item:after {
            content: ", ";
        }
        .skill-item:last-child:after {
            content: "";
        }
        */
    </style>
</head>

<body>
    @php
        // Safely decode JSON data or use empty arrays
        $skills = is_array($resume->skills) ? $resume->skills : [];
        $education = is_array($resume->education) ? $resume->education : json_decode($resume->education, true) ?? [];
        $experience = is_array($resume->experience)
            ? $resume->experience
            : json_decode($resume->experience, true) ?? [];
    @endphp

    <header>
        <h1>{{ $resume->title ?? 'Professional Resume' }}</h1>
        @if (!empty($resume->summary))
            <div class="section">
                <h2>Professional Summary</h2>
                <p>{{ $resume->summary }}</p>
            </div>
        @endif
    </header>

    @if (!empty($skills))
        <div class="section">
            <h2>Skills</h2>
            <ul class="skills-list">
                @foreach ($skills as $skill)
                    <li class="skill-item">{{ $skill }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    @if (!empty($education))
        <div class="section">
            <h2>Education</h2>
            @foreach ($education as $item)
                <div class="item">
                    <div class="item-header">
                        <span>{{ $item['degree'] ?? 'Degree not specified' }}</span>
                        @if (isset($item['start_date']) || isset($item['end_date']))
                            <span>
                                {{ $item['start_date'] ?? '' }}
                                @if (isset($item['start_date']) && isset($item['end_date']))
                                    -
                                @endif
                                {{ $item['end_date'] ?? 'Present' }}
                            </span>
                        @endif
                    </div>
                    <div class="item-subheader">
                        <span>{{ $item['school'] ?? 'Institution not specified' }}</span>
                        <span>{{ $item['location'] ?? '' }}</span>
                    </div>
                    @if (!empty($item['description']))
                        <p>{{ $item['description'] }}</p>
                    @endif
                </div>
            @endforeach
        </div>
    @endif

    @if (!empty($experience))
        <div class="section">
            <h2>Work Experience</h2>
            @foreach ($experience as $exp)
                <div class="item">
                    <div class="item-header">
                        <span>{{ $exp['role'] ?? 'Position not specified' }}</span>
                        @if (isset($exp['start_date']) || isset($exp['end_date']))
                            <span>
                                {{ $exp['start_date'] ?? '' }}
                                @if (isset($exp['start_date']) && isset($exp['end_date']))
                                    -
                                @endif
                                {{ $exp['end_date'] ?? 'Present' }}
                            </span>
                        @endif
                    </div>
                    <div class="item-subheader">
                        <span>{{ $exp['company'] ?? 'Company not specified' }}</span>
                        <span>{{ $exp['location'] ?? '' }}</span>
                    </div>
                    @if (!empty($exp['description']))
                        <p>{{ $exp['description'] }}</p>
                    @endif
                    @if (!empty($exp['achievements']))
                        <ul>
                            @foreach ((array) $exp['achievements'] as $achievement)
                                <li>{{ $achievement }}</li>
                            @endforeach
                        </ul>
                    @endif
                </div>
            @endforeach
        </div>
    @endif

    @if (!empty($resume->additional_info))
        <div class="section">
            <h2>Additional Information</h2>
            <p>{{ $resume->additional_info }}</p>
        </div>
    @endif
</body>

</html>
