export interface NewsItem {
  id: number;
  image: string;
  date: string;
  title: string;
  source: string;
  url: string;
  excerpt?: string;
  content?: string;
}

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 1,
    image: "https://picsum.photos/seed/news1/600/400",
    date: "15 Oct 2023",
    title: "Minhvi acelera entrega de títulos de tierra en el estado Aragua",
    source: "Prensa Minhvi",
    url: "https://minhvi.gob.ve/category/noticias/"
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/news2/600/400",
    date: "12 Oct 2023",
    title: "INTU despliega plan de atención directa en comunidades de Maracay",
    source: "Ciudad MCY",
    url: "https://ciudadmcy.info.ve/"
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/news3/600/400",
    date: "08 Oct 2023",
    title: "Más de 500 familias reciben titularidad de tierras en Caracas",
    source: "Prensa Minhvi",
    url: "https://minhvi.gob.ve/category/noticias/"
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/news4/600/400",
    date: "05 Oct 2023",
    title: "Conoce los requisitos para la regularización de CTU",
    source: "INTU Informa",
    url: "#"
  }
];