import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMPTY = {
  company: "",
  role: "",
  status: "applied",
  date_applied: new Date().toISOString().slice(0, 10),
  follow_up_date: "",
  notes: "",
};
export default function JobForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("submitting", form);
      navigate("/jobs");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{maxWidth: 560}}>
        <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 24}}>Add new application</h2>

        <div style={{
          background: '#fff',
          border: '1px solid #e5e4df',
          borderRadius: 12,
          padding: 24
        }}>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            
            <div>
              <label>Company *</label>
              <input
                placeholder="e.g. Stripe" 
                value={form.company}
                onChange={set('company')}
                required
              />
            </div>

            <div>Role *</div>
            
            <div>Status *</div>
          </form>
        </div>
      </div>
      <div>
        <h1>Add Job</h1>
        <p>Form will go here</p>
      </div>
    </>
  );
}
