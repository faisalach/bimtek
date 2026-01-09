import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Pengaturan profile',
		href: edit().url,
	},
];

export default function Profile() {
	const { auth } = usePage<SharedData>().props;

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Pengaturan profile" />

			<SettingsLayout>
				<div className="space-y-6">
					<HeadingSmall
						title="Informasi profile"
						description="Perbarui profile Anda"
					/>

					<Form
						{...ProfileController.update.form()}
						options={{
							preserveScroll: true,
						}}
						className="space-y-6"
					>
						{({ processing, recentlySuccessful, errors }) => (
							<>
							<div className="grid gap-2">
								<Label htmlFor="name">Nama Lengkap</Label>

								<Input
									id="name"
									className="mt-1 block w-full"
									defaultValue={auth.user.name}
									name="name"
									required
									autoComplete="name"
									placeholder="Nama Lengkap"
								/>

								<InputError
									className="mt-2"
									message={errors.name}
								/>
							</div>


							<div className="grid gap-2">
								<Label htmlFor="no_telp">No Telp / Wa</Label>

								<Input
									id="no_telp"
									className="mt-1 block w-full"
									defaultValue={auth.user.no_telp}
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
									type="email"
									className="mt-1 block w-full"
									defaultValue={auth.user.email}
									name="email"
									required
									autoComplete="email"
									placeholder="Email"
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
									defaultValue={auth.user.instansi}
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

							<div className="flex items-center gap-4">
								<Button
									disabled={processing}
									data-test="update-profile-button"
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

			</SettingsLayout>
		</AppLayout>
		);
}
