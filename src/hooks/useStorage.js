import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  TRANSACTIONS: '@thr_transactions',
  THEME: '@thr_theme',
  TARGET: '@thr_saving_target',
};

export function useStorage() {
  const saveTransactions = useCallback(async (transactions) => {
    try {
      await AsyncStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
      console.error('Error saving transactions:', e);
    }
  }, []);

  const loadTransactions = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(KEYS.TRANSACTIONS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Error loading transactions:', e);
      return [];
    }
  }, []);

  const saveTheme = useCallback(async (isDark) => {
    try {
      await AsyncStorage.setItem(KEYS.THEME, JSON.stringify(isDark));
    } catch (e) {
      console.error('Error saving theme:', e);
    }
  }, []);

  const loadTheme = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(KEYS.THEME);
      return raw ? JSON.parse(raw) : false;
    } catch (e) {
      return false;
    }
  }, []);

  const saveTarget = useCallback(async (target) => {
    try {
      await AsyncStorage.setItem(KEYS.TARGET, JSON.stringify(target));
    } catch (e) {
      console.error('Error saving target:', e);
    }
  }, []);

  const loadTarget = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(KEYS.TARGET);
      return raw ? JSON.parse(raw) : 0;
    } catch (e) {
      return 0;
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([KEYS.TRANSACTIONS, KEYS.TARGET]);
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  }, []);

  return {
    saveTransactions,
    loadTransactions,
    saveTheme,
    loadTheme,
    saveTarget,
    loadTarget,
    clearAll,
  };
}