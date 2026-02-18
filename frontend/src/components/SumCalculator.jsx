import React, { useState } from "react";
import { calculateSum } from "../services/sumService";

/**
 * Componente que maneja la interfaz
 * y la lógica de interacción del usuario.
 */
const SumCalculator = () => {

    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(false);

    /**
     * Validación básica antes de enviar al backend
     */
    const validarInputs = () => {
        if (a === "" || b === "") {
            return "Ambos campos son obligatorios.";
        }

        if (isNaN(a) || isNaN(b)) {
            return "Los valores deben ser numéricos.";
        }

        return null;
    };

    /**
     * Ejecuta el cálculo llamando al servicio
     */
    const manejarCalculo = async () => {

        setResultado(null);
        setError(null);

        const errorValidacion = validarInputs();

        if (errorValidacion) {
            setError(errorValidacion);
            return;
        }

        try {
            setCargando(true);

            const suma = await calculateSum(a, b);

            setResultado(suma);

        } catch (err) {

            setError(err.message);

        } finally {

            setCargando(false);
        }
    };

    return (
        <div>

            <div style={{ display: "flex", gap: "10px" }}>

                <input
                    type="number"
                    placeholder="Valor A"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor B"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                />

                <button
                    onClick={manejarCalculo}
                    disabled={cargando}
                >
                    {cargando ? "Calculando..." : "Calculate"}
                </button>

            </div>

            {resultado !== null && (
                <p style={{ marginTop: "15px" }}>
                    Resultado: {resultado}
                </p>
            )}

            {error && (
                <p style={{ marginTop: "15px", color: "red" }}>
                    Error: {error}
                </p>
            )}

        </div>
    );
};

export default SumCalculator;
