import React, { useState, useMemo } from "react";
import { calculateSum } from "../services/sumService";
import "./SumCalculator.css";

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
     * Formats number with thousands separators
     */
    const formatNumber = (value) => {
        if (value === null || value === undefined) return "";

        return new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 20
        }).format(value);
    };

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
            setResult(Number(sum));

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleCalculation();
        }
    };

    return (
        <div className="sum-wrapper">
            <div className="sum-card">

                <h1 className="sum-title">Sum Calculator</h1>
                <p className="sum-subtitle">
                    Enter two numbers to calculate their sum
                </p>

                <div className="sum-form">

                    <input
                        type="number"
                        placeholder="Value A"
                        value={a}
                        onChange={(e) => {
                            setA(e.target.value);
                            setError(null);
                        }}
                        onKeyDown={handleKeyDown}
                        className={`sum-input ${a !== "" && isNaN(a) ? "error" : ""}`}
                    />

                    <input
                        type="number"
                        placeholder="Value B"
                        value={b}
                        onChange={(e) => {
                            setB(e.target.value);
                            setError(null);
                        }}
                        onKeyDown={handleKeyDown}
                        className={`sum-input ${b !== "" && isNaN(b) ? "error" : ""}`}
                    />

                    <button
                        onClick={handleCalculation}
                        disabled={loading || !isFormValid}
                        className="sum-button"
                    >
                        {loading ? "Calculating..." : "Calculate"}
                    </button>

                </div>

                {result !== null && (
                    <div className="sum-result">
                        Result: {formatNumber(result)}
                    </div>
                )}

                {error && (
                    <div className="sum-error">
                        {error}
                    </div>
                )}

            </div>
        </div>
    );
};

export default SumCalculator;
