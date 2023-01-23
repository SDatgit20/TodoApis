export class ToDoTask{
    private id:number;
    private description:String;
    private status:String="Pending";
    private list_id:number;


    constructor(description:String,list_id:number){
        this.description=description;
        this.list_id=list_id;
    }

    public setDescription(description:string){
        this.description=description;
    }
   
    public setStatus(status:string){
        this.status=status;
    }

    public getId():number{
        return this.id;
    }
    public getDescription():String{
        return this.description;
    }

    public getStatus():String{
        return this.status;
    }

    public getlistId():number{
        return this.list_id;
    }
}