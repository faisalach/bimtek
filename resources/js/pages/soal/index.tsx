import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';
import { store, destroy, update_jumlah_soal, update_durasi } from '@/routes/assesment';
import { show as soalRoute } from '@/routes/soal';
import { Soal as SoalComponent } from '@/components/soal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';

export default function Soal() {
	const { tipe_jawaban, paket_soal, soal } = usePage().props;
	const [jmlSoal, setJmlSoal] = useState(paket_soal?.jumlah_soal ?? 0);
	const [indexSoal, setIndexSoal] = useState(0);
	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Soal',
			href: soalRoute(paket_soal.id).url,
		},
	];
	return (
		<AppLayout breadcrumbs={breadcrumbs}>

			<Head title="Soal" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
					<div className="grid grid-cols-12 gap-4">
						<div className="xl:col-span-2 sm:col-span-4 col-span-6">
							Nama Assesment
							<div className="float-right">:</div>
						</div>
						<div className="xl:col-span-10 sm:col-span-8 col-span-6">
							{ paket_soal.assesment.nama_assesment }
						</div>
						<div className="xl:col-span-2 sm:col-span-4 col-span-6">
							Jenis Tes
							<div className="float-right">:</div>
						</div>
						<div className="xl:col-span-10 sm:col-span-8 col-span-6">
							{ paket_soal.jenis_test }
						</div>
						<div className="xl:col-span-2 sm:col-span-4 col-span-6 flex items-center">
							<span className="block w-full">
								Jumlah Soal
								<div className="float-right">:</div>
							</span>
						</div>
						<div className="xl:col-span-10 sm:col-span-8 col-span-6 flex items-center gap-2">
							<Input
								className="block w-24"
								placeholder="Number"
								type="number"
								defaultValue={paket_soal?.jumlah_soal}
								id="inputJmlSoal"
							/>
							<Button
								className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 cursor-pointer"
								onClick={async (e) => {
									let inputJmlSoal	= document.getElementById("inputJmlSoal").value;
									inputJmlSoal 		= parseInt(inputJmlSoal);
									if (inputJmlSoal < jmlSoal) {
										if (!confirm(`Eksekusi ini akan menghapus soal nomor ${(Number(inputJmlSoal)+1) != jmlSoal ? (Number(inputJmlSoal)+1)+ " - "+jmlSoal : (Number(inputJmlSoal)+1)}` )) {
											return false;
										}
									}
									try {
										const res = await fetch(update_jumlah_soal(paket_soal.id).url, {
											method: "PATCH",
											headers: {
												"Content-Type": "application/json",
												"X-CSRF-TOKEN": document
												.querySelector('meta[name="csrf-token"]')
												?.getAttribute("content"),
											},
											body: JSON.stringify({
												jumlah_soal: inputJmlSoal,
											}),
										});

										if (!res.ok) {
											throw new Error("Gagal update jumlah soal");
										}

										Swal.fire({
											icon: 'success',
											title: 'Berhasil',
											text: 'Jumlah soal berhasil diupdate.',
										});

										setJmlSoal(inputJmlSoal);
									} catch (err) {
										alert(err.message);
									}

								}}
							>
								Set
							</Button>
						</div>
						<div className="xl:col-span-2 sm:col-span-4 col-span-6 flex items-center">
							<span className="block w-full">
								Durasi (menit)
								<div className="float-right">:</div>
							</span>
						</div>
						<div className="xl:col-span-10 sm:col-span-8 col-span-6 flex items-center gap-2">
							<Input
								className="block w-24"
								placeholder="Menit"
								type="number"
								defaultValue={paket_soal?.duration}
								id="inputDuration"
							/>
							<Button
								className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 cursor-pointer"
								onClick={async (e) => {
									let inputDuration	= document.getElementById("inputDuration").value;
									try {
										const res = await fetch(update_durasi(paket_soal.id).url, {
											method: "PATCH",
											headers: {
												"Content-Type": "application/json",
												"X-CSRF-TOKEN": document
												.querySelector('meta[name="csrf-token"]')
												?.getAttribute("content"),
											},
											body: JSON.stringify({
												duration: inputDuration,
											}),
										});

										if (!res.ok) {
											throw new Error("Gagal update durasi");
										}

										Swal.fire({
											icon: 'success',
											title: 'Berhasil',
											text: 'Durasi berhasil diupdate.',
										});

									} catch (err) {
										alert(err.message);
									}

								}}
							>
								Set
							</Button>
						</div>
					</div>
				</div>

				<div className="flex gap-1 flex-wrap">
				{Array.from({ length: jmlSoal }).map((_, index) => (
				<Button 
					key={index}
					onClick={(e) => {
						setIndexSoal(Number(e.target.dataset.index));
					}}
					data-index={index}
					className={`w-8 h-8 ring cursor-pointer hover:bg-gray-700 hover:text-white ${index == indexSoal ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} border-gray-700`}
				>
					{index+ 1}
				</Button>
				))}
				</div>
				{jmlSoal > 0 && (
				    <SoalComponent
				        key={indexSoal}
				        paketSoal={paket_soal}
				        nomor={indexSoal + 1}
				        soal={soal[indexSoal]}
				        tipeJawaban={tipe_jawaban}
				    />
				)}
			</div>
			
		</AppLayout>
	);
}
