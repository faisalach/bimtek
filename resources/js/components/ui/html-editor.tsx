import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { upload } from '@/routes/soal';

export function HTMLEditor({ defaultVal, ...props }) {

	return (
		<Editor
			apiKey='a6see77sqohjjo591ehe8w44bx7ligll496h1bag95u5jdn2'
			initialValue={defaultVal}
			init={{
				height: 200,
				menubar: false,
				plugins: 'lists table autolink image fullscreen',
				toolbar: 'fontsize bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | undo redo | image table | fullscreen',
				// content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
				image_title: false,
				image_uploadtab: true,
				automatic_uploads: true,
				file_picker_types: 'image',
				images_upload_handler: async (blobInfo) => {
					const formData = new FormData();
					formData.append('file', blobInfo.blob(), blobInfo.filename());
					const res = await fetch(upload().url, {
						method: 'POST',
						headers: {
							"X-CSRF-TOKEN": document
							.querySelector('meta[name="csrf-token"]')
							?.getAttribute("content"),
						},
						body: formData,
					});
					const json = await res.json();
					return json.location;
				},
			}}
			{...props}
		/>
	);
}
