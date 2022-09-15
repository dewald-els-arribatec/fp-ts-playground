import React, {useState, SyntheticEvent} from 'react';
import {TextInput} from 'carbon-components-react';
import * as E from 'fp-ts/lib/Either';
import {pipe} from 'fp-ts/lib/function'; // formats number string to 2 decimal points by default

const formatNumToFixed = (num: string, dps = 2): string => {
  const test = num.match(/\.\d*$/);
  const testStr = test && test.length ? test[0] : undefined;

  if (testStr && testStr.length - 1 > dps) {
    return Number(num).toFixed(dps);
  }

  return num;
};

const numberInputValue = (
  val: string | null,
  transform: (i: string) => string
) => {
  // pipe: Pipes the value of an expression into a pipeline of functions.
  return pipe(
    E.fromNullable(null)(val),
    E.map(i => i.toString()), // guards against number values
    E.map(transform),
    E.fold(
      () => '',
      i => i
    )
  );
};

export const NumberInputComponent = () => {
  const [percentage, setPercentage] = useState();
  return (
    <TextInput
      min="0"
      max="100"
      step="0.01"
      type="number"
      required
      labelText="Percentage"
      id="input-percentage"
      placeholder="0.00 %"
      value={numberInputValue(percentage || null, formatNumToFixed)}
      name="percentage"
      onChange={(event: SyntheticEvent) => setPercentage(event.target.value)}
    />
  );
};
