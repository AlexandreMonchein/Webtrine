export type MultiDescriptionProps = {
  /** Name of the template to render */
  templateName?: string | null;
};

export interface MultiDescriptionContent {
  type: string;
  id: string;
  [key: string]: unknown;
}

export interface MultiDescriptionDatas {
  content?: Record<string, MultiDescriptionContent>;
  title?: string;
  description?: string;
}

export interface MultiDescriptionTemplate {
  type: string;
  id?: string;
  name?: string;
  datas?: MultiDescriptionDatas;
}
