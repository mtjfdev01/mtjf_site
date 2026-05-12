import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import axiosInstance from "../utils/axios";
import "./DonorDonationView.css";

/**
 * Donor portal donation view + tracking (read-only).
 *
 * REQUIRED:
 * - GET /donor-portal/donations/:id
 *   Response supported:
 *     A) { success:true, data:{...} }
 *     B) {...}
 *
 * OPTIONAL tracking integration:
 * - New: donation.progress_trackers[] — each item has template (name/code),
 *   overall_status, and steps[] (each step may include batch + evidence).
 *   UI: pick tracker (allocation type) → pick batch (if multiple) → steps list.
 * - Legacy: donation.progress_tracker?.id → GET /progress/trackers/:trackerId/steps
 */
export default function DonorDonationViewPage() {
  const navigate = useNavigate();
  const params = useParams();
  const donationId = params?.id;

  return (
    <>
      <DonorDonationView
        donationId={donationId}
        onBack={() => navigate("/donor/donations")}
      />
      <Footer />
    </>
  );
}

function formatDonationId(id) {
  if (id === null || id === undefined || id === "") return "-";
  return `MTJF-D-${String(id)}`;
}

function DonorDonationView({ donationId, onBack }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [donation, setDonation] = useState(null);

  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState("");
  /** Legacy API: flat steps array from GET /progress/trackers/:id/steps */
  const [legacyTrackingSteps, setLegacyTrackingSteps] = useState(null);
  const [activeTrackerId, setActiveTrackerId] = useState(null);
  const [activeBatchKey, setActiveBatchKey] = useState(null);
  const navigate = useNavigate();

  const embeddedTrackers = useMemo(() => {
    const raw = donation?.progress_trackers;
    if (!Array.isArray(raw) || raw.length === 0) return [];
    return raw
      .filter((t) => t?.donor_visible !== false)
      .map((t) => ({
        ...t,
        steps: Array.isArray(t?.steps)
          ? t.steps
              .filter((s) => s?.donor_visible !== false)
              .slice()
              .sort((a, b) => Number(a?.step_order || 0) - Number(b?.step_order || 0))
          : [],
      }));
  }, [donation?.progress_trackers, donation?.id]);

  const hasEmbeddedTracking = embeddedTrackers.length > 0;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await axiosInstance.post("/donor-auth/logout");
    } catch {
      // ignore
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
        const response = await axiosInstance.get(`/donor-portal/donations/${donationId}`);
        const json = response?.data;
        const d = json?.data ?? json;
        if (!d || typeof d !== "object")
          throw new Error("Unexpected response format");
        if (alive) setDonation(d);
      } catch (e) {
        if (e?.response?.status === 401) {
          navigate("/donor-login");
          return;
        }
        if (alive) setError(e?.message || "Failed to load donation");
      } finally {
        if (alive) setLoading(false);
      }
    }

    if (donationId != null) run();
    return () => {
      alive = false;
    };
  }, [donationId, navigate]);

  useEffect(() => {
    if (hasEmbeddedTracking) {
      setTrackingLoading(false);
      setTrackingError("");
      setLegacyTrackingSteps(null);
      return undefined;
    }

    let alive = true;

    async function runTracking() {
      const trackerId = donation?.progress_tracker?.id ?? null;
      if (!trackerId) {
        if (alive) {
          setTrackingLoading(false);
          setTrackingError("");
          setLegacyTrackingSteps(null);
        }
        return;
      }

      setTrackingLoading(true);
      setTrackingError("");
      setLegacyTrackingSteps(null);

      try {
        const stepsResponse = await axiosInstance.get(
          `/progress/trackers/${trackerId}/steps`
        );
        const data = stepsResponse?.data;
        const steps = Array.isArray(data) ? data : data?.data;
        if (!Array.isArray(steps)) {
          throw new Error("Unexpected tracking response format");
        }
        const normalized = steps
          .filter((s) => s?.donor_visible !== false)
          .slice()
          .sort((a, b) => Number(a?.step_order || 0) - Number(b?.step_order || 0));
        if (alive) setLegacyTrackingSteps(normalized);
      } catch (e) {
        if (e?.response?.status === 401) {
          navigate("/donor-login");
          return;
        }
        if (e?.response?.status === 404) {
          if (alive) {
            setTrackingError("");
            setLegacyTrackingSteps(null);
          }
          return;
        }
        if (alive) setTrackingError(e?.message || "Failed to load tracking");
      } finally {
        if (alive) setTrackingLoading(false);
      }
    }

    runTracking();
    return () => {
      alive = false;
    };
  }, [donation?.progress_tracker?.id, donation?.id, hasEmbeddedTracking, navigate]);

  useEffect(() => {
    if (!hasEmbeddedTracking) {
      setActiveTrackerId(null);
      return;
    }
    setActiveTrackerId((prev) => {
      const firstId = embeddedTrackers[0]?.id ?? null;
      if (prev == null) return firstId;
      if (embeddedTrackers.some((t) => t.id === prev)) return prev;
      return firstId;
    });
  }, [hasEmbeddedTracking, embeddedTrackers]);

  const activeEmbeddedTracker = useMemo(() => {
    if (!hasEmbeddedTracking) return null;
    return (
      embeddedTrackers.find((t) => t.id === activeTrackerId) || embeddedTrackers[0] || null
    );
  }, [hasEmbeddedTracking, embeddedTrackers, activeTrackerId]);

  const stepsForTracking = useMemo(() => {
    if (hasEmbeddedTracking && activeEmbeddedTracker) {
      return activeEmbeddedTracker.steps || [];
    }
    return legacyTrackingSteps;
  }, [hasEmbeddedTracking, activeEmbeddedTracker, legacyTrackingSteps]);

  const info = useMemo(() => {
    if (!donation) return [];
    return [
      { label: "Donation ID", value: formatDonationId(donation.id) },
      {
        label: "Date",
        value:
          donation.date || donation.created_at
            ? new Date(donation.date || donation.created_at).toLocaleString()
            : "-",
      },
      { label: "Amount", value: formatMoney(donation.amount, donation.currency) },
      { label: "Status", value: donation.status || "-" },
      { label: "Method", value: donation.donation_method || "-" },
      { label: "Type", value: donation.donation_type || "-" },
      { label: "Project", value: donation.project_name || "-" },
    ];
  }, [donation]);

  const heroStatus = useMemo(() => {
    const raw = String(donation?.status || "").toLowerCase();
    if (raw === "completed") return { label: "Completed", tone: "completed" };
    if (raw === "pending") return { label: "In progress", tone: "pending" };
    if (raw === "in_progress") return { label: "In progress", tone: "in_progress" };
    if (raw === "failed") return { label: "Payment failed", tone: "cancelled" };
    if (raw === "cancelled") return { label: "Cancelled", tone: "cancelled" };
    return { label: donation?.status || "In progress", tone: "pending" };
  }, [donation?.status]);

  const trackingBatches = useMemo(() => {
    if (!Array.isArray(stepsForTracking)) return null;

    const groups = new Map();
    for (const step of stepsForTracking) {
      const batchId = step?.batch_id ?? step?.batch?.id ?? null;
      const key = batchId != null ? String(batchId) : "no-batch";
      const existing = groups.get(key);
      if (existing) {
        existing.steps.push(step);
      } else {
        groups.set(key, {
          key,
          batch: step?.batch ?? null,
          steps: [step],
        });
      }
    }

    const asArray = Array.from(groups.values());
    for (const g of asArray) {
      g.steps = g.steps
        .slice()
        .sort((a, b) => Number(a?.step_order || 0) - Number(b?.step_order || 0));
    }

    // Prefer ordering by batch_number when available (older → newer).
    asArray.sort((a, b) => {
      const an = Number(a?.batch?.batch_number);
      const bn = Number(b?.batch?.batch_number);
      const aHas = Number.isFinite(an);
      const bHas = Number.isFinite(bn);
      if (aHas && bHas) return an - bn;
      if (aHas) return -1;
      if (bHas) return 1;
      return 0;
    });

    return asArray;
  }, [stepsForTracking]);

  useEffect(() => {
    if (!trackingBatches || trackingBatches.length === 0) {
      setActiveBatchKey(null);
      return;
    }
    setActiveBatchKey((prev) => {
      if (prev && trackingBatches.some((b) => b.key === prev)) return prev;
      // Default to first batch (oldest when sorted by batch_number ascending)
      return trackingBatches[0]?.key ?? null;
    });
  }, [trackingBatches]);

  const activeBatch = useMemo(() => {
    if (!trackingBatches || !activeBatchKey) return null;
    return trackingBatches.find((b) => b.key === activeBatchKey) || null;
  }, [trackingBatches, activeBatchKey]);

  const canHaveLegacyTracking = Boolean(donation?.progress_tracker?.id);
  const showNoTrackingMessage =
    !trackingLoading &&
    !trackingError &&
    !hasEmbeddedTracking &&
    !canHaveLegacyTracking;

  const showEmptyStepsMessage =
    !trackingLoading &&
    !trackingError &&
    (hasEmbeddedTracking || canHaveLegacyTracking) &&
    Array.isArray(stepsForTracking) &&
    stepsForTracking.length === 0;

  const showTrackingSteps =
    !trackingLoading &&
    !trackingError &&
    Array.isArray(stepsForTracking) &&
    stepsForTracking.length > 0;

  return (
    <main className="donorDonationView">
      <div className="donorDonationView__container">
        <section className="ddvHero ddvCard" aria-label="Donation hero">
          <picture>
            <source
              media="(max-width: 720px)"
              srcSet="/assets/donation_view_mob_hero.png"
            />
            <img
              className="ddvHero__img"
              src="/assets/donation_view_desktop_hero.png"
              alt=""
              aria-hidden="true"
            />
          </picture>
          <div className="ddvHero__veil" />

          <div className="ddvHero__topbar">
            <button className="ddvBtn" onClick={onBack} type="button">
              <ArrowLeftIcon />
              Back
            </button>
            <button
              className="ddvBtn ddvBtn--primary"
              onClick={handleLogout}
              disabled={isLoggingOut}
              type="button"
            >
              <LogoutIcon />
              {isLoggingOut ? "Logout…" : "Logout"}
            </button>
          </div>

          <div className="ddvHero__content">
            <h1 className="ddvHero__title">Donation Details</h1>
            <p className="ddvHero__subtitle">
              Details and tracking (if available).
            </p>

            <div className="ddvHero__statusPill">
              <div className="ddvHero__statusIcon" aria-hidden="true">
                <HeartHandsIcon />
              </div>
              <div>
                <div className="ddvHero__statusTextTop">
                  Your donation is {heroStatus.label.toLowerCase()}
                </div>
                <div className="ddvHero__statusTextBottom">
                  You will be notified at every step.
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading && (
          <section className="ddvCard ddvSection" aria-label="Loading">
            <div className="ddvMuted">Loading…</div>
          </section>
        )}

        {!loading && error && (
          <section className="ddvCard ddvSection" aria-label="Error">
            <div className="ddvInlineError">{error}</div>
          </section>
        )}

        {!loading && !error && donation && (
          <>
            <section className="ddvCard ddvSection" aria-label="Summary">
              <div className="ddvSection__head">
                <div className="ddvSection__icon" aria-hidden="true">
                  <DocIcon />
                </div>
                <div>
                  <h2 className="ddvSection__title">Summary</h2>
                  <div className="ddvSection__divider" />
                </div>
              </div>

              <div className="ddvSummaryGrid">
                <Kv icon={<HashIcon />} k="Donation ID" v={renderValue(formatDonationId(donation.id))} />
                <Kv
                  icon={<CalendarIcon />}
                  k="Date"
                  v={
                    donation.date || donation.created_at
                      ? new Date(donation.date || donation.created_at).toLocaleString()
                      : "-"
                  }
                />
                <Kv
                  icon={<WalletIcon />}
                  k="Amount"
                  v={formatMoney(donation.amount, donation.currency)}
                />
                <Kv
                  icon={<ClockIcon />}
                  k="Status"
                  v={<span className={`ddvBadge ddvBadge--${normalizeStatusTone(donation.status)}`}>{renderValue(donation.status)}</span>}
                />
                <Kv icon={<CardIcon />} k="Method" v={renderValue(donation.donation_method)} />
                <Kv icon={<TagIcon />} k="Type" v={renderValue(donation.donation_type)} />
                <Kv
                  icon={<HeartIcon />}
                  k="Project"
                  v={renderValue(donation.project_name)}
                  span="span3"
                />
              </div>

              {donation.note && <div className="ddvNote">{donation.note}</div>}
            </section>

            <section className="ddvCard ddvSection" aria-label="Tracking">
              <div className="ddvSection__head">
                <div className="ddvSection__icon" aria-hidden="true">
                  <MapIcon />
                </div>
                <div>
                  <h2 className="ddvSection__title">Tracking</h2>
                  <div className="ddvSection__divider" />
                </div>
              </div>

              {trackingLoading && <div className="ddvMuted">Loading tracking…</div>}

              {!trackingLoading && trackingError && (
                <div className="ddvInlineError">{trackingError}</div>
              )}

              {showNoTrackingMessage && (
                <div className="ddvMuted">No tracking available for this donation.</div>
              )}

              {showEmptyStepsMessage && <div className="ddvMuted">No updates yet.</div>}

              {showTrackingSteps && (
                <div className="ddvTrackingList">
                  {hasEmbeddedTracking && embeddedTrackers.length > 1 && (
                    <>
                      <div className="ddvSplitNotice ddvSplitNotice--info">
                        This donation includes more than one allocation type (for example Cow Share and Goat).
                        Choose a type below, then a batch if applicable, to see progress for that part.
                      </div>
                      <div className="ddvTrackerTabs" role="tablist" aria-label="Allocation types">
                        {embeddedTrackers.map((t) => {
                          const label = t?.template?.name || `Allocation`;
                          const isActive = activeTrackerId != null && t.id === activeTrackerId;
                          return (
                            <button
                              key={String(t.id)}
                              type="button"
                              role="tab"
                              aria-selected={isActive}
                              className={`ddvTrackerTab ${isActive ? "ddvTrackerTab--active" : ""}`}
                              onClick={() => {
                                setActiveTrackerId(t.id);
                                setActiveBatchKey(null);
                              }}
                            >
                              <span className="ddvTrackerTab__title">{label}</span>
                              <span
                                className={`ddvTrackerTab__badge ddvBadge ddvBadge--${normalizeStatusTone(
                                  t?.overall_status
                                )}`}
                              >
                                {renderValue(t?.overall_status)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {hasEmbeddedTracking && embeddedTrackers.length === 1 && activeEmbeddedTracker && (
                    <div className="ddvTrackerSingle">
                      <div className="ddvTrackerSingle__label">Allocation</div>
                      <div className="ddvTrackerSingle__row">
                        <span className="ddvTrackerSingle__title">
                          {activeEmbeddedTracker?.template?.name || "Progress"}
                        </span>
                        <span
                          className={`ddvBadge ddvBadge--${normalizeStatusTone(
                            activeEmbeddedTracker?.overall_status
                          )}`}
                        >
                          {renderValue(activeEmbeddedTracker?.overall_status)}
                        </span>
                      </div>
                    </div>
                  )}

                  {(trackingBatches || []).length > 1 && (
                    <>
                      <div className="ddvSplitNotice">
                        This allocation uses more than one batch. Select a batch below to view its updates.
                      </div>
                      <div className="ddvBatchTabs" role="tablist" aria-label="Batches">
                        {(trackingBatches || []).map((group) => {
                          const batchNumber = group?.batch?.batch_number;
                          const label = batchNumber != null ? `Batch #${batchNumber}` : "Batch";
                          const isActive = group.key === activeBatchKey;
                          return (
                            <button
                              key={group.key}
                              type="button"
                              role="tab"
                              aria-selected={isActive}
                              className={`ddvBatchTab ${isActive ? "ddvBatchTab--active" : ""}`}
                              onClick={() => setActiveBatchKey(group.key)}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {activeBatch && (
                    <>
                      <div className="ddvBatchMeta">
                        <div className="ddvBatchMeta__title">
                          {activeBatch?.batch?.batch_number != null
                            ? `Batch #${activeBatch.batch.batch_number}`
                            : "Batch"}
                        </div>
                      </div>

                      {activeBatch.steps.map((s) => {
                        const tone = normalizeStatusTone(s?.status);
                        const evidence = Array.isArray(s?.evidence) ? s.evidence : [];
                        const thumbUrl =
                          pickThumbUrl(evidence) || stepThumbAsset(s?.step_key) || null;

                        return (
                          <div
                            key={String(
                              s?.id ?? `${activeTrackerId ?? donation?.progress_tracker?.id ?? "t"}-${s?.step_key}`
                            )}
                            className="ddvStep"
                          >
                            <div className="ddvStep__rail" aria-hidden="true">
                              <div className={`ddvStep__dot ddvStep__dot--${tone}`}>
                                {tone === "completed" ? <CheckIcon /> : <DotIcon />}
                              </div>
                            </div>

                            <div className="ddvStep__thumb" aria-hidden="true">
                              {thumbUrl ? <img src={thumbUrl} alt="" /> : null}
                            </div>

                            <div className="ddvStep__main">
                              <div className="ddvStep__title">
                                {Number.isFinite(Number(s?.step_order)) ? `${s.step_order}. ` : ""}
                                {renderValue(s?.title)}
                              </div>
                              <div className="ddvStep__sub">
                                {evidence.length > 0
                                  ? "View details"
                                  : "Updates will appear here as they are available."}
                              </div>

                              {evidence.length > 0 && (
                                <div className="ddvEvidenceRow">
                                  {evidence.map((ev) => (
                                    <a
                                      key={String(ev?.id ?? ev?.file_url)}
                                      className="ddvEvidenceLink"
                                      href={ev?.file_url}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {ev?.file_type || "Evidence"}
                                      <ExternalIcon />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="ddvStep__badgeWrap">
                              <span className={`ddvBadge ddvBadge--${tone}`}>
                                {renderValue(s?.status)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </section>

            <section className="ddvFooterArt" aria-label="Thank you">
              <img src="/assets/donor_footer.png" alt="" aria-hidden="true" />
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function renderValue(v) {
  if (v === null || v === undefined || v === "") return "-";
  return String(v);
}

function formatMoney(amount, currency) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "-";
  const cur = currency || "PKR";
  return `${cur} ${n.toLocaleString()}`;
}

function normalizeStatusTone(status) {
  const s = String(status || "").toLowerCase();
  if (s === "completed") return "completed";
  if (s === "pending") return "pending";
  if (s === "in_progress") return "in_progress";
  if (s === "cancelled") return "cancelled";
  if (s === "skipped") return "skipped";
  if (s === "failed") return "cancelled";
  return "pending";
}

function stepThumbAsset(stepKey) {
  const k = String(stepKey || "").toLowerCase();
  const map = {
    booked: "/assets/booked.png",
    animal_purchased: "/assets/purchased.png",
    purchased: "/assets/purchased.png",
    tag_assigned: "/assets/tag.png",
    animal_tag_assigned: "/assets/tag.png",
    slaughter_completed: "/assets/slaughtered.png",
    slaughtered: "/assets/slaughtered.png",
    meat_distributed: "/assets/meat_distribution.png",
    meat_distribution: "/assets/meat_distribution.png",
    offered_prayer: "/assets/prayer.png",
    prayer: "/assets/prayer.png",
  };
  return map[k] || null;
}

function pickThumbUrl(evidence) {
  for (const ev of evidence || []) {
    const url = ev?.file_url;
    if (!url) continue;
    const u = String(url).toLowerCase();
    if (u.endsWith(".png") || u.endsWith(".jpg") || u.endsWith(".jpeg") || u.endsWith(".webp") || u.includes("image")) {
      return url;
    }
  }
  return null;
}

function Kv({ icon, k, v, span }) {
  const spanClass = span === "span3" ? "ddvKv--span3" : span === "span2" ? "ddvKv--span2" : "";
  return (
    <div className={`ddvKv ${spanClass}`}>
      <div className="ddvKv__icon" aria-hidden="true">
        {icon}
      </div>
      <div>
        <div className="ddvKv__k">{k}</div>
        <div className="ddvKv__v">{typeof v === "string" ? v : v}</div>
      </div>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 6.5V5.5C7.5 4.4 8.4 3.5 9.5 3.5H14.5C15.6 3.5 16.5 4.4 16.5 5.5V14.5C16.5 15.6 15.6 16.5 14.5 16.5H9.5C8.4 16.5 7.5 15.6 7.5 14.5V13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 10H3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.5 8L3.5 10L5.5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M8 6H6.5C5.4 6 4.5 6.9 4.5 8V13.5C4.5 14.6 5.4 15.5 6.5 15.5H12C13.1 15.5 14 14.6 14 13.5V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 4.5H15.5V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 4.5L9.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 10.5L8.2 14.2L15.5 6.8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DotIcon() {
  return <span style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor", display: "block" }} aria-hidden="true" />;
}

function HeartHandsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s-7-4.35-9.5-8.5C.7 9.3 2.2 6.5 5.3 6.5c1.7 0 2.9 1 3.6 2c.7-1 1.9-2 3.6-2c3.1 0 4.6 2.8 2.8 6C19 16.65 12 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M6 3.5H12.5L15.5 6.5V16.5H6V3.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12.5 3.5V6.5H15.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7.5 9H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7.5 12H12.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 4L13 2.5L13 16L7 17.5L7 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3.5 5.2L7 4V17.5L3.5 18.8V5.2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13 2.5L16.5 3.7V17.3L13 16V2.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function HashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 3.5L5.8 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13.5 3.5L12.3 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.8 7.8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.2 12.2H15.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M6 3.5V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 3.5V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.5 6.5H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.5 5.5H14.5C15.6 5.5 16.5 6.4 16.5 7.5V15C16.5 16.1 15.6 17 14.5 17H5.5C4.4 17 3.5 16.1 3.5 15V7.5C3.5 6.4 4.4 5.5 5.5 5.5Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 6.5H15.5C16.6 6.5 17.5 7.4 17.5 8.5V14C17.5 15.1 16.6 16 15.5 16H4.5C3.4 16 2.5 15.1 2.5 14V8.5C2.5 7.4 3.4 6.5 4.5 6.5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M15.5 9.5H13.2C12.4 9.5 11.8 10.1 11.8 10.9C11.8 11.7 12.4 12.3 13.2 12.3H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.5 6.5V5.5C4.5 4.4 5.4 3.5 6.5 3.5H14.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 17C13.6 17 16.5 14.1 16.5 10.5C16.5 6.9 13.6 4 10 4C6.4 4 3.5 6.9 3.5 10.5C3.5 14.1 6.4 17 10 17Z" stroke="currentColor" strokeWidth="2" />
      <path d="M10 7.5V10.8L12.5 12.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 6.5H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.5 4.5H14.5C15.6 4.5 16.5 5.4 16.5 6.5V14C16.5 15.1 15.6 16 14.5 16H5.5C4.4 16 3.5 15.1 3.5 14V6.5C3.5 5.4 4.4 4.5 5.5 4.5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M6 12.5H9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 10.2V5.5C3.5 4.4 4.4 3.5 5.5 3.5H10.2L16.5 9.8L9.8 16.5L3.5 10.2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 7.1H7.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 16.7s-6-3.7-8.2-7.2C0.3 7.1 1.6 4.8 4.3 4.8c1.5 0 2.6.9 3.2 1.8c.6-.9 1.7-1.8 3.2-1.8c2.7 0 4 2.3 2.5 4.7C16 13 10 16.7 10 16.7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}


