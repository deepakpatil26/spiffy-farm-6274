import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;