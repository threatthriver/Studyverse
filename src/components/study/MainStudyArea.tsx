
import Image from "next/image";

export default function MainStudyArea() {
  return (
    <div className="flex-grow relative overflow-hidden">
      <Image
        src="https://placehold.co/1920x1080/D6C9BE/4A3F35.png?text=Study+Desk+Notes" // Placeholder for study desk
        alt="Study environment background - a desk with notes and a laptop"
        layout="fill"
        objectFit="cover"
        data-ai-hint="study desk notes"
        priority
        className="opacity-90" 
      />
      {/* Vignette or overlay for better text readability on top if needed */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/15 pointer-events-none"></div>
      {/* RoomTitleBar and MediaControlsBar will be placed by the parent layout */}
    </div>
  );
}
