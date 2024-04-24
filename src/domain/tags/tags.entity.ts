import Base, { BaseProps } from "../generic/base.entity";

export type TagsProps = BaseProps & {
    tag: string;
    title: string;
    description: string;
    date: Date;
    duration: string;
}

export class Tags extends Base{ //implements TagsInterface{}

}