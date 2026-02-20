import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const STORAGE_KEY = '@chat_session_id_v1';
// Respaldo en memoria por si el disco es lento
let _inMemoryId: string | null = null;

export const IdentityService = {
    async getOrCreateId(): Promise<string> {
        // 1. Si ya lo cargamos en esta sesión de la app, devolverlo de inmediato
        if (_inMemoryId) return _inMemoryId;

        try {
            // 2. Intentar leer del disco
            const savedId = await AsyncStorage.getItem(STORAGE_KEY);

            if (savedId !== null) {
                _inMemoryId = savedId;
                return savedId;
            }

            // 3. Si no existe, crear, guardar y cachear en memoria
            const newId = Crypto.randomUUID();
            await AsyncStorage.setItem(STORAGE_KEY, newId);
            _inMemoryId = newId;
            return newId;

        } catch (error: unknown) {
            // ✅ SonarQube: Handle exception
            const msg = error instanceof Error ? error.message : 'AsyncStorage Error';
            console.error(`[IdentityService] Error crítico: ${msg}`);

            // 4. Fallback: Si el disco falla, generamos uno que dure 
            // al menos mientras la app esté abierta
            if (!_inMemoryId) {
                _inMemoryId = `mem_${Date.now()}_${Math.random().toString(36).substring(7)}`;
            }
            return _inMemoryId;
        }
    }
};