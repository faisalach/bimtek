<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Bimtek;
use App\Models\PaketSoal;
use App\Models\Soal;
use App\Models\PilihanJawaban;
use App\Models\Jawaban;
use App\Models\PesertaBimtek;
use App\Models\HasilTest;
use App\Http\Requests\SoalRequest;

class SoalController extends Controller
{
	public function show($paket_id): Response
	{
		$paket_soal	= PaketSoal::with("assesment")->find($paket_id);
		$soal       = Soal::with("pilihanJawaban")
		->where("paket_id",$paket_id)
		->orderBy("urutan","ASC")
		->get();
		$paket_soal->jenis_test 	= format_nametest($paket_soal->jenis_test);

		$tipe_jawaban	= tipe_jawaban();
		return Inertia::render('soal/index', compact("paket_soal","tipe_jawaban","soal"));
	}
	public function store(SoalRequest $request,$paket_id): RedirectResponse
	{
		$soal					= Soal::find($request->id);
		if (empty($soal)) {
			$soal 				= new Soal;
		}
		$soal->paket_id			= $paket_id;
		$soal->teks_soal		= $request->teks_soal;
		$soal->tipe_jawaban		= $request->tipe_jawaban;
		$soal->kunci_jawaban	= !empty($request->kunci_jawaban) ? $request->kunci_jawaban : "";
		$soal->bobot			= $request->bobot;
		$soal->urutan			= $request->urutan;
		$soal->created_by		= $request->user()->id;
		$soal->save();

		switch ($soal->tipe_jawaban) {
			case 1:
			case 2:
				for ($i=1; $i < count($request->teks_pilihan); $i++) { 
					$jawaban 				= "";
					if (!empty($request->pilihan_id[$i])) {
						$jawaban			= PilihanJawaban::find($request->pilihan_id[$i]);
					}
					if (empty($jawaban)) {
						$jawaban 			= new PilihanJawaban;
					}
					$jawaban->soal_id		= $soal->id;
					$jawaban->teks_pilihan	= $request->teks_pilihan[$i];
					$jawaban->is_benar		= $request->is_benar == $i ? 1 : 0;
					$jawaban->created_by	= $request->user()->id;
					$jawaban->save();
				}
				break;
		}

		return to_route('soal.show',["paket_id" => $paket_id]);
	}
	public function upload(Request $request)
	{
		$path = $request->file('file')->store('images', 'public');
		return response()->json([
			'location' => asset('storage/' . $path)
		]);
	}

	public function test($bimtek_id,$paket_id)
	{
		$user_id 		= auth()->user()->id;
		$paket_soal	= PaketSoal::with(["assesment.bimtek" =>function($query) use ($bimtek_id, $user_id)
		{
			$query->select(
				"bimtek.*",
				"pretest_mulai_at",
				"posttest_mulai_at",
				"pretest_selesai_at",
				"posttest_selesai_at"
			);
			$query->with(["pesertaBimtek" => function($q) use ($bimtek_id, $user_id)
			{
				$q->where("peserta_id",$user_id);
				$q->where("bimtek_id",$bimtek_id);
			}]);
			$query->join("peserta_bimtek","peserta_bimtek.bimtek_id","=","bimtek.id");
			$query->where("bimtek.id",$bimtek_id);
			$query->where("peserta_bimtek.peserta_id",$user_id);
		}])
		->whereHas('assesment.bimtek', function ($q) use ($bimtek_id, $user_id) {
			$q->join('peserta_bimtek', 'peserta_bimtek.bimtek_id', '=', 'bimtek.id')
			->where('bimtek.id', $bimtek_id)
			->where('peserta_bimtek.peserta_id', $user_id);
		})
		->find($paket_id);

		if (!$paket_soal) {
			return redirect('/dashboard');
		}
		$bimtek = $paket_soal->assesment->bimtek->first();
		$peserta_bimtek 	= $bimtek->pesertaBimtek->first();

		if (
			($paket_soal->jenis_test === 'pretest' && $bimtek->pretest_selesai_at) ||
			($paket_soal->jenis_test === 'posttest' && $bimtek->posttest_selesai_at)
		) {
			return redirect('/dashboard');
		}

		switch ($paket_soal->jenis_test) {
			case 'pretest':
			if (empty($peserta_bimtek->pretest_mulai_at)) {
				$peserta_bimtek->pretest_mulai_at = date("Y-m-d H:i:s");
				$peserta_bimtek->save();
			}
			break;
			case 'posttest':
			if (empty($peserta_bimtek->posttest_mulai_at)) {
				$peserta_bimtek->posttest_mulai_at = date("Y-m-d H:i:s");
				$peserta_bimtek->save();
			}
			break;
		}

		$soal       = Soal::with([
			"jawaban" => function($query) use ($user_id)
		{
			$query->where("created_by",$user_id);
		},'pilihanJawaban' => function ($query) {
			$query->select('id','soal_id', 'teks_pilihan');
		}])
		->select("id","teks_soal","tipe_jawaban","urutan")
		->where("paket_id",$paket_id)
		->orderBy("urutan","ASC")
		->get();

		$end_at			= 0;
		$time_server	= date("Y-m-d H:i:s");
		switch ($paket_soal->jenis_test) {
			case 'pretest':
			$end_at 	= date("Y-m-d H:i:s",strtotime("+".$paket_soal->duration." minutes",strtotime($peserta_bimtek->pretest_mulai_at)));
			break;
			case 'posttest':
			$end_at 	= date("Y-m-d H:i:s",strtotime("+".$paket_soal->duration." minutes",strtotime($peserta_bimtek->posttest_mulai_at)));
			break;
		}

		$paket_soal->jenis_test = format_nametest($paket_soal->jenis_test);
		return Inertia::render('soal/test', compact("bimtek","paket_soal","soal","end_at","time_server"));
	}
	public function store_test(Request $request,$bimtek_id,$paket_id)
	{
		$user_id 	= auth()->user()->id;
		$soal_id 	= $request->soal_id;
		$jawaban 	= Jawaban::where("created_by",$user_id)
		->where("soal_id",$soal_id)
		->first();

		if (empty($jawaban)) {
			$jawaban 	= new Jawaban;
			$jawaban->created_by 	= $user_id;
			$jawaban->soal_id 		= $soal_id;
			$jawaban->bimtek_id		= $bimtek_id;
		}

		$soal		= Soal::with(['pilihanJawaban' => function ($query) {
			$query->select('id','soal_id', 'teks_pilihan')
			->where("is_benar",1);
		}])
		->where("id",$soal_id)
		->first();
		switch ($soal->tipe_jawaban) {
			case 1:
			case 2:
				$pilihan_benar 			= !empty($soal->pilihanJawaban[0]) ? $soal->pilihanJawaban[0] : [];
				$jawaban->pilihan_id	= $request->jawaban;
				$jawaban->jawaban_text	= "";
				$jawaban->nilai 		= ($pilihan_benar->id == $request->jawaban) ? $soal->bobot : 0;
				break;
			case 3:
				$jawaban->pilihan_id	= null;
				$jawaban->jawaban_text	= $request->jawaban;
				$jawaban->nilai 		= (trim($soal->kunci_jawaban) === trim($request->jawaban)) ? $soal->bobot : 0;
				break;
		}
		$jawaban->save();

		return to_route("soal.test",["bimtek_id" => $bimtek_id,"paket_id" => $paket_id]);
	}

	public function finish(Request $request,$bimtek_id,$paket_id)
	{
		$nilai 			= 0;
		$user_id 		= auth()->user()->id;
		$paket_soal 	= PaketSoal::find($paket_id);
		$peserta_bimtek	= PesertaBimtek::where("peserta_id",$user_id)
		->where("bimtek_id",$bimtek_id)
		->first();
		switch ($paket_soal->jenis_test) {
			case 'pretest':
			$peserta_bimtek->pretest_selesai_at = date("Y-m-d H:i:s");
			break;
			case 'posttest':
			$peserta_bimtek->posttest_selesai_at = date("Y-m-d H:i:s");
			break;
		}
		$peserta_bimtek->save();

		$hasil_test 	= HasilTest::where("paket_id",$paket_id)
		->where("bimtek_id",$bimtek_id)
		->where("created_by",$user_id)
		->first();
		if (empty($hasil_test)) {
			$total_bobot				= Soal::where("paket_id",$paket_id)->sum("bobot");
			$total_nilai 				= Jawaban::join("soal","soal.id","=","jawaban.soal_id")
			->where("soal.paket_id",$paket_id)
			->where("jawaban.created_by",$user_id)
			->sum("nilai");

			$nilai 						= $total_nilai / $total_bobot * 100;

			$hasil_test 				= new HasilTest;
			$hasil_test->bimtek_id 		= $bimtek_id;
			$hasil_test->paket_id 		= $paket_id;
			$hasil_test->created_by 	= $user_id;
			$hasil_test->nilai 			= $nilai;
			$hasil_test->save();
		}


		return response()->json([
			'status' => true
		]);
	}
}
