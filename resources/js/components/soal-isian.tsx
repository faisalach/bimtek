import { useState } from 'react';
import { HTMLEditor } from '@/components/ui/html-editor';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';

export function SoalIsian({errors, soal}) {
	const [teksSoal, setTeksSoal] = useState(soal?.teks_soal);
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
				<Label htmlFor="kunci_jawaban">Kunci Jawaban</Label>
				<Textarea
					id="kunci_jawaban"
					className="mt-1 block w-full h-32 py-2"
					name="kunci_jawaban"
					defaultValue={soal?.kunci_jawaban}
					required
					placeholder="Kunci Jawaban"
				/>
				<InputError 
					className="mt-2" 
					message={errors.kunci_jawaban} />
			</div>
        </>
    );
}
