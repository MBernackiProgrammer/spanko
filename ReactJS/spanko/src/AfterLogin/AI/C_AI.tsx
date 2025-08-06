import React, { useEffect, useState } from "react";

const C_AI = () => {
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch("http://172.24.3.142:3003/sleep", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start: "2025-08-06T02:00:00Z",
            end: "2025-08-06T05:00:00Z",
            length: 180,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setAnalysis(data.analysis);
      } catch (err) {
        setError("Błąd podczas pobierania analizy snu.");
        console.error(err);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Analiza snu</h1>
      {error && <p className="text-red-600">{error}</p>}
      {!error && !analysis && <p>Ładowanie analizy...</p>}
      {analysis && (
        <p
          className="prose"
          dangerouslySetInnerHTML={{ __html: analysis.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
        />
      )}
    </div>
  );
};

export default C_AI;
