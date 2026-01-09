import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async'
import {getData as getUser} from '@/routes/users';

const formatSelectedValue = (peserta_bimtek) => {
	const data 	= [];
	peserta_bimtek.map((row) => {
		data.push({
			value: row.peserta_id,
			label: row.peserta.name,
		})
	});
	return data;
}
const SelectPesertaBimtek = ({peserta_bimtek = []}) => {
	const [options, setOptions] = useState([]);
	const [selectedValue, setSelectedValue] = useState(formatSelectedValue(peserta_bimtek));

	const handleChange = (selectedOption) => {
		setSelectedValue(selectedOption);
	};

	const loadOptions = async (inputValue: string) => {
		const params = new URLSearchParams({
			start: 0,
			length: 10,
			role: 2,
			'search[value]': inputValue
		});

		const response = await fetch(`${getUser().url}?${params.toString()}`);
		const result = await response.json();
		return result.data.map((item: any) => ({
			value: item.id,
			label: item.name,
		}));
	};

	return (
		<AsyncSelect
			cacheOptions
			defaultOptions
			name="peserta_id[]"
			loadOptions={loadOptions}
			value={selectedValue}
			onChange={handleChange}
			isMulti
			placeholder="Cari peserta..."
			isClearable
			className="custom-react-select"
			classNamePrefix="custom-react-select"
			unstyled
		/>
	);
};

export default SelectPesertaBimtek;
