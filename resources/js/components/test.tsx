import SoalController from '@/actions/App/Http/Controllers/SoalController';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SelectTipeJawaban from '@/components/ui/select-tipe-jawaban';
import InputError from '@/components/input-error';
import { SoalPG } from '@/components/soal-pg';
import { SoalBenarSalah } from '@/components/soal-benar-salah';
import { SoalIsian } from '@/components/soal-isian';
import { Form, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import { Textarea } from '@/components/ui/textarea';
import { store_test as store } from '@/routes/soal';

const submitJawaban = async (paketSoal, soalIndex, jawaban) => {
	try {
		router.post(
			store({
				paket_id:paketSoal?.id,
				bimtek_id:paketSoal?.assesment?.bimtek?.[0]?.id
			}).url,
			{
				soal_id: soalIndex.id,
				jawaban: jawaban,
			},
			{
				preserveScroll: true,
			}
		);
	} catch (err) {
		console.log('gagal simpan', err);
	}
};

export function Test({soalIndex, paketSoal, nomor}) {
	
    return (
    	<div className="md:min-h-50 min-h-[calc(100vh-300px)]">
			<input type="hidden" name="id" value={soalIndex?.id} />
			<div className="flex gap-2 mb-4">
				<div>
					{soalIndex?.urutan}.
				</div>
				<div dangerouslySetInnerHTML={{ __html: soalIndex?.teks_soal.replace(
					/src="\.\.\/storage/g,
					`src="${window.location.origin}/storage`
					) }} />
			</div>
			{(soalIndex?.tipe_jawaban == 1 || soalIndex?.tipe_jawaban == 2) && (
				<div className="flex flex-col gap-4">
					{soalIndex?.pilihan_jawaban?.map((pj, index) => (
						<Label key={pj.id} className="flex items-center gap-4">
							<input
								type="radio"
								name={`jawaban[${soalIndex?.id}]`}
								value={pj.id}
								id={`radio_${soalIndex?.id}_${pj.id}`}
								defaultChecked={pj.id == soalIndex?.jawaban?.pilihan_id}
								onChange={() => submitJawaban(paketSoal,soalIndex, pj.id)}
							/>
							<Label htmlFor={`radio_${soalIndex?.id}_${pj.id}`}>
								<div dangerouslySetInnerHTML={{ __html: pj.teks_pilihan }} />
							</Label>
						</Label>
					))}
				</div>
			)}
			{soalIndex?.tipe_jawaban == 3 && (
				<Textarea
					className="mt-1 block w-full h-32 py-3"
					name={`jawaban[${soalIndex?.id}]`}
					placeholder="Tulis Jawaban Disini"
					defaultValue={soalIndex?.jawaban?.jawaban_text}
					onBlur={(e) => submitJawaban(paketSoal,soalIndex, e.target.value)}
				/>
			)}
		</div>
    );
}
