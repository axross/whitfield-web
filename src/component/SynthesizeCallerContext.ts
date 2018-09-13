import { createContext } from 'react';
import SynthesizeCaller from '../service/SynthesizeCaller';

export default createContext<SynthesizeCaller>(undefined as any);
