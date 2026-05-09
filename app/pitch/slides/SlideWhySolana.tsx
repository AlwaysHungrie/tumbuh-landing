import SlideShell, { Caption, Divider } from "./SlideShell";

interface Props { notesVisible: boolean }

const rows = [
  {
    prop: "Autonomous payments",
    noChain: "Impossible — no payment primitive",
    tumbuh: "Native wallet, sub-cent fees, instant settlement",
  },
  {
    prop: "Verifiable plant identity",
    noChain: "None — device ID is mutable, unverified",
    tumbuh: "Cryptographic keypair per plant, permanent on-chain",
  },
  {
    prop: "Open service marketplace",
    noChain: "Locked APIs, vendor-controlled integrations",
    tumbuh: "Any Builder can offer services plants pay for",
  },
  {
    prop: "Auditable autonomy",
    noChain: "Mutable logs — no external verification",
    tumbuh: "Every decision verifiable on-chain, permanently",
  },
  {
    prop: "Network coordination",
    noChain: "Each device isolated — no shared state",
    tumbuh: "Signed peer messages, shared context, consensus",
  },
];

export default function SlideWhySolana({ notesVisible }: Props) {
  return (
    <SlideShell
      notesVisible={notesVisible}
      notes={`The test: remove the blockchain and ask what breaks. The answer here is: everything that makes Tumbuh different from a smart pot. Economic agency, verifiable identity, open builders, auditable autonomy — all gone. If asked "why not a database?" — a database cannot hold value, cannot be permissionlessly extended, and cannot be audited without trusting the operator. The chain removes the trust requirement entirely.`}
    >
      <span className="absolute -right-10 -top-10 text-[280px] opacity-[0.04] pointer-events-none select-none leading-none">
        ⛓️
      </span>

      <Caption>Why Blockchain</Caption>

      <h1 className="text-[56px] font-extrabold tracking-[-2px] leading-[1.12] mt-3.5 max-w-[820px]">
        Remove the chain.<br />
        <span className="text-[#2d6a4f] font-black">Tumbuh becomes a smart pot.</span>
      </h1>

      <Divider />

      <div className="mt-6">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left px-4 py-2.5 text-[13px] font-bold uppercase tracking-[1.5px] text-[rgba(13,27,18,0.4)] border-b-2 border-[rgba(45,106,79,0.12)] w-[30%]">
                Capability
              </th>
              <th className="text-left px-4 py-2.5 text-[13px] font-bold uppercase tracking-[1.5px] text-[rgba(13,27,18,0.4)] border-b-2 border-[rgba(45,106,79,0.12)]">
                IoT without blockchain
              </th>
              <th className="text-left px-4 py-2.5 text-[13px] font-bold uppercase tracking-[1.5px] text-[rgba(13,27,18,0.4)] border-b-2 border-[rgba(45,106,79,0.12)]">
                Tumbuh
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ prop, noChain, tumbuh }) => (
              <tr key={prop} className="border-b border-[rgba(45,106,79,0.12)] last:border-b-0">
                <td className="px-4 py-3 text-[17px] font-semibold text-[#0d1b12]">{prop}</td>
                <td className="px-4 py-3 text-[16px] text-[#dc2626]">✗ {noChain}</td>
                <td className="px-4 py-3 text-[16px] font-semibold text-[#2d6a4f]">✓ {tumbuh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 px-6 py-4 rounded-[10px] bg-[#edf4ee] flex gap-3 items-center">
        <span className="text-xl">⚡</span>
        <p className="text-[17px] text-[#0d1b12]">
          Solana: <strong>&lt;$0.001 per transaction</strong> · 400ms finality ·
          the only chain where micro-payments from a sensor node are economically rational.
        </p>
      </div>
    </SlideShell>
  );
}
