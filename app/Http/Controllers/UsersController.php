<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
	public function show()
	{
		return Inertia::render('users/index');
	}
	public function get_data(Request $request)
	{
        // Model Eloquent
		$model = Users::class;

        // Query awal (Eloquent)
		$query = $model::query();
		$query->select("id","name","role","no_telp","email","instansi");
		if (auth()->user()->role == 1) {
			$query->where("role",2);
	        // Total data sebelum search
			$recordsTotal = $model::where("role",2)->count();
		}else {
			$query->whereIn("role",[1,2]);
			// Total data sebelum search
			$recordsTotal = $model::whereIn("role",[1,2])->count();
		}


        // Handle search
		if ($search = $request->input('search.value')) {
			$query->where(function ($q) use ($search) {
				$q->where('name', 'like', "%{$search}%")
				->orWhere('no_telp', 'like', "%{$search}%")
				->orWhere('email', 'like', "%{$search}%")
				->orWhere('instansi', 'like', "%{$search}%");
			});
		}

        // Total data setelah search
		$recordsFiltered = $query->count();

		if (!empty($request->input("role"))) {
			$query->where("role",$request->input("role"));
		}

        // Ordering
		$orderColIndex = $request->input('order.0.column', 0);
		$orderColName  = $request->input("columns.$orderColIndex.data", 'name');
		$orderDir      = $request->input('order.0.dir', 'asc');

		$query->orderBy($orderColName, $orderDir);

        // Paging
		$start  = $request->input('start', 0);
		$length = $request->input('length', 10);

		$data = $query->skip($start)->take($length)->get();

		foreach ($data as $row) {
			$row->role = format_name_role($row->role);
		}

		return response()->json([
			'draw'            => intval($request->input('draw')),
			'recordsTotal'    => $recordsTotal,
			'recordsFiltered' => $recordsFiltered,
			'data'            => $data,
		]);
	}
	public function add(): Response
	{
		$role 	= role();
		return Inertia::render('users/add',compact("role"));
	}
	public function store(ProfileUpdateRequest $request): RedirectResponse
	{
		$data               = new Users;
		$data->role			= $request->role;
		$data->name         = $request->name;
		$data->password     = Hash::make($request->password);
		$data->no_telp		= $request->no_telp;
		$data->email		= $request->email;
		$data->instansi		= $request->instansi;
		$data->created_by	= $request->user()->id;
		$data->save();

		return to_route('users.show');
	}
	public function edit($id): Response
	{
		$role	= role();
		$data	= Users::find($id);
		return Inertia::render('users/edit',compact("data","role"));
	}
	public function update(ProfileUpdateRequest $request,$id): RedirectResponse
	{
		$data = Users::find($id);
		$data->name		= $request->name;
		$data->role		= $request->role;
		$data->no_telp	= $request->no_telp;
		$data->email	= $request->email;
		$data->instansi	= $request->instansi;
		$data->save();

		return to_route('users.update',["id" => $id]);
	}
	public function destroy(Request $request,$id)
	{
		$data = Users::find($id);
		$data->delete();
		// return to_route('users.show');
		return response()->json([
			'status' => true
		]);
	}
}
