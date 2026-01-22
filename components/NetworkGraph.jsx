"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function NetworkGraph({ data, onFailUpdate }) {
  const ref = useRef();
  const [failedNodes, setFailedNodes] = useState([]);
  const [riskScores, setRiskScores] = useState({});

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 700;
    const height = 450;

    const simulation = d3
      .forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-350))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 12)
      .attr("fill", d => (failedNodes.includes(d.id) ? "red" : "steelblue"))
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", (event, d) => runContagion(d.id));

    node.append("title").text(d => `${d.name} (Capital: ${d.capital})`);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    function runContagion(startId) {
      const failed = new Set([startId]);
      let changed = true;

      while (changed) {
        changed = false;
        data.links.forEach(link => {
          const src = link.source.id || link.source;
          const tgt = link.target.id || link.target;

          if (failed.has(src) && !failed.has(tgt)) {
            const exposure = link.value;
            const targetNode = data.nodes.find(n => n.id === tgt);

            if (exposure > targetNode.capital * 0.3) {
              failed.add(tgt);
              changed = true;
            }
          }
        });
      }

      const scores = {};
      data.nodes.forEach(node => {
        scores[node.id] = failed.has(node.id) ? 1 : 0;
      });

      setRiskScores(scores);
      setFailedNodes(Array.from(failed));
      onFailUpdate && onFailUpdate(failed.size);
    }
  }, [data, failedNodes]);

  function resetSimulation() {
    setFailedNodes([]);
    setRiskScores({});
    onFailUpdate && onFailUpdate(0);
  }

  return (
    <div>
      <p>Click a bank node to simulate failure contagion</p>

      <button onClick={resetSimulation} style={{ marginBottom: "10px" }}>
        Reset Simulation
      </button>

      <svg ref={ref} width={700} height={450}></svg>

      <h3>Risk Scores</h3>
      <ul>
        {data.nodes.map(n => (
          <li key={n.id}>
            {n.name}: {riskScores[n.id] ?? 0}
          </li>
        ))}
      </ul>
    </div>
  );
}
