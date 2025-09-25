export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Le Rossignol du Manding. All Rights Reserved.</p>
        <p className="mt-2">A tribute to the golden voice of Djessou Manding.</p>
      </div>
    </footer>
  );
}
