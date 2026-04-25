export const layers = [
  {
    num: "01",
    title: "Physical",
    body:
      "Pot, soil, sensors, and actuators. Moisture, light, temperature, humidity — plus pumps, valves, and grow lights.",
    answer: "Reports ground truth. Executes commands.",
  },
  {
    num: "02",
    title: "Intelligence",
    body:
      "Perception, memory, goal policies, anomaly detection, and adaptation. Reasons against a stated outcome, not a schedule.",
    answer: "Decides what should happen next.",
  },
  {
    num: "03",
    title: "Economic",
    body:
      "A constrained wallet with hard caps, allow-lists, and auditable transactions. Decisions become actions, safely.",
    answer: "Decides what it can afford and is allowed to do.",
  },
  {
    num: "04",
    title: "Coordination",
    body:
      "Signed, typed messages between plants and services. Observations, warnings, offers, requests — with trust attached.",
    answer: "Decides who to talk to and what to trust.",
  },
] as const;
