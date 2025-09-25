export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Le Rossignol du Manding. Tous droits réservés.</p>
        <p className="mt-2">Un hommage à la voix d'or de Djessou Manding.</p>
      </div>
    </footer>
  );
}
