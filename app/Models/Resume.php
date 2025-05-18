<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Resume extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'summary',
        'skills',
        'education',
        'experience',
    ];

    protected $casts = [
        'experience' => 'array',
        'education' => 'array',
        'skills' => 'array'
    ];

    public function user(){
        return $this->belongsTo('User');
    }
}
