import { Raw } from 'typeorm';

export const rawString = (data: string | undefined) =>
  data
    ? Raw((alias) => `LOWER(${alias}) Like '%${data.toLowerCase()}%'`)
    : undefined;

export const rawNumber = (data: number | undefined) =>
  !Number.isNaN(data) ? data : undefined;
