import { Project } from "@/types/project";
import { ProjectItem } from "../project-item";
import styles from "./project-list.module.css";

type Props = {
  projects: Pick<Project, 'slug' | 'thumbnail' | 'title'>[];
};

export const ProjectList = ({ projects = [] }: Props) => {
  return (
    <div className={`${styles["project-list"]} project-list`}>
      {projects.map(({ thumbnail, title, slug }) => (
        <ProjectItem
          key={slug}
          imageUrl={thumbnail}
          title={title}
          path={slug ? `/project/${slug}` : undefined}
        />
      ))}
    </div>
  );
};
