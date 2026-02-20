import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.05)', // Fondo sutilmente oscuro para resaltar el modal
    },
    content: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 25,
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A1A1A', // Casi negro para legibilidad
    },
    separator: {
        marginVertical: 15,
        height: 1,
        width: '100%',
        backgroundColor: '#F0F0F0',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#4A4A4A',
        lineHeight: 22,
        marginBottom: 20,
    },
    list: {
        alignSelf: 'flex-start',
        width: '100%',
        marginBottom: 25,
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 12,
    },
    listItem: {
        fontSize: 15,
        color: '#555',
        marginVertical: 6,
    },
    button: {
        backgroundColor: '#007AFF', // Azul estándar
        paddingVertical: 14,
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    }
});