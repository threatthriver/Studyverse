export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {currentYear} StudyVerse by CSW.live. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Rediscover the joy of learning, together. We're so glad you're here.
        </p>
      </div>
    </footer>
  );
}
