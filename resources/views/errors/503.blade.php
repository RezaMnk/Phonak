{{-- @extends('errors::minimal')

@section('title', __('Service Unavailable'))
@section('code', '503')
@section('message', __('Service Unavailable')) --}}

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ندا سمعک آشنا</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: "Vazirmatn", sans-serif;
            font-optical-sizing: auto;
        }
    </style>
</head>

<body>
    <div class="flex flex-col items-center justify-center h-screen gap-5">
        <img src="/storage/logo.png" alt="Neda Samak Ashena Logo" class="h-20" />
        <h1 class="text-4xl font-black">ندا سمعک آشنا</h1>
        <p class="text-gray-500 font-semibold text-lg">وبسایت موقتا از دسترس خارج شده است</p>
    </div>
</body>

</html>