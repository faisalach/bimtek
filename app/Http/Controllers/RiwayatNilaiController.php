<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Users;
use App\Models\HasilTest;
use App\Models\Bimtek;

class RiwayatNilaiController extends Controller
{
	public function show($user_id = null)
	{
		if (empty($user_id) || auth()->user()->role == 2) {
			$user_id 	= auth()->user()->id;
		}
		$peserta 	= Users::find($user_id);
		return Inertia::render('riwayat_nilai/index',compact("peserta"));
	}
	public function get_data(Request $request)
	{
        // Model Eloquent
		$model = Bimtek::class;

		if (auth()->user()->role == 2) {
			$user_id 	= auth()->user()->id;
		}else{
			$user_id 	= $request->user_id;
		}

        // Query awal (Eloquent)
		$query = $model::query();
		$query->select("bimtek.id", "bimtek.nama_bimtek","assesment.id as assesment_id","assesment.jenis_bimtek");
		$query->join('assesment', 'bimtek.assesment_id', '=', 'assesment.id');
		$query->join('peserta_bimtek', 'peserta_bimtek.bimtek_id', '=', 'bimtek.id');
		$query->where('peserta_bimtek.peserta_id',$user_id);

        // Total data sebelum search
		$recordsTotal = $model::join('assesment', 'bimtek.assesment_id', '=', 'assesment.id')
		->join('peserta_bimtek', 'peserta_bimtek.bimtek_id', '=', 'bimtek.id')
		->where('peserta_bimtek.peserta_id',$user_id)
		->count();

        // Handle search
		if ($search = $request->input('search.value')) {
			$query->where(function ($q) use ($search) {
				$q->where('bimtek.nama_bimtek', 'like', "%{$search}%")
				->orWhere('assesment.jenis_bimtek', 'like', "%{$search}%");
			});
		}

        // Total data setelah search
		$recordsFiltered = $query->count();

        // Ordering
		$orderColIndex = $request->input('order.0.column', 0);
		$orderColName  = $request->input("columns.$orderColIndex.data", 'bimtek.nama_bimtek');
		$orderDir      = $request->input('order.0.dir', 'asc');

		$query->orderBy($orderColName, $orderDir);

        // Paging
		$start  = $request->input('start', 0);
		$length = $request->input('length', 10);

		$data = $query->skip($start)->take($length)->get();

		foreach($data as $row){
			$row->nilai_pretest 	= "Belum Mengerjakan";
			$row->nilai_posttest 	= "Belum Mengerjakan";
			$row->jenis_bimtek 		= format_name_jenis_bimtek($row->jenis_bimtek);

			$hasil_test 			= HasilTest::select("paket_soal.jenis_test","hasil_test.nilai")
			->join("paket_soal","paket_soal.id","=","hasil_test.paket_id")
			->where("paket_soal.assesment_id",$row->assesment_id)
			->where("hasil_test.bimtek_id",$row->id)
			->get();

			foreach ($hasil_test as $row2) {
				if ($row2->jenis_test == "pretest") {
					$row->nilai_pretest 	= $row2->nilai;
				}
				if ($row2->jenis_test == "posttest") {
					$row->nilai_posttest 	= $row2->nilai;
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
}
