/**
 * Servicio encargado de comunicarse con el backend.
 * Separa la lógica de red del componente.
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

/**
 * Envía los valores al backend para calcular la suma.
 * @param {number|string} a
 * @param {number|string} b
 * @returns {Promise<number>}
 */
export const calculateSum = async (a, b) => {

    const response = await fetch(`${API_BASE_URL}/api/sum`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ a, b })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Error en el servidor");
    }

    return data.sum;
};
