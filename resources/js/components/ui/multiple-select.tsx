import Select, { components } from 'react-select';
import { useState } from 'react';

const MenuList = (props) => {
	const { inputValue, onInputChange } = props.selectProps;

	return (
		<components.MenuList {...props}>
			<div style={{ padding: 8 }}>
				<input
					type="text"
					placeholder="Search.."
					autoFocus
					value={inputValue}
					onChange={(e) => onInputChange(e.target.value)}
					onMouseDown={(e) => e.stopPropagation()}
					className="w-full px-2 py-1 rounded-md border outline-none"
				/>
			</div>
			{props.children}
		</components.MenuList>
	);
};

const ValueContainer = ({ children, ...props }) => {
	const values = props.getValue();
	const count = values.length;
	const totalOptions = props.options.length;

	return (
		<components.ValueContainer {...props}>
			<div style={{ pointerEvents: "none" }}>
				{count === totalOptions
				? "All"
				: count > 0
				? `${count} Selected`
				: "Select"}
			</div>

      {/* WAJIB: render children */}
			<div style={{ display: "none" }}>{children}</div>
		</components.ValueContainer>
		);
};


const Option = (props) => {
	return (
		<components.Option {...props}>
			<input
				type="checkbox"
				checked={props.isSelected}
				onChange={() => null}
				style={{ marginRight: 8 }}
			/>
			<span>{props.label}</span>
		</components.Option>
		);
};


export function MultipleSelect({
	className,
	...props
}: Props) {
	const [inputValue, setInputValue] = useState("");

	return (
		<Select
			className={`${className} custom-react-select-container`}
			classNamePrefix="custom-react-select"
			unstyled
			isMulti
			isSearchable
			closeMenuOnSelect={false}
			hideSelectedOptions={false}
			components={{ 
				Option,
				ValueContainer,
				MenuList
			}}
			styles={{
				control: (base) => ({
					...base,
					// minHeight: 40,
				}),
			}}
			{...props}
			/>
			)
}
