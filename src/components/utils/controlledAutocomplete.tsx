/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface ControlledAutocompleteProps {
  options: any[];
  name: string;
  control: any;
  defaultValue: any;
  error: boolean;
  helperText: string | undefined;
  label: string;
}

export default function ControlledAutocomplete(
  props: ControlledAutocompleteProps
) {
  const { options, name, control, defaultValue, error, helperText, label } =
    props;

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <Autocomplete
          sx={{ mb: 2 }}
          fullWidth
          disablePortal
          options={options}
          value={value}
          getOptionLabel={(option) => {
            return option.lable || option.name || '';
          }}
          onChange={(event, item) => {
            setValue(item);
            return onChange({
              id: parseInt(item?.id as unknown as string, 10),
              name: item?.name,
            });
          }}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={error}
              helperText={helperText}
              onChange={onChange}
            />
          )}
        />
      )}
    />
  );
}
