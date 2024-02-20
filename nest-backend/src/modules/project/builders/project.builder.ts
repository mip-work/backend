import { Project } from 'src/modules/project/dtos/project.dto';
import { ViewProjectDTO } from 'src/modules/project/dtos/responses/view-project.dto';

export class ProjectBuilder {
  static createProjectView(project: Project): ViewProjectDTO {
    const { id, name, descr, repo } = project;
    return { id, name, descr, repo };
  }

  static listProjectView(projects: Project[]): ViewProjectDTO[] {
    const viewProjects: ViewProjectDTO[] = [];
    projects.map((project) => {
      const { id, name, descr, repo } = project;
      viewProjects.push({ id, name, descr, repo });
    });
    return viewProjects;
  }
}
