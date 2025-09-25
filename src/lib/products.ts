
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from '@/lib/types';

const products: Product[] = [
    {
      id: 'tshirt',
      name: "T-Shirt de la Tournée Anniversaire",
      price: 35.00,
      description: "T-shirt commémoratif en coton biologique avec le logo des 30 ans de carrière, une photo emblématique de l'artiste et les dates de la tournée. Un souvenir essentiel pour tout fan.",
      images: PlaceHolderImages.filter(p => p.id.startsWith('merch-tshirt-')),
      category: 'vestimentaire',
      variants: {
        size: ['S', 'M', 'L', 'XL', 'XXL'],
        color: ['#000000', '#FFFFFF', '#A9A9A9'],
      }
    },
    {
      id: 'cap',
      name: "Casquette Brodée Signature",
      price: 28.00,
      description: "Casquette de haute qualité avec le nom de l'artiste et un symbole mandingue brodés. Parfaite pour un style décontracté et pour afficher votre soutien.",
      images: PlaceHolderImages.filter(p => p.id.startsWith('merch-cap-')),
      category: 'vestimentaire',
       variants: {
        color: ['#000000', '#1E40AF', '#BE123C'],
      }
    },
     {
      id: 'hoodie',
      name: "Sweat-shirt Signature 'Héritage'",
      price: 60.00,
      description: "Sweat-shirt à capuche confortable et stylé, portant une citation inspirante de Djessou Mama. Idéal pour les soirées fraîches et les moments de détente.",
      images: PlaceHolderImages.filter(p => p.id.startsWith('merch-hoodie-')),
      category: 'vestimentaire',
      variants: {
        size: ['S', 'M', 'L', 'XL'],
        color: ['#111827', '#4B5563'],
      }
    },
    {
      id: 'vinyl',
      name: "Vinyle LP 'Golden Voice'",
      price: 45.00,
      description: "Édition limitée en vinyle de la compilation 'Golden Voice', regroupant les plus grands succès de l'artiste. Un objet de collection pour les audiophiles et les amateurs de musique.",
      images: PlaceHolderImages.filter(p => p.id.startsWith('merch-vinyl-')),
      category: 'musique',
    },
     {
      id: 'book',
      name: "Livre biographique '30 Ans de Voix'",
      price: 55.00,
      description: "Un magnifique livre illustré retraçant les 30 ans de carrière de Djessou Mama, avec des photos inédites, des anecdotes et des témoignages exclusifs.",
      images: PlaceHolderImages.filter(p => p.id.startsWith('merch-book-')),
      category: 'musique',
    },
    {
      id: 'tote',
      name: "Sac Tote Bag 'Rossignol du Manding'",
      price: 22.00,
      description: "Sac en toile résistant et pratique, avec un visuel artistique de l'artiste et la date anniversaire. Parfait pour vos courses, vos cours ou la plage.",
      images: PlaceHolderImages.filter(p => p.id.startsWith('merch-tote-')),
      category: 'accessoires',
    },
    {
      id: 'poster',
      name: "Affiche de Concert Édition Limitée",
      price: 25.00,
      description: "Affiche officielle du concert du 30ème anniversaire. Une œuvre d'art à encadrer pour immortaliser cet événement historique. Imprimée sur papier de haute qualité.",
      images: PlaceHolderImages.filter(p => p.id.startsWith('merch-poster-')),
      category: 'decoration',
    },
];

export function getProducts(): Product[] {
  return products;
}
