import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface HeroSlide {
  image: string;
  badge: string;
  titleMain: string;
  titleAccent: string;
  subtitle: string;
}

interface CategoryTile {
  name: string;
  image: string;
  cta: string;
}

interface Product {
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  variant: string;
  inStock: boolean;
}

interface Pack {
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  discount: number;
}

interface Review {
  name: string;
  date: string;
  product: string;
  text: string;
  rating: number;
}

interface FaqItem {
  question: string;
  answer: string;
  open: boolean;
}

@Component({
  selector: 'app-accueil',
  imports: [CurrencyPipe],
  styleUrl: './accueil.scss',
  templateUrl: './accueil.html',
})
export class AccueilComponent implements OnInit, OnDestroy {
  /**
   * Diapositives du hero : image de fond + texte descriptif, synchronisés.
   * Dépose les images sous ces noms exacts (assets/images/fond-1.jpg, fond-2.jpg, fond-3.jpg, fond-5.jpg).
   * Le texte défile en fondu exactement comme les images (voir accueil.scss > .hero__text).
   */
  readonly heroSlides: HeroSlide[] = [
    {
      image: 'assets/images/fond-1.jpg',
      badge: 'Compléments importés authentiques',
      titleMain: 'KANE',
      titleAccent: 'FORM',
      subtitle:
        'La destination sénégalaise de la nutrition sportive premium. Créatine, whey, gainers et boosters pour atteindre vos objectifs.',
    },
    {
      image: 'assets/images/fond-2.jpg',
      badge: 'Protéines premium',
      titleMain: 'RÉCUPÈRE',
      titleAccent: 'PLUS VITE',
      subtitle:
        "Des whey et isolats sélectionnés pour reconstruire le muscle efficacement après l'effort.",
    },
    {
      image: 'assets/images/fond-3.jpg',
      badge: 'Créatine monohydrate',
      titleMain: 'GAGNE EN',
      titleAccent: 'PUISSANCE',
      subtitle: "Plus de force et d'endurance à chaque séance, jour après jour.",
    },
    {
      image: 'assets/images/fond-5.jpg',
      badge: 'Pre-workout & boosters',
      titleMain: 'DÉPASSE TES',
      titleAccent: 'LIMITES',
      subtitle: "L'énergie et la concentration qu'il te faut pour battre chaque record personnel.",
    },
  ];

  /** Délai exact entre deux diapositives (image + texte), en millisecondes. */
  readonly heroIntervalMs = 5000;

  activeHeroIndex = 0;

  private heroTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.heroTimer = setInterval(() => this.nextHeroImage(), this.heroIntervalMs);
  }

  ngOnDestroy(): void {
    if (this.heroTimer) {
      clearInterval(this.heroTimer);
    }
  }

  nextHeroImage(): void {
    this.activeHeroIndex = (this.activeHeroIndex + 1) % this.heroSlides.length;
  }

  goToHeroImage(index: number): void {
    this.activeHeroIndex = index;
    // On relance le timer pour que le clic ne soit pas immédiatement écrasé par le défilement automatique.
    if (this.heroTimer) {
      clearInterval(this.heroTimer);
    }
    this.heroTimer = setInterval(() => this.nextHeroImage(), this.heroIntervalMs);
  }

  // ===================== Header : menu mobile & recherche =====================
  mobileMenuOpen = false;
  searchOpen = false;
  openMobileLink: string | null = null;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      this.searchOpen = false;
    } else {
      this.openMobileLink = null;
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    this.openMobileLink = null;
  }

  toggleMobileSubmenu(label: string): void {
    this.openMobileLink = this.openMobileLink === label ? null : label;
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
    if (this.searchOpen) {
      this.mobileMenuOpen = false;
      this.openMobileLink = null;
    }
  }

  readonly navLinks = [
    {
      label: 'Objectifs',
      children: ['Prise de masse', 'Perte de poids', 'Récupération'],
    },
    {
      label: 'Nutrition',
      children: ['Gainers', 'Whey', 'Créatine', 'Packs', 'Acides aminés', 'Boosters', 'Vitamines'],
    },
    {
      label: 'Accessoires',
      children: ['Sacs', 'Shakers & bouteilles', 'Chaussettes'],
    },
    {
      label: 'Conseils',
      children: ['Blog Nutrition', 'Infos'],
    },
  ];

  readonly categoryTiles: CategoryTile[] = [
    {
      name: 'Protéines',
      image: 'assets/images/proteine.jpeg',
      cta: 'Voir la collection',
    },
    { name: 'Créatine', image: 'assets/images/creatine.jpeg', cta: 'Voir la collection' },
    { name: 'Gainer', image: 'assets/images/masse.jpeg', cta: 'Voir la collection' },
    { name: 'Boosters', image: 'assets/images/perf.jpeg', cta: 'Voir la collection' },
  ];

  readonly nutritionProducts: Product[] = [
    {
      name: 'KF Whey Isolate',
      image: 'assets/images/perf1.jpeg',
      price: 25000,
      rating: 4.8,
      reviews: 132,
      variant: 'Chocolat · Vanille · Fraise',
      inStock: true,
    },
    {
      name: 'KF Créatine Monohydrate',
      image: 'assets/images/creatine1.jpeg',
      price: 12000,
      rating: 4.9,
      reviews: 211,
      variant: '300 g · 500 g',
      inStock: true,
    },
    {
      name: 'KF Mass Gainer',
      image: 'assets/images/masse1.jpeg',
      price: 32000,
      rating: 4.6,
      reviews: 87,
      variant: '2 kg · 5 kg',
      inStock: false,
    },
    {
      name: 'KF Pre-Workout Booster',
      image: 'assets/images/perf1.jpeg',
      price: 18000,
      rating: 4.7,
      reviews: 154,
      variant: 'Fruits rouges · Citron',
      inStock: true,
    },
  ];

  readonly packs: Pack[] = [
    {
      name: 'Pack Prise de Masse',
      image: 'assets/images/masse-package.png',
      price: 42000,
      oldPrice: 50000,
      discount: 16,
    },
    {
      name: 'Pack Performance',
      image: 'assets/images/perf-package.png',
      price: 36000,
      oldPrice: 44000,
      discount: 19,
    },
    {
      name: 'Pack Récupération',
      image: 'assets/images/creatine-package.png',
      price: 28000,
      oldPrice: 36000,
      discount: 22,
    },
  ];

  readonly reviews: Review[] = [
    {
      name: 'Moussa D.',
      date: 'Octobre 2026',
      product: 'KF Whey Isolate',
      text: 'Très bonne dissolution et goût agréable, je recommande.',
      rating: 5,
    },
    {
      name: 'Aïssatou S.',
      date: 'Septembre 2026',
      product: 'KF Créatine Monohydrate',
      text: 'Résultats visibles dès les premières semaines.',
      rating: 5,
    },
    {
      name: 'Ibrahima K.',
      date: 'Septembre 2026',
      product: 'KF Pre-Workout Booster',
      text: 'Bonne énergie en séance, sans effet de descente brutale.',
      rating: 4,
    },
  ];

  readonly faqs: FaqItem[] = [
    {
      question: 'Où sont fabriqués vos produits ?',
      answer:
        'Nos produits sont sélectionnés auprès de marques reconnues et contrôlés avant distribution pour garantir leur authenticité.',
      open: true,
    },
    {
      question: 'Quels sont les délais de livraison ?',
      answer: 'La livraison est assurée sous 24 à 72h selon votre zone au Sénégal.',
      open: false,
    },
    {
      question: 'Comment vérifier l’authenticité d’un produit ?',
      answer: 'Chaque produit dispose d’un sceau et d’un numéro de lot vérifiable sur notre site.',
      open: false,
    },
    {
      question: 'Whey ou Gainer, comment choisir ?',
      answer:
        'La whey favorise la récupération musculaire avec peu de calories, le gainer est recommandé pour la prise de masse.',
      open: false,
    },
  ];

  toggleFaq(item: FaqItem): void {
    item.open = !item.open;
  }

  starsArray(rating: number): number[] {
    return Array.from({ length: Math.round(rating) });
  }
}
