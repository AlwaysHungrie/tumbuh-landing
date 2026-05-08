"use client";

import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useWallets as useSolanaWallets } from "@privy-io/react-auth/solana";
import { CreateTokenForm } from "@/components/admin/CreateTokenForm";
import { TokenList } from "@/components/admin/TokenList";
import { RegisterPlantForm } from "@/components/admin/RegisterPlantForm";
import { PlantList } from "@/components/admin/PlantList";
import { RegisterSensorForm } from "@/components/admin/RegisterSensorForm";
import { SensorList } from "@/components/admin/SensorList";
import { Wallet } from "lucide-react";

export type Token = {
  id: number;
  mint_address: string;
  name: string;
  symbol: string;
  uri: string;
  creator: string;
  signature: string;
  created_at: string;
};

export type Plant = {
  id: number;
  wallet: string;
  latitude: string;
  longitude: string;
  created_at: string;
};

export type Sensor = {
  id: number;
  sensor_wallet: string;
  plant_wallet: string;
  mint_address: string;
  signature: string;
  name: string;
  type: string;
  tab_label: string;
  unit_symbol: string;
  created_at: string;
};

const SHORT = (w: string) => `${w.slice(0, 4)}…${w.slice(-4)}`;

export default function AdminPage() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets: solanaWallets } = useSolanaWallets();

  const [tokens, setTokens] = useState<Token[]>([]);
  const [tokenRefreshKey, setTokenRefreshKey] = useState(0);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantRefreshKey, setPlantRefreshKey] = useState(0);

  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [sensorRefreshKey, setSensorRefreshKey] = useState(0);

  const solanaWallet = solanaWallets[0];

  function fetchTokens() {
    setTokenRefreshKey((k) => k + 1);
  }

  function fetchPlants() {
    setPlantRefreshKey((k) => k + 1);
  }

  function fetchSensors() {
    setSensorRefreshKey((k) => k + 1);
  }

  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/tokens")
      .then((r) => r.json())
      .then((data) => setTokens(data.tokens ?? []))
      .catch(() => {});
  }, [authenticated, tokenRefreshKey]);

  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data.plants ?? []))
      .catch(() => {});
  }, [authenticated, plantRefreshKey]);

  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/sensors")
      .then((r) => r.json())
      .then((data) => setSensors(data.sensors ?? []))
      .catch(() => {});
  }, [authenticated, sensorRefreshKey]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-cream text-ink">
      {/* header */}
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <span className="text-[10px] font-bold tracking-[0.18em] text-muted uppercase">
          Admin
        </span>

        <div className="mb-4 flex items-center gap-2 rounded-lg bg-cream px-3 py-2 ring-1 ring-line/30">
          <Wallet className="h-3.5 w-3.5 shrink-0 text-muted" />
          <button
            disabled={!ready}
            onClick={authenticated ? logout : login}
            className="text-[10px] font-bold tracking-[0.12em] uppercase transition disabled:opacity-40"
            style={{
              color: authenticated
                ? "var(--color-muted, #6b6f6b)"
                : "var(--color-ink, #141614)",
            }}
          >
            {!ready
              ? "—"
              : authenticated
                ? solanaWallet?.address
                  ? SHORT(solanaWallet.address)
                  : "Disconnect"
                : "Connect"}
          </button>
        </div>
      </div>

      {!authenticated ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-[12px] text-muted">Connect wallet to continue.</p>
        </div>
      ) : (
        <div className="grid flex-1 min-h-0 grid-cols-3 gap-4 overflow-hidden p-4">
          <CreateTokenForm
            solanaWallet={solanaWallet}
            onSuccess={fetchTokens}
          />
          <RegisterPlantForm onSuccess={fetchPlants} />
          <RegisterSensorForm
            solanaWallet={solanaWallet}
            tokens={tokens}
            plants={plants}
            onSuccess={fetchSensors}
          />

          <TokenList tokens={tokens} onRefresh={fetchTokens} />
          <PlantList plants={plants} onRefresh={fetchPlants} />
          <SensorList sensors={sensors} onRefresh={fetchSensors} />
        </div>
      )}
    </div>
  );
}
