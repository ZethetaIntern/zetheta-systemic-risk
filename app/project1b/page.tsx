"use client";

import data from "../../data/strategyData.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
      <h1 style={{ textAlign: "center" }}>
        Quantitative Risk Dashboard
      </h1>

      <p style={{ textAlign: "center", color: "#d1e8ff" }}>
        Risk & performance comparison of investment strategies
      </p>

      {/* 🔹 TABLE CARD */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "20px",
          color: "#000000",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          marginBottom: "40px",
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
              <th style={thStyle}>Sharpe</th>
              <th style={thStyle}>Drawdown (%)</th>
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

      {/* 🔹 CHART CARD */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "20px",
          color: "#000000",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Sharpe Ratio Comparison
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="strategy" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sharpe" fill="#2c5364" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          color: "#cfe9ff",
          fontSize: "14px",
        }}
      >
        Higher Sharpe Ratio indicates better risk-adjusted performance.
      </p>
    </div>
  );
}

const thStyle = {
  padding: "12px",
};

const tdStyle = {
  padding: "10px",
};
