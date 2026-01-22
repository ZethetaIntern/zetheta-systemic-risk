"use client";

import NetworkGraph from "../components/NetworkGraph";
import data from "../data/network.json";
import { useState } from "react";

export default function Home() {
  const [failedCount, setFailedCount] = useState(0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Systemic Risk Network Visualizer</h1>

      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px"
      }}>
        <div style={cardStyle}>
          <h3>Total Banks</h3>
          <p>{data.nodes.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Failed Banks</h3>
          <p>{failedCount}</p>
        </div>

        <div style={cardStyle}>
          <h3>Systemic Risk</h3>
          <p>{((failedCount / data.nodes.length) * 100).toFixed(1)}%</p>
        </div>
      </div>

      <NetworkGraph data={data} onFailUpdate={setFailedCount} />
    </div>
  );
}

const cardStyle = {
  background: "#f4f4f4",
  padding: "15px",
  borderRadius: "8px",
  minWidth: "150px",
  textAlign: "center"
};
