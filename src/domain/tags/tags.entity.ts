import Base, { BaseProps } from "../generic/base.entity";
import { TagsInterface } from "./tags.interface";

export type TagsProps = BaseProps;

export class Tags extends Base implements TagsInterface {
    constructor(props: TagsProps) {
        super(props);
        this.validate();
    }

    validate(): string[] {
        return super.validate();
    }
}
