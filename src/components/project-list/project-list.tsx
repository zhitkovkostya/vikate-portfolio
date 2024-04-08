import { ProjectItem } from "../project-item";

type Props = {
  projects: { slug: string; thumbnail: string; title: string }[];
};

export const ProjectList = ({ projects }: Props) => {
  return (
    <div className="project-list">
      {projects.map(({ thumbnail, title, slug }) => (
        <div className="box" key={slug}>
          <ProjectItem
            imageUrl={thumbnail}
            title={title}
            path={`/project/${slug}`}
          />
        </div>
      ))}
    </div>
  );
};
