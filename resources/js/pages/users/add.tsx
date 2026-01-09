import UsersController from '@/actions/App/Http/Controllers/UsersController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { add, show } from '@/routes/users';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Tambah Peserta',
		href: add().url,
	},
];

export default function Users() {
	const { role } = usePage<SharedData>().props;

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Tambah Peserta" />
			<div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
				<Form
					{...UsersController.store.form()}
					options={{
						preserveScroll: true,
					}}
					className="space-y-6"
				>
					{({ processing, recentlySuccessful, errors }) => (
						<>
						<div className="grid gap-2">
							<Label htmlFor="name">Nama Peserta</Label>
							<Input
								id="name"
								className="mt-1 block w-full"
								name="name"
								required
								autoComplete="name"
								placeholder="Nama Peserta"
							/>
							<InputError
								className="mt-2"
								message={errors.name}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="role">Role</Label>
							<Select
								options={role}
								name="role"
								required
								className="custom-react-select"
								classNamePrefix="custom-react-select"
								unstyled
							/>
							<InputError
								className="mt-2"
								message={errors.role}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="no_telp">No Telp / Wa</Label>
							<Input
								id="no_telp"
								className="mt-1 block w-full"
								name="no_telp"
								required
								autoComplete="no_telp"
								placeholder="08**********"
							/>
							<InputError
								className="mt-2"
								message={errors.no_telp}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								className="mt-1 block w-full"
								name="email"
								required
								autoComplete="email"
								placeholder="Email"
								type="email"
							/>
							<InputError
								className="mt-2"
								message={errors.email}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="instansi">Instansi</Label>
							<Input
								id="instansi"
								className="mt-1 block w-full"
								name="instansi"
								required
								autoComplete="instansi"
								placeholder="Instansi"
							/>
							<InputError
								className="mt-2"
								message={errors.instansi}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								className="mt-1 block w-full"
								name="password"
								required
								autoComplete="password"
								placeholder="Password"
							/>
							<InputError
								className="mt-2"
								message={errors.password}
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
