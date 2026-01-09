import { useState } from 'react';
import { HTMLEditor } from '@/components/ui/html-editor';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

export function SoalBenarSalah({errors, soal}) {
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
				<div className="flex flex-1 gap-2">
					<input type="radio" name="is_benar" value="1" id="radioBenar" defaultChecked={soal?.pilihan_jawaban?.[0]?.is_benar} />
					<Label htmlFor="radioBenar">Benar</Label>
					<input type="hidden" name="teks_pilihan[1]" value="Benar"/>
					<input type="hidden" name="pilihan_id[1]" value={soal?.pilihan_jawaban?.[0]?.id}/>
				</div>
				<div className="flex flex-1 gap-2">
					<input type="radio" name="is_benar" value="2" id="radioSalah" defaultChecked={soal?.pilihan_jawaban?.[1]?.is_benar} />
					<Label htmlFor="radioSalah">Salah</Label>
					<input type="hidden" name="teks_pilihan[2]" value="Salah"/>
					<input type="hidden" name="pilihan_id[2]" value={soal?.pilihan_jawaban?.[1]?.id}/>
				</div>
			</div>
        </>
    );
}
