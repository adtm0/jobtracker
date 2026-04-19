const MOCK_STATS = {
  total: 24,
  applied: 11,
  interview: 6,
  offer: 2,
  rejected: 5,
  response_rate: 25,
  offer_rate: 8,
  follow_up_due: 3,
  best_role: "Frontend Engineer",
};
export default function Dashboard() {
  const stats = MOCK_STATS;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Dashboard</h2>
        <p style={{ color: "#6b6b67", marginTop: 4 }}>
          Your job search at a glance
        </p>
      </div>

      {/* stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Total Applications", value: stats.total },
          {
            label: "Interviews",
            value: stats.interview,
            sub: `${stats.response_rate}% response rate`,
          },
          {
            label: "Offers",
            value: stats.offer,
            sub: `${stats.offer_rate}% offer rate`,
          },
          {
            label: "Follow-up Due",
            value: stats.follow_up_due,
            sub: "no reply in 10+ days",
          },
        ].map(({ label, value, sub }) => (
          <div
            key={label}
            style={{
              background: "#fff",
              border: "1px solid #e5e4df",
              borderRadius: 10,
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#6b6b67",
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1 }}>
              {value}
            </div>
            {sub && (
              <div style={{ fontSize: 11, color: "#9d9d99", marginTop: 5 }}>
                {sub}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* bottom section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* status breakdown */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e4df",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <h3 style={{ fontWeight: 500, fontSize: 14, marginBottom: 18 }}>
            Applications by status
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                label: "Applied",
                value: stats.applied,
                total: stats.total,
                color: "#378ADD",
              },
              {
                label: "Interview",
                value: stats.interview,
                total: stats.total,
                color: "#EF9F27",
              },
              {
                label: "Offer",
                value: stats.offer,
                total: stats.total,
                color: "#63922",
              },
              {
                label: "Rejected",
                value: stats.rejected,
                total: stats.total,
                color: "#E24B4A",
              },
            ].map(({ label, value, total, color }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <span style={{ fontSize: 12, color: "#6b6b67", width: 60 }}>
                  {label}
                </span>
                <div
                  style={{
                    flex: 1,
                    background: "#f9f9f8",
                    borderRadius: 4,
                    height: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(value / total) * 100}%`,
                      height: "100%",
                      background: color,
                      borderRadius: 4,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: "#9d9d99",
                    width: 20,
                    textAlign: "right",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* insights */}
        <div>
          <h3>Smart insights</h3>
          <div>
            {[
              { label: 'Best performing role', value: stats.best_role},
              { label: 'Response rate', value: `${stats.response_rate}% of application got a reply`},
              { label: 'Follow-up needed', value: `${stats.follow_up_due} applications with no reply in 10+ days`},
              { label: 'Offer rate', value: `${stats.offer_rate}% of applications resulted in an offer`},
            ].map(({ label, value }) => (
              <div key={label} style={{background: '#f9f9f8'}}>
                <div>{label}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
