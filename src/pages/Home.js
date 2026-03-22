import { useState, useEffect } from "react";

export default function Home() {
  const [location, setLocation] = useState("現在地を取得中...");
  const [locationError, setLocationError] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [destination, setDestination] = useState("");
  const [departMode, setDepartMode] = useState("now");
  const [arriveMode, setArriveMode] = useState("none");
  const [departDate, setDepartDate] = useState("今日");
  const [departTime, setDepartTime] = useState("9:00");
  const [arriveDate, setArriveDate] = useState("今日");
  const [arriveTime, setArriveTime] = useState("10:00");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocation("現在地を取得しました"),
        () => {
          setLocationError(true);
          setShowManual(true);
          setLocation("取得できませんでした");
        }
      );
    } else {
      setLocationError(true);
      setShowManual(true);
    }
  }, []);

  const dates = ["今日", "明日", "明後日"];
  const times = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

  const btn = (bg, border, color) => ({
    background: bg, border: `1.5px solid ${border}`, borderRadius: 10,
    padding: "10px", textAlign: "center", cursor: "pointer",
    marginBottom: 8, fontSize: 14, fontWeight: 500, color
  });

  const sel = {
    width: "100%", border: "0.5px solid #D3D1C7", borderRadius: 8,
    padding: "8px 6px", fontSize: 14, marginBottom: 6, boxSizing: "border-box",
    background: "white", color: "#2C2C2A"
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", minHeight: "100vh", background: "#f8f9fa", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>

      {/* ヘッダー */}
      <div style={{ background: "#185FA5", padding: "24px 20px 32px" }}>
        <p style={{ color: "white", fontSize: 26, fontWeight: 500, margin: "0 0 6px" }}>どこへ行きますか？</p>
        <p style={{ color: "#B5D4F4", fontSize: 14, margin: 0 }}>
          {locationError ? "現在地を取得できませんでした" : location}
        </p>
      </div>

      {/* 現在地カード */}
      <div style={{ background: "white", margin: "-16px 16px 0", borderRadius: 16, padding: "14px 16px", border: "0.5px solid #D3D1C7" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, background: "#E6F1FB", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 14, height: 14, background: "#185FA5", borderRadius: "50%" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, color: "#888780", margin: "0 0 2px" }}>現在地</p>
            <p style={{ fontSize: 17, fontWeight: 500, color: "#2C2C2A", margin: 0 }}>
              {showManual && manualInput ? manualInput : location}
            </p>
          </div>
          <span style={{ fontSize: 14, color: "#185FA5", fontWeight: 500, cursor: "pointer" }}
            onClick={() => setShowManual(!showManual)}>変更</span>
        </div>

        {locationError && (
          <div style={{ background: "#FCEBEB", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <div style={{ width: 8, height: 8, background: "#E24B4A", borderRadius: "50%", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#791F1F", flex: 1 }}>現在地を取得できませんでした</span>
          </div>
        )}

        {showManual && (
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: "0.5px solid #F1EFE8" }}>
            <input
              style={{ width: "100%", boxSizing: "border-box", border: "1.5px solid #185FA5", borderRadius: 10, padding: "12px", fontSize: 16, color: "#2C2C2A", outline: "none" }}
              placeholder="駅名・住所・施設名を入力"
              value={manualInput}
              onChange={e => setManualInput(e.target.value)}
            />
            <p style={{ fontSize: 12, color: "#888780", margin: "4px 0 0" }}>例：東京駅、新宿区西新宿2-8-1</p>
          </div>
        )}
      </div>

      {/* メインコンテンツ */}
      <div style={{ padding: "16px", flex: 1 }}>
        <p style={{ fontSize: 14, color: "#5F5E5A", margin: "14px 0 8px", fontWeight: 500 }}>行き先を入力してください</p>

        {/* 行き先入力 */}
        <div style={{ background: "white", border: "2px solid #185FA5", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, background: "#E6F1FB", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 10, height: 13, background: "#185FA5", borderRadius: "5px 5px 0 0" }} />
          </div>
          <input
            style={{ flex: 1, border: "none", outline: "none", fontSize: 18, color: "#2C2C2A", background: "transparent" }}
            placeholder="駅名・施設名・住所"
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
        </div>

        {/* 日時セクション */}
        <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #D3D1C7", marginBottom: 14, overflow: "hidden" }}>
          <div style={{ display: "flex" }}>

            {/* 出発予定日時 */}
            <div style={{ flex: 1, padding: "12px", borderRight: "0.5px solid #F1EFE8" }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#185FA5", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, background: "#185FA5", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                出発予定日時
              </p>
              <div style={btn(departMode === "now" ? "#E6F1FB" : "white", departMode === "now" ? "#185FA5" : "#D3D1C7", "#0C447C")}
                onClick={() => setDepartMode(departMode === "now" ? "select" : "now")}>
                {departMode === "now" ? "今すぐ出発" : "日時を変更"}
              </div>
              {departMode === "select" && (
                <>
                  <select style={sel} value={departDate} onChange={e => setDepartDate(e.target.value)}>
                    {dates.map(d => <option key={d}>{d}</option>)}
                  </select>
                  <select style={sel} value={departTime} onChange={e => setDepartTime(e.target.value)}>
                    {times.map(t => <option key={t}>{t}</option>)}
                  </select>
                </>
              )}
            </div>

            {/* 到着希望日時 */}
            <div style={{ flex: 1, padding: "12px" }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#0F6E56", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, background: "#0F6E56", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                到着希望日時
              </p>
              <div style={btn(arriveMode === "none" ? "#E1F5EE" : "white", arriveMode === "none" ? "#0F6E56" : "#D3D1C7", "#085041")}
                onClick={() => setArriveMode(arriveMode === "none" ? "select" : "none")}>
                {arriveMode === "none" ? "指定しない" : "日時を変更"}
              </div>
              {arriveMode === "select" && (
                <>
                  <select style={sel} value={arriveDate} onChange={e => setArriveDate(e.target.value)}>
                    {dates.map(d => <option key={d}>{d}</option>)}
                  </select>
                  <select style={sel} value={arriveTime} onChange={e => setArriveTime(e.target.value)}>
                    {times.map(t => <option key={t}>{t}</option>)}
                  </select>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 検索ボタン */}
        <div style={{ background: "#185FA5", borderRadius: 16, padding: 20, textAlign: "center", marginBottom: 14, cursor: "pointer" }}>
          <p style={{ color: "white", fontSize: 22, fontWeight: 500, margin: 0 }}>ルートを検索する</p>
        </div>

        {/* よく行く場所 */}
        <p style={{ fontSize: 14, color: "#5F5E5A", margin: "0 0 8px", fontWeight: 500 }}>よく行く場所</p>
        <div style={{ display: "flex", gap: 8 }}>
          {["自宅", "職場", "病院"].map(place => (
            <div key={place} style={{ flex: 1, background: "white", border: "0.5px solid #D3D1C7", borderRadius: 14, padding: "12px 6px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ width: 32, height: 32, background: "#E1F5EE", borderRadius: "50%", margin: "0 auto 6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 10, height: 10, background: "#0F6E56", borderRadius: "50%" }} />
              </div>
              <p style={{ fontSize: 14, color: "#444441", fontWeight: 500, margin: 0 }}>{place}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ナビゲーションバー */}
      <div style={{ background: "white", borderTop: "0.5px solid #D3D1C7", padding: "10px 0 10px", display: "flex", justifyContent: "space-around" }}>
        {[{ label: "ホーム", active: true }, { label: "履歴", active: false }, { label: "設定", active: false }].map(item => (
          <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, background: item.active ? "#185FA5" : "#D3D1C7", borderRadius: "50%" }} />
            <span style={{ fontSize: 12, color: item.active ? "#185FA5" : "#888780" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}