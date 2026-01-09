import BimtekController from '@/actions/App/Http/Controllers/BimtekController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit, show } from '@/routes/bimtek';
import Select from 'react-select';
import SelectPesertaBimtek from '@/components/ui/select-peserta-bimtek';


export default function Bimtek() {
	const { data, peserta, assesment, status_paket_soal } = usePage<SharedData>().props;
	const breadcrumbs: BreadcrumbItem[] = [
		{
			title: 'Edit Bimtek',
			href: edit(data.id).url,
		},
	];
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Edit Bimtek" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Form
					{...BimtekController.update.form(data.id)}
					options={{
						preserveScroll: true,
					}}
					className="space-y-6"
				>
					{({ processing, recentlySuccessful, errors }) => (
						<>
						<div className="grid gap-2">
							<Label htmlFor="nama_bimtek">Nama Bimtek</Label>
							<Input
								id="nama_bimtek"
								className="mt-1 block w-full"
								name="nama_bimtek"
								defaultValue={data.nama_bimtek}
								required
								autoComplete="nama_bimtek"
								placeholder="Nama Bimtek"
							/>
							<InputError
								className="mt-2"
								message={errors.nama_bimtek}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="deskripsi">Deskripsi</Label>
							<Textarea
								id="deskripsi"
								className="mt-1 py-2 block w-full h-32"
								name="deskripsi"
								defaultValue={data.deskripsi}
								required
								autoComplete="deskripsi"
								placeholder="Deskripsi"
							/>
							<InputError
								className="mt-2"
								message={errors.deskripsi}
							/>
						</div>
						
						<div className="grid gap-2">
							<Label htmlFor="peserta">Peserta</Label>
							<SelectPesertaBimtek 
								peserta_bimtek={data.peserta_bimtek}
							/>
							<InputError
								className="mt-2"
								message={errors.peserta}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="assesment_id">Assesment</Label>
							<Select
								options={assesment}
								name="assesment_id"
								required
								className="custom-react-select"
								classNamePrefix="custom-react-select"
								unstyled
								defaultValue={assesment.find(
									(item) => item.value === data?.assesment_id
								)}
							/>
							<InputError
								className="mt-2"
								message={errors.assesment_id}
							/>
						</div>
						<div className="grid md:grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="tanggal_mulai">Tanggal Mulai</Label>
								<Input
									id="tanggal_mulai"
									className="mt-1 block w-full"
									name="tanggal_mulai"
									defaultValue={data.tanggal_mulai}
									required
									autoComplete="tanggal_mulai"
									placeholder="Nama Bimtek"
									type="date"
								/>
								<InputError
									className="mt-2"
									message={errors.tanggal_mulai}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="tanggal_selesai">Tanggal Selesai</Label>
								<Input
									id="tanggal_selesai"
									className="mt-1 block w-full"
									name="tanggal_selesai"
									defaultValue={data.tanggal_selesai}
									required
									autoComplete="tanggal_selesai"
									placeholder="Nama Bimtek"
									type="date"
								/>
								<InputError
									className="mt-2"
									message={errors.tanggal_selesai}
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="status_soal_pretest">Status Soal Pre Test</Label>
								<Select
									options={status_paket_soal}
									name="status_soal_pretest"
									required
									className="custom-react-select"
									classNamePrefix="custom-react-select"
									unstyled
									defaultValue={status_paket_soal.find(
										(item) => item.value === data?.status_soal_pretest
										)}
								/>
								<InputError
									className="mt-2"
									message={errors.status_soal_pretest}
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="status_soal_posttest">Status Soal Post Test</Label>
								<Select
									options={status_paket_soal}
									name="status_soal_posttest"
									required
									className="custom-react-select"
									classNamePrefix="custom-react-select"
									unstyled
									defaultValue={status_paket_soal.find(
										(item) => item.value === data?.status_soal_posttest
										)}
								/>
								<InputError
									className="mt-2"
									message={errors.status_soal_posttest}
								/>
							</div>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="kode_reff">Kode Reff</Label>
							<Input
								id="kode_reff"
								className="mt-1 block w-full"
								name="kode_reff"
								defaultValue={data.kode_reff}
								required
								autoComplete="kode_reff"
								placeholder="BimtekABC123"
							/>
							<InputError
								className="mt-2"
								message={errors.kode_reff}
							/>
						</div>

						<div className="flex items-center">
							<Link
								href={show().url}
								className="inline-flex items-center justify-center h-9 w-[90px] bg-gray-100 text-dark hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-gray-400 cursor-pointer"
							>
								Kembali
							</Link>
							<Button
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer"
								disabled={processing}
							>
								Simpan
							</Button>

							<Transition
								show={recentlySuccessful}
								enter="transition ease-in-out"
								enterFrom="opacity-0"
								leave="transition ease-in-out"
								leaveTo="opacity-0"
							>
								<p className="text-sm text-neutral-600">
									Disimpan
								</p>
							</Transition>
						</div>
						</>
						)}
				</Form>
			</div>
		</AppLayout>
		);
}
