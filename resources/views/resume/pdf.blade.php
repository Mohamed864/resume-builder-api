<!DOCTYPE html>
<html>

<head>
    <title>{{ $resume->title ?? 'Resume' }}</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            line-height: 1.5;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .name {
            font-size: 28px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .title {
            font-size: 18px;
            color: #7f8c8d;
            margin-bottom: 15px;
        }

        .contact-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 20px;
        }

        .contact-links a {
            color: #3498db;
            text-decoration: none;
        }

        .contact-links span {
            color: #95a5a6;
        }

        h2 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
            margin-top: 25px;
        }

        .section {
            margin-bottom: 20px;
        }

        .education-item,
        .experience-item {
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
            color: #7f8c8d;
            margin-bottom: 5px;
        }

        .skills-container {
            display: flex;

            gap: 3px;
        }

        .skill-item {
            background: #ecf0f1;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 14px;
        }

        ul {
            padding-left: 20px;
        }

        li {
            margin-bottom: 5px;
        }
    </style>
</head>

<body>
    @php
        $skills = is_array($resume->skills) ? $resume->skills : [];
        $education = is_array($resume->education) ? $resume->education : json_decode($resume->education, true) ?? [];
        $experience = is_array($resume->experience)
            ? $resume->experience
            : json_decode($resume->experience, true) ?? [];
    @endphp

    <div class="header">
        <div class="name">{{ $user->name ?? 'Your Name' }}</div>
        <div class="title">{{ $resume->title ?? 'Professional Title' }}</div>

        <div class="contact-links">
            @if (!empty($user->linkedin))
                <a href="{{ $user->linkedin }}">LinkedIn</a> <span>|</span>
            @endif
            @if (!empty($user->github))
                <a href="{{ $user->github }}">GitHub</a> <span>|</span>
            @endif
            @if (!empty($user->portfolio))
                <a href="{{ $user->portfolio }}">Portfolio</a> <span>|</span>
            @endif
            @if (!empty($user->phone))
                <span>{{ $user->phone }}</span>
            @endif
        </div>
    </div>

    @if (!empty($resume->summary))
        <div class="section">
            <h2>Summary</h2>
            <p>{{ $resume->summary }}</p>
        </div>
    @endif

    @if (!empty($education))
        <div class="section">
            <h2>Education</h2>
            @foreach ($education as $item)
                <div class="education-item">
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

    @if (!empty($skills))
        <div class="section">
            <h2>Skills</h2>
            <div class="skills-container">
                @foreach ($skills as $skill)
                    <div class="skill-item">{{ $skill }}</div>
                @endforeach
            </div>
        </div>
    @endif

    @if (!empty($experience))
        <div class="section">
            <h2>Experience</h2>
            @foreach ($experience as $exp)
                <div class="experience-item">
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
</body>

</html>
