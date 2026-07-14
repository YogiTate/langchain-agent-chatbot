import React from "react";

function TraceRail({ trace }) {
  return (
    <div className="trace-rail">
      <div className="trace-header">
        {/* Your robot icon is integrated directly into the sidebar brand! */}
        <img 
          src="/src/assest/favicon.jpg" 
          alt="Agent AI" 
          className="app-brand-icon"
        />
        <div className="brand-text-wrapper">
          <h3>Agent AI</h3>
          <p>Telemetry Engine</p>
        </div>
      </div>
      
      <div className="trace-stream">
        {trace.length === 0 ? (
          <div style={{ color: "var(--text-muted)", textAlign: "center", marginTop: "40px", fontSize: "0.85rem" }}>
            Awaiting prompt initiation...
          </div>
        ) : (
          trace.map((step, index) => (
            <div className="trace-node" key={index}>
              <div className="trace-node-stage">{step.stage}</div>
              <div className="trace-node-detail">{step.detail}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TraceRail;