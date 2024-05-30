export const community: CommunityProps[] = [
  {
    title: "Misión Push, PIP & Discusiones GitHub",
    href: "/community#mision-push-pip-github-discussions",
    description:
      "Actualizaciones de Misiones Push, visión general de Propuestas de Mejora Push (PIP), y discusiones en GitHub.",
  },
  {
    title: "Recursos de Desarrollo",
    href: "/community#dev-resources",
    description: "Repositorio ‘awesome-push’ y Documento para Hackers.",
  },
];

interface CommunityProps {
  title: string;
  href: string;
  description: string;
}
