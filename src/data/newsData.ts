export interface NewsItem {
  id: number;
  image: string;
  date: string;
  title: string;
  source: string;
  url: string;
  content?: string;
  createdBy?: string;
}

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 1,
    image: "/assets/img/aragua-gestion.jpg",
    date: "15 Oct 2023",
    title: "Minhvi acelera entrega de títulos de tierra en el estado Aragua",
    source: "Prensa Minhvi",
    url: "https://minhvi.gob.ve/category/noticias/"
  },
  {
    id: 2,
    image: "/assets/img/jornada-titulos.jpg",
    date: "12 Oct 2023",
    title: "INTU despliega plan de atención directa en comunidades de Maracay",
    source: "Ciudad MCY",
    url: "https://ciudadmcy.info.ve/"
  },
  {
    id: 3,
    image: "/assets/img/la-guaira-plan.jpg",
    date: "08 Oct 2023",
    title: "Más de 500 familias reciben titularidad de tierras en Caracas",
    source: "Prensa Minhvi",
    url: "https://minhvi.gob.ve/category/noticias/"
  },
  {
    id: 4,
    image: "/assets/img/About_1.jpeg",
    date: "05 Oct 2023",
    title: "Conoce los requisitos para la regularización de CTU",
    source: "INTU Informa",
    url: "#"
  }
];