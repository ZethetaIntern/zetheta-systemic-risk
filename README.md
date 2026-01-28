# Systemic Risk Network Visualizer

An interactive web-based simulation to analyze financial contagion and systemic risk in a banking network.

## 🚀 Features

- Interactive D3.js network graph  
- Bank failure contagion simulation  
- Exposure-weighted propagation  
- Real-time systemic risk dashboard  
- Reset simulation functionality  
- Risk score calculation per institution  

## 🛠 Tech Stack

- Next.js  
- React  
- D3.js  
- JavaScript  
- Node.js  

## 📊 Dataset

Synthetic interbank network dataset containing:
- Nodes: Banks with capital buffers  
- Links: Exposure values between banks  

## 🧠 Methodology

1. Nodes represent banks  
2. Edges represent financial exposure  
3. Clicking a node triggers failure  
4. Failures propagate if exposure > 30% of capital  
5. Systemic Risk = (failed banks / total banks) × 100  

## 📦 Installation

```bash
npm install
npm run dev
