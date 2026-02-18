import React, { useState } from "react";
import { calculateSum } from "../services/sumService";

/**
 * Component that handles the user interface
 * and interaction logic.
 */
const SumCalculator = () => {

    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    /**
     * Basic validation before sending to the backend
     */
    const validateInputs = () => {
        if (a === "" || b === "") {
            return "Both fields are required.";
        }

        if (isNaN(a) || isNaN(b)) {
            return "Both 'a' and 'b' must be numeric.";
        }

        return null;
    };

    /**
     * Executes the calculation by calling the service
     */
    const handleCalculation = async () => {

        setResult(null);
        setError(null);

        const validationError = validateInputs();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            const sum = await calculateSum(a, b);

            setResult(sum);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div>

            <div style={{ display: "flex", gap: "10px" }}>

                <input
                    type="number"
                    placeholder="Value A"
                    value={a}
                    onChange={(e) => setA(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Value B"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                />

                <button
                    onClick={handleCalculation}
                    disabled={loading}
                >
                    {loading ? "Calculating..." : "Calculate"}
                </button>

            </div>

            {result !== null && (
                <p style={{ marginTop: "15px" }}>
                    Result: {result}
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
