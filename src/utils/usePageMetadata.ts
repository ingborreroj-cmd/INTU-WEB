import { useEffect } from 'react';

interface PageMetadata {
  title: string;
  description: string;
  robots?: string;
}

export const usePageMetadata = ({ title, description, robots = 'index,follow' }: PageMetadata) => {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const robotsTag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousDescription = descriptionTag?.content;
    const previousRobots = robotsTag?.content;
    const createdDescription = !descriptionTag;
    const createdRobots = !robotsTag;
    const nextDescriptionTag = descriptionTag || document.createElement('meta');
    const nextRobotsTag = robotsTag || document.createElement('meta');

    nextDescriptionTag.name = 'description';
    nextDescriptionTag.content = description;
    nextRobotsTag.name = 'robots';
    nextRobotsTag.content = robots;
    if (createdDescription) document.head.appendChild(nextDescriptionTag);
    if (createdRobots) document.head.appendChild(nextRobotsTag);
    document.title = title;

    return () => {
      document.title = previousTitle;
      if (previousDescription !== undefined) nextDescriptionTag.content = previousDescription;
      else if (createdDescription) nextDescriptionTag.remove();
      if (previousRobots !== undefined) nextRobotsTag.content = previousRobots;
      else if (createdRobots) nextRobotsTag.remove();
    };
  }, [title, description, robots]);
};