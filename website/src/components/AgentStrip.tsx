import Image from "next/image";

export function AgentStrip() {
  return (
    <div className="agent-strip wrap">
      <span>BRING THE AGENTS YOU ALREADY USE</span>
      <div>
        <Image src="/brands/claude.svg" alt="" width={23} height={23} />
        Claude
      </div>
      <div>
        <Image src="/brands/chatgpt.svg" alt="" width={22} height={22} />
        Codex
      </div>
      <div>
        <Image src="/brands/github.svg" alt="" width={22} height={22} />
        GitHub CLI
      </div>
      <span className="agent-note">CLI sessions or your own API keys.</span>
    </div>
  );
}
