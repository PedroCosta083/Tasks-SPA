export default interface BaseInterface{
    get id():string;
    get active():boolean;
    get createdAt():Date;
    get updatedAt():Date;
    get deactivatedAt():Date;
    validate():void
}