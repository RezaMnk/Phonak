<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'این فیلد باید تایید شود',
    'accepted_if' => 'زمانی که فیلد :other برابر :value است :attribute باید تایید شود',
    'active_url' => 'این فیلد یک آدرس سایت معتبر نیست',
    'after' => 'این فیلد باید تاریخی بعد از :date باشد',
    'after_or_equal' => 'این فیلد باید تاریخی مساوی یا بعد از :date باشد',
    'alpha' => 'این فیلد باید تنها شامل حروف باشد',
    'alpha_dash' => 'این فیلد باید تنها شامل حروف، اعداد، خط تیره و زیر خط باشد',
    'alpha_num' => 'این فیلد باید تنها شامل حروف و اعداد باشد',
    'array' => 'این فیلد باید آرایه باشد',
    'ascii' => 'این فیلد تنها میتواند شامل تک حرف، عدد یا نماد ها باشد. .',
    'before' => 'این فیلد باید تاریخی قبل از :date باشد',
    'before_or_equal' => 'این فیلد باید تاریخی مساوی یا قبل از :date باشد',
    'between' => [
        'array' => 'این فیلد باید بین :min و :max آیتم باشد',
        'file' => 'این فیلد باید بین :min و :max کیلوبایت باشد',
        'numeric' => 'این فیلد باید بین :min و :max باشد',
        'string' => 'این فیلد باید بین :min و :max کاراکتر باشد',
    ],
    'boolean' => 'این فیلد تنها می تواند صحیح یا غلط باشد',
    'confirmed' => 'تایید مجدد این فیلد صحیح نمی باشد',
    'current_password' => 'رمزعبور صحیح نمی باشد',
    'date' => 'این فیلد یک تاریخ صحیح نمی باشد',
    'date_equals' => 'این فیلد باید تاریخی مساوی با :date باشد',
    'date_format' => 'این فیلد با فرمت :format همخوانی ندارد',
    'decimal' => 'این فیلد باید :decimal رقم اعشار داشته باشد.',
    'declined' => 'این فیلد باید رد شود',
    'declined_if' => 'این فیلد زمانی که :other برابر :value است باید رد شود',
    'different' => 'این فیلد و :other باید متفاوت باشند',
    'digits' => 'این فیلد باید :digits عدد باشد',
    'digits_between' => 'این فیلد باید بین :min و :max عدد باشد',
    'dimensions' => 'ابعاد تصویر این فیلد مجاز نمی باشد',
    'distinct' => 'این فیلد دارای افزونگی داده می باشد',
    'doesnt_end_with' => 'این فیلد نباید با این مقادیر به پایان برسد: :values.',
    'doesnt_start_with' => 'این فیلد نباید با این مقادیر شروع شود: :values.',
    'email' => 'این فیلد باید یک آدرس ایمیل صحیح باشد',
    'ends_with' => 'این فیلد باید با یکی از این مقادیر پایان یابد، :values',
    'enum' => 'این فیلد صحیح نمی باشد',
    'exists' => 'فیلد وارد شده صحیح نمی باشد',
    'file' => 'این فیلد باید یک فایل باشد',
    'filled' => 'این فیلد نمی تواند خالی باشد',
    'gt' => [
        'array' => 'این فیلد باید بیشتر از :value آیتم باشد',
        'file' => 'این فیلد باید بزرگتر از :value کیلوبایت باشد',
        'numeric' => 'این فیلد باید بزرگتر از :value باشد',
        'string' => 'این فیلد باید بزرگتر از :value کاراکتر باشد',
    ],
    'gte' => [
        'array' => 'این فیلد باید :value آیتم یا بیشتر داشته باشد',
        'file' => 'این فیلد باید بزرگتر یا مساوی :value کیلوبایت باشد',
        'numeric' => 'این فیلد باید بزرگتر یا مساوی :value باشد',
        'string' => 'این فیلد باید بزرگتر یا مساوی :value کاراکتر باشد',
    ],
    'image' => 'این فیلد باید از نوع تصویر باشد',
    'in' => 'فیلد انتخابی صحیح نمی باشد',
    'in_array' => 'این فیلد در :other وجود ندارد',
    'integer' => 'این فیلد باید از نوع عددی باشد',
    'ip' => 'این فیلد باید آی پی آدرس باشد',
    'ipv4' => 'این فیلد باید آی پی آدرس ورژن 4 باشد',
    'ipv6' => 'این فیلد باید آی پی آدرس ورژن 6 باشد',
    'json' => 'این فیلد باید از نوع رشته جیسون باشد',
    'lowercase' => 'این فیلد باید با حروف کوچک باشد.',
    'lt' => [
        'array' => 'این فیلد باید کمتر از :value آیتم داشته باشد',
        'file' => 'این فیلد باید کمتر از :value کیلوبایت باشد',
        'numeric' => 'این فیلد باید کمتر از :value باشد',
        'string' => 'این فیلد باید کمتر از :value کاراکتر باشد',
    ],
    'lte' => [
        'array' => 'این فیلد نباید کمتر از :value آیتم داشته باشد',
        'file' => 'این فیلد باید مساوی یا کمتر از :value کیلوبایت باشد',
        'numeric' => 'این فیلد باید مساوی یا کمتر از :value باشد',
        'string' => 'این فیلد باید مساوی یا کمتر از :value کاراکتر باشد',
    ],
    'mac_address' => 'این فیلد باید یک مک آدرس معتبر باشد',
    'max' => [
        'array' => 'این فیلد نباید بیشتر از :max آیتم داشته باشد',
        'file' => 'فایل نباید بزرگتر از :max کیلوبایت باشد',
        'numeric' => 'این فیلد نباید بزرگتر از :max باشد',
        'string' => 'این فیلد نباید بزرگتر از :max کاراکتر باشد',
    ],
    'max_digits' => 'این فیلد نباید بیشتر از :max رقم باشد',
    'mimes' => 'این فیلد باید دارای یکی از این فرمت ها باشد: :values',
    'mimetypes' =>  'این فیلد باید دارای یکی از این فرمت ها باشد: :values',
    'min' => [
        'array' => 'این فیلد باید حداقل :min آیتم داشته باشد',
        'file' => 'این فیلد باید حداقل :min کیلوبایت باشد',
        'numeric' => 'این فیلد باید حداقل :min باشد',
        'string' => 'این فیلد باید حداقل :min کاراکتر باشد',
    ],
    'min_digits' => 'این فیلد باید حداقل :min رقم باشد',
    'missing' => 'این فیلد نباید تعریف شود.',
    'missing_if' => 'این فیلد زمانی که مقدار :other برابر :value می باشد، نباید تعریف شود',
    'missing_unless' => 'این فیلد نباید تعریف شود مگر اینکه فیلد :other برابر :value باشد',
    'missing_with' => 'این فیلد زمانی که مقدار :values تعریف شده است دیگر نباید تعریف شود.',
    'missing_with_all' => 'این فیلد زمانی که :values مقدار دارد دیگر نباید تعریف شود.',
    'multiple_of' => 'این فیلد باید حاصل ضرب :value باشد',
    'not_in' => 'فیلد انتخابی :attribute صحیح نمی باشد',
    'not_regex' => 'فرمت این فیلد صحیح نمی باشد',
    'numeric' => 'این فیلد باید از نوع عددی باشد',
    'password' => [
        'letters' => 'این فیلد باید حداقل شامل یک حرف باشد',
        'mixed' => 'این فیلد باید شامل حداقل یک حرف بزرگ و یک حرف کوچک باشد',
        'numbers' => 'این فیلد باید شامل حداقل یک عدد باشد',
        'symbols' => 'این فیلد باید شامل حداقل یک کارکتر خاص باشد',
        'uncompromised' => 'محتوای وارده شده در :attribute ایمن نمی باشد. لطفا این فیلد را اصلاح فرمایید',
    ],
    'present' => 'این فیلد باید از نوع درصد باشد',
    'prohibited' => 'این فیلد مجاز نمی باشد',
    'prohibited_if' => 'این فیلد زمانی که :other برابر :value باشد مجاز نمی باشد',
    'prohibited_unless' => 'این فیلد مجاز نیست مگر :other برابر :values باشد',
    'prohibits' => 'این فیلد باعث ممنوعیت :other می باشد',
    'regex' => 'فرمت فیلد صحیح نمی باشد',
    'required' => 'تکمیل  این فیلد الزامی است',
    'required_array_keys' => 'این فیلد باید شامل مقادیر: :values باشد',
    'required_if' => 'تکمیل این فیلد زمانی که :other دارای مقدار :value است الزامی می باشد',
    'required_if_accepted' => 'تکمیل این فیلد زمانی که :other انتخاب شده الزامی است',
    'required_unless' => 'تکمیل این فیلد الزامی می باشد مگر :other دارای مقدار :values باشد',
    'required_with' => 'تکمیل این فیلد زمانی که مقدار :values وارد شود الزامی است',
    'required_with_all' => 'تکمیل این فیلد زمانی که مقادیر :values درصد است الزامی می باشد',
    'required_without' => 'تکمیل این فیلد زمانی که مقدار :values درصد نیست الزامی است',
    'required_without_all' => 'تکمیل این فیلد زمانی که هیچ کدام از مقادیر :values درصد نیست الزامی است',
    'same' => 'فیلد های :attribute و :other باید یکی باشند',
    'size' => [
        'array' => 'این فیلد باید شامل :size آیتم باشد',
        'file' => 'این فیلد باید :size کیلوبایت باشد',
        'numeric' => 'این فیلد باید :size باشد',
        'string' => 'این فیلد باید :size  کاراکتر باشد',
    ],
    'starts_with' => 'این فیلد باید با یکی از این مقادیر شروع شود، :values',
    'string' => 'این فیلد باید تنها شامل حروف باشد',
    'timezone' => 'این فیلد باید از نوع منطقه زمانی صحیح باشد',
    'unique' => 'مقدار وارد شده از قبل ثبت شده است',
    'uploaded' => 'بارگذاری این فیلد شکست خورد',
    'uppercase' => 'این فیلد باید با حروف بزرگ باشد',
    'url' => 'فرمت :attribute اشتباه است',
    'ulid' => 'این فیلد باید یک ULID صحیح باشد.',
    'uuid' => 'این فیلد باید یک UUID صحیح باشد',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'name' => 'نام',
        'username' => 'نام کاربری',
        'email' => 'ایمیل',
        'grade' => 'مقطع تحصیلی',
        'first_name' => 'نام',
        'last_name' => 'نام خانوادگی',
        'password' => 'کلمه عبور',
        'password_confirmation' => 'تایید کلمه عبور',
        'new_password' => 'کلمه عبور جدید',
        'product' => 'محصول',
        'count' => 'تعداد',
        'description' => 'توضیحات',
        'supplementary_insurance' => 'برگه بیمه سلامته',
        'type' => 'شیوه ارسال',
        'etc_delivery' => 'توضیحات سایر شیوه ارسال',
        'confirm_password' => 'تایید کلمه عبور',
        'start_time' => 'تاریخ شروع',
        'referral_phone' => 'شماره تلفن معرف اول',
        'referral_name' => 'نام معرف اول'
    ],

];
