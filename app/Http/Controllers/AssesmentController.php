<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssesmentRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Assesment;
use App\Models\PaketSoal;
use App\Models\Soal;
use App\Models\PilihanJawaban;
use App\Models\Bimtek;

class AssesmentController extends Controller
{
	public function show()
	{
		return Inertia::render('assesment/index');
	}
	public function get_data(Request $request)
	{
        // Model Eloquent
		$model = Assesment::class;

        // Query awal (Eloquent)
		$query = $model::query();
		$query->with(["paketSoal"]);

        // Total data sebelum search
		$recordsTotal = $model::count();

        // Handle search
		if ($search = $request->input('search.value')) {
			$query->where(function ($q) use ($search) {
				$q->where('assesment.nama_assesment', 'like', "%{$search}%")
				->orWhere('assesment.jenis_bimtek', 'like', "%{$search}%");
			});
		}

        // Total data setelah search
		$recordsFiltered = $query->count();

        // Ordering
		$orderColIndex = $request->input('order.0.column', 0);
		$orderColName  = $request->input("columns.$orderColIndex.data", 'nama_assesment');
		$orderDir      = $request->input('order.0.dir', 'asc');

		$query->orderBy($orderColName, $orderDir);

        // Paging
		$start  = $request->input('start', 0);
		$length = $request->input('length', 10);
		$data = $query->skip($start)->take($length)->get();

		foreach ($data as $row) { 
			$row->jenis_bimtek   	= format_name_jenis_bimtek($row->jenis_bimtek);
			$row->pretest_id 		= 0;
			$row->posttest_id 		= 0;
			foreach ($row->paketSoal as $ps) {
				if ($ps->jenis_test == "pretest") {
					$row->pretest_id 		= $ps->id;
				}
				if ($ps->jenis_test == "posttest") {
					$row->posttest_id 		= $ps->id;
				}
			}
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
		$jenis_bimtek 		= jenis_bimtek();
		return Inertia::render('assesment/add',compact("jenis_bimtek"));
	}
	public function store(AssesmentRequest $request): RedirectResponse
	{
		$data					= new Assesment;
		$data->nama_assesment	= $request->nama_assesment;
		$data->jenis_bimtek		= $request->jenis_bimtek;
		$data->created_by		= $request->user()->id;

		if ($data->save()) {
			foreach (jenis_test() as $test) {
				$paket_soal 				= new PaketSoal;
				$paket_soal->assesment_id 	= $data->id;
				$paket_soal->jenis_test 	= $test["value"];
				$paket_soal->created_by 	= $data->created_by;
				$paket_soal->save();
			}
		}

		return to_route('assesment.show');
	}
	public function edit($id): Response
	{
		$data       		= Assesment::find($id);
		$jenis_bimtek 		= jenis_bimtek();
		return Inertia::render('assesment/edit',compact("data","jenis_bimtek"));
	}
	public function update(AssesmentRequest $request,$id): RedirectResponse
	{
		$data 					= Assesment::find($id);
		$data->nama_assesment	= $request->nama_assesment;
		$data->jenis_bimtek		= $request->jenis_bimtek;
		$data->save();

		return to_route('assesment.update',["id" => $id]);
	}
	public function update_jumlah_soal(Request $request,$id)
	{
		$data = PaketSoal::find($id);
		$data->jumlah_soal	= $request->jumlah_soal;
		$save = $data->save();

		if ($save) {
			$soalIds = Soal::where("urutan", ">", $data->jumlah_soal)
			->where("id",$id)
			->pluck("id");
			PilihanJawaban::whereIn("soal_id", $soalIds)->delete();
			Soal::whereIn("id", $soalIds)->delete();
		}

		return response()->json([
			'success' => true,
			'jumlah_soal' => $data->jumlah_soal,
		]);
	}
	public function update_durasi(Request $request,$id)
	{
		$data = PaketSoal::find($id);
		$data->duration	= $request->duration;
		$save = $data->save();

		return response()->json([
			'success' => true,
			'duration' => $data->duration,
		]);
	}
	public function destroy(Request $request,$id)
	{
		$data = Assesment::find($id);
		$data->delete();
		return response()->json([
			'status' => true
		]);
	}
}
