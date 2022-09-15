import React, {useState} from 'react';
import O from 'fp-ts/lib/Option';
import {flow} from 'fp-ts/lib/function';
import {DatePicker, DatePickerInput} from 'carbon-components-react';

// flow: Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

// the output of safeDate is Option<Date>
const safeDate = flow((val: Date) => val || undefined, O.fromNullable);

// toUndefined(date: Option<Date>) => Date | undefined
const getSafeDate = flow(O.toUndefined, val => val || '');

export const ReactOptionEither = () => {
  const [date, setDate] = useState<string>('');

  return (
    <DatePicker
      dateFormat="d-m-Y"
      datePickerType="single"
      onChange={(event: [Date]) => setDate(safeDate(event[0]))}
      value={getSafeDate(date)} // the DatePicker value is either Date or empty string
    >
      <DatePickerInput
        id="date-picker-calendar-id"
        placeholder="dd/mm/yyyy"
        labelText="My Date"
        type="text"
        name="date_component"
      />
    </DatePicker>
  );
};
