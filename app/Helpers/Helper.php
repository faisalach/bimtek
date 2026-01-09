<?php

if (! function_exists('format_nametest')) {
	function format_nametest($name) {
		switch ($name) {
			case 'pretest':
				return "Pre Test";
				break;
			case 'posttest':
				return "Post Test";
				break;
		}
		return $name;
	}
}

if (! function_exists('jenis_test')) {
	function jenis_test() {
		return [
			[
				"value" 	=>"pretest",
				"label"	=> format_nametest("pretest")
			],
			[
				"value"  	=> "posttest",
				"label"	=> format_nametest("posttest")
			]
		];
	}
}

if (! function_exists('format_name_jenis_bimtek')) {
	function format_name_jenis_bimtek($name) {
		switch ($name) {
			case 1:
				return "Bimtek Sertifikasi";
				break;
			case 2:
				return "Bimtek Pengolahan Hasil Perikanan";
				break;
			case 3:
				return "Bimtek Pengembangan Usaha";
				break;
		}
		return $name;
	}
}
if (! function_exists('jenis_bimtek')) {
	function jenis_bimtek() {
		return [
			[
				"value" 	=> 1,
				"label"	=> format_name_jenis_bimtek(1)
			],
			[
				"value" 	=> 2,
				"label"	=> format_name_jenis_bimtek(2)
			],
			[
				"value" 	=> 3,
				"label"	=> format_name_jenis_bimtek(3)
			]
		];
	}
}

if (! function_exists('format_name_tipe_jawaban')) {
	function format_name_tipe_jawaban($name) {
		switch ($name) {
			case 1:
				return "Pilihan Ganda";
				break;
			case 2:
				return "Benar / Salah";
				break;
			case 3:
				return "Isian Singkat";
				break;
		}
		return $name;
	}
}

if (! function_exists('tipe_jawaban')) {
	function tipe_jawaban() {
		return [
			[
				"value" 	=> 1,
				"label"	=> format_name_tipe_jawaban(1)
			],
			[
				"value" 	=> 2,
				"label"	=> format_name_tipe_jawaban(2)
			],
			[
				"value" 	=> 3,
				"label"	=> format_name_tipe_jawaban(3)
			]
		];
	}
}

if (! function_exists('format_name_status_paket_soal')) {
	function format_name_status_paket_soal($name) {
		switch ($name) {
			case 1:
				return "Publish";
				break;
			case 2:
				return "Selesai Dikerjakan";
				break;
			case 0:
				return "Draft";
				break;
		}
		return $name;
	}
}

if (! function_exists('status_paket_soal')) {
	function status_paket_soal() {
		return [
			[
				"value"	=> 0,
				"label"	=> format_name_status_paket_soal(0)
			],
			[
				"value" => 1,
				"label"	=> format_name_status_paket_soal(1)
			],
			[
				"value"	=> 2,
				"label"	=> format_name_status_paket_soal(2)
			]
		];
	}
}
if (! function_exists('format_name_role')) {
	function format_name_role($name) {
		switch ($name) {
			case 1:
				return "Admin";
				break;
			case 2:
				return "Peserta";
				break;
			case 3:
				return "Superadmin";
				break;
		}
		return $name;
	}
}

if (! function_exists('role')) {
	function role() {
		return [
			[
				"value" => 1,
				"label"	=> format_name_role(1)
			],
			[
				"value"	=> 2,
				"label"	=> format_name_role(2)
			],
			/*[
				"value"	=> 3,
				"label"	=> format_name_role(3)
			],*/
		];
	}
}

if (! function_exists('format_date')) {
	function format_date($date) {
		return date("Y-m-d",strtotime($date));
	}
}
if (! function_exists('format_select')) {
	function format_select($data,$key,$label,$sublabel = "") {
		$new_data  		= [];
		foreach ($data as $row) {
			$new_label 		= !empty($sublabel) ? $row->{$label} . " (".$row->{$sublabel}.")" : $row->{$label};
			$new_data[] 	= [
				"value" 	=> $row->{$key},
				"label"	=> $new_label
			];
		}
		return $new_data;
	}
}


