"use client";

import { useRef, useState, type KeyboardEvent } from "react";

export interface RoleView {
  company: string;
  role: string;
  date: string;
  location: string;
  logo: string;
  summary: string;
  achievements: string[];
  apps: { title: string; type: string; image?: string; body: string; stack: string }[];
}

/**
 * Roles as vertical tabs on a wide screen; on a phone the tabs are dropped
 * and every panel is shown as a timeline (CSS overrides `hidden` there), so
 * all four roles are in the HTML either way — for crawlers, and for the CV
 * and this section to agree.
 *
 * Keyboard: the tab pattern — Up/Down move between roles (and select them),
 * Home/End jump, only the selected tab is in the tab order.
 */
export function ExperienceTabs({
  roles,
  tabsLabel,
  productsLabel,
}: {
  roles: RoleView[];
  tabsLabel: string;
  productsLabel: string;
}) {
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (index: number, focus: boolean) => {
    const next = (index + roles.length) % roles.length;
    setSelected(next);
    if (focus) tabsRef.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowDown: selected + 1,
      ArrowUp: selected - 1,
      Home: 0,
      End: roles.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key], true);
  };

  return (
    <div className="exp">
      <div
        className="exp-tabs"
        role="tablist"
        aria-label={tabsLabel}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
      >
        {roles.map((role, index) => (
          <button
            key={role.company}
            type="button"
            role="tab"
            id={`exp-tab-${index}`}
            aria-selected={index === selected}
            aria-controls={`exp-panel-${index}`}
            tabIndex={index === selected ? 0 : -1}
            ref={(node) => {
              tabsRef.current[index] = node;
            }}
            onClick={() => select(index, false)}
          >
            <span className="exp-tab-date">{role.date}</span>{" "}
            <span className="exp-tab-company">{role.company}</span>{" "}
            <span className="exp-tab-role">{role.role}</span>
          </button>
        ))}
      </div>

      <div className="exp-panels">
        {roles.map((role, index) => (
          <div
            key={role.company}
            className="exp-panel"
            role="tabpanel"
            id={`exp-panel-${index}`}
            aria-labelledby={`exp-tab-${index}`}
            hidden={index !== selected}
          >
            <div className="exp-panel-head">
              <img src={role.logo} alt="" width="52" height="52" loading="lazy" />
              <div>
                <h3 className="exp-company">{role.company}</h3>
                <p className="exp-meta">
                  {role.role} · {role.location} · {role.date}
                </p>
              </div>
            </div>
            <p className="exp-summary">{role.summary}</p>
            <ul className="exp-points">
              {role.achievements.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="exp-apps-label">
              {productsLabel} · {role.apps.length}
            </p>
            <ul className="exp-apps">
              {role.apps.map((app) => (
                <li key={app.title}>
                  {app.image ? (
                    <img src={app.image} alt="" width="40" height="40" loading="lazy" />
                  ) : (
                    <span className="study-row-fallback" aria-hidden="true">
                      {app.title.slice(0, 1)}
                    </span>
                  )}
                  <div>
                    <p className="exp-app-title">
                      {app.title} <span>· {app.type}</span>
                    </p>
                    <p className="exp-app-body">{app.body}</p>
                    <p className="exp-app-stack">{app.stack}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
