import { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

export default function LocaleWrapper({ children }: Props) {
  return children;
}