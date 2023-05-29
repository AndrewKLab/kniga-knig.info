<?php

namespace App\Classes;


class RequestHelper
{

    public static function parts($request_parts)
    {
        $parts = [];
        if (!empty($request_parts)) $parts = explode(',', $request_parts);
        return $parts;
    }

    public static function saveImage($request, string $field, string $path)
    {
        if ($request->file($field)) {
            $file = $request->file($field);
            $filename = date('YmdHi') . $file->getClientOriginalName();
            $file->move(public_path().'/assets/img/'.$path, $filename);
            return $filename;
        }
    }

    public static function saveAudio($request, string $field, string $path)
    {
        if ($request->file($field)) {
            $file = $request->file($field);
            $filename = date('YmdHi') . $file->getClientOriginalName();
            $file->move(public_path().'/assets/audio/', $filename);
            return $filename;
        }
    }
}
