<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Bimtek;
use App\Models\PaketSoal;
use App\Models\PesertaBimtek;

class DashboardController extends Controller
{
	public function dashboard()
	{
		if (auth()->user()->role == 2) {
			return $this->dashboardPeserta();
		}else{
			return $this->dashboardAdmin();
		}
	}

	private function dashboardAdmin()
	{
		$jml_peserta	= PesertaBimtek::count();
		$jml_bimtek		= Bimtek::count();

		$jml_peserta_pretest	= PaketSoal::where("jenis_test","pretest")
		->join("assesment","assesment.id","=","paket_soal.assesment_id")
		->join("bimtek","bimtek.assesment_id","=","assesment.id")
		->join("peserta_bimtek","bimtek.id","=","peserta_bimtek.bimtek_id")
		->count();
		$jml_peserta_sudah_pretest	= Bimtek::join("peserta_bimtek","bimtek.id","=","peserta_bimtek.bimtek_id")
		->where("pretest_selesai_at","!=",null)
		->count();

		$jml_peserta_posttest	= PaketSoal::where("jenis_test","posttest")
		->join("assesment","assesment.id","=","paket_soal.assesment_id")
		->join("bimtek","bimtek.assesment_id","=","assesment.id")
		->join("peserta_bimtek","bimtek.id","=","peserta_bimtek.bimtek_id")
		->count();
		$jml_peserta_sudah_posttest	= Bimtek::join("peserta_bimtek","bimtek.id","=","peserta_bimtek.bimtek_id")
		->where("posttest_selesai_at","!=",null)
		->count();

		$bimtek 	= Bimtek::with(["assesment" => function($query)
		{
			$query->with(["paketSoal" => function($query2)
			{
				$query2->with(["hasilTest"]);
			}]);
		}])
		->where("tanggal_mulai","<=",date("Y-m-d"))
		->orderBy("tanggal_mulai","DESC")
		->limit(5)
		->get();

		$nilai_data = [];
		foreach ($bimtek->toArray() as $row) {
			$pretest 	= 0;
			$posttest 	= 0;
			$nama_bimtek 	= $row["nama_bimtek"];
			if (!empty($row["assesment"]["paket_soal"])) {
				foreach ($row["assesment"]["paket_soal"] as $ps) {
					switch ($ps["jenis_test"]) {
						case 'pretest':
							if (!empty($ps["hasil_test"])) {
								foreach ($ps["hasil_test"] as $hs) {
									$pretest 	= $hs["nilai"];
								}
								$pretest 	= $pretest / count($ps["hasil_test"]);
							}
							break;
						case 'posttest';
							if (!empty($ps["hasil_test"])) {
								foreach ($ps["hasil_test"] as $hs) {
									$posttest 	= $hs["nilai"];
								}
								$posttest 	= $posttest / count($ps["hasil_test"]);
							}
							break;
					}
				}
			}
			if (!empty($pretest) || !empty($posttest)) {
				$nilai_data[] 	= [ "bimtek"=> $nama_bimtek, "pretest"=> $pretest, "posttest"=> $posttest ];
			}
		}

		$jml_peserta_belum_pretest	= Bimtek::join("peserta_bimtek","bimtek.id","=","peserta_bimtek.bimtek_id")
		->where("pretest_selesai_at",null)
		->where("posttest_selesai_at",null)
		->count();

		$jml_peserta_sudah_pretest_saja	= Bimtek::join("peserta_bimtek","bimtek.id","=","peserta_bimtek.bimtek_id")
		->where("pretest_selesai_at","!=",null)
		->where("posttest_selesai_at",null)
		->count();

		$jml_peserta_sudah_pretest_posttest	= Bimtek::join("peserta_bimtek","bimtek.id","=","peserta_bimtek.bimtek_id")
		->where("pretest_selesai_at","!=",null)
		->where("posttest_selesai_at","!=",null)
		->count();

		$progress_data = [
			[ "name" => "Belum Pre Test", "value" => $jml_peserta_belum_pretest],
			[ "name" => "Sudah Pre Test", "value" => $jml_peserta_sudah_pretest_saja ],
			[ "name" => "Sudah Post Test", "value" => $jml_peserta_sudah_pretest_posttest ],
		];

		return Inertia::render('dashboard',compact("jml_peserta","jml_bimtek","jml_peserta_pretest","jml_peserta_sudah_pretest","jml_peserta_posttest","jml_peserta_sudah_posttest","nilai_data","progress_data"));
	}

	private function dashboardPeserta()
	{
		$nilai_posttest 	= "-";
		$pretest_id			= "";
		$pretest_buka		= null;
		$pretest_selesai	= null;
		$posttest_id		= "";
		$posttest_buka		= null;
		$posttest_selesai	= null;
		$bimtek_aktif 		= Bimtek::select("bimtek.*")
		->join("peserta_bimtek","peserta_bimtek.bimtek_id","=","bimtek.id")
		->where("tanggal_mulai","<=",date("Y-m-d"))
		->where("tanggal_selesai",">=",date("Y-m-d"))
		->where("peserta_bimtek.peserta_id",auth()->user()->id)
		->where("status_soal_pretest","!=",0)
		->where("status_soal_posttest","!=",2)
		->orderBy("tanggal_mulai","ASC")
		->first();

		if (!empty($bimtek_aktif)) {
			$pretest			= PaketSoal::select("paket_soal.*","hasil_test.nilai",\DB::raw("hasil_test.id as hasil_id"))
			->join("assesment","assesment.id","=","paket_soal.assesment_id")
			->leftJoin("hasil_test","hasil_test.paket_id","=","paket_soal.id")
			->where("assesment_id",$bimtek_aktif->assesment_id)
			->where("jenis_test","pretest")
			->first();
			$pretest_buka 		= $bimtek_aktif->status_soal_pretest == 1;
			$pretest_selesai 	= $pretest->nilai ?? null;
			$pretest_id 		= !empty($pretest->id) ? $pretest->id : "";

			$posttest			= PaketSoal::select("paket_soal.*","hasil_test.nilai",\DB::raw("hasil_test.id as hasil_id"))
			->join("assesment","assesment.id","=","paket_soal.assesment_id")
			->leftJoin("hasil_test","hasil_test.paket_id","=","paket_soal.id")
			->where("assesment_id",$bimtek_aktif->assesment_id)
			->where("jenis_test","posttest")
			->first();

			$posttest_buka 		= $bimtek_aktif->status_soal_posttest == 1;
			$posttest_selesai 	= $posttest->nilai ?? null;
			$posttest_id 		= !empty($posttest->id) ? $posttest->id : "";
		}

		return Inertia::render('dashboard_peserta',compact("pretest_buka","pretest_selesai","posttest_buka","posttest_selesai","bimtek_aktif","pretest_id","posttest_id"));
	}
}
