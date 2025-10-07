export type NasaItem = {
    data: Array<{
      nasa_id: string;
      title: string;
      description?: string;
      date_created?: string;
      center?: string;
    }>;
    links?: Array<{ href: string }>;
  };
  