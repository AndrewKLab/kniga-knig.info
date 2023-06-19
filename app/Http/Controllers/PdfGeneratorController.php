<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;

class PdfGeneratorController extends Controller
{
    public static function course_diplom($user, $course)
    {
        $data = [
            'course'    => $course,
            'user'    => $user,
        ];
        $pdf = PDF::setOptions([
            'images' => true,
        ])->loadView('pdf.diplom.diplom', $data);

        $filename = $course->kk_course_id . '_' . $user->kk_user_id . '_' . $course->kk_course_name . '_' . $user->kk_user_lastname . '_' . $user->kk_user_firstname . '.pdf';

        $pdf->save(public_path('/assets/doc/diploms/') . '/' . $filename);
        return (object)[
            'pdf' => $pdf,
            'path' => public_path('/assets/doc/diploms/') . '/' . $filename,
            'filename' =>  $filename,
        ];
    }
}
