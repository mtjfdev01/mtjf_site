import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import axiosInstance from "../utils/axios";

/**
 * Donor portal donations listing (simple donations only).
 * - No filters, view-only.
 * - Shows a "Tracking" hint if a tracker exists.
 *
 * REQUIRED:
 * - Implement/enable API endpoint: GET {API_BASE_URL}/donations/my
 *   Response supported:
 *     A) { success:true, data:[...] }
 *     B) [...]
 *
 * OPTIONAL:
 * - If your list endpoint already includes tracking info, return one of:
 *     donation.progress_tracker_id
 *     donation.progress_tracker?.id
 *     donation.has_tracking
 *   Otherwise we will lazy-check tracker existence on the View page.
 */
export default function DonorDonations() {
  const navigate = useNavigate();

  return (
    <>
      <DonorDonationsList
        onOpenDonation={(id) => navigate(`/donor/donations/${id}`)}
      />
      <Footer />
    </>
  );
}

function formatDonationId(id) {
  if (id === null || id === undefined || id === "") return "-";
  return `MTJF-D-${String(id)}`;
}

function DonorDonationsList({ onOpenDonation }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [donations, setDonations] = useState([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await axiosInstance.post("/donor-auth/logout");
    } catch {
      // Even if server says we're already logged out, treat as success
    } finally {
      setIsLoggingOut(false);
      navigate("/donor-login");
    }
  };

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get("/donor-portal/donations");
        const json = response?.data;
        const rows = Array.isArray(json) ? json : json?.data;
        if (!Array.isArray(rows)) {
          throw new Error("Unexpected response format");
        }

        if (alive) setDonations(rows);
      } catch (e) {
        if (e?.response?.status === 401) {
          navigate("/donor-login");
          return;
        }
        if (alive) setError(e?.message || "Failed to load donations");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [navigate]);

  const rows = useMemo(() => {
    // Basic sort: newest first (works for created_at or date)
    const copy = [...donations];
    copy.sort((a, b) => {
      const da = new Date(a?.created_at || a?.date || 0).getTime();
      const db = new Date(b?.created_at || b?.date || 0).getTime();
      return db - da;
    });
    return copy;
  }, [donations]);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>My Donations</div>
          <div style={styles.subtitle}>View-only donation history.</div>
        </div>
        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out…" : "Logout"}
        </button>
      </div>

      {loading && <div style={styles.card}>Loading…</div>}

      {!loading && error && (
        <div style={{ ...styles.card, ...styles.error }}>{error}</div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div style={styles.card}>No donations found.</div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div style={styles.card}>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.thRight}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => {
                  const id = d?.id;
                  const date = d?.date || d?.created_at;
                  const amount = formatMoney(d?.amount, d?.currency);
                  const status = d?.status || "-";

                  const trackerId =
                    d?.progress_tracker?.id ??
                    d?.progress_tracker_id ??
                    d?.progress_trackerId ??
                    null;

                  const hasTracking =
                    Boolean(trackerId) || d?.has_tracking === true;

                  return (
                    <tr key={String(id)} style={styles.tr}>
                      <td style={styles.tdMono}>{formatDonationId(id)}</td>
                      <td style={styles.td}>
                        {date ? new Date(date).toLocaleDateString() : "-"}
                      </td>
                      <td style={styles.td}>{amount}</td>
                      <td style={styles.td}>
                        <span style={badgeStyle(status)}>{status}</span>
                      </td>
                      <td style={styles.tdRight}>
                        <button
                          style={styles.btn}
                          onClick={() => onOpenDonation?.(id)}
                        >
                          View
                        </button>
                        {hasTracking && (
                          <span style={styles.hint}>Tracking available</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={styles.footnote}>
            Note: Tracking details appear inside the donation view.
          </div>
        </div>
      )}
    </div>
  );
}

function formatMoney(amount, currency) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "-";
  const cur = currency || "PKR";
  return `${cur} ${n.toLocaleString()}`;
}

function badgeStyle(status) {
  const s = String(status || "").toLowerCase();
  const base = {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    color: "#374151",
  };
  if (s === "completed")
    return {
      ...base,
      background: "#ecfdf5",
      color: "#065f46",
      borderColor: "#a7f3d0",
    };
  if (s === "pending")
    return {
      ...base,
      background: "#fffbeb",
      color: "#92400e",
      borderColor: "#fde68a",
    };
  if (s === "failed")
    return {
      ...base,
      background: "#fef2f2",
      color: "#991b1b",
      borderColor: "#fecaca",
    };
  if (s === "cancelled")
    return {
      ...base,
      background: "#f3f4f6",
      color: "#111827",
      borderColor: "#e5e7eb",
    };
  return base;
}

const styles = {
  page: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "140px 16px 60px",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
    color: "#111827",
  },
  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  title: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" },
  subtitle: { marginTop: 6, fontSize: 14, color: "#6b7280" },
  logoutBtn: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#111827",
    fontWeight: 800,
    cursor: "pointer",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  error: {
    borderColor: "#fecaca",
    background: "#fff1f2",
    color: "#9f1239",
    fontWeight: 600,
  },
  tableWrap: { width: "100%", overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 760 },
  th: {
    textAlign: "left",
    fontSize: 12,
    color: "#6b7280",
    fontWeight: 700,
    borderBottom: "1px solid #e5e7eb",
    padding: "10px 10px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  thRight: {
    textAlign: "right",
    fontSize: 12,
    color: "#6b7280",
    fontWeight: 700,
    borderBottom: "1px solid #e5e7eb",
    padding: "10px 10px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  tr: { borderBottom: "1px solid #f3f4f6" },
  td: { padding: "12px 10px", fontSize: 14, color: "#111827" },
  tdMono: {
    padding: "12px 10px",
    fontSize: 13,
    color: "#111827",
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  tdRight: { padding: "12px 10px", textAlign: "right", whiteSpace: "nowrap" },
  btn: {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#111827",
    color: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  },
  hint: { marginLeft: 10, fontSize: 12, color: "#6b7280" },
  footnote: { marginTop: 10, fontSize: 12, color: "#6b7280" },
};

