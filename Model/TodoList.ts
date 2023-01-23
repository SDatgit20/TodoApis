export class ToDoList{
    private id:number;
    private name:String;

    constructor(id:number,name:String){
        this.id=id;
        this.name=name;
    }

    public setName(name:string){
        this.name=name;
    }
   

    public getId():number{
        return this.id;
    }
    public getName():String{
        return this.name;
    }
}