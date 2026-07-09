import Image from "next/image";

type LogoProps = {
  src?: string;
  title?: string;
};

const Logo = ({
  src = "/logo.svg",
  title = "Emotale",
}: LogoProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      {src ? (
        <Image
          src={src}
          alt={title}
          width={64}
          height={64}
          className="object-contain"
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB]/10">
          <span>{"💬"}</span>
        </div>
      )}
    </div>
  );
};

export default Logo;