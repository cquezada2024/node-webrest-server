import { error } from 'console';
import {Request, Response} from 'express';


const todos = [
    { id: 1, text: 'Buy Milk', completeAt: new Date() },
    { id: 2, text: 'Buy Bread', completeAt: new Date() },
    { id: 3, text: 'Buy Butter', completeAt: new Date() },
];

export class TodosController {

    //* DI
    constructor() {}


    public getTodos = (req: Request, res:Response  ) => {
            return res.json(todos);
    };

    public getTodosById = (req:Request, res: Response) => {
        const id = +req.params.id;

        if( isNaN(id)) return res.status(400).json({error: 'Id Argument is not number'});
        const todo = todos.find( todo => todo.id === id);
        
        // if
        ( todo )
        ? res.json(todo)  //* true
        : res.status(404).json({error: `TODO with id: ${id} not found`})  //* False
        
    };


    public createTodo = (req:Request, res: Response) => {
        const { text } = req.body;

        if(!text) return res.status(400).json({error: 'text property is required'});

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completeAt: new Date()
        };

        todos.push(newTodo);        
        res.json(newTodo);
    };


    public updateTodo = (req:Request, res: Response) => {
        const id = +req.params.id;        
        if( isNaN(id)) return res.status(400).json({error: 'Id Argument is not number'});

        const todo = todos.find( todo => todo.id === id);        
        if(!todo) return res.status(404).json({error: `Todo with id: ${id} not found` });

        const{ text, completeAt }  = req.body;

        todo.text = text || todo.text;
        // (completeAt === 'null')
        // ? todo.completeAt = '00/00/00';
        // : todo.completeAt new Date( completeAt || todo.completeAt);

       //if(!text) return res.status(400).json({error: 'Text proporty is required' });       

        res.json(todo);

    }

    public deleteTodo = (req:Request, res: Response) => {
        const id = +req.params.id;        
        if( isNaN(id)) return res.status(400).json({error: 'Id Argument is not number'});

        const todo = todos.find( todo => todo.id === id);        
        if(!todo) return res.status(404).json({error: `Todo with id: ${id} not found` });

        todos.splice(todos.indexOf(todo),1); 
        res.json(todo);
    }
}


