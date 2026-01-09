import { useState } from 'react';
import { HTMLEditor } from '@/components/ui/html-editor';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

export function SoalPG({errors, soal}) {
	const [teksSoal, setTeksSoal] = useState(soal?.teks_soal);
	const [teksPilihan1, setTeksPilihan1] = useState(soal?.pilihan_jawaban?.[0]?.teks_pilihan);
	const [teksPilihan2, setTeksPilihan2] = useState(soal?.pilihan_jawaban?.[1]?.teks_pilihan);
	const [teksPilihan3, setTeksPilihan3] = useState(soal?.pilihan_jawaban?.[2]?.teks_pilihan);
	const [teksPilihan4, setTeksPilihan4] = useState(soal?.pilihan_jawaban?.[3]?.teks_pilihan);
	const [teksPilihan5, setTeksPilihan5] = useState(soal?.pilihan_jawaban?.[4]?.teks_pilihan);

    return (
        <>
        	<div className="grid gap-2">
				<Label htmlFor="teks_soal">Soal</Label>
				<input type="hidden" name="teks_soal" id="teks_soal" value={teksSoal}/>
				<HTMLEditor
					defaultVal={soal?.teks_soal}
					onEditorChange={(content) => setTeksSoal(content)}
				/>
				<InputError 
					className="mt-2" 
					message={errors.teks_soal} />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="teks_pilihan1">Pilihan Jawaban 1</Label>
				<div className="flex flex-1 gap-2">
					<input type="radio" required name="is_benar" value="1" id="radio1" defaultChecked={soal?.pilihan_jawaban?.[0]?.is_benar} />
					<Label htmlFor="radio1">Kunci Jawaban</Label>
				</div>
				<input type="hidden" name="pilihan_id[1]" value={soal?.pilihan_jawaban?.[0]?.id}/>
				<input type="hidden" name="teks_pilihan[1]" value={teksPilihan1}/>
				<HTMLEditor
					defaultVal={soal?.pilihan_jawaban?.[0]?.teks_pilihan}
					onEditorChange={(content) => setTeksPilihan1(content)}
				/>
				<InputError
					className="mt-2"
					message={errors.teks_pilihan1}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="teks_pilihan2">Pilihan Jawaban 2</Label>
				<div className="flex flex-1 gap-2">
					<input type="radio" name="is_benar" value="2" id="radio2" defaultChecked={soal?.pilihan_jawaban?.[1]?.is_benar} />
					<Label htmlFor="radio2">Kunci Jawaban</Label>
				</div>
				<input type="hidden" name="pilihan_id[2]" value={soal?.pilihan_jawaban?.[1]?.id}/>
				<input type="hidden" name="teks_pilihan[2]" value={teksPilihan2}/>
				<HTMLEditor
					defaultVal={soal?.pilihan_jawaban?.[1]?.teks_pilihan}
					onEditorChange={(content) => setTeksPilihan2(content)}
				/>
				<InputError
					className="mt-2"
					message={errors.teks_pilihan2}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="teks_pilihan3">Pilihan Jawaban 3</Label>
				<div className="flex flex-1 gap-2">
					<input type="radio" name="is_benar" value="3" id="radio3" defaultChecked={soal?.pilihan_jawaban?.[2]?.is_benar} />
					<Label htmlFor="radio3">Kunci Jawaban</Label>
				</div>
				<input type="hidden" name="pilihan_id[3]" value={soal?.pilihan_jawaban?.[2]?.id}/>
				<input type="hidden" name="teks_pilihan[3]" value={teksPilihan3}/>
				<HTMLEditor
					defaultVal={soal?.pilihan_jawaban?.[2]?.teks_pilihan}
					onEditorChange={(content) => setTeksPilihan3(content)}
				/>
				<InputError
					className="mt-2"
					message={errors.teks_pilihan3}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="teks_pilihan4">Pilihan Jawaban 4</Label>
				<div className="flex flex-1 gap-2">
					<input type="radio" name="is_benar" value="4" id="radio4" defaultChecked={soal?.pilihan_jawaban?.[3]?.is_benar} />
					<Label htmlFor="radio4">Kunci Jawaban</Label>
				</div>
				<input type="hidden" name="pilihan_id[4]" value={soal?.pilihan_jawaban?.[3]?.id}/>
				<input type="hidden" name="teks_pilihan[4]" value={teksPilihan4}/>
				<HTMLEditor
					defaultVal={soal?.pilihan_jawaban?.[3]?.teks_pilihan}
					onEditorChange={(content) => setTeksPilihan4(content)}
				/>
				<InputError
					className="mt-2"
					message={errors.teks_pilihan4}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="teks_pilihan5">Pilihan Jawaban 5</Label>
				<div className="flex flex-1 gap-2">
					<input type="radio" name="is_benar" value="5" id="radio5" defaultChecked={soal?.pilihan_jawaban?.[4]?.is_benar} />
					<Label htmlFor="radio5">Kunci Jawaban</Label>
				</div>
				<input type="hidden" name="pilihan_id[5]" value={soal?.pilihan_jawaban?.[4]?.id}/>
				<input type="hidden" name="teks_pilihan[5]" value={teksPilihan5}/>
				<HTMLEditor
					defaultVal={soal?.pilihan_jawaban?.[4]?.teks_pilihan}
					onEditorChange={(content) => setTeksPilihan5(content)}
				/>
				<InputError
					className="mt-2"
					message={errors.teks_pilihan5}
				/>
			</div>
        </>
    );
}
