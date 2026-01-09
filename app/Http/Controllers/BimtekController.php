<?php

namespace App\Http\Controllers;

use App\Http\Requests\BimtekRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Bimtek;
use App\Models\PesertaBimtek;
use App\Models\Assesment;
use App\Models\Users;

class BimtekController extends Controller
{
	public function show()
	{
		return Inertia::render('bimtek/index');
	}
	public function get_data(Request $request)
	{
    	// Model Eloquent
		$model = Bimtek::class;

	    // Query awal (Eloquent)
		$query = $model::query();
		$query->select("bimtek.*","nama_assesment");
		$query->join("assesment","assesment.id","=","bimtek.assesment_id");

	    // Total data sebelum search
		$recordsTotal = $model::join("assesment","assesment.id","=","bimtek.assesment_id")->count();

	    // Handle search
		if ($search = $request->input('search.value')) {
			$query->where(function ($q) use ($search) {
				$q->where('nama_bimtek', 'like', "%{$search}%")
				->orWhere('deskripsi', 'like', "%{$search}%")
				->orWhere('nama_assesment', 'like', "%{$search}%")
				->orWhere('tanggal_mulai', 'like', "%{$search}%")
				->orWhere('tanggal_selesai', 'like', "%{$search}%");
			});
		}

	    // Total data setelah search
		$recordsFiltered = $query->count();

	    // Ordering
		$orderColIndex = $request->input('order.0.column', 0);
		$orderColName  = $request->input("columns.$orderColIndex.data", 'nama_bimtek');
		$orderDir      = $request->input('order.0.dir', 'asc');

		$query->orderBy($orderColName, $orderDir);

	    // Paging
		$start  = $request->input('start', 0);
		$length = $request->input('length', 10);

		$data = $query->skip($start)->take($length)->get();

		foreach ($data as $key => $value) { 
			$value->tanggal_mulai = format_date($value->tanggal_mulai); 
			$value->tanggal_selesai = format_date($value->tanggal_selesai); 
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
		$query_assesment 	= Assesment::orderBy("nama_assesment")->get();
		foreach ($query_assesment as $row) {
			$row->jenis_bimtek 	= format_name_jenis_bimtek($row->jenis_bimtek);
		}
		$assesment  		= format_select($query_assesment,"id","nama_assesment","jenis_bimtek");
		$status_paket_soal	= status_paket_soal();

		return Inertia::render('bimtek/add',compact("assesment","status_paket_soal"));
	}
	public function store(BimtekRequest $request): RedirectResponse
	{
		$data 						= new Bimtek;
		$data->assesment_id			= $request->assesment_id;
		$data->nama_bimtek			= $request->nama_bimtek;
		$data->deskripsi			= $request->deskripsi;
		$data->tanggal_mulai		= $request->tanggal_mulai;
		$data->tanggal_selesai		= $request->tanggal_selesai;
		$data->kode_reff			= $request->kode_reff;
		$data->status_soal_pretest	= $request->status_soal_pretest;
		$data->status_soal_posttest	= $request->status_soal_posttest;
		$data->created_by			= $request->user()->id;
		$data->save();

		if (!empty($request->peserta_id)) {
			foreach ($request->peserta_id as $peserta_id) {
				if (empty($peserta_id)) {
					continue;
				}
				$peserta 	= new PesertaBimtek;
				$peserta->bimtek_id 	= $data->id;
				$peserta->peserta_id 	= $peserta_id;
				$peserta->created_by	= $request->user()->id;
				$peserta->save();
			}
		}

		return to_route('bimtek.show');
	}
	public function edit($id): Response
	{
		$data = Bimtek::with("pesertaBimtek.peserta")->find($id);
		$data->tanggal_mulai = format_date($data->tanggal_mulai);
		$data->tanggal_selesai = format_date($data->tanggal_selesai);
		
		$query_peserta		= Users::where("role",2)->get();
		$peserta			= format_select($query_peserta,"id","name");

		$query_assesment 	= Assesment::orderBy("nama_assesment")->get();
		foreach ($query_assesment as $row) {
			$row->jenis_bimtek 	= format_name_jenis_bimtek($row->jenis_bimtek);
		}
		$assesment  		= format_select($query_assesment,"id","nama_assesment","jenis_bimtek");
		$status_paket_soal	= status_paket_soal();

		return Inertia::render('bimtek/edit',compact("data","peserta","assesment","status_paket_soal"));
	}
	public function update(BimtekRequest $request,$id): RedirectResponse
	{
		$data = Bimtek::find($id);
		$data->assesment_id			= $request->assesment_id;
		$data->nama_bimtek			= $request->nama_bimtek;
		$data->deskripsi			= $request->deskripsi;
		$data->tanggal_mulai		= $request->tanggal_mulai;
		$data->tanggal_selesai		= $request->tanggal_selesai;
		$data->status_soal_pretest	= $request->status_soal_pretest;
		$data->status_soal_posttest	= $request->status_soal_posttest;
		$data->kode_reff			= $request->kode_reff;
		$data->save();

		if (!empty($request->peserta_id)) {
			foreach ($request->peserta_id as $peserta_id) {
				if (empty($peserta_id)) {
					continue;
				}
				$check 	= PesertaBimtek::where("peserta_id",$peserta_id)
				->where("bimtek_id",$data->id)
				->first();
				if (empty($check)) {
					$peserta 				= new PesertaBimtek;
					$peserta->bimtek_id 	= $data->id;
					$peserta->peserta_id	= $peserta_id;
					$peserta->created_by	= $request->user()->id;
					$peserta->save();
				}
			}

			PesertaBimtek::whereNotIn('peserta_id', $request->peserta_id)
			->where("bimtek_id",$data->id)
			->delete();
		}

		return to_route('bimtek.update',["id" => $id]);
	}
	public function destroy(Request $request,$id)
	{
		$data = Bimtek::find($id);
		$data->delete();
		return response()->json([
			'status' => true
		]);
		// return to_route('bimtek.show');
	}
	public function kode_reff(Request $request)
	{
		$user_id			= auth()->user()->id;
		$bimtek				= Bimtek::where("kode_reff",$request->kode_reff)->first();
		if (empty($bimtek)) {
			return response()->json([
				'status' => false,
				'message' 	=> "Kode Reff tidak ditemukan!"
			]);
		}

		$peserta_bimtek		= PesertaBimtek::where("bimtek_id",$bimtek->id)
		->where("peserta_id",$user_id)
		->first();
		if (!empty($peserta_bimtek)) {
			return response()->json([
				'status' => false,
				'message' 	=> "Anda sudah terdaftar pada bimtek ini!"
			]);
		}
		$data 				= new PesertaBimtek;
		$data->bimtek_id	= $bimtek->id;
		$data->peserta_id	= $user_id;
		$data->created_by	= $user_id;
		$save 				= $data->save();
		
		return response()->json([
			'status' 	=> $save,
			'message' 	=> !empty($save) ? "Bimtek berhasil ditambahkan!" : "Bimtek gagal ditambahkan!"
		]);
	}
}
