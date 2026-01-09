import { useState } from 'react';
import ReactDOM from "react-dom/client";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Plus } from "lucide-react";
import Datatables from '@/components/datatables';
import { show, getData } from '@/routes/riwayat_nilai';
import { InputKodeBimtek } from '@/components/ui/input-kode-bimtek';

export default function Users() {
	const { peserta, auth } = usePage().props;

	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Riwayat Nilai',
			href: show(peserta.id).url,
		},
	];
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Riwayat Nilai" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<InputKodeBimtek
					table={window.riwayatNilaiTable}
				/>

				{auth.user.role != 2 && (
					<div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
						<div className="grid grid-cols-12 gap-4">
							<div className="xl:col-span-2 sm:col-span-4 col-span-6">
								Nama Peserta
								<div className="float-right">:</div>
							</div>
							<div className="xl:col-span-10 sm:col-span-8 col-span-6">
								{ peserta.name }
							</div>
						</div>
						<div className="grid grid-cols-12 gap-4">
							<div className="xl:col-span-2 sm:col-span-4 col-span-6">
								Instansi
								<div className="float-right">:</div>
							</div>
							<div className="xl:col-span-10 sm:col-span-8 col-span-6">
								{ peserta.instansi }
							</div>
						</div>
						<div className="grid grid-cols-12 gap-4">
							<div className="xl:col-span-2 sm:col-span-4 col-span-6">
								Email
								<div className="float-right">:</div>
							</div>
							<div className="xl:col-span-10 sm:col-span-8 col-span-6">
								{ peserta.email }
							</div>
						</div>
						<div className="grid grid-cols-12 gap-4">
							<div className="xl:col-span-2 sm:col-span-4 col-span-6">
								No Telp / Wa
								<div className="float-right">:</div>
							</div>
							<div className="xl:col-span-10 sm:col-span-8 col-span-6">
								{ peserta.no_telp }
							</div>
						</div>
					</div>
					)
				}
				<div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
					<Datatables 
						id="datatable"
						ajaxUrl={getData().url}
						customData={{
							user_id : peserta.id
						}}
						onInit={(table) => {
							window.riwayatNilaiTable = table;
						}}
						columns={[
							{ data: 'nama_bimtek' },
							{ data: 'jenis_bimtek' },
							{ data: 'nilai_pretest' },
							{ data: 'nilai_posttest' },
						]}>
						<thead>
							<tr className="bg-blue-500 text-white">
								<th>Bimtek</th>
								<th>Jenis Bimtek</th>
								<th>Nilai Pre Test</th>
								<th>Nilai Post Test</th>
							</tr>
						</thead>
					</Datatables>
				</div>
			</div>
		</AppLayout>
		);
}
