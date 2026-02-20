const STORAGE_KEY = 'chat_conversation_id_v1';

export const IdentityService = {
    getOrCreateId(): string {
        try {
            // 1. Intentar recuperar de localStorage
            const savedId = localStorage.getItem(STORAGE_KEY);

            if (savedId) return savedId;

            // 2. Si no existe, crear uno nuevo
            // En Web usamos crypto.randomUUID() nativo (disponible en navegadores modernos)
            const newId = crypto.randomUUID();
            localStorage.setItem(STORAGE_KEY, newId);

            return newId;
        } catch (error) {
            // Regla SonarQube: Manejo de excepción
            console.error("[IdentityService] Error accessing localStorage:", error);
            return `web_temp_${Date.now()}`;
        }
    }
};