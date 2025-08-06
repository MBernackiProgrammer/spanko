import React, { useEffect, useState } from "react";
import C_UserRow from "./C_UserRow/C_UserRow";

type Account = {
  username: string;
  password: string;
  start_time: string;
  end_time: string;
};

type ScoreEntry = {
  username: string;
  password: string;
  totalPoints: number;
};

export default function SleepScoreBoard() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Twój JWT tutaj
  const JWT_TOKEN = localStorage.getItem("token");

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const res = await fetch("https://172.24.3.142:3001/api/allData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        });

        if (!res.ok) throw new Error("Błąd pobierania danych");

        const data = await res.json();
        const accounts: Account[] = data.accounts;

        // Grupowanie po username + password
        const grouped: Record<string, Account[]> = {};
        for (const entry of accounts) {
          const key = `${entry.username}-${entry.password}`;
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(entry);
        }

        // Punktacja: 2 pkt/godzina nocna (22–5), 1 pkt dzienna
        const nightHours = new Set(Array.from({ length: 8 }, (_, i) => (i + 22) % 24)); // 22–5

        const scores: ScoreEntry[] = Object.entries(grouped).map(([key, entries]) => {
          let totalPoints = 0;

          for (const e of entries) {
            const start = new Date(e.start_time);
            const end = new Date(e.end_time);
            let current = new Date(start);

            while (current < end) {
              const hour = current.getHours();
              totalPoints += nightHours.has(hour) ? 2 : 1;
              current.setHours(current.getHours() + 1);
            }
          }

          const [username, password] = key.split("-");
          return { username, password, totalPoints };
        });

        setScores(scores);
      } catch (err: any) {
        console.error("Błąd:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSleepData();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className='AL_MainPage_D_MainFrame'>
        <p className='P_Ranking'>Ranking</p>
        <hr className='HR_Ranking'/>

        <div className="space-y-3">
          {scores
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map((user, idx) => (
              <C_UserRow
                key={idx}
                username={user.username}
                hours={user.totalPoints}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
