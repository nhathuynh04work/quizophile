import { Transform, TransformFnParams } from 'class-transformer';

export function Trim() {
  return Transform(({ value }: TransformFnParams): unknown => {
    if (typeof value !== 'string') return value;
    return value.trim();
  });
}

export function ToLowerCase() {
  return Transform(({ value }: TransformFnParams): unknown => {
    if (typeof value !== 'string') return value;
    return value.toLowerCase();
  });
}
