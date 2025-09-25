export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Djessou Mama Diabate. Tous droits réservés.</p>
        <p className="mt-2">Un hommage à la voix d'or du Manding.</p>
      </div>
    </footer>
  );
}
