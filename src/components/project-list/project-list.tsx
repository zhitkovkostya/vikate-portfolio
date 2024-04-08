import { ProjectItem } from "../project-item";
import project1Image from "@/assets/images/project-1.png";
import project2Image from "@/assets/images/project-2.png";
import project3Image from "@/assets/images/project-3.png";

const projects = [
  { id: 1, imageUrl: project1Image as unknown as string, title: "Project 1" },
  { id: 2, imageUrl: project2Image as unknown as string, title: "Project 2" },
  { id: 3, imageUrl: project3Image as unknown as string, title: "Project 3" },
];

export const ProjectList = () => {
  return (
    <div>
      {projects.map(({ id, imageUrl, title }) => (
        <div className="box" key={id}>
          <ProjectItem imageUrl={imageUrl} title={title} />
        </div>
      ))}
    </div>
  );
};
