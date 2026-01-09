import { useState } from 'react';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { kode_reff } from '@/routes/bimtek';

export function InputKodeBimtek({ table }) {
	const [kodeReff, setKodeReff] = useState("");
	return (
		<div className="relative flex overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">

			<Input
				id="kode_reff"
				className="rounded-r-none ring-none"
				required
				autoComplete="kode_reff"
				placeholder="Masukkan Kode Bimtek"
				value={kodeReff}
				onChange={(e) => setKodeReff(e.target.value)}
			/>
			<Button
				className="rounded-l-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
				onClick={() => handleSubmit(kodeReff,table)}
			>
				Submit!
			</Button>
		</div>
		);
}


export function handleSubmit(kodeReff,table){
	Swal.fire({
		title: 'Memproses...',
		text: 'Mohon tunggu',
		allowOutsideClick: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
	fetch(kode_reff().url, {
		method: 'POST',
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json',
			'X-CSRF-TOKEN': document
			.querySelector('meta[name="csrf-token"]')
			.getAttribute('content'),
		},
		body: JSON.stringify({kode_reff:kodeReff}),
	})
	.then(async (res) => {
		const result 	= await res.json();
		Swal.fire({
			icon: result.status ? 'success' : 'error',
			title: result.status ? 'Berhasil' : 'Gagal',
			text: result.message,
		});

		if (table) {
			table.ajax.reload(null, false);
		}
	})
	.catch(() => {
		Swal.fire({
			icon: 'error',
			title: 'Gagal',
			text: 'Terjadi kesalahan saat melakukan aksi ini.',
		});
	});;
};
