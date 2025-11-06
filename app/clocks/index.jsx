//NYare kod

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWeekNumber } from "../../lib/getWeekNumber";
import { clockIn, clockOut } from "../../backend/clocksAPI";

const numPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const { width } = Dimensions.get("window");

export default function ClockInOut() {
  const [numbers, setNumbers] = useState([]);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#6c757d"); 
  const [time, setTime] = useState(new Date());

  // Uppdatera klockan varje sekund
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Visa backendens meddelande i UI med färg
  const showMessage = (msg, color = "#6c757d", duration = 5000) => {
    setMessage(msg);
    setMessageColor(color);
    if (duration > 0) setTimeout(() => setMessage(""), duration);
  };

  // Lägg till siffror till pinkoden
  const handleClick = (num) => {
    if (numbers.length < 4) setNumbers([...numbers, num]);
  };

  // Rensa inmatning
  const handleClear = () => setNumbers([]);

  // Hantera stämpling in
  const handleClockIn = async () => {
    if (numbers.length !== 4)
      return showMessage("Fyll i 4 siffror!", "#dc3545");

    const code = numbers.join("");
    setNumbers([]);
    showMessage("Bearbetar stämpling in...", "#6c757d", 0);

    const data = await clockIn(code);

    // Färg baserat på isError
    const color = data?.isError ? "#dc3545" : "#28a745";
    showMessage(data.message, color);
  };

  // Hantera stämpling ut
  const handleClockOut = async () => {
    if (numbers.length !== 4)
      return showMessage("Fyll i 4 siffror!", "#dc3545");

    const code = numbers.join("");
    setNumbers([]);
    showMessage("Bearbetar stämpling ut...", "#6c757d", 0);

    const data = await clockOut(code);

    const color = data?.isError ? "#dc3545" : "#28a745";
    showMessage(data.message, color);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.clockContainer}>
          <Text style={styles.title}>Vänligen stämpla in/ut</Text>
          <Text style={styles.timeText}>
            Vecka {getWeekNumber(time)} | {time.toLocaleDateString("sv-SE")} |{" "}
            {time.toLocaleTimeString("sv-SE")}
          </Text>
          {message ? (
            <Text style={[styles.message, { color: messageColor }]}>
              {message}
            </Text>
          ) : null}
        </View>

        <View style={styles.numPadContainer}>
          <View style={styles.codeDisplay}>
            {numbers.length > 0 ? (
              numbers.map((n, i) => (
                <Text key={i} style={styles.codeDigit}>
                  {n}
                </Text>
              ))
            ) : (
              <Text style={styles.codeDigit}>____</Text>
            )}
          </View>

          <View style={styles.numpadGrid}>
            {numPad.map((n) => (
              <TouchableOpacity
                key={n}
                style={styles.numButton}
                onPress={() => handleClick(n)}>
                <Text style={styles.numText}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
              <Text style={styles.actionText}>Rensa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={handleClockIn}>
              <Text style={styles.actionText}>Stämpla in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clockOutBtn}
              onPress={handleClockOut}>
              <Text style={styles.actionText}>Stämpla ut</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8f9fa" },
  container: { flex: 1, alignItems: "center" },
  clockContainer: { alignItems: "center", marginBottom: 8 },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  timeText: {
    fontSize: 18,
    fontFamily: "monospace",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    textAlign: "center",
  },
  numPadContainer: { alignItems: "center", width: "100%" },
  codeDisplay: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    minHeight: 50,
    width: width * 0.85,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 12,
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
  },
  codeDigit: { fontSize: 26, fontFamily: "monospace", marginHorizontal: 8 },
  numpadGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: width * 0.85,
    marginBottom: 12,
  },
  numButton: {
    width: (width * 0.85 - 32) / 3,
    height: 60,
    margin: 4,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  numText: { fontSize: 22, fontWeight: "700", color: "#333" },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.85,
    marginTop: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#627aafff",
  },
  clearBtn: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#7b5558ff",
  },
  clockOutBtn: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#3d4247ff",
  },
  actionText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
