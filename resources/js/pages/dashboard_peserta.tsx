import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import DashboardCard from '@/components/ui/dashboard-card';
import ProgressTimeline from '@/components/ui/progress-timeline';
import { test } from '@/routes/soal';
import {
  BookOpen,
  ClipboardList,
  ClipboardCheck,
  BarChart3,
} from "lucide-react";
import { InputKodeBimtek } from '@/components/ui/input-kode-bimtek';


const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Dashboard',
		href: dashboard().url,
	},
];

export default function Dashboard() {
	const { pretest_buka, pretest_selesai, posttest_selesai, posttest_buka, bimtek_aktif, pretest_id, posttest_id } = usePage().props;
	const formatTanggal = (tanggal) => {
		if (!tanggal) return "";
		const d = new Date(tanggal);
		return d.toLocaleDateString("id-ID", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		});
	};
	return (
		<AppLayout breadcrumbs={breadcrumbs} >
			<Head title="Dashboard" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div className="grid grid-cols-1 lg:grid-cols-4  sm:grid-cols-2 gap-6">
					<DashboardCard
						title="Bimtek"
						className="lg:col-span-2  sm:col-span-2"
						subtitle={
							(formatTanggal(bimtek_aktif?.tanggal_mulai) == formatTanggal(bimtek_aktif?.tanggal_selesai))
							? formatTanggal(bimtek_aktif?.tanggal_mulai)
							: formatTanggal(bimtek_aktif?.tanggal_mulai) + " - " + formatTanggal(bimtek_aktif?.tanggal_selesai)
						}
						icon={BookOpen}
						color="blue"
						variant="soft"
						value={bimtek_aktif?.nama_bimtek ?? "-"}
					/>
					<DashboardCard
						title="Pre Test"
						value={
							bimtek_aktif
							? pretest_selesai != null 
							? pretest_selesai 
							: "Belum"
							: "-"
						}
						subtitle={
							bimtek_aktif
							? pretest_selesai != null 
							? "Poin" 
							: "Wajib dikerjakan"
							: ""
						}
						status={
							pretest_selesai != null 
							? "success" 
							: "pending"
						}
						icon={ClipboardList}
						color="amber"
						variant="soft"
					/>
					<DashboardCard
						title="Post Test"
						icon={ClipboardCheck}
						color="slate"
						variant="soft"
						value={
							bimtek_aktif
							? posttest_buka
							? posttest_selesai != null
							? posttest_selesai
							: "Belum"
							: "Belum"
							: "-"
						}
						subtitle={
							bimtek_aktif
							? posttest_buka
							? posttest_selesai != null
							? "Poin"
							: "Menunggu pengerjaan"
							: "Menunggu dibuka"
							: ""
						}
						status={
							posttest_selesai != null
							? "success"
							: posttest_buka
							? "pending"
							: "disabled"
						}
					/>
				</div>
				{!bimtek_aktif && (
					<InputKodeBimtek />
				)}
				{bimtek_aktif && (
					<>
						<div className="grid gap-4">
							<ProgressTimeline
								pretest={pretest_selesai != null}
								materi={posttest_buka}
								posttest={posttest_selesai != null}
							/>
						</div>
						<div className="flex gap-4 mt-6">
							{pretest_buka && pretest_selesai == null && (
								<a
									href={test({
										bimtek_id:bimtek_aktif?.id,
										paket_id:pretest_id
									}).url}
									className="px-6 py-3 rounded-xl bg-blue-600 text-white
									hover:bg-blue-700 transition shadow-md"
								>
									Mulai Pre Test
								</a>
								)}

							{pretest_selesai != null && posttest_buka && posttest_selesai == null && (
								<a
									href={test({
										bimtek_id:bimtek_aktif?.id,
										paket_id:posttest_id
									}).url}
									className="px-6 py-3 rounded-xl bg-green-600 text-white
									hover:bg-green-700 transition shadow-md"
								>
									Mulai Post Test
								</a>
								)}
						</div>
					</>
				)}
			</div>
		</AppLayout>
		);
}
