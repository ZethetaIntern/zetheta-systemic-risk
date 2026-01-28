"use client";

import data from "../../data/strategyData.json";

export default function QuantitativeRiskDashboard() {
  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Quantitative Risk Dashboard
      </h1>

      <p style={{ textAlign: "center", marginBottom: "30px", color: "#d1e8ff" }}>
        Comparison of investment strategies based on risk and return metrics
      </p>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "20px",
          color: "#000000",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#203a43", color: "#ffffff" }}>
              <th style={thStyle}>Strategy</th>
              <th style={thStyle}>Return (%)</th>
              <th style={thStyle}>Risk</th>
              <th style={thStyle}>Sharpe Ratio</th>
              <th style={thStyle}>Max Drawdown (%)</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f4f8fb" : "#e8f1f8",
                }}
              >
                <td style={tdStyle}>{item.strategy}</td>

                <td
                  style={{
                    ...tdStyle,
                    color: item.return >= 12 ? "green" : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {item.return}
                </td>

                <td style={tdStyle}>{item.risk}</td>

                <td
                  style={{
                    ...tdStyle,
                    color: item.sharpe >= 1.5 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {item.sharpe}
                </td>

                <td
                  style={{
                    ...tdStyle,
                    color: item.drawdown < -15 ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {item.drawdown}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          color: "#cfe9ff",
          fontSize: "14px",
        }}
      >
        Green values indicate better risk-adjusted performance. Red indicates
        higher risk or drawdowns.
      </p>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  borderBottom: "2px solid #ffffff",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #cccccc",
};
