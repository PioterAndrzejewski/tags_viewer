import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SelectBase, { SelectChangeEvent } from "@mui/material/Select";

export type Option<T> = {
  value: T;
  label: string;
};

type SelectProps<T> = {
  onChange: (selectedValue: T) => void;
  options: Option<T>[];
  value: T;
  label: string;
  disabled: boolean;
};

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { onChange, value, options, label, disabled } = props;

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as T;
    onChange(newValue);
  };

  console.log(value);

  return (
    <FormControl>
      <InputLabel id={label} className='capitalize'>
        {label}
      </InputLabel>
      <SelectBase
        labelId={label}
        id={label}
        value={value}
        onChange={handleChange}
        autoWidth
        label={label}
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </SelectBase>
    </FormControl>
  );
};
