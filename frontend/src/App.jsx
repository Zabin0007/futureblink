import { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import './index.css'
import { 
  ReactFlow, 
  applyNodeChanges, 
  applyEdgeChanges, 
  addEdge,
  Background,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Input Node - where user types
const InputNode = ({ data }) => {
  const [localValue, setLocalValue] = useState(data.value || '');

  // Update local state immediately for responsive typing
  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    // Update the data object directly for immediate access by other functions
    data.value = newValue;
  };

  // Sync with external updates (like clearing after API call)
  useEffect(() => {
    if (data.value !== localValue) {
      setLocalValue(data.value || '');
    }
  }, [data.value, localValue]);

  return (
    <div className="node input-node">
      <div className="node-title">📝 Input</div>
      <textarea
        className="textarea"
        value={localValue}
        onChange={handleChange}
        placeholder="Type your prompt here..."
      />
    </div>
  );
};

// Result Node - shows AI response
const ResultNode = ({ data }) => (
  <div className="node result-node">
    <div className="node-title">🤖 Response</div>
    <div className="result-text">
      {data.loading ? (
        <span className="loading">Processing...</span>
      ) : data.value ? (
        <p>{data.value}</p>
      ) : (
        <span className="placeholder">Click Run Flow to see response...</span>
      )}
    </div>
  </div>
);

const nodeTypes = {
  input: InputNode,
  result: ResultNode,
};

const initialNodes = [
  { 
    id: 'input', 
    position: { x: window.innerWidth > 768 ? 100 : 20, y: window.innerWidth > 768 ? 100 : 80 }, 
    data: { value: '' },
    type: 'input',
    draggable: false
  },
  { 
    id: 'result', 
    position: { x: window.innerWidth > 768 ? 100 : 20, y: window.innerWidth > 768 ? 400 : 300 }, 
    data: { value: '', loading: false },
    type: 'result',
    draggable: false
  },
];

const initialEdges = [
  { id: 'e1-2', source: 'input', target: 'result' }
];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [loading, setLoading] = useState(false);

  const onNodesChange = useCallback( 
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  // Run Flow - Call backend AI
  const handleRunFlow = async () => {
    try {
      const inputNode = nodes.find((n) => n.id === 'input');
      const prompt = inputNode.data.value;

      if (!prompt.trim()) {
        alert('Please type something!');
        return;
      }

      setLoading(true);

      // Show loading in result node
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === 'result') {
            return { ...n, data: { ...n.data, loading: true } };
          }
          return n;
        })
      );

      // Call backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ask-ai`,
        { prompt }
      );

      // Update result node
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === 'result') {
            return {
              ...n,
              data: { 
                ...n.data, 
                value: response.data.response,
                loading: false 
              },
            };
          }
          return n;
        })
      );

      setLoading(false);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Failed to get response'));
      setLoading(false);

      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === 'result') {
            return { ...n, data: { ...n.data, loading: false } };
          }
          return n;
        })
      );
    }
  };

  // Save - Call backend save API
  const handleSave = async () => {
    try {
      setLoading(true)
      const inputNode = nodes.find((n) => n.id === 'input');
      const resultNode = nodes.find((n) => n.id === 'result');

      const prompt = inputNode.data.value;
      const response = resultNode.data.value;

      if (!prompt || !response) {
        alert('Please run flow first!');
        return;
      }

      // Call backend
      await axios.post(`${import.meta.env.VITE_API_URL}/api/save`, {
        prompt,
        response,
      });

      alert('✅ Saved successfully!');
      setLoading(false)
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || 'Failed to save'));
    }
  };

  return (
    <div className="container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <div className="buttons">
        <button onClick={handleRunFlow} disabled={loading} className="btn-run">
          {loading ? 'Running...' : '▶️ Run Flow'}
        </button>
        <button onClick={handleSave} disabled={loading} className="btn-save">
          💾 Save
        </button>
      </div>
    </div>
  );
}

export default App;
