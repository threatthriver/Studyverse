import Image from "next/image";

export default function MainStudyArea() {
  return (
    <div className="flex-grow relative overflow-hidden">
      <Image
        src="https://placehold.co/1920x1080/1A202C/4A5568.png?text=Lofi+Cityscape" // Placeholder, ideally dynamic
        alt="Study environment background"
        layout="fill"
        objectFit="cover"
        data-ai-hint="lofi cityscape anime"
        priority
        className="opacity-80" // Slight opacity to allow UI elements to pop
      />
      {/* You can add overlays or other elements on top of the background here if needed */}
      {/* For example, a subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 pointer-events-none"></div>
    </div>
  );
}
