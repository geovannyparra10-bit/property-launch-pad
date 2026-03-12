"use client";

import { useState, useTransition } from "react";
import {
  saveScenario,
  togglePin,
  deleteScenario,
  type ScenarioDTO,
} from "@/scenarios";
import type { Locale } from "@/lib/types";
import { Pin, PinOff, Trash2, Save, FolderOpen, Loader as Loader2, ChevronDown, ChevronUp, CircleAlert as AlertCircle } from "lucide-react";

interface ScenarioPanelProps {
  toolSlug: string;
  locale: Locale;
  currentInputs: Record<string, unknown>;
  currentOutputs: Record<string, unknown> | null;
  onLoadScenario: (inputs: Record<string, unknown>) => void;
  scenarios: ScenarioDTO[];
  onScenariosChange: (scenarios: ScenarioDTO[]) => void;
}

export default function ScenarioPanel({
  toolSlug,
  locale,
  currentInputs,
  currentOutputs,
  onLoadScenario,
  scenarios,
  onScenariosChange,
}: ScenarioPanelProps) {
  const [scenarioName, setScenarioName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    const name = scenarioName.trim();
    if (!name) {
      setError("Please enter a scenario name");
      return;
    }
    setError(null);

    startTransition(async () => {
      try {
        const saved = await saveScenario(
          toolSlug,
          name,
          currentInputs,
          currentOutputs,
          locale
        );
        onScenariosChange(
          [saved, ...scenarios.filter((s) => s.id !== saved.id)].sort(
            (a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0)
          )
        );
        setScenarioName("");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save");
      }
    });
  };

  const handleTogglePin = (id: string) => {
    startTransition(async () => {
      try {
        await togglePin(id, toolSlug, locale);
        const updated = scenarios
          .map((s) => (s.id === id ? { ...s, is_pinned: !s.is_pinned } : s))
          .sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0));
        onScenariosChange(updated);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to toggle pin");
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteScenario(id, toolSlug, locale);
        onScenariosChange(scenarios.filter((s) => s.id !== id));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to delete");
      }
    });
  };

  return (
    <div className="scenario-panel">
      <style jsx>{`
        .scenario-panel {
          background: var(--surface-elevated, #1a1f2e);
          border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 12px;
          overflow: hidden;
        }
        .sp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          cursor: pointer;
          user-select: none;
          transition: background 0.15s;
        }
        .sp-header:hover {
          background: rgba(255, 255, 255, 0.03);
        }
        .sp-header h3 {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary, #e2e8f0);
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
        }
        .sp-badge {
          background: var(--accent-dim, #334155);
          color: var(--text-secondary, #94a3b8);
          font-size: 11px;
          font-weight: 500;
          padding: 2px 7px;
          border-radius: 10px;
        }
        .sp-body {
          padding: 0 18px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sp-save-row {
          display: flex;
          gap: 8px;
        }
        .sp-save-row input {
          flex: 1;
          padding: 9px 12px;
          background: var(--input-bg, #0f1320);
          border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 8px;
          color: var(--text-primary, #e2e8f0);
          font-size: 13px;
          outline: none;
          transition: border-color 0.15s;
        }
        .sp-save-row input:focus {
          border-color: var(--accent, #6366f1);
        }
        .sp-save-row input::placeholder {
          color: var(--text-muted, #4a5568);
        }
        .sp-btn-save {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          background: var(--accent, #6366f1);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.15s;
        }
        .sp-btn-save:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .sp-error {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--error, #f87171);
        }
        .sp-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 280px;
          overflow-y: auto;
        }
        .sp-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: var(--surface-base, #0f1320);
          border: 1px solid var(--border-subtle, #2a3042);
          border-radius: 8px;
          transition: border-color 0.15s;
        }
        .sp-item:hover {
          border-color: var(--border-hover, #3a4562);
        }
        .sp-item.pinned {
          border-color: rgba(99, 102, 241, 0.4);
          background: rgba(99, 102, 241, 0.06);
        }
        .sp-name {
          flex: 1;
          font-size: 13px;
          color: var(--text-primary, #e2e8f0);
          cursor: pointer;
        }
        .sp-name:hover {
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .sp-date {
          font-size: 11px;
          color: var(--text-muted, #4a5568);
          white-space: nowrap;
        }
        .sp-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border: none;
          border-radius: 6px;
          background: transparent;
          color: var(--text-secondary, #94a3b8);
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .sp-icon-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-primary, #e2e8f0);
        }
        .sp-icon-btn.danger:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }
        .sp-icon-btn.pin-active {
          color: var(--accent, #6366f1);
        }
        .sp-empty {
          text-align: center;
          padding: 20px 12px;
          color: var(--text-muted, #4a5568);
          font-size: 13px;
        }
      `}</style>

      <div className="sp-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>
          <FolderOpen size={16} />
          Saved Scenarios
          {scenarios.length > 0 && (
            <span className="sp-badge">{scenarios.length}</span>
          )}
        </h3>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>

      {isExpanded && (
        <div className="sp-body">
          <div className="sp-save-row">
            <input
              type="text"
              placeholder="Scenario name (max 60 chars)"
              maxLength={60}
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <button
              className="sp-btn-save"
              onClick={handleSave}
              disabled={isPending || !scenarioName.trim()}
            >
              {isPending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              Save
            </button>
          </div>

          {error && (
            <div className="sp-error">
              <AlertCircle size={13} />
              {error}
            </div>
          )}

          <div className="sp-list">
            {scenarios.length === 0 ? (
              <div className="sp-empty">
                No saved scenarios yet. Adjust the calculator values and save to
                compare later.
              </div>
            ) : (
              scenarios.map((s) => (
                <div
                  key={s.id}
                  className={`sp-item ${s.is_pinned ? "pinned" : ""}`}
                >
                  <button
                    className={`sp-icon-btn ${s.is_pinned ? "pin-active" : ""}`}
                    onClick={() => handleTogglePin(s.id)}
                    title={s.is_pinned ? "Unpin" : "Pin"}
                  >
                    {s.is_pinned ? <Pin size={14} /> : <PinOff size={14} />}
                  </button>
                  <span
                    className="sp-name"
                    onClick={() => onLoadScenario(s.inputs)}
                    title="Click to load this scenario"
                  >
                    {s.scenario_name}
                  </span>
                  <span className="sp-date">
                    {new Date(s.updated_at).toLocaleDateString()}
                  </span>
                  <button
                    className="sp-icon-btn danger"
                    onClick={() => handleDelete(s.id)}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
