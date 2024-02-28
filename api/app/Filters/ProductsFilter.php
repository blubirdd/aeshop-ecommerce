<?php

namespace App\Filters;
use Illuminate\Http\Request;

class Productsfilter extends ApiFilter {
    protected $allowedParams = [
        'name' => ['eq'],
        'details' => ['eq'],
        'description' => ['eq'],
        'stock' => ['eq'],
        'category' => ['eq'],
        'newPrice' => ['lt', 'gt'],
        'featured' => ['eq'],
    ];

    protected $operatorMap = [
    'eq' => '=',
    'lt' => '<',
    'gt' => '>,'
    ];

}