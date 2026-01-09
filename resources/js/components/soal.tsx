import SoalController from '@/actions/App/Http/Controllers/SoalController';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { SoalPG } from '@/components/soal-pg';
import { SoalBenarSalah } from '@/components/soal-benar-salah';
import { SoalIsian } from '@/components/soal-isian';
import { Form, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import { show } from '@/routes/assesment'
import Select from 'react-select';

export function Soal({soal, paketSoal, tipeJawaban, nomor}) {
	const [tipe, setTipe] = useState();
	useEffect(() => {
		if (soal?.tipe_jawaban != null) {
			setTipe(soal.tipe_jawaban);
		}
	}, [soal?.tipe_jawaban]);

    return (
			<div className="relative rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
				<Form
					{...SoalController.store.form(paketSoal.id)}
					options={{
						preserveScroll: true,
					}}
					className="space-y-6"
					>
					{({ processing, recentlySuccessful, errors }) => (
					<>
						<input type="hidden" name="id" value={soal?.id} />
						<div className="grid grid-cols-12 gap-2">
							<div className="grid md:col-span-2 col-span-12 gap-2">
								<Label htmlFor="urutan" className="whitespace-nowrap mr-4">No Urut</Label>
								<Input
									id="urutan"
									className="mt-1 block w-full"
									name="urutan"
									required
									autoComplete="urutan"
									placeholder="Number"
									readOnly
									defaultValue={nomor}
								/>
								<InputError
									className="mt-2"
									message={errors.urutan}
								/>
							</div>
							<div className="grid md:col-span-4 col-span-12 gap-2">
								<Label htmlFor="bobot" className="whitespace-nowrap mr-4">Bobot Nilai</Label>
								<Input
									id="bobot"
									className="mt-1 block w-full"
									name="bobot"
									required
									autoComplete="bobot"
									placeholder="Number"
									defaultValue={soal?.bobot ?? 1}
								/>
								<InputError
									className="mt-2"
									message={errors.bobot}
								/>
							</div>
							<div className="grid md:col-span-6 col-span-12 gap-2">
								<Label htmlFor="tipe_jawaban">Tipe Soal</Label>
								<Select
									options={tipeJawaban}
									id="tipe_jawaban" 
									name="tipe_jawaban"
									required
									className="custom-react-select"
									classNamePrefix="custom-react-select"
									unstyled
									defaultValue={tipeJawaban.find(
										(item) => item.value === soal?.tipe_jawaban
										)}
									onChange={(content) => {
										setTipe(content.value);
									}}
								/>
								<InputError 
									className="mt-2" 
									message={errors.tipe_jawaban} />
							</div>
						</div>
						{tipe == 1 && (
							<SoalPG errors={errors} soal={soal}/>
						)}
						{tipe == 2 && (
							<SoalBenarSalah errors={errors}  soal={soal}/>
						)}
						{tipe == 3 && (
							<SoalIsian errors={errors} soal={soal}/>
						)}
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
    );
}
