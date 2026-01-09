import AssesmentController from '@/actions/App/Http/Controllers/AssesmentController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { add, show } from '@/routes/assesment';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Tambah Assesment',
		href: add().url,
	},
];

export default function PaketSoal() {
	const { jenis_bimtek } = usePage<SharedData>().props;

	return (
		<AppLayout breadcrumbs={breadcrumbs} >
			<Head title="Tambah Assesment" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Form
					{...AssesmentController.store.form()}
					options={{
						preserveScroll: true,
					}}
					className="space-y-6"
				>
					{({ processing, recentlySuccessful, errors }) => (
						<>
						<div className="grid gap-2">
							<Label htmlFor="nama_assesment">Nama Assesment</Label>
							<Input
								id="nama_assesment"
								name="nama_assesment"
								required
								autoComplete="nama_assesment"
								placeholder="Nama Assesment"
							/>
							<InputError
								className="mt-2"
								message={errors.nama_assesment}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="jenis_bimtek">Jenis Bimtek</Label>
							<Select
								options={jenis_bimtek}
								name="jenis_bimtek"
								className="custom-react-select"
								classNamePrefix="custom-react-select"
								unstyled
							/>
							<InputError
								className="mt-2"
								message={errors.jenis_bimtek}
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
