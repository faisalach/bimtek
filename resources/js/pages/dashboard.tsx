import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import DashboardCard from '@/components/ui/dashboard-card';
import { ChartNilai } from '@/components/ui/chart-nilai';
import { ChartProgress } from '@/components/ui/chart-progress';
import {
    Users,
    BookOpen,
    ClipboardCheck,
    ClipboardList,
} from "lucide-react";


const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Dashboard',
		href: dashboard().url,
	},
];

export default function Dashboard() {
	const { jml_bimtek, jml_peserta, jml_peserta_pretest, jml_peserta_sudah_pretest, jml_peserta_posttest, jml_peserta_sudah_posttest, nilai_data, progress_data } = usePage().props;
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Dashboard" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<DashboardCard
						variant="soft"
						color="blue"
						title="Total Bimtek"
						value={jml_bimtek}
						subtitle="Bimtek aktif & selesai"
						icon={BookOpen}
					/>

					<DashboardCard
						variant="soft"
						color="amber"
						title="Total Peserta"
						value={jml_peserta}
						subtitle="Peserta terdaftar"
						icon={Users}
					/>

					<DashboardCard
						variant="soft"
						color="slate"
						title="Pre Test Selesai"
						value={jml_peserta_sudah_pretest + " / " + jml_peserta_pretest}
						subtitle="Sudah mengerjakan"
						icon={ClipboardList}
					/>

					<DashboardCard
						variant="soft"
						color="green"
						title="Post Test Selesai"
						value={jml_peserta_sudah_posttest + " / " + jml_peserta_posttest}
						subtitle="Sudah mengerjakan"
						icon={ClipboardCheck}
					/>
				</div>
				<div className="grid gap-4 grid-cols-12">
					<div className="lg:col-span-8 col-span-12 relative overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
						<ChartNilai data={nilai_data}/>
					</div>
					<div className="lg:col-span-4 col-span-12 relative overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
						<ChartProgress data={progress_data}/>
					</div>
				</div>
			</div>
		</AppLayout>
		);
}
