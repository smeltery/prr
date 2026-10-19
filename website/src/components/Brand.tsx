import Link from "next/link";
import Image from "next/image";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="smeltery / prr home">
      <Image src="/logo.svg" width={32} height={32} alt="" />
      <span>
        smeltery<span className="brand-sub"> / prr</span>
      </span>
    </Link>
  );
}

export function GitHub() {
  return <Image src="/brands/github.svg" width={18} height={18} alt="" />;
}
