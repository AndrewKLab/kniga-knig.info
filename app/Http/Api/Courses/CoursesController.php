<?php

namespace App\Http\Api\Courses;

use App\Classes\RequestHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KK_Courses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class CoursesController extends Controller
{


    public function add(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'kk_course_categoty_id' => ['required', 'string'],
            'kk_course_name' => ['required', 'string', 'max:255'],
            'kk_course_description' => ['string', 'nullable'],
            'kk_course_image' => ['required', File::image()->max(12 * 1024)->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(1000))],
        ]);

        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $course = KK_Courses::where(['kk_course_name' => $request->kk_course_name])->first();
        if (!empty($course)) return response()->json(['message' => 'Курс с таким названием уже существует!'], 400);

        $kk_course_image = RequestHelper::saveImage($request, 'kk_course_image', 'courses');

        $kk_course_id = KK_Courses::insertGetId([
            'kk_course_categoty_id' => $request->kk_course_categoty_id,
            'kk_course_autor_id' => Auth::user()->kk_user_id,
            'kk_course_published' => 0,
            'kk_course_name' => $request->kk_course_name,
            'kk_course_description' => $request->kk_course_description,
            'kk_course_image' => $kk_course_image,
        ]);
        $course = KK_Courses::where(['kk_course_id' => $kk_course_id])->first();

        return response()->json(['message' => env('RESPONSE_CREATE_SUCCESS'), 'course' => $course], 200);
    }

    public function edit(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'kk_course_id' => ['required', 'string'],
            'kk_course_categoty_id' => ['required', 'string'],
            'kk_course_name' => ['required', 'string', 'max:255'],
            'kk_course_description' => ['string', 'nullable'],
            'kk_course_image' => $request->hasFile('kk_course_image') ?  ['required', File::image()->max(12 * 1024)->dimensions(Rule::dimensions()->maxWidth(1000)->maxHeight(1000))] : ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails())  return response()->json(['success' => false, 'message' => 'Ошибка валидации!', 'data' => $validator->errors()], 422);

        $course = KK_Courses::where(['kk_course_id' => $request->kk_course_id])->first();
        if (empty($course)) return response()->json(['message' => 'Курс с таким ID не существует!'], 400);

        if ($request->hasFile('kk_course_image')) $kk_course_image = RequestHelper::saveImage($request, 'kk_course_image', 'courses');
        else $kk_course_image = $request->kk_course_image;

        KK_Courses::where(['kk_course_id' => $request->kk_course_id])->update([
            'kk_course_categoty_id' => $request->kk_course_categoty_id,
            // 'kk_course_autor_id' => Auth::user()->kk_user_id,
            'kk_course_published' => isset($request->kk_course_published) ? $request->kk_course_published : 0,
            'kk_course_name' => $request->kk_course_name,
            'kk_course_description' => $request->kk_course_description,
            'kk_course_image' => $kk_course_image,
        ]);
        $course = KK_Courses::where(['kk_course_id' => $request->kk_course_id])->first();


        return response()->json(['message' => env('RESPONSE_UPDATE_SUCCESS'), 'course' => $course], 200);
    }


    public function remove(Request $request)
    {
        if (empty($request->kk_course_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA')], 400);
        $kk_course = KK_Courses::where(['kk_course_id' => $request->kk_course_id])->first();
        if (empty($kk_course)) return response()->json(['message' => 'Такой курс не существует!'], 400);

        KK_Courses::where(['kk_course_id' => $request->kk_course_id])->delete();
        return response()->json(['message' => env('RESPONSE_DELETE_SUCCESS')], 200);
    }

    public function getAll(Request $request)
    {
        $params = KK_Courses::Params($request);
        $courses = KK_Courses::with($params->parts)->withCount($params->parts_to_count)->where($params->where)->orderBy('kk_course_updated_at', 'DESC')->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'courses' => $courses], 200);
    }

    public function getAllByCategotyId(Request $request)
    {
        if (empty($request->kk_course_categoty_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_Courses::Params($request);
        $courses = KK_Courses::with($params->parts)->withCount($params->parts_to_count)->where([['kk_course_categoty_id', '=', $request->kk_course_categoty_id]])->where($params->where)->orderBy('kk_course_updated_at', 'DESC')->get();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'courses' => $courses], 200);
    }
    public function getOneByCourseId(Request $request)
    {
        if (empty($request->kk_course_id)) return response()->json(['message' => env('RESPONSE_MISSING_DATA'),], 400);
        $params = KK_Courses::Params($request);
        $course = KK_Courses::with($params->parts)->withCount($params->parts_to_count)->where([['kk_course_id', '=', $request->kk_course_id]])->where($params->where)->first();

        return response()->json(['message' => env('RESPONSE_SUCCESS'), 'course' => $course], 200);
    }

    // public function cutImageText(Request $request)
    // {
    //     $courses = KK_Courses::get();

    //     foreach ($courses as $key => $course) {
    //         if(!empty($course->kk_course_image)){
    //             KK_Courses::where('kk_course_id', $course->kk_course_id)->update([
    //                 'kk_course_image'=>str_replace('https://kniga-knig.info/assets/img/', '', $course->kk_course_image)
    //             ]);
    //         }
    //     }
    //     $courses = KK_Courses::get();
    //     return response()->json(['message' => env('RESPONSE_SUCCESS'), 'courses' => $courses], 200);
    // }
}
