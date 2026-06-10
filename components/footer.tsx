export default function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-border text-center">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Ronak Bajracharya
      </p>
    </footer>
  );
}
