
import axios from "axios";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function App() {
  const [form, setForm] = useState({
    phone: "",
    email: "",
    credit_score: "",
    age_group: "18–25",
    family_status: "Single",
    income: "",
    comments: "",
    consent: false,
  });

  const [leads, setLeads] = useState([]);
  useEffect(() => {
    const savedLeads = localStorage.getItem("leads");
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) return alert("Please give consent to proceed.");

    const payload = { ...form };
    delete payload.consent;

    try {
      const res = await axios.post("http://127.0.0.1:8000/score", payload);
      setLeads([...leads, { ...payload, ...res.data }]);
    } catch (err) {
      alert("Error scoring lead");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Lead Scoring Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="phone" placeholder="Phone" onChange={handleChange} required /><br />
        <input name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="credit_score" type="number" placeholder="Credit Score" onChange={handleChange} required /><br />
        <select name="age_group" onChange={handleChange}>
          <option>18–25</option>
          <option>26–35</option>
          <option>36–50</option>
          <option>51+</option>
        </select><br />
        <select name="family_status" onChange={handleChange}>
          <option>Single</option>
          <option>Married</option>
          <option>Married with Kids</option>
        </select><br />
        <input name="income" type="number" placeholder="Income" onChange={handleChange} required /><br />
        <textarea name="comments" placeholder="Comments" onChange={handleChange}></textarea><br />
        <label>
          <input type="checkbox" name="consent" onChange={handleChange} />
          I consent to data processing
        </label><br />
        <button type="submit">Submit</button>
      </form>

      <h3>Scored Leads</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Email</th>
            <th>Initial Score</th>
            <th>Reranked Score</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {[...leads]
            .sort((a, b) => b.reranked_score - a.reranked_score)
            .map((lead, i) => (
              <tr key={i}>
                <td>{lead.email}</td>
                <td>{lead.initial_score}</td>
                <td>{lead.reranked_score}</td>
                <td>{lead.comments}</td>
              </tr>
            ))}

        </tbody>
      </table>
      <h3>Score Distribution</h3>
      {leads.length > 0 ? (
        <Bar
          data={{
            labels: leads.map((_, i) => `Lead ${i + 1}`),
            datasets: [
              {
                label: "Reranked Score",
                data: leads.map((lead) => lead.reranked_score),
                backgroundColor: "rgba(75,192,192,0.6)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          }}
        />
      ) : (
        <p>No leads yet to show chart.</p>
      )}
    </div>
  );
}


export default App;