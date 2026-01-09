import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, usePage, router } from '@inertiajs/react';
import { store, destroy, update_jumlah_soal } from '@/routes/assesment';
import { test as soalRoute, finish } from '@/routes/soal';
import { Test as TestComponent } from '@/components/test';
import CountdownTimer from '@/components/countdown-timer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';


const handleFinish = (paket_soal) => {
	Swal.fire({
		title: 'Yakin menyelesaikan?',
		text: 'Setelah selesai, data tidak bisa diubah.',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonText: 'Ya, Selesaikan',
		confirmButtonColor: "#16a34a",
		cancelButtonText: 'Batal',
		reverseButtons: true,
	}).then((result) => {
		if (!result.isConfirmed) return;

		handleFormFinish(paket_soal);
	});
};

const handleFormFinish = (paket_soal) => {
	Swal.fire({
		title: 'Memproses...',
		text: 'Mohon tunggu',
		allowOutsideClick: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});

	fetch(finish({
		paket_id:paket_soal?.id,
		bimtek_id:paket_soal?.assesment?.bimtek?.[0]?.id
	}).url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			"X-CSRF-TOKEN": document
			.querySelector('meta[name="csrf-token"]')
			?.getAttribute("content"),
		},
				// body: JSON.stringify(data),
	})
	.then(async (res) => {
		if (!res.ok) throw new Error('Request gagal');
		return res.json();
	})
	.then(() => {
		Swal.fire({
			icon: 'success',
			title: 'Berhasil',
			text: 'Paket soal berhasil diselesaikan.',
			timer: 2000,
			showConfirmButton: false,
		});

		setTimeout(() => {
			router.visit("/dashboard");
		}, 2000);
	})
	.catch(() => {
		Swal.fire({
			icon: 'error',
			title: 'Gagal',
			text: 'Terjadi kesalahan saat menyelesaikan paket soal.',
		});
	});
}

export default function Test() {
	const { bimtek, paket_soal, soal, end_at, time_server } = usePage().props;
	const [indexSoal, setIndexSoal] = useState(0);
	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: `${paket_soal?.jenis_test} - ${paket_soal?.assesment?.nama_assesment} - ${bimtek?.nama_bimtek}`,
			href: soalRoute({
				bimtek_id:bimtek.id,
				paket_id:paket_soal.id
			}).url,
		},
	];
	const [showFinishAlert, setShowFinishAlert] = useState(false);
	const [flash, setFlash] = useState("");
	return (
		<AppLayout breadcrumbs={breadcrumbs}>

			<Head title="Soal" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div className="grid grid-cols-12 gap-4">
					<div className="shadow-md lg:order-2 lg:col-span-4 col-span-12 relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
						<div className="flex gap-4 flex-wrap mb-4">
							<CountdownTimer
								className="ml-auto"
								endAt={end_at}
								serverNow={time_server}
								onTimeout={() => {
									alert("Waktu habis! Jawaban akan disimpan.");
									handleFormFinish(paket_soal);
								}}
							/>
						</div>
						<hr/>
							<div className="flex gap-2 
								md:mt-4 md:flex-wrap md:overflow-x-hidden md:p-1 md:static md:p-0 md:bg-transparent dark:md:bg-transparent md:border-0 md:justify-start
								fixed bottom-[68px] z-100 left-0 w-full right-0 bg-gray-100 dark:bg-background border-y-2 justify-center flex-nowrap overflow-x-auto py-4 px-2">
								{Array.from({ length: paket_soal.jumlah_soal }).map((_, index) => (
									<Button 
										key={index}
										onClick={(e) => {
											setIndexSoal(Number(e.target.dataset.index));
										}}
										data-index={index}
										className={
										`w-8 h-8 rounded-sm ring cursor-pointer hover:bg-gray-500 hover:text-white  `+
										`${index == indexSoal ? 'bg-gray-500 text-white ring-gray-500' : `${soal[index]?.jawaban ? "bg-green-700 text-white ring-green-700" : "bg-white text-gray-700 ring-gray-300"}`} `
									}>
										{index+ 1}
									</Button>
								))}
							</div>
					</div>

					<div className="lg:col-span-8 col-span-12 lg:order-1 shadow-md relative space-y-6 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
						{paket_soal.jumlah_soal > 0 && (
							<TestComponent
								key={indexSoal}
								paketSoal={paket_soal}
								nomor={indexSoal + 1}
								soalIndex={soal[indexSoal]}
								/>
								)}

						<hr  className="hidden md:block"/>
						<div className="md:static md:p-0 fixed bottom-0 left-0 w-full right-0 p-4 md:bg-transparent dark:md:bg-transparent bg-gray-100 dark:bg-background grid gap-2 grid-cols-3">
							<div>
								{ indexSoal > 0 && (
									<Button 
										onClick={(e) => {
											setIndexSoal(indexSoal > 0 ? indexSoal - 1: indexSoal);
										}}
										className="mb-0 ring cursor-pointer hover:bg-red-700 hover:text-white bg-red-600 text-white ring-red-600"
									>
										Sebelumnya
									</Button>
									)}
							</div>
							<div>
								<p className="text-center md:hidden">
									{soal.filter( item => item.jawaban !== null && item.jawaban !== "" ).length} / {soal.length}
								</p>
							</div>
							<div>
							{ indexSoal < (paket_soal.jumlah_soal - 1) && (
								<Button 
									onClick={(e) => {
										setIndexSoal(indexSoal < (paket_soal.jumlah_soal - 1) ? indexSoal + 1: indexSoal);
									}}
									className="mb-0 float-right ring cursor-pointer hover:bg-green-700 hover:text-white bg-green-600 text-white ring-green-600"
								>
									Selanjutnya
								</Button>
								)}
							{ indexSoal == (paket_soal.jumlah_soal - 1) && (
								<Button 
									onClick={() => handleFinish(paket_soal) }
									className="mb-0 float-right ring cursor-pointer hover:bg-lime-700 hover:text-white bg-lime-600 text-white ring-lime-600"
								>
									Selesai
								</Button>
								)}
							</div>
						</div>

					</div>
					<div className="md:hidden h-30"/>
				</div>
			</div>

		</AppLayout>
		);
}
