import React, { useState, useMemo } from "react";
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
     * Real-time validation
     */
    const validationError = useMemo(() => {
        if (a === "" || b === "") {
            return "Both fields are required.";
        }

        if (isNaN(a) || isNaN(b)) {
            return "Both 'a' and 'b' must be numeric.";
        }

        return null;
    }, [a, b]);

    const isFormValid = !validationError;

    /**
     * Executes the calculation by calling the service
     */
    const handleCalculation = async () => {

        if (!isFormValid) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setResult(null);

            const sum = await calculateSum(a, b);
            setResult(sum);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    };

    /**
     * Handle Enter key
     */
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleCalculation();
        }
    };

    return (
        <div>

            <div style={{ display: "flex", gap: "10px" }}>

                <input
                    type="number"
                    placeholder="Value A"
                    value={a}
                    onChange={(e) => {
                        setA(e.target.value);
                        setError(null); // clear error while typing
                    }}
                    onKeyDown={handleKeyDown}
                    style={{
                        border: a !== "" && isNaN(a) ? "1px solid red" : undefined
                    }}
                />

                <input
                    type="number"
                    placeholder="Value B"
                    value={b}
                    onChange={(e) => {
                        setB(e.target.value);
                        setError(null); // clear error while typing
                    }}
                    onKeyDown={handleKeyDown}
                    style={{
                        border: b !== "" && isNaN(b) ? "1px solid red" : undefined
                    }}
                />

                <button
                    onClick={handleCalculation}
                    disabled={loading || !isFormValid}
                    style={{
                        opacity: loading || !isFormValid ? 0.6 : 1,
                        cursor: loading || !isFormValid ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease"
                    }}
                >
                    {loading ? "Calculating..." : "Calculate"}
                </button>

            </div>

            {/* Animated Result */}
            {result !== null && (
                <p
                    style={{
                        marginTop: "15px",
                        opacity: result !== null ? 1 : 0,
                        transition: "opacity 0.3s ease-in"
                    }}
                >
                    Result: {result}
                </p>
            )}

            {/* Error Message */}
            {error && (
                <p style={{ marginTop: "15px", color: "red" }}>
                    Error: {error}
                </p>
            )}

        </div>
    );
};

export default SumCalculator;
