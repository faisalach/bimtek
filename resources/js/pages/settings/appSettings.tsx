import AppSettingsController from '@/actions/App/Http/Controllers/Settings/AppSettingsController';
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
import { edit } from '@/routes/appSettings';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Pengaturan Aplikasi',
		href: edit().url,
	},
];
export default function AppSettings() {
	const { app_name } = usePage<SharedData>().props;
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Pengaturan Aplikasi" />

			<SettingsLayout>
				<div className="space-y-6">
					<HeadingSmall
						title="Pengaturan Aplikasi"
						description="Perbarui Pengaturan Aplikasi Anda"
					/>

					<Form
						{...AppSettingsController.update.form()}
						options={{
							preserveScroll: true,
						}}
						className="space-y-6"
					>
						{({ processing, recentlySuccessful, errors }) => (
							<>
							<div className="grid gap-2">
								<Label htmlFor="app_name">Nama Aplikasi</Label>

								<Input
									id="app_name"
									className="mt-1 block w-full"
									defaultValue={app_name}
									name="app_name"
									required
									autoComplete="app_name"
									placeholder="Nama Aplikasi"
								/>

								<InputError
									className="mt-2"
									message={errors.app_name}
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
