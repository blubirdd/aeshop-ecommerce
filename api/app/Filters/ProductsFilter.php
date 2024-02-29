<?php

namespace App\Filters;
use Illuminate\Http\Request;

class Productsfilter extends ApiFilter {
    protected $allowedParams = [
        'name' => ['eq'],
        'details' => ['eq'],
        'description' => ['eq'],
        'stock' => ['eq', 'gt', 'gte', 'lt', 'lte'],
        'category' => ['eq'],
        'newPrice' => ['eq', 'lt', 'lte', 'gt', 'gte'],
        'featured' => ['eq'],
    ];

    protected $operatorMap = [
    'eq' => '=',
    'lt' => '<',
    'lte' => '<=',
    'gt' => '>',
    'gte' => '>='
    ];

}